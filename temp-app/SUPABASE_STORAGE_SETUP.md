# Supabase Storage Setup for Loan Applications

## Step 1: Create Storage Bucket

Go to Supabase Dashboard → Storage → Create a new bucket:

**Bucket Name:** `loan-documents`

**Settings:**
- Public bucket: NO (Private)
- File size limit: 5MB
- Allowed MIME types: 
  - `application/pdf`
  - `image/jpeg`
  - `image/jpg`
  - `image/png`

## Step 2: Set Storage Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload their documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'loan-documents');

-- Allow users to view their own documents
CREATE POLICY "Users can view their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'loan-documents');

-- Allow admins to view all documents
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
CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'loan-documents' AND
  auth.uid() IN (
    SELECT id FROM public.users WHERE is_admin = TRUE
  )
);
```

## Step 3: Update Loan Applications Table

Add columns for document URLs:

```sql
ALTER TABLE public.loan_applications 
ADD COLUMN IF NOT EXISTS national_id_document_url TEXT,
ADD COLUMN IF NOT EXISTS payslip_document_url TEXT,
ADD COLUMN IF NOT EXISTS bank_statement_document_url TEXT,
ADD COLUMN IF NOT EXISTS proof_of_residence_document_url TEXT;
```

## Done!

Your file upload system is now ready.
