import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', session.user.id)
    .order('log_date', { ascending: false })
    .limit(60);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ logs: data });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logData: any = {
    user_id: session.user.id,
    log_date: body.log_date,
    energy_level: body.energy_level,
    sleep_quality: body.sleep_quality,
    stress_level: body.stress_level,
    sleep_hours: body.sleep_hours,
    mood: body.mood || [],
    physical_symptoms: body.physical_symptoms || [],
    cravings: body.cravings || [],
    cycle_phase: body.cycle_phase,
    notes: body.notes || null,
  };

  const { data, error } = await supabase
    .from('daily_logs')
    .upsert(logData, { onConflict: 'user_id,log_date' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ log: data });
}
