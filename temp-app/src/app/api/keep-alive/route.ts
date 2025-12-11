import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// This endpoint keeps the Supabase database active by making a simple query
// Call this endpoint at least once a week to prevent project pausing

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Simple query to keep database active
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Keep-alive query failed:', error);
      return NextResponse.json({ 
        status: 'error', 
        message: error.message,
        timestamp: new Date().toISOString() 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'alive', 
      message: 'Database is active',
      timestamp: new Date().toISOString(),
      productCount: data?.length || 0
    });

  } catch (error) {
    console.error('Keep-alive error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to ping database',
      timestamp: new Date().toISOString() 
    }, { status: 500 });
  }
}
