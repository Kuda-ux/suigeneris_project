-- ============================================
-- VERIFY STORAGE SETUP
-- Check if everything is configured correctly
-- ============================================

-- STEP 1: Check if loan-documents bucket exists
SELECT 
    id,
    name,
    public,
    CASE 
        WHEN public = true THEN '✅ Bucket is PUBLIC'
        ELSE '❌ Bucket is PRIVATE - Make it public!'
    END as status
FROM storage.buckets
WHERE name = 'loan-documents';

-- STEP 2: If bucket is not public, make it public
UPDATE storage.buckets
SET public = true
WHERE name = 'loan-documents';

-- STEP 3: Check existing policies
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
AND policyname LIKE 'loan_documents%'
ORDER BY cmd;

-- STEP 4: Verify bucket is public (final check)
SELECT 
    name,
    public,
    created_at,
    CASE 
        WHEN public = true THEN '✅ READY FOR FILE UPLOADS'
        ELSE '❌ NEEDS TO BE PUBLIC'
    END as final_status
FROM storage.buckets
WHERE name = 'loan-documents';

-- ============================================
-- EXPECTED RESULTS:
-- - Bucket exists
-- - Bucket is public
-- - 4 policies exist (INSERT, SELECT, UPDATE, DELETE)
-- ============================================

-- If you see all ✅ then everything is working!
-- If bucket doesn't exist, run this:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('loan-documents', 'loan-documents', true)
-- ON CONFLICT (id) DO UPDATE SET public = true;
