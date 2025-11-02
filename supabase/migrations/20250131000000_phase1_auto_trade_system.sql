/*
  # Phase 1 MVP: Admin Signals + Auto-Trade System

  This migration adds all necessary tables for:
  - Admin signal push system
  - User signal customization (TP/SL/RR)
  - Auto-trade configuration
  - Trade execution tracking
  - Admin analytics
  - Signal providers management
*/

-- =====================================================
-- 1. Extend trading_signals table (add admin tracking)
-- =====================================================
ALTER TABLE trading_signals 
ADD COLUMN IF NOT EXISTS admin_user_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'admin' CHECK (source_type IN ('admin', 'user_custom'));

CREATE INDEX IF NOT EXISTS idx_trading_signals_admin_user_id ON trading_signals(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_trading_signals_source_type ON trading_signals(source_type);

-- =====================================================
-- 2. Signal Providers (Admin-managed)
-- =====================================================
CREATE TABLE IF NOT EXISTS signal_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  category text CHECK (category IN ('forex', 'crypto', 'commodity', 'all')),
  is_active boolean DEFAULT true,
  default_settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_signal_providers_active ON signal_providers(is_active);
CREATE INDEX IF NOT EXISTS idx_signal_providers_category ON signal_providers(category);

-- =====================================================
-- 3. User Signal Settings (Custom TP/SL/RR per Signal)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_signal_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_id uuid NOT NULL REFERENCES trading_signals(id) ON DELETE CASCADE,
  
  -- Enable/Disable
  is_enabled boolean DEFAULT true,
  
  -- Custom TP/SL/RR
  custom_take_profit_1 numeric,
  custom_take_profit_2 numeric,
  custom_take_profit_3 numeric,
  custom_stop_loss numeric,
  custom_risk_reward numeric,
  
  -- AI Trailing Settings
  use_ai_trailing boolean DEFAULT false,
  trailing_type text CHECK (trailing_type IN ('fixed_pips', 'percentage', 'atr_based')),
  trailing_distance numeric,
  trailing_step numeric,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, signal_id)
);

CREATE INDEX IF NOT EXISTS idx_user_signal_settings_user_id ON user_signal_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_signal_settings_signal_id ON user_signal_settings(signal_id);
CREATE INDEX IF NOT EXISTS idx_user_signal_settings_enabled ON user_signal_settings(is_enabled);

-- =====================================================
-- 4. Auto-Trade Configuration
-- =====================================================
CREATE TABLE IF NOT EXISTS auto_trade_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Trading Account (Forex/Commodity)
  metaapi_account_id uuid REFERENCES trading_accounts(id),
  metaapi_enabled boolean DEFAULT false,
  
  -- Trading Account (Crypto)
  crypto_exchange text CHECK (crypto_exchange IN ('binance', 'bybit', 'other')),
  crypto_account_id uuid REFERENCES trading_accounts(id),
  crypto_enabled boolean DEFAULT false,
  
  -- Signal Sources (Admin providers only for Phase 1)
  enabled_signal_providers text[] DEFAULT ARRAY[]::text[],
  auto_execute_new_signals boolean DEFAULT false,
  
  -- Risk Management
  max_risk_per_trade numeric DEFAULT 2.0 CHECK (max_risk_per_trade > 0 AND max_risk_per_trade <= 10),
  max_trades_per_day integer DEFAULT 5 CHECK (max_trades_per_day > 0),
  max_daily_loss numeric CHECK (max_daily_loss IS NULL OR max_daily_loss > 0),
  max_open_positions integer DEFAULT 3 CHECK (max_open_positions > 0),
  
  -- Trading Rules
  min_risk_reward numeric DEFAULT 1.5 CHECK (min_risk_reward > 0),
  allowed_pairs text[] DEFAULT ARRAY[]::text[],
  blocked_pairs text[] DEFAULT ARRAY[]::text[],
  
  -- Status
  is_active boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auto_trade_configs_user_id ON auto_trade_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_auto_trade_configs_active ON auto_trade_configs(is_active);

