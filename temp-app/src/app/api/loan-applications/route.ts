import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = supabase
      .from('loan_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Error fetching loan applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const applicationData = await request.json();

    console.log('Creating loan application:', applicationData);

    // Generate application number
    const applicationNumber = `LA-${Date.now().toString().slice(-8)}`;

    // Create application record
    const { data: newApplication, error } = await supabase
      .from('loan_applications')
      .insert({
        application_number: applicationNumber,
        full_name: applicationData.full_name,
        national_id: applicationData.national_id,
        date_of_birth: applicationData.date_of_birth,
        gender: applicationData.gender,
        email: applicationData.email,
        phone: applicationData.phone,
        home_address: applicationData.home_address,
        employer: applicationData.employer,
        job_title: applicationData.job_title,
        employment_status: applicationData.employment_status,
        payroll_number: applicationData.payroll_number,
        gross_salary: parseFloat(applicationData.gross_salary),
        net_salary: parseFloat(applicationData.net_salary),
        bank_name: applicationData.bank_name,
        account_number: applicationData.account_number,
        product_id: applicationData.product_id ? parseInt(applicationData.product_id) : null,
        product_name: applicationData.product_name,
        product_price: parseFloat(applicationData.product_price),
        national_id_document: applicationData.national_id_document,
        payslip_document: applicationData.payslip_document,
        bank_statement_document: applicationData.bank_statement_document,
        proof_of_residence_document: applicationData.proof_of_residence_document,
        data_sharing_consent: applicationData.data_sharing_consent,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating application:', error);
      throw error;
    }

    console.log('Application created successfully:', newApplication);

    // TODO: Send email notification
    // await sendApplicationConfirmationEmail(applicationData.email, applicationNumber);

    return NextResponse.json(newApplication);
  } catch (error: any) {
    console.error('Error creating loan application:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { id, status, admin_notes, reviewed_by } = await request.json();

    const { data, error } = await supabase
      .from('loan_applications')
      .update({
        status,
        admin_notes,
        reviewed_by,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating loan application:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
