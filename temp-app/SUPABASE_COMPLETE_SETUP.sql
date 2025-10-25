-- ============================================
-- COMPLETE SUPABASE SETUP FOR SUI GENERIS
-- Run these SQL commands in order
-- ============================================

-- STEP 1: Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 2: Enable Row Level Security on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- STEP 3: Create RLS policies for users table (drop if exists first)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE is_admin = TRUE
    )
  );

-- STEP 4: Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- STEP 5: Update loan_applications table to add document URL columns
ALTER TABLE public.loan_applications 
ADD COLUMN IF NOT EXISTS national_id_document_url TEXT,
ADD COLUMN IF NOT EXISTS payslip_document_url TEXT,
ADD COLUMN IF NOT EXISTS bank_statement_document_url TEXT,
ADD COLUMN IF NOT EXISTS proof_of_residence_document_url TEXT,
ADD COLUMN IF NOT EXISTS loan_term INTEGER DEFAULT 6;

-- STEP 6: Storage policies for loan-documents bucket
-- (Make sure you've created the 'loan-documents' bucket first in Storage UI)

-- Allow authenticated users to upload their own documents
DROP POLICY IF EXISTS "Users can upload their documents" ON storage.objects;
CREATE POLICY "Users can upload their documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'loan-documents');

-- Allow users to view their own documents
DROP POLICY IF EXISTS "Users can view their documents" ON storage.objects;
CREATE POLICY "Users can view their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'loan-documents');

-- Allow admins to view all documents
DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'loan-documents' AND
  auth.uid() IN (
    SELECT id FROM public.users WHERE is_admin = TRUE
  )
);

-- Allow admins to delete documents
DROP POLICY IF EXISTS "Admins can delete documents" ON storage.objects;
CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'loan-documents' AND
  auth.uid() IN (
    SELECT id FROM public.users WHERE is_admin = TRUE
  )
);

-- STEP 7: Make yourself an admin (REPLACE WITH YOUR EMAIL)
-- After you create your account, run this:
-- UPDATE public.users 
-- SET is_admin = TRUE 
-- WHERE email = 'your-email@example.com';

-- ============================================
-- SETUP COMPLETE!
-- ============================================
