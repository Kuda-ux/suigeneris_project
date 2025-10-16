-- Civil Servant Loan Applications Table
-- Run this in Supabase SQL Editor

DROP TABLE IF EXISTS loan_applications CASCADE;

CREATE TABLE loan_applications (
  id SERIAL PRIMARY KEY,
  application_number TEXT UNIQUE NOT NULL,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  national_id TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  home_address TEXT NOT NULL,
  
  -- Employment Information
  employer TEXT NOT NULL,
  job_title TEXT NOT NULL,
  employment_status TEXT NOT NULL,
  payroll_number TEXT NOT NULL,
  gross_salary DECIMAL(10, 2) NOT NULL,
  net_salary DECIMAL(10, 2) NOT NULL,
  
  -- Banking Information
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  
  -- Document Uploads (URLs)
  national_id_document TEXT,
  payslip_document TEXT,
  bank_statement_document TEXT,
  proof_of_residence_document TEXT,
  
  -- Consent
  data_sharing_consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
CREATE INDEX idx_loan_applications_created_at ON loan_applications(created_at DESC);
CREATE INDEX idx_loan_applications_national_id ON loan_applications(national_id);
CREATE INDEX idx_loan_applications_email ON loan_applications(email);

-- Enable RLS
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable read access for all users" ON loan_applications
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON loan_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON loan_applications
  FOR UPDATE USING (true);
