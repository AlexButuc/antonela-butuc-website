import Stripe from 'stripe';
import { getStripe, PLANS } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const { data: { object } } = event;

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        if ('deleted' in customer) break;

        const userId = customer.metadata.supabaseUserId;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Update profile and create subscription record
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_subscription_id: subscriptionId,
          } as never)
          .eq('id', userId);

        await supabaseAdmin.from('subscriptions').insert({
          user_id: userId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: subscription.items.data[0].price.id,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        } as never);

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        if ('deleted' in customer) break;

        const userId = customer.metadata.supabaseUserId;

        // Update subscription status
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: subscription.status === 'active' ? 'active' : 'canceled',
          } as never)
          .eq('id', userId);

        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          } as never)
          .eq('stripe_subscription_id', subscription.id);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        if ('deleted' in customer) break;

        const userId = customer.metadata.supabaseUserId;

        // Update subscription status
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            stripe_subscription_id: null,
          } as never)
          .eq('id', userId);

        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'canceled',
          } as never)
          .eq('stripe_subscription_id', subscription.id);

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
