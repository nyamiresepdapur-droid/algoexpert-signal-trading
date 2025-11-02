import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          telegram_username: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          telegram_username?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          full_name?: string | null;
          telegram_username?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: 'basic' | 'pro' | 'vip';
          status: 'active' | 'cancelled' | 'expired' | 'trial';
          billing_cycle: 'monthly' | 'yearly';
          current_period_start: string;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          trial_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      trading_accounts: {
        Row: {
          id: string;
          user_id: string;
          account_type: 'metaapi' | 'binance' | 'bybit';
          account_name: string;
          account_id: string;
          is_active: boolean;
          is_verified: boolean;
          account_info: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
