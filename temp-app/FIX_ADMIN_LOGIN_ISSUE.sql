-- Fix Admin Login Issue
-- Run this in Supabase SQL Editor

-- 1. Check if the user exists and their admin status
SELECT 
    id,
    email,
    full_name,
    is_admin,
    role,
    created_at
FROM users
WHERE id = '2501e05a-2f3d-4b33-add0-3fe2be379bc2';

-- 2. If user exists but is_admin is false, update it to true
UPDATE users
SET 
    is_admin = true,
    role = 'admin',
    updated_at = NOW()
WHERE id = '2501e05a-2f3d-4b33-add0-3fe2be379bc2';

-- 3. Verify the update
SELECT 
    id,
    email,
    full_name,
    is_admin,
    role,
    updated_at
FROM users
WHERE id = '2501e05a-2f3d-4b33-add0-3fe2be379bc2';

-- 4. Check RLS policies on users table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'users';

-- 5. If RLS is blocking reads, temporarily disable it or add a policy
-- Option A: Disable RLS (not recommended for production)
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Option B: Add a policy to allow authenticated users to read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 6. Add policy to allow service role full access
DROP POLICY IF EXISTS "Service role has full access" ON users;
CREATE POLICY "Service role has full access"
ON users FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 7. Verify policies were created
SELECT 
    policyname,
    cmd,
    roles
FROM pg_policies
WHERE tablename = 'users';
