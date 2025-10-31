-- ============================================
-- UPDATE EXISTING USER TO ADMIN
-- Your user already exists, just needs to be made admin
-- ============================================

-- STEP 1: Make password_hash nullable first (to prevent future issues)
ALTER TABLE public.users 
ALTER COLUMN password_hash DROP NOT NULL;

-- STEP 2: Add missing columns if they don't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- STEP 3: Check your current user status
SELECT 
    id, 
    email, 
    is_admin, 
    role,
    created_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 4: UPDATE your existing user to be admin
UPDATE public.users 
SET 
    is_admin = TRUE,
    role = 'admin',
    updated_at = NOW()
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 5: Verify you are now admin
SELECT 
    id, 
    email, 
    is_admin, 
    role,
    created_at,
    updated_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- You should see: is_admin = true, role = admin

-- STEP 6: Create indexes for better performance
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- STEP 7: Make sure RLS policy allows you to read your profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

-- STEP 8: Test that you can read your own profile
SELECT * FROM public.users WHERE id = auth.uid();

-- ============================================
-- DONE! You are now an admin
-- ============================================

-- VERIFICATION: Run this to confirm everything is correct
SELECT 
    'User Status' as check_type,
    email,
    is_admin,
    role,
    CASE 
        WHEN is_admin = TRUE AND role = 'admin' THEN '✅ ADMIN ACCESS GRANTED'
        ELSE '❌ NOT ADMIN'
    END as status
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';
