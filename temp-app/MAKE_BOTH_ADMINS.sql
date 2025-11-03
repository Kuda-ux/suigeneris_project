-- MAKE BOTH USERS ADMIN
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: Update BOTH users to admin
-- ============================================

-- Make evertonmasiiwa14@gmail.com admin
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'evertonmasiiwa14@gmail.com';

-- Make kudakwasher8@gmail.com admin
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'kudakwasher8@gmail.com';

-- ============================================
-- STEP 2: Verify BOTH admins
-- ============================================
SELECT 
  email,
  role,
  is_admin,
  CASE 
    WHEN is_admin = true THEN '✅ ADMIN'
    ELSE '❌ NOT ADMIN'
  END as status,
  created_at,
  updated_at
FROM public.users
WHERE email IN ('evertonmasiiwa14@gmail.com', 'kudakwasher8@gmail.com')
ORDER BY email;

-- ============================================
-- STEP 3: Fix RLS policies (if not done yet)
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;

-- Create optimized RLS policies
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

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

-- Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: Final verification - Show all admins
-- ============================================
SELECT 
  email,
  role,
  is_admin,
  full_name,
  created_at
FROM public.users
WHERE is_admin = true
ORDER BY email;

-- ============================================
-- STEP 5: Count total admins
-- ============================================
SELECT 
  COUNT(*) as total_admins,
  STRING_AGG(email, ', ') as admin_emails
FROM public.users
WHERE is_admin = true;
