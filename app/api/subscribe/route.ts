import { getStripe, PLANS, createCheckoutSession } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { plan } = body as { plan: 'monthly' | 'annual' };

    const planConfig = PLANS[plan];
    if (!planConfig || !planConfig.priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let customerId = (profile as any)?.stripe_customer_id;

    const stripe = getStripe();

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          supabaseUserId: session.user.id,
        },
      });
      customerId = customer.id;

      // Update profile with customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId } as never)
        .eq('id', session.user.id);
    }

    // Create checkout session
    const checkoutSession = await createCheckoutSession(
      customerId,
      planConfig.priceId,
      `${process.env.NEXT_PUBLIC_APP_URL}/app/premium?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL}/app/premium?canceled=true`
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