-- =====================================================
-- 5. Trade Executions (Log All Trades)
-- =====================================================
CREATE TABLE IF NOT EXISTS trade_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_id uuid REFERENCES trading_signals(id) ON DELETE SET NULL,
  trading_account_id uuid REFERENCES trading_accounts(id) ON DELETE SET NULL,
  
  -- Execution Details
  execution_type text NOT NULL DEFAULT 'auto' CHECK (execution_type IN ('manual', 'auto')),
  order_id text,
  position_type text NOT NULL CHECK (position_type IN ('market', 'pending', 'limit')),
  
  -- Trade Details
  pair text NOT NULL,
  direction text NOT NULL CHECK (direction IN ('BUY', 'SELL')),
  entry_price numeric NOT NULL,
  lot_size numeric NOT NULL,
  stop_loss numeric,
  take_profit_1 numeric,
  take_profit_2 numeric,
  take_profit_3 numeric,
  
  -- Risk Settings Used
  risk_percentage numeric,
  risk_amount numeric,
  
  -- Result
  exit_price numeric,
  exit_reason text CHECK (exit_reason IN ('tp1', 'tp2', 'tp3', 'sl', 'manual', 'trailing', 'ai_trailing')),
  profit_loss numeric,
  profit_loss_pips numeric,
  profit_loss_percent numeric,
  
  -- Status
  status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED', 'CANCELLED', 'PARTIAL')),
  opened_at timestamptz DEFAULT now(),
  closed_at timestamptz,
  
  -- Trailing Info
  highest_price numeric,
  lowest_price numeric,
  trailing_stops_applied jsonb DEFAULT '[]'::jsonb,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trade_executions_user_id ON trade_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_trade_executions_signal_id ON trade_executions(signal_id);
CREATE INDEX IF NOT EXISTS idx_trade_executions_status ON trade_executions(status);
CREATE INDEX IF NOT EXISTS idx_trade_executions_opened_at ON trade_executions(opened_at DESC);
CREATE INDEX IF NOT EXISTS idx_trade_executions_pair ON trade_executions(pair);

