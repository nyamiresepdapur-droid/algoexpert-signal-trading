/*
  # Signals Tracking System

  1. New Tables
    - `user_signal_journal` - User's personal journal for signals
    - `risk_profiles` - User risk management settings

  2. Updates to trading_signals
    - Add result_pips and result_profit_percent columns
    - Add closed_time column

  3. Security
    - Enable RLS on all tables
    - Users can only access their own journal and risk profiles
*/

-- Add columns to trading_signals if not exists
ALTER TABLE trading_signals 
ADD COLUMN IF NOT EXISTS result_pips numeric,
ADD COLUMN IF NOT EXISTS result_profit_percent numeric,
ADD COLUMN IF NOT EXISTS closed_time timestamptz;

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
ALTER TABLE user_signal_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_profiles ENABLE ROW LEVEL SECURITY;

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
CREATE INDEX IF NOT EXISTS idx_user_signal_journal_user_id ON user_signal_journal(user_id);
CREATE INDEX IF NOT EXISTS idx_user_signal_journal_signal_id ON user_signal_journal(signal_id);
CREATE INDEX IF NOT EXISTS idx_risk_profiles_user_id ON risk_profiles(user_id);

-- Triggers for updated_at
CREATE TRIGGER update_user_signal_journal_updated_at
  BEFORE UPDATE ON user_signal_journal
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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
