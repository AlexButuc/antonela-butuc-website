export * from './log';

export interface User {
  id: string;
  email: string;
  display_name?: string;
  subscription_status: 'free' | 'active' | 'canceled' | 'past_due';
}
