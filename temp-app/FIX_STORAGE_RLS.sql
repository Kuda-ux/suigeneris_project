-- ============================================
-- FIX STORAGE RLS FOR LOAN DOCUMENTS
-- Error: "new row violates row-level security policy"
-- This happens when uploading files to loan-documents bucket
-- ============================================

-- STEP 1: Check if loan-documents bucket exists
SELECT 
    id,
    name,
    public,
    created_at
FROM storage.buckets
WHERE name = 'loan-documents';

-- STEP 2: If bucket doesn't exist, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-documents', 'loan-documents', true)
ON CONFLICT (id) DO NOTHING;

-- STEP 3: Drop all existing policies on loan-documents bucket
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated downloads" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload loan documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view loan documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload loan documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view loan documents" ON storage.objects;

-- STEP 4: Create simple policies for loan-documents bucket
-- Allow anyone to upload files
CREATE POLICY "loan_documents_insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'loan-documents');

-- Allow anyone to view/download files
CREATE POLICY "loan_documents_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'loan-documents');

-- Allow anyone to update files
CREATE POLICY "loan_documents_update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'loan-documents')
WITH CHECK (bucket_id = 'loan-documents');

-- Allow anyone to delete files (admins might need this)
CREATE POLICY "loan_documents_delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'loan-documents');

-- STEP 5: Verify policies are created
SELECT 
    policyname,
    cmd,
    CASE 
        WHEN cmd = 'INSERT' THEN '✅ Upload allowed'
        WHEN cmd = 'SELECT' THEN '✅ Download allowed'
        WHEN cmd = 'UPDATE' THEN '✅ Update allowed'
        WHEN cmd = 'DELETE' THEN '✅ Delete allowed'
    END as description
FROM pg_policies
WHERE tablename = 'objects'
AND policyname LIKE 'loan_documents%';

-- STEP 6: Make bucket public (so files can be accessed via URL)
UPDATE storage.buckets
SET public = true
WHERE name = 'loan-documents';

-- STEP 7: Verify bucket is public
SELECT 
    name,
    public,
    CASE 
        WHEN public = true THEN '✅ Bucket is PUBLIC'
        ELSE '❌ Bucket is PRIVATE'
    END as status
FROM storage.buckets
WHERE name = 'loan-documents';

-- ============================================
-- DONE! File uploads should work now
-- ============================================

-- EXPECTED RESULTS:
-- - Bucket exists
-- - Bucket is public
-- - 4 policies created (INSERT, SELECT, UPDATE, DELETE)
