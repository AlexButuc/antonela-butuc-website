export interface DailyLog {
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
  cycle_phase: CyclePhase | null;
  cycle_day: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown';

export interface PatternInsight {
  id: string;
  user_id: string;
  insight_type: InsightType;
  title: string;
  description: string;
  insight_data: Record<string, unknown> | null;
  confidence_score: number;
  is_premium: boolean;
  valid_from: string | null;
  valid_to: string | null;
  created_at: string;
}

export type InsightType = 'correlation' | 'trend' | 'phase_pattern' | 'recommendation';

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  cycle_length: number;
  created_at: string;
  subscription_status: 'free' | 'active' | 'canceled' | 'past_due';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface EFTAudio {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration_seconds: number;
  target_symptoms: string[];
  target_phases: CyclePhase[];
  is_active: boolean;
  created_at: string;
}

export interface LogFormData {
  log_date: string;
  energy_level: number;
  sleep_quality: number;
  stress_level: number;
  mood: string[];
  physical_symptoms: string[];
  cravings: string[];
  sleep_hours: number;
  cycle_phase: CyclePhase;
  notes: string;
}

export const MOOD_OPTIONS = [
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'irritable', label: 'Irritable', emoji: '😤' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'focused', label: 'Focused', emoji: '🎯' }
] as const;

export const SYMPTOM_OPTIONS = [
  { value: 'bloating', label: 'Bloating' },
  { value: 'brain_fog', label: 'Brain Fog' },
  { value: 'headache', label: 'Headache' },
  { value: 'night_sweats', label: 'Night Sweats' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'cramps', label: 'Cramps' },
  { value: 'breast_tenderness', label: 'Breast Tenderness' },
  { value: 'joint_pain', label: 'Joint Pain' },
  { value: 'hot_flashes', label: 'Hot Flashes' },
  { value: 'insomnia', label: 'Insomnia' }
] as const;

export const CRAVING_OPTIONS = [
  { value: 'sugar', label: 'Sugar/Sweets' },
  { value: 'carbs', label: 'Carbs/Bread' },
  { value: 'salt', label: 'Salty Foods' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'none', label: 'No Cravings' }
] as const;

export const CYCLE_PHASES = [
  { value: 'menstrual', label: 'Menstrual (Days 1-5)', description: 'Your period' },
  { value: 'follicular', label: 'Follicular (Days 6-14)', description: 'Energy building' },
  { value: 'ovulation', label: 'Ovulation (Days 15-17)', description: 'Peak energy' },
  { value: 'luteal', label: 'Luteal (Days 18-28)', description: 'Pre-menstrual' },
  { value: 'unknown', label: 'Not Sure', description: 'Skip this field' }
] as const;
