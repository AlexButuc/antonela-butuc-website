import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  return stripeClient;
}

export const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID || '',
    name: 'Monthly Premium',
    price: 9,
    interval: 'month' as const,
  },
  annual: {
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID || '',
    name: 'Annual Premium',
    price: 89,
    interval: 'year' as const,
  },
};

export async function createStripeCustomer(email: string, userId: string) {
  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabaseUserId: userId,
    },
  });
  return customer;
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  return session;
}

export async function getSubscription(subscriptionId: string) {
  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function cancelSubscription(subscriptionId: string) {
  const stripe = getStripe();
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  return subscription;
}

export async function reactivateSubscription(subscriptionId: string) {
  const stripe = getStripe();
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
  return subscription;
}