-- =====================================================
-- 6. Admin Analytics (Super Admin Dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  
  -- Signal Stats
  total_signals_received integer DEFAULT 0,
  total_signals_executed integer DEFAULT 0,
  signals_by_provider jsonb DEFAULT '{}'::jsonb,
  
  -- Trading Stats
  total_trades integer DEFAULT 0,
  winning_trades integer DEFAULT 0,
  losing_trades integer DEFAULT 0,
  win_rate numeric,
  total_profit_loss numeric DEFAULT 0,
  total_profit_loss_pips numeric DEFAULT 0,
  average_win numeric,
  average_loss numeric,
  
  -- Risk Stats
  average_risk_per_trade numeric,
  max_drawdown numeric,
  profit_factor numeric,
  sharpe_ratio numeric,
  
  -- Performance by Pair
  performance_by_pair jsonb DEFAULT '{}'::jsonb,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_admin_analytics_user_id ON admin_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_analytics_date ON admin_analytics(date DESC);

-- =====================================================
-- 7. Enable RLS on all new tables
-- =====================================================
ALTER TABLE signal_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_signal_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_trade_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_analytics ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 8. RLS Policies
-- =====================================================

-- Signal Providers: Everyone can read, only admins can modify
CREATE POLICY "Anyone can view signal providers"
  ON signal_providers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage signal providers"
  ON signal_providers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- User Signal Settings: Users can only access their own
CREATE POLICY "Users can view own signal settings"
  ON user_signal_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own signal settings"
  ON user_signal_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-Trade Configs: Users can only access their own
CREATE POLICY "Users can view own auto-trade config"
  ON auto_trade_configs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own auto-trade config"
  ON auto_trade_configs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trade Executions: Users can only access their own
CREATE POLICY "Users can view own trade executions"
  ON trade_executions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trade executions"
  ON trade_executions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trade executions"
  ON trade_executions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admin Analytics: Users can view their own, admins can view all
CREATE POLICY "Users can view own analytics"
  ON admin_analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all analytics"
  ON admin_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert analytics"
  ON admin_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "System can update analytics"
  ON admin_analytics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 9. Updated_at Triggers
-- =====================================================

CREATE TRIGGER update_signal_providers_updated_at
  BEFORE UPDATE ON signal_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_signal_settings_updated_at
  BEFORE UPDATE ON user_signal_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auto_trade_configs_updated_at
  BEFORE UPDATE ON auto_trade_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trade_executions_updated_at
  BEFORE UPDATE ON trade_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_analytics_updated_at
  BEFORE UPDATE ON admin_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 10. Database Functions
-- =====================================================

-- Function: Calculate Position Size
CREATE OR REPLACE FUNCTION calculate_position_size(
  p_account_balance numeric,
  p_risk_percentage numeric,
  p_entry_price numeric,
  p_stop_loss numeric,
  p_pair text
)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  v_risk_amount numeric;
  v_pip_value numeric;
  v_pips_at_risk numeric;
  v_lot_size numeric;
BEGIN
  -- Calculate risk amount
  v_risk_amount := p_account_balance * (p_risk_percentage / 100.0);
  
  -- Calculate pips at risk
  v_pips_at_risk := ABS(p_entry_price - p_stop_loss);
  
  -- Simple pip value calculation (simplified - may need adjustment per pair)
  -- For major pairs: 1 pip = 0.0001, for JPY pairs: 1 pip = 0.01
  -- For Gold: 1 pip = 0.1, for Crypto: depends on pair
  IF p_pair LIKE '%JPY%' THEN
    v_pip_value := 0.01;
  ELSIF p_pair LIKE 'XAU%' OR p_pair LIKE 'GOLD%' THEN
    v_pip_value := 0.1;
  ELSIF p_pair LIKE '%BTC%' OR p_pair LIKE '%ETH%' OR p_pair LIKE '%USDT%' THEN
    v_pip_value := 1.0; -- For crypto, use 1 unit as pip
  ELSE
    v_pip_value := 0.0001; -- Major pairs
  END IF;
  
  -- Normalize pips
  v_pips_at_risk := v_pips_at_risk / v_pip_value;
  
  -- Calculate lot size (simplified - assumes standard lot size)
  -- Standard lot = 100,000 units, pip value = $10 per pip for major pairs
  IF v_pips_at_risk > 0 THEN
    v_lot_size := (v_risk_amount / (v_pips_at_risk * 10.0))::numeric(10,2);
  ELSE
    v_lot_size := 0;
  END IF;
  
  -- Ensure minimum lot size
  IF v_lot_size < 0.01 THEN
    v_lot_size := 0.01;
  END IF;
  
  RETURN v_lot_size;
END;
$$;

-- Function: Update Admin Analytics (called by trigger or scheduled job)
CREATE OR REPLACE FUNCTION update_admin_analytics(p_user_id uuid, p_date date DEFAULT CURRENT_DATE)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_stats RECORD;
  v_provider_stats jsonb;
  v_pair_stats jsonb;
BEGIN
  -- Get trading statistics for the day
  SELECT 
    COUNT(*) FILTER (WHERE status = 'CLOSED') as total_trades,
    COUNT(*) FILTER (WHERE status = 'CLOSED' AND profit_loss > 0) as winning_trades,
    COUNT(*) FILTER (WHERE status = 'CLOSED' AND profit_loss < 0) as losing_trades,
    AVG(CASE WHEN status = 'CLOSED' AND profit_loss > 0 THEN profit_loss END) as avg_win,
    AVG(CASE WHEN status = 'CLOSED' AND profit_loss < 0 THEN profit_loss END) as avg_loss,
    SUM(CASE WHEN status = 'CLOSED' THEN profit_loss ELSE 0 END) as total_pnl,
    SUM(CASE WHEN status = 'CLOSED' THEN profit_loss_pips ELSE 0 END) as total_pips,
    AVG(risk_percentage) as avg_risk
  INTO v_stats
  FROM trade_executions
  WHERE user_id = p_user_id
    AND DATE(opened_at) = p_date;
  
  -- Calculate win rate
  DECLARE
    v_win_rate numeric;
  BEGIN
    IF v_stats.total_trades > 0 THEN
      v_win_rate := (v_stats.winning_trades::numeric / v_stats.total_trades::numeric) * 100;
    ELSE
      v_win_rate := NULL;
    END IF;
    
    -- Upsert analytics
    INSERT INTO admin_analytics (
      user_id,
      date,
      total_trades,
      winning_trades,
      losing_trades,
      win_rate,
      total_profit_loss,
      total_profit_loss_pips,
      average_win,
      average_loss,
      average_risk_per_trade
    )
    VALUES (
      p_user_id,
      p_date,
      COALESCE(v_stats.total_trades, 0),
      COALESCE(v_stats.winning_trades, 0),
      COALESCE(v_stats.losing_trades, 0),
      v_win_rate,
      COALESCE(v_stats.total_pnl, 0),
      COALESCE(v_stats.total_pips, 0),
      v_stats.avg_win,
      v_stats.avg_loss,
      v_stats.avg_risk
    )
    ON CONFLICT (user_id, date)
    DO UPDATE SET
      total_trades = EXCLUDED.total_trades,
      winning_trades = EXCLUDED.winning_trades,
      losing_trades = EXCLUDED.losing_trades,
      win_rate = EXCLUDED.win_rate,
      total_profit_loss = EXCLUDED.total_profit_loss,
      total_profit_loss_pips = EXCLUDED.total_profit_loss_pips,
      average_win = EXCLUDED.average_win,
      average_loss = EXCLUDED.average_loss,
      average_risk_per_trade = EXCLUDED.average_risk_per_trade,
      updated_at = now();
  END;
END;
$$;

-- Function: Validate Risk Limits Before Trade
CREATE OR REPLACE FUNCTION validate_risk_limits(
  p_user_id uuid,
  p_risk_amount numeric,
  p_pair text
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_config RECORD;
  v_today_trades integer;
  v_today_loss numeric;
  v_open_positions integer;
  v_result jsonb;
BEGIN
  -- Get user's auto-trade config
  SELECT * INTO v_config
  FROM auto_trade_configs
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Auto-trade not configured'
    );
  END IF;
  
  -- Check if auto-trade is active
  IF NOT v_config.is_active THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Auto-trade is not active'
    );
  END IF;
  
  -- Check max trades per day
  SELECT COUNT(*) INTO v_today_trades
  FROM trade_executions
  WHERE user_id = p_user_id
    AND DATE(opened_at) = CURRENT_DATE;
  
  IF v_today_trades >= v_config.max_trades_per_day THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Maximum trades per day reached'
    );
  END IF;
  
  -- Check daily loss limit
  IF v_config.max_daily_loss IS NOT NULL THEN
    SELECT COALESCE(SUM(profit_loss), 0) INTO v_today_loss
    FROM trade_executions
    WHERE user_id = p_user_id
      AND DATE(opened_at) = CURRENT_DATE
      AND status = 'CLOSED'
      AND profit_loss < 0;
    
    IF ABS(v_today_loss) >= v_config.max_daily_loss THEN
      RETURN jsonb_build_object(
        'valid', false,
        'reason', 'Daily loss limit reached'
      );
    END IF;
  END IF;
  
  -- Check max open positions
  SELECT COUNT(*) INTO v_open_positions
  FROM trade_executions
  WHERE user_id = p_user_id
    AND status = 'OPEN';
  
  IF v_open_positions >= v_config.max_open_positions THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Maximum open positions reached'
    );
  END IF;
  
  -- Check pair restrictions
  IF array_length(v_config.blocked_pairs, 1) > 0 AND p_pair = ANY(v_config.blocked_pairs) THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Pair is blocked'
    );
  END IF;
  
  IF array_length(v_config.allowed_pairs, 1) > 0 AND NOT (p_pair = ANY(v_config.allowed_pairs)) THEN
    RETURN jsonb_build_object(
      'valid', false,
      'reason', 'Pair not in allowed list'
    );
  END IF;
  
  -- All checks passed
  RETURN jsonb_build_object(
    'valid', true,
    'reason', 'OK'
  );
