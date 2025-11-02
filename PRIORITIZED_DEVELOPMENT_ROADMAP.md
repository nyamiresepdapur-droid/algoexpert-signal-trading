# 🚀 Prioritized Development Roadmap
## Admin Signals + Auto-Trade First

---

## ✅ DECISION: Prioritas Pengembangan

### **Phase 1 (MVP - Immediate Focus)**
- ✅ **Admin Signals Only** - User custom telegram channels di Phase 2
- ✅ **Auto-Trade Direct** - Tidak manual execution dulu, langsung auto-trade dengan safety checks

### **Phase 2 (Future Enhancements)**
- User custom telegram channels
- Manual execution mode
- Advanced features

---

## 🎯 Phase 1 MVP: Admin Signals + Auto-Trade

### **Core Features**

1. **Admin Signal Push System**
   - Admin bisa push signal via UI/API
   - Support multiple signal providers (Gold Standard, Crypto Spot, dll)
   - Signal broadcast ke semua users

2. **User Signal Dashboard**
   - Lihat signals dari admin
   - Filter by provider, pair, status
   - Real-time updates

3. **User Signal Customization**
   - Custom TP, SL, RR per signal
   - Enable/disable per signal
   - Bulk customization (apply to all signals)

4. **Auto-Trade System**
   - Connect MetaAPI account (Forex/Commodity)
   - Connect Exchange API (Crypto - Binance/Bybit)
   - Auto-execute signals berdasarkan user settings
   - Risk management enforcement

5. **AI Trailing** (Basic)
   - Rule-based trailing (fixed pips/percentage)
   - Dynamic stop loss adjustment

6. **Trading Journal & Analytics**
   - Track all executions
   - Win rate, P&L, statistics
   - Performance charts

7. **Super Admin Dashboard**
   - View all users' trading data
   - Aggregate analytics
   - Signal performance tracking

---

## 📊 Simplified Database Schema (Phase 1)

### **Tables Needed**

#### 1. `trading_signals` (Already exists, extend if needed)
```sql
-- Already created in existing migration
-- Add admin_user_id for tracking who pushed the signal
ALTER TABLE trading_signals 
ADD COLUMN IF NOT EXISTS admin_user_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'admin' CHECK (source_type IN ('admin', 'user_custom'));
```

#### 2. `user_signal_settings` (Custom TP/SL/RR per Signal)
```sql
CREATE TABLE IF NOT EXISTS user_signal_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_id uuid REFERENCES trading_signals(id) ON DELETE CASCADE,
  
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
  trailing_distance numeric, -- Pips or %
  trailing_step numeric, -- Step for trailing
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, signal_id)
);
```

#### 3. `auto_trade_configs` (User Auto-Trade Configuration)
```sql
CREATE TABLE IF NOT EXISTS auto_trade_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Trading Account (Forex/Commodity)
  metaapi_account_id uuid REFERENCES trading_accounts(id),
  metaapi_enabled boolean DEFAULT false,
  
  -- Trading Account (Crypto)
  crypto_exchange text CHECK (crypto_exchange IN ('binance', 'bybit', 'other')),
  crypto_account_id uuid REFERENCES trading_accounts(id),
  crypto_enabled boolean DEFAULT false,
  
  -- Signal Sources (Admin providers only for Phase 1)
  enabled_signal_providers text[], -- ['Gold Standard', 'Crypto Spot', etc]
  auto_execute_new_signals boolean DEFAULT false,
  
  -- Risk Management
  max_risk_per_trade numeric DEFAULT 2.0, -- %
  max_trades_per_day integer DEFAULT 5,
  max_daily_loss numeric, -- Stop trading after X% loss
  max_open_positions integer DEFAULT 3,
  
  -- Trading Rules
  min_risk_reward numeric DEFAULT 1.5,
  allowed_pairs text[], -- Empty = all pairs
  blocked_pairs text[],
  
  -- Status
  is_active boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### 4. `trade_executions` (Log All Trades)
```sql
CREATE TABLE IF NOT EXISTS trade_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_id uuid REFERENCES trading_signals(id),
  trading_account_id uuid REFERENCES trading_accounts(id),
  
  -- Execution Details
  execution_type text NOT NULL DEFAULT 'auto' CHECK (execution_type IN ('manual', 'auto')),
  order_id text, -- Order ID from broker/exchange
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
  risk_amount numeric, -- Actual $ risked
  
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
  trailing_stops_applied jsonb, -- Array of trailing stop adjustments
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### 5. `admin_analytics` (Super Admin Analytics)
```sql
CREATE TABLE IF NOT EXISTS admin_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id), -- NULL = aggregate all users
  
  -- Daily Aggregates
  date date NOT NULL,
  
  -- Signal Stats
  total_signals_received integer DEFAULT 0,
  total_signals_executed integer DEFAULT 0,
  signals_by_provider jsonb, -- {"Gold Standard": 10, "Crypto Spot": 5}
  
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
  performance_by_pair jsonb, -- {"XAUUSD": {trades: 10, win_rate: 80, pnl: 500}}
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, date)
);
```

