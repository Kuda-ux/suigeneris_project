-- URGENT FIX: Admin Loading Issue
-- Run this ENTIRE script in Supabase SQL Editor

-- ============================================
-- STEP 1: Update user to admin
-- ============================================
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'evertonmasiiwa14@gmail.com';

-- ============================================
-- STEP 2: Verify the update
-- ============================================
SELECT 
  id,
  email,
  role,
  is_admin,
  created_at,
  updated_at
FROM public.users
WHERE email = 'evertonmasiiwa14@gmail.com';

-- ============================================
-- STEP 3: Check and fix RLS policies
-- ============================================

-- Drop existing policies if they exist (to recreate them properly)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;

-- Create proper RLS policies for users table
-- Policy 1: Allow users to read their own profile
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy 2: Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy 3: Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy 4: Allow admins to read all profiles
CREATE POLICY "Admins can view all profiles"
ON public.users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- ============================================
-- STEP 4: Ensure RLS is enabled
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 5: Final verification
-- ============================================
SELECT 
  'User Profile' as check_type,
  email,
  role,
  is_admin,
  CASE 
    WHEN is_admin = true THEN '✅ ADMIN ACCESS GRANTED'
    ELSE '❌ NOT ADMIN'
  END as status
FROM public.users
WHERE email = 'evertonmasiiwa14@gmail.com';

-- ============================================
-- STEP 6: Check RLS policies
-- ============================================
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;
