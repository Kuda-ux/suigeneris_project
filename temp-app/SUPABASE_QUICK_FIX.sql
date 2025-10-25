-- ============================================
-- QUICK FIX: Only add missing is_admin column and storage policies
-- Run this if you already have users table and policies
-- ============================================

-- Add is_admin column if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- Update loan_applications table to add document URL columns
ALTER TABLE public.loan_applications 
ADD COLUMN IF NOT EXISTS national_id_document_url TEXT,
ADD COLUMN IF NOT EXISTS payslip_document_url TEXT,
ADD COLUMN IF NOT EXISTS bank_statement_document_url TEXT,
ADD COLUMN IF NOT EXISTS proof_of_residence_document_url TEXT,
ADD COLUMN IF NOT EXISTS loan_term INTEGER DEFAULT 6;

-- Storage policies for loan-documents bucket
-- (Make sure you've created the 'loan-documents' bucket first in Storage UI)

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Users can upload their documents" ON storage.objects;
CREATE POLICY "Users can upload their documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'loan-documents');

DROP POLICY IF EXISTS "Users can view their documents" ON storage.objects;
CREATE POLICY "Users can view their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'loan-documents');

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

-- ============================================
-- DONE! Now make yourself admin:
-- UPDATE public.users 
-- SET is_admin = TRUE 
-- WHERE email = 'your-email@example.com';
-- ============================================
