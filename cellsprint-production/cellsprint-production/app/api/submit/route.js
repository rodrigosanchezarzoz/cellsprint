import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { challengeDate, challengeId = 'daily', elapsedSeconds, formulasCount = 3, playerId } = body;

    if (!challengeDate || typeof elapsedSeconds !== 'number' || elapsedSeconds < 1) {
      return NextResponse.json({ error: 'Invalid submission payload' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ status: 'saved_locally_only' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('submissions').insert({
      challenge_date: challengeDate,
      challenge_id: challengeId,
      elapsed_seconds: elapsedSeconds,
      formulas_count: formulasCount,
      anonymous_player_id: playerId || null
    });

    const { data: stats } = await supabase
      .from('daily_live_stats')
      .select('*')
      .eq('challenge_date', challengeDate)
      .eq('challenge_id', challengeId)
      .single();

    return NextResponse.json({ status: 'ok', liveStats: stats });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