#### 6. `signal_providers` (Admin-managed Signal Providers)
```sql
CREATE TABLE IF NOT EXISTS signal_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE, -- 'Gold Standard', 'Crypto Spot', etc
  description text,
  category text CHECK (category IN ('forex', 'crypto', 'commodity', 'all')),
  is_active boolean DEFAULT true,
  default_settings jsonb, -- Default risk settings for this provider
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert default providers
INSERT INTO signal_providers (name, description, category) VALUES
  ('Gold Standard', 'Conservative Gold signals', 'commodity'),
  ('Gold High Frequency', 'Aggressive Gold signals', 'commodity'),
  ('Multi Pair Forex', 'Multiple forex pairs', 'forex'),
  ('Crypto Spot', 'Crypto spot trading signals', 'crypto'),
  ('Crypto Futures', 'Crypto futures signals', 'crypto')
ON CONFLICT (name) DO NOTHING;
```

---

## 🔄 Auto-Trade Execution Flow (Phase 1)

### **Complete Flow**

```
1. ADMIN PUSHES SIGNAL
   ↓
   Admin creates signal via UI/API
   → Insert to trading_signals table
   → Broadcast via Supabase Realtime
   
2. SIGNAL ARRIVES TO USER
   ↓
   User dashboard receives signal (real-time)
   → Check user_signal_settings (custom TP/SL)
   → Display signal card
   
3. AUTO-EXECUTION TRIGGER (if enabled)
   ↓
   Background job/service checks:
   ✓ auto_trade_configs.is_active = true
   ✓ auto_execute_new_signals = true
   ✓ Signal provider enabled in user config
   ✓ Pair allowed (not blocked)
   ✓ Risk limits OK (daily loss, max trades, etc)
   
4. RISK CALCULATION
   ↓
   Get user risk profile:
   → Account balance
   → Risk percentage per trade
   → Calculate position size
   → Validate against max position size
   
5. APPLY USER SETTINGS
   ↓
   Check user_signal_settings for custom TP/SL
   → Use custom if exists, else use signal defaults
   → Apply trailing settings if enabled
   
6. EXECUTE TRADE
   ↓
   Check account type:
   
   FOREX/COMMODITY (MetaAPI):
   → Connect to MetaAPI account
   → Place market order
   → Set TP/SL
   → Get order_id
   
   CRYPTO (Binance/Bybit):
   → Connect to exchange API
   → Place market order
   → Set TP/SL (via OCO orders or manual)
   → Get order_id
   
7. LOG EXECUTION
   ↓
   Insert to trade_executions:
   → All trade details
   → Status: OPEN
   → Monitor position
   
8. MONITOR & MANAGE
   ↓
   Background monitoring service:
   → Check position status
   → Apply trailing stops (if enabled)
   → Partial close at TP1, TP2, TP3
   → Update trade_executions
   → Update admin_analytics
   
9. TRADE CLOSE
   ↓
   Trade closed (TP/SL hit, manual, trailing)
   → Update trade_executions status: CLOSED
   → Calculate P&L
   → Update user analytics
   → Update admin analytics
   → Notify user (optional)
```

---

## 🛠️ Implementation Plan (Detailed)

### **Week 1: Foundation & Database**

