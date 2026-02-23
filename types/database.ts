export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          cycle_length: number;
          created_at: string;
          updated_at: string;
          subscription_status: 'free' | 'active' | 'canceled' | 'past_due';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
        };
        Insert: {
          id: string;
          email?: string;
          display_name?: string | null;
          cycle_length?: number;
          created_at?: string;
          updated_at?: string;
          subscription_status?: 'free' | 'active' | 'canceled' | 'past_due';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          cycle_length?: number;
          created_at?: string;
          updated_at?: string;
          subscription_status?: 'free' | 'active' | 'canceled' | 'past_due';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
      };
      daily_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          energy_level: number | null;
          sleep_quality: number | null;
          stress_level: number | null;
          mood: string[];
          physical_symptoms: string[];
          cravings: string[];
          sleep_hours: number | null;
          cycle_phase: string | null;
          cycle_day: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          energy_level?: number | null;
          sleep_quality?: number | null;
          stress_level?: number | null;
          mood?: string[];
          physical_symptoms?: string[];
          cravings?: string[];
          sleep_hours?: number | null;
          cycle_phase?: string | null;
          cycle_day?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          energy_level?: number | null;
          sleep_quality?: number | null;
          stress_level?: number | null;
          mood?: string[];
          physical_symptoms?: string[];
          cravings?: string[];
          sleep_hours?: number | null;
          cycle_phase?: string | null;
          cycle_day?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pattern_insights: {
        Row: {
          id: string;
          user_id: string;
          insight_type: string;
          title: string;
          description: string;
          insight_data: Json | null;
          confidence_score: number;
          is_premium: boolean;
          valid_from: string | null;
          valid_to: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          insight_type: string;
          title: string;
          description: string;
          insight_data?: Json | null;
          confidence_score?: number;
          is_premium?: boolean;
          valid_from?: string | null;
          valid_to?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          insight_type?: string;
          title?: string;
          description?: string;
          insight_data?: Json | null;
          confidence_score?: number;
          is_premium?: boolean;
          valid_from?: string | null;
          valid_to?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_price_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_price_id: string;
          status?: string;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string;
          stripe_price_id?: string;
          status?: string;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
