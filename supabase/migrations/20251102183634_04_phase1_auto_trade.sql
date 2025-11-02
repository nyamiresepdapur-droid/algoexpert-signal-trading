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
-- 10. Seed Default Signal Providers
-- =====================================================
INSERT INTO signal_providers (name, description, category, default_settings) VALUES
  ('Gold Standard', 'Conservative Gold (XAUUSD) signals with steady performance', 'commodity', '{"default_risk": 1.5, "min_rr": 2.0}'::jsonb),
  ('Gold High Frequency', 'Aggressive Gold signals with high frequency trading', 'commodity', '{"default_risk": 2.0, "min_rr": 1.5}'::jsonb),
  ('Multi Pair Forex', 'Multiple forex pairs with diversified approach', 'forex', '{"default_risk": 2.0, "min_rr": 1.8}'::jsonb),
  ('Crypto Spot', 'Cryptocurrency spot trading signals', 'crypto', '{"default_risk": 2.5, "min_rr": 1.5}'::jsonb),
  ('Crypto Futures', 'Cryptocurrency futures trading signals', 'crypto', '{"default_risk": 2.5, "min_rr": 1.8}'::jsonb)
ON CONFLICT (name) DO NOTHING;