#### Day 1-2: Database Setup
- [ ] Create migration file dengan semua tables baru
- [ ] Setup RLS policies
- [ ] Create database functions untuk:
  - Calculate position size
  - Update analytics
  - Risk validation
- [ ] Seed default signal providers
- [ ] Test queries & indexes

#### Day 3-4: Admin Signal Push UI
- [ ] Create admin page untuk push signals
- [ ] Form untuk create signal (pair, direction, entry, TP, SL)
- [ ] Select signal provider
- [ ] Validation & error handling
- [ ] List all signals (admin view)
- [ ] Edit/delete signals

#### Day 5: User Signal Dashboard
- [ ] Signal list page (filter, search)
- [ ] Real-time signal updates (Supabase Realtime)
- [ ] Signal detail modal
- [ ] Signal card component

### **Week 2: User Settings & Configuration**

#### Day 1-2: User Signal Settings UI
- [ ] Page untuk customize signal settings
- [ ] Per-signal customization (TP/SL/RR)
- [ ] Bulk customization (apply to all)
- [ ] Trailing settings UI

#### Day 3-4: Auto-Trade Configuration UI
- [ ] Connect MetaAPI account page
- [ ] Connect Exchange API page (Binance/Bybit)
- [ ] Auto-trade settings page:
  - Enable/disable auto-trade
  - Select signal providers
  - Risk management settings
  - Trading rules
- [ ] Account connection wizard

#### Day 5: Risk Management Service
- [ ] Risk calculator service
- [ ] Position sizing calculator
- [ ] Risk validation service
- [ ] Daily limits checker

### **Week 3: Execution Engine**

#### Day 1-2: MetaAPI Integration
- [ ] MetaAPI service setup
- [ ] Account connection & deployment
- [ ] Order placement service
- [ ] Position monitoring service
- [ ] Error handling & retry logic

#### Day 3-4: Exchange API Integration
- [ ] Binance service
- [ ] Bybit service
- [ ] Unified exchange interface
- [ ] Order placement
- [ ] Position monitoring

#### Day 5: Execution Orchestrator
- [ ] Background job service (Supabase Edge Function atau separate)
- [ ] Signal listener
- [ ] Auto-execution logic
- [ ] Queue system untuk trades
- [ ] Error handling & logging

### **Week 4: Trailing & Monitoring**

#### Day 1-2: Trailing Stop Service
- [ ] Price monitoring service
- [ ] Trailing stop calculator (fixed pips, percentage)
- [ ] ATR-based trailing (basic)
- [ ] Stop loss adjustment logic

#### Day 3-4: Trade Monitoring & Management
- [ ] Position monitor service
- [ ] Partial close service (TP1, TP2, TP3)
- [ ] Trade status updates
- [ ] Auto-close at TP/SL

#### Day 5: Testing & Bug Fixes
- [ ] Integration testing
- [ ] Paper trading mode (optional)
- [ ] Bug fixes
- [ ] Error scenarios handling

### **Week 5: Analytics & Polish**

#### Day 1-2: User Analytics
- [ ] Trading journal page
- [ ] Performance charts
- [ ] Statistics dashboard
- [ ] Export functionality

#### Day 3-4: Super Admin Dashboard
- [ ] Aggregate analytics page
- [ ] User performance overview
- [ ] Signal provider performance
- [ ] Charts & visualizations

#### Day 5: Final Testing & Deploy
- [ ] End-to-end testing
- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deploy to production

---

## 🏗️ Technical Architecture

### **Services Structure**

```
/services
  /telegram
    - bot-service.ts (future - Phase 2)
    
  /signals
    - signal-service.ts (CRUD operations)
    - signal-broadcaster.ts (real-time updates)
    
  /execution
    - execution-orchestrator.ts (main execution logic)
    - metaapi-service.ts (MetaAPI integration)
    - binance-service.ts (Binance integration)
    - bybit-service.ts (Bybit integration)
    - position-monitor.ts (monitor open positions)
    
  /risk
    - risk-calculator.ts (position sizing)
    - risk-validator.ts (pre-trade checks)
    - daily-limits.ts (daily loss/trade limits)
    
  /trailing
    - trailing-service.ts (trailing stop logic)
    - price-monitor.ts (price tracking)
    
  /analytics
    - analytics-aggregator.ts (calculate stats)
    - admin-analytics.ts (admin-specific analytics)
```

