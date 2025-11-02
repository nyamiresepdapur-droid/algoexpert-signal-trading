/*
  # Signals Tracking System

  1. New Tables
    - `trading_signals`
      - `id` (uuid, primary key)
      - `signal_provider` (text) - nama provider sinyal (crypto-spot, gold-standard, dll)
      - `pair` (text) - trading pair (XAUUSD, BTCUSDT, dll)
      - `direction` (text) - BUY atau SELL
      - `entry_price` (numeric) - harga entry
      - `stop_loss` (numeric) - SL level
      - `take_profit_1` (numeric) - TP1 level
      - `take_profit_2` (numeric) - TP2 level (optional)
      - `take_profit_3` (numeric) - TP3 level (optional)
      - `status` (text) - PENDING, ACTIVE, WIN, LOSS, CANCELLED
      - `result_pips` (numeric) - hasil dalam pips
      - `result_profit_percent` (numeric) - hasil dalam persen
      - `signal_time` (timestamptz) - waktu sinyal diberikan
      - `closed_time` (timestamptz) - waktu trade ditutup
      - `notes` (text) - catatan tambahan
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_signal_journal`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `signal_id` (uuid, references trading_signals)
      - `followed` (boolean) - apakah user mengikuti sinyal ini
      - `lot_size` (numeric) - ukuran lot yang digunakan
      - `actual_entry` (numeric) - harga entry aktual user
      - `actual_exit` (numeric) - harga exit aktual user
      - `actual_profit` (numeric) - profit/loss aktual user
      - `notes` (text) - catatan personal user
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `risk_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `account_balance` (numeric)
      - `risk_percentage` (numeric) - default 1-2%
      - `max_trades_per_day` (integer)
      - `preferred_pairs` (text[]) - array of preferred pairs
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can view all trading signals (public data)
    - Users can only access their own journal and risk profiles
    - Admins can insert/update signals

  3. Indexes
    - Index on signal_time for performance
    - Index on user_id for journal queries
    - Index on pair and status for filtering
*/

-- Trading Signals Table
CREATE TABLE IF NOT EXISTS trading_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_provider text NOT NULL,
  pair text NOT NULL,
  direction text NOT NULL CHECK (direction IN ('BUY', 'SELL')),
  entry_price numeric NOT NULL,
  stop_loss numeric NOT NULL,
  take_profit_1 numeric NOT NULL,
  take_profit_2 numeric,
  take_profit_3 numeric,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'WIN', 'LOSS', 'CANCELLED')),
  result_pips numeric,
  result_profit_percent numeric,
  signal_time timestamptz NOT NULL DEFAULT now(),
  closed_time timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Signal Journal Table
CREATE TABLE IF NOT EXISTS user_signal_journal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_id uuid NOT NULL REFERENCES trading_signals(id) ON DELETE CASCADE,
  followed boolean DEFAULT false,
  lot_size numeric,
  actual_entry numeric,
  actual_exit numeric,
  actual_profit numeric,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, signal_id)
);

-- Risk Profiles Table
CREATE TABLE IF NOT EXISTS risk_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  account_balance numeric NOT NULL DEFAULT 10000,
  risk_percentage numeric NOT NULL DEFAULT 2,
  max_trades_per_day integer DEFAULT 3,
  preferred_pairs text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_signal_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trading_signals
CREATE POLICY "Anyone can view trading signals"
  ON trading_signals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert signals"
  ON trading_signals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update signals"
  ON trading_signals FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for user_signal_journal
CREATE POLICY "Users can view own journal"
  ON user_signal_journal FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal"
  ON user_signal_journal FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal"
  ON user_signal_journal FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal"
  ON user_signal_journal FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for risk_profiles
CREATE POLICY "Users can view own risk profile"
  ON risk_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own risk profile"
  ON risk_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own risk profile"
  ON risk_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trading_signals_signal_time ON trading_signals(signal_time DESC);
CREATE INDEX IF NOT EXISTS idx_trading_signals_pair ON trading_signals(pair);
CREATE INDEX IF NOT EXISTS idx_trading_signals_status ON trading_signals(status);
CREATE INDEX IF NOT EXISTS idx_trading_signals_provider ON trading_signals(signal_provider);
CREATE INDEX IF NOT EXISTS idx_user_signal_journal_user_id ON user_signal_journal(user_id);
CREATE INDEX IF NOT EXISTS idx_user_signal_journal_signal_id ON user_signal_journal(signal_id);
CREATE INDEX IF NOT EXISTS idx_risk_profiles_user_id ON risk_profiles(user_id);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_trading_signals_updated_at ON trading_signals;
CREATE TRIGGER update_trading_signals_updated_at
  BEFORE UPDATE ON trading_signals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_signal_journal_updated_at ON user_signal_journal;
CREATE TRIGGER update_user_signal_journal_updated_at
  BEFORE UPDATE ON user_signal_journal
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_risk_profiles_updated_at ON risk_profiles;
CREATE TRIGGER update_risk_profiles_updated_at
  BEFORE UPDATE ON risk_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample signals for demonstration
INSERT INTO trading_signals (signal_provider, pair, direction, entry_price, stop_loss, take_profit_1, take_profit_2, take_profit_3, status, result_pips, signal_time) VALUES
  ('Gold Standard', 'XAUUSD', 'BUY', 2650.50, 2645.00, 2658.00, 2665.00, 2672.00, 'WIN', 75, now() - interval '2 hours'),
  ('Crypto Spot', 'BTCUSDT', 'SELL', 68500, 69000, 67500, 66500, 65500, 'ACTIVE', NULL, now() - interval '1 hour'),
  ('Multi Pair Forex', 'EURUSD', 'BUY', 1.0850, 1.0830, 1.0880, 1.0900, NULL, 'ACTIVE', NULL, now() - interval '30 minutes'),
  ('Gold High Frequency', 'XAUUSD', 'SELL', 2655.00, 2660.00, 2648.00, 2642.00, NULL, 'LOSS', -50, now() - interval '3 hours'),
  ('Crypto Futures', 'ETHUSDT', 'BUY', 3450, 3400, 3500, 3550, 3600, 'PENDING', NULL, now() - interval '15 minutes')
ON CONFLICT DO NOTHING;
