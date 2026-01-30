-- Loan Applications Table for Civil Servants 0% Deposit Financing
-- Run this in your Supabase SQL Editor

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Personal Information
    full_name VARCHAR(255) NOT NULL,
    national_id VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    email VARCHAR(255),
    phone VARCHAR(50),
    home_address TEXT,
    
    -- Employment Information
    employer VARCHAR(255),
    job_title VARCHAR(255),
    employment_status VARCHAR(50),
    payroll_number VARCHAR(100),
    years_of_service INTEGER,
    
    -- Financial Information
    gross_salary DECIMAL(12, 2) DEFAULT 0,
    net_salary DECIMAL(12, 2) DEFAULT 0,
    bank_name VARCHAR(255),
    account_number VARCHAR(100),
    
    -- Product Information
    product_id INTEGER,
    product_name VARCHAR(255),
    product_price DECIMAL(12, 2) DEFAULT 0,
    loan_term INTEGER DEFAULT 6,
    
    -- Document URLs
    national_id_document_url TEXT,
    payslip_document_url TEXT,
    proof_of_residence_document_url TEXT,
    
    -- Consent
    data_sharing_consent BOOLEAN DEFAULT false,
    
    -- Application Status
    status VARCHAR(50) DEFAULT 'pending',
    admin_notes TEXT,
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP,
    
    -- NEW: Microfinance Tracking Fields for Civil Servants 0% Deposit
    microfinance_company VARCHAR(100), -- 'Golden Knot' or 'CashIt'
    application_stage VARCHAR(50) DEFAULT 'inquiry', -- inquiry, documents_pending, documents_received, submitted_to_mfi, under_review, approved, rejected, disbursed, completed
    source VARCHAR(50) DEFAULT 'online', -- 'online' or 'admin' (manual entry)
    
    -- Date Tracking
    inquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    documents_submitted_date TIMESTAMP,
    mfi_submission_date TIMESTAMP,
    approval_date TIMESTAMP,
    disbursement_date TIMESTAMP,
    
    -- Notes and Audit
    notes TEXT,
    created_by VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_stage ON loan_applications(application_stage);
CREATE INDEX IF NOT EXISTS idx_loan_applications_mfi ON loan_applications(microfinance_company);
CREATE INDEX IF NOT EXISTS idx_loan_applications_source ON loan_applications(source);
CREATE INDEX IF NOT EXISTS idx_loan_applications_created_at ON loan_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_loan_applications_email ON loan_applications(email);
CREATE INDEX IF NOT EXISTS idx_loan_applications_phone ON loan_applications(phone);

-- Enable Row Level Security
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow service role full access (for API)
CREATE POLICY "Service role has full access to loan_applications"
ON loan_applications
FOR ALL
USING (true)
WITH CHECK (true);

-- RLS Policy: Allow authenticated users to view their own applications
CREATE POLICY "Users can view own loan applications"
ON loan_applications
FOR SELECT
USING (auth.jwt() ->> 'email' = email);

-- RLS Policy: Allow authenticated users to create applications
CREATE POLICY "Users can create loan applications"
ON loan_applications
FOR INSERT
WITH CHECK (true);

-- Success message
SELECT 'Loan applications table created successfully!' as message;

-- If the table already exists but is missing columns, run these ALTER statements:
-- (These will add columns if they don't exist)

DO $$ 
BEGIN
    -- Add microfinance_company if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'microfinance_company') THEN
        ALTER TABLE loan_applications ADD COLUMN microfinance_company VARCHAR(100);
    END IF;
    
    -- Add application_stage if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'application_stage') THEN
        ALTER TABLE loan_applications ADD COLUMN application_stage VARCHAR(50) DEFAULT 'inquiry';
    END IF;
    
    -- Add source if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'source') THEN
        ALTER TABLE loan_applications ADD COLUMN source VARCHAR(50) DEFAULT 'online';
    END IF;
    
    -- Add inquiry_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'inquiry_date') THEN
        ALTER TABLE loan_applications ADD COLUMN inquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;
    
    -- Add documents_submitted_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'documents_submitted_date') THEN
        ALTER TABLE loan_applications ADD COLUMN documents_submitted_date TIMESTAMP;
    END IF;
    
    -- Add mfi_submission_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'mfi_submission_date') THEN
        ALTER TABLE loan_applications ADD COLUMN mfi_submission_date TIMESTAMP;
    END IF;
    
    -- Add approval_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'approval_date') THEN
        ALTER TABLE loan_applications ADD COLUMN approval_date TIMESTAMP;
    END IF;
    
    -- Add disbursement_date if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'disbursement_date') THEN
        ALTER TABLE loan_applications ADD COLUMN disbursement_date TIMESTAMP;
    END IF;
    
    -- Add notes if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'notes') THEN
        ALTER TABLE loan_applications ADD COLUMN notes TEXT;
    END IF;
    
    -- Add created_by if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'created_by') THEN
        ALTER TABLE loan_applications ADD COLUMN created_by VARCHAR(255);
    END IF;
END $$;

-- Fix NOT NULL constraints for optional fields (run this if you get constraint errors)
ALTER TABLE loan_applications ALTER COLUMN date_of_birth DROP NOT NULL;
ALTER TABLE loan_applications ALTER COLUMN gender DROP NOT NULL;
ALTER TABLE loan_applications ALTER COLUMN email DROP NOT NULL;

-- Verify the table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'loan_applications' 
ORDER BY ordinal_position;
