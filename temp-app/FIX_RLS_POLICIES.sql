-- ============================================
-- FIX RLS POLICIES - 406 Error Fix
-- The 406 error means RLS is blocking your query
-- ============================================

-- STEP 1: Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- STEP 2: Check existing policies
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

-- STEP 3: Drop ALL existing policies on users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;

-- STEP 4: Create simple, working policies
-- Allow users to SELECT their own profile
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to UPDATE their own profile
CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to INSERT their own profile
CREATE POLICY "users_insert_own"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- STEP 5: Verify you are admin
SELECT 
    id, 
    email, 
    is_admin, 
    role
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 6: Test if you can read your own profile
-- This should work now
SELECT * FROM public.users WHERE id = auth.uid();

-- ============================================
-- ALTERNATIVE: If still not working, temporarily disable RLS
-- ============================================

-- ONLY USE THIS IF ABOVE DOESN'T WORK
-- Disable RLS temporarily to test
-- ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Then try accessing admin dashboard
-- If it works, the issue is definitely RLS policies

-- To re-enable RLS after testing:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONE!
-- ============================================
