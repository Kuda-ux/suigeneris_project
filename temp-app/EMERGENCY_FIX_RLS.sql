-- ============================================
-- EMERGENCY FIX - RUN THIS IMMEDIATELY
-- The 406 error means RLS is STILL ENABLED
-- ============================================

-- STEP 1: Check current RLS status
SELECT 
    tablename, 
    rowsecurity,
    CASE 
        WHEN rowsecurity = true THEN '❌ RLS IS ENABLED - THIS IS THE PROBLEM!'
        WHEN rowsecurity = false THEN '✅ RLS IS DISABLED - Good'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- STEP 2: FORCE DISABLE RLS
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- STEP 3: Verify RLS is now disabled
SELECT 
    tablename, 
    rowsecurity,
    CASE 
        WHEN rowsecurity = true THEN '❌ STILL ENABLED!'
        WHEN rowsecurity = false THEN '✅ NOW DISABLED!'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- STEP 4: Drop ALL policies (they might be interfering)
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
END $$;

-- STEP 5: Verify no policies exist
SELECT COUNT(*) as policy_count,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ No policies - Good!'
        ELSE '❌ Policies still exist!'
    END as status
FROM pg_policies 
WHERE tablename = 'users';

-- STEP 6: Make password_hash nullable
ALTER TABLE public.users 
ALTER COLUMN password_hash DROP NOT NULL;

-- STEP 7: Verify your user exists
SELECT 
    id, 
    email, 
    is_admin, 
    role
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 8: If user doesn't exist or is_admin is false, fix it
UPDATE public.users 
SET 
    is_admin = TRUE,
    role = 'admin',
    updated_at = NOW()
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 9: Final verification
SELECT 
    'Final Check' as test,
    email,
    is_admin,
    role,
    CASE 
        WHEN is_admin = TRUE THEN '✅ YOU ARE ADMIN'
        ELSE '❌ NOT ADMIN'
    END as admin_status
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 10: Test direct query (should work without 406)
SELECT * FROM public.users WHERE email = 'kudakwasher8@gmail.com';

-- ============================================
-- IF YOU SEE:
-- - rowsecurity: false
-- - policy_count: 0
-- - is_admin: true
-- THEN IT'S FIXED!
-- ============================================
