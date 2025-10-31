-- ============================================
-- COMPLETE ADMIN ACCESS FIX
-- Run ALL of these commands in Supabase SQL Editor
-- ============================================

-- STEP 1: Check if users table exists and see its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- STEP 2: Add all missing columns (if they don't exist)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- STEP 3: Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- STEP 4: Check all existing users
SELECT id, email, is_admin, created_at
FROM public.users
ORDER BY created_at DESC;

-- STEP 5: Set YOUR email as admin (REPLACE WITH YOUR ACTUAL EMAIL)
UPDATE public.users 
SET is_admin = TRUE 
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 6: Verify you are now admin
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at,
  updated_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- You should see: is_admin = true

-- STEP 7: Check Row Level Security policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users';

-- STEP 8: Make sure RLS allows reading user profiles
-- Drop and recreate the policy if needed
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

-- STEP 9: Verify the policy works by testing a query
-- This should return your user record
SELECT * FROM public.users WHERE id = auth.uid();

-- ============================================
-- TROUBLESHOOTING QUERIES
-- ============================================

-- Check if your user exists in auth.users
SELECT id, email, created_at, confirmed_at
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com';

-- Check if your user exists in public.users
SELECT id, email, is_admin
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- If user exists in auth.users but NOT in public.users, insert manually:
-- INSERT INTO public.users (id, email, is_admin, created_at, updated_at)
-- SELECT id, email, TRUE, NOW(), NOW()
-- FROM auth.users
-- WHERE email = 'kudakwasher8@gmail.com'
-- ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;

-- ============================================
-- DONE! Your admin access should now work
-- ============================================
