-- Initial schema for Hormonal Pattern Tracker

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  cycle_length INT DEFAULT 28,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_status TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT
);

-- Daily logs table
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL,
  
  -- Core metrics (1-10 scale)
  energy_level INT CHECK (energy_level BETWEEN 1 AND 10),
  sleep_quality INT CHECK (sleep_quality BETWEEN 1 AND 10),
  stress_level INT CHECK (stress_level BETWEEN 1 AND 10),
  
  -- Categorical
  mood TEXT[],
  physical_symptoms TEXT[],
  cravings TEXT[],
  sleep_hours DECIMAL(3,1),
  
  -- Cycle tracking (optional)
  cycle_phase TEXT CHECK (cycle_phase IN ('menstrual', 'follicular', 'ovulation', 'luteal', 'unknown')),
  cycle_day INT,
  
  -- Free text
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, log_date)
);

-- Pattern insights table
CREATE TABLE IF NOT EXISTS pattern_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  insight_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  insight_data JSONB,
  confidence_score DECIMAL(3,2),
  is_premium BOOLEAN DEFAULT FALSE,
  valid_from DATE,
  valid_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EFT audio library
CREATE TABLE IF NOT EXISTS eft_audios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration_seconds INT,
  target_symptoms TEXT[],
  target_phases TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date ON daily_logs(user_id, log_date DESC);
CREATE INDEX IF NOT EXISTS idx_pattern_insights_user ON pattern_insights(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_logs_symptoms ON daily_logs USING GIN(physical_symptoms);
CREATE INDEX IF NOT EXISTS idx_daily_logs_mood ON daily_logs USING GIN(mood);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pattern_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policies for daily_logs
CREATE POLICY "Users can view own logs"
  ON daily_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs"
  ON daily_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own logs"
  ON daily_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs"
  ON daily_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for pattern_insights
CREATE POLICY "Users can view own insights"
  ON pattern_insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights"
  ON pattern_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies for subscriptions
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'display_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_daily_logs_updated_at ON daily_logs;
CREATE TRIGGER update_daily_logs_updated_at
  BEFORE UPDATE ON daily_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