### **Background Jobs**

**Option 1: Supabase Edge Functions + Cron**
```javascript
// supabase/functions/auto-trade-executor/index.ts
// Triggered by Supabase Cron or Database Trigger
```

**Option 2: Separate Node.js Service**
```javascript
// services/worker/index.ts
// Running separately, connects to Supabase
// Uses Bull/BullMQ for job queue
```

**Option 3: Vercel Cron Jobs + API Routes**
```javascript
// app/api/cron/auto-trade/route.ts
// Triggered by Vercel Cron
```

**Recommendation**: Start with Option 1 (Supabase Edge Functions) untuk simplicity, bisa migrate ke Option 2 jika butuh lebih complex queue management.

---

## 🔒 Safety Features (Critical for Auto-Trade)

### **Pre-Trade Checks**
1. ✅ Account balance sufficient
2. ✅ Risk percentage within limits
3. ✅ Daily loss limit not exceeded
4. ✅ Max trades per day not exceeded
5. ✅ Max open positions not exceeded
6. ✅ Pair allowed (not in blocked list)
7. ✅ Signal provider enabled
8. ✅ Auto-trade enabled for user
9. ✅ Account connection valid

### **Trade Execution Safety**
1. ✅ Position size validation
2. ✅ Stop loss always set (mandatory)
3. ✅ Take profit validation
4. ✅ Leverage limits (if applicable)
5. ✅ Margin check before execution

### **Post-Trade Monitoring**
1. ✅ Real-time position monitoring
2. ✅ Automatic stop loss adjustment (trailing)
3. ✅ Partial profit taking
4. ✅ Emergency close (if daily loss limit hit)
5. ✅ Connection failure handling

### **Error Handling**
1. ✅ Retry logic for API failures
2. ✅ Queue failed trades for retry
3. ✅ Alert user on execution failure
4. ✅ Log all errors for debugging
5. ✅ Fallback mechanisms

---

## 📱 UI Pages Needed

### **Admin Pages**
1. `/admin/signals/push` - Push new signal
2. `/admin/signals/list` - List all signals
3. `/admin/signals/[id]/edit` - Edit signal
4. `/admin/analytics` - Analytics dashboard (enhanced)
5. `/admin/users/[id]/trades` - View user trades

### **User Pages**
1. `/signals` - Signal dashboard (already exists, enhance)
2. `/signals/[id]/settings` - Customize signal settings
3. `/settings/auto-trade` - Auto-trade configuration
4. `/settings/accounts` - Connect trading accounts (already exists, enhance)
5. `/trades` - Trading journal (enhance existing)
6. `/trades/[id]` - Trade details
7. `/analytics` - Performance analytics

---

## 🚨 Critical Considerations

### **1. Testing Strategy**
- **Paper Trading Mode**: Highly recommended untuk testing
- **Test Accounts**: Use demo accounts for MetaAPI & Exchanges
- **Gradual Rollout**: Start with limited users, monitor closely

### **2. User Education**
- Clear documentation
- Tutorial videos
- Risk warnings
- Default conservative settings

### **3. Monitoring & Alerts**
- Real-time monitoring dashboard
- Alerts for system errors
- Alerts for unusual trading activity
- Performance metrics tracking

### **4. Backup & Recovery**
- Database backups
- Trade execution logs
- Recovery procedures

---

## 📈 Success Metrics

### **Technical Metrics**
- Signal delivery time < 1 second
- Trade execution time < 2 seconds
- System uptime > 99.9%
- API error rate < 1%

### **Business Metrics**
- User adoption rate
- Auto-trade activation rate
- Average trades per user
- Win rate improvement
- User retention

---

## ✅ Next Immediate Actions

1. **Create Database Migration**
   - All new tables
   - RLS policies
   - Indexes
   - Functions

2. **Admin Signal Push UI**
   - Create signal form
   - Signal list
   - Real-time updates

3. **MetaAPI Integration**
   - Setup SDK
   - Test connection
   - Test order placement

4. **Execution Engine MVP**
   - Basic auto-execution
   - Risk checks
   - Position logging

---

**Ready to start implementation?** Let me know which part you want to tackle first! 🚀

