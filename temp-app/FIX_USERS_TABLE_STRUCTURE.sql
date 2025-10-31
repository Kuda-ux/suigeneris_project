-- ============================================
-- FIX USERS TABLE STRUCTURE
-- Your users table has password_hash which shouldn't be there
-- This fixes the structure
-- ============================================

-- STEP 1: Check current table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- STEP 2: Make password_hash nullable (it shouldn't be in public.users at all)
ALTER TABLE public.users 
ALTER COLUMN password_hash DROP NOT NULL;

-- STEP 3: Add missing columns if they don't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- STEP 4: Update created_at and updated_at to have defaults if they don't
ALTER TABLE public.users 
ALTER COLUMN created_at SET DEFAULT NOW(),
ALTER COLUMN updated_at SET DEFAULT NOW();

-- STEP 5: Create indexes
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- STEP 6: Check if your user exists in auth.users
SELECT id, email, created_at, confirmed_at
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 7: Check if your user exists in public.users
SELECT id, email, is_admin, role
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 8: If user exists in auth but NOT in public, insert them properly
-- This handles the password_hash issue by setting it to NULL
INSERT INTO public.users (
    id, 
    email, 
    is_admin, 
    role,
    password_hash,
    created_at, 
    updated_at
)
SELECT 
    id, 
    email, 
    TRUE,
    'admin',
    NULL,
    NOW(), 
    NOW()
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com'
ON CONFLICT (id) DO UPDATE SET 
  is_admin = TRUE,
  role = 'admin',
  updated_at = NOW();

-- STEP 9: Verify you are now admin
SELECT 
    id, 
    email, 
    is_admin, 
    role,
    created_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- You should see: is_admin = true, role = admin

-- STEP 10: Make sure RLS policy allows you to read your profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

-- STEP 11: Test that you can read your own profile
SELECT * FROM public.users WHERE id = auth.uid();

-- ============================================
-- ALTERNATIVE: If the above doesn't work, try this
-- ============================================

-- Option A: Update existing user to be admin
UPDATE public.users 
SET 
    is_admin = TRUE,
    role = 'admin',
    updated_at = NOW()
WHERE email = 'kudakwasher8@gmail.com';

-- Option B: If password_hash is still causing issues, drop the constraint
ALTER TABLE public.users 
ALTER COLUMN password_hash DROP NOT NULL;

-- Then try the insert again
INSERT INTO public.users (id, email, is_admin, role, created_at, updated_at)
SELECT id, email, TRUE, 'admin', NOW(), NOW()
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com'
ON CONFLICT (id) DO UPDATE SET is_admin = TRUE, role = 'admin';

-- ============================================
-- DONE!
-- ============================================