END;
$$;

-- =====================================================
-- 11. Seed Default Signal Providers
-- =====================================================
INSERT INTO signal_providers (name, description, category, default_settings) VALUES
  ('Gold Standard', 'Conservative Gold (XAUUSD) signals with steady performance', 'commodity', '{"default_risk": 1.5, "min_rr": 2.0}'::jsonb),
  ('Gold High Frequency', 'Aggressive Gold signals with high frequency trading', 'commodity', '{"default_risk": 2.0, "min_rr": 1.5}'::jsonb),
  ('Multi Pair Forex', 'Multiple forex pairs with diversified approach', 'forex', '{"default_risk": 2.0, "min_rr": 1.8}'::jsonb),
  ('Crypto Spot', 'Cryptocurrency spot trading signals', 'crypto', '{"default_risk": 2.5, "min_rr": 1.5}'::jsonb),
  ('Crypto Futures', 'Cryptocurrency futures trading signals', 'crypto', '{"default_risk": 2.5, "min_rr": 1.8}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 12. Comments for Documentation
-- =====================================================
COMMENT ON TABLE signal_providers IS 'Admin-managed signal providers that users can subscribe to';
COMMENT ON TABLE user_signal_settings IS 'User customizations for individual signals (TP/SL/RR/trailing)';
COMMENT ON TABLE auto_trade_configs IS 'User auto-trade configuration and risk management settings';
COMMENT ON TABLE trade_executions IS 'Log of all trade executions (manual and auto)';
COMMENT ON TABLE admin_analytics IS 'Aggregated analytics data for admin dashboard';

