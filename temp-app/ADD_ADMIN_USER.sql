-- =====================================================
-- ADD NEW ADMIN USER: holyghostaccount@gmail.com
-- =====================================================
-- Run this script in Supabase Dashboard → SQL Editor
-- =====================================================

-- Step 1: Check if user already exists in users table
SELECT id, email, full_name, is_admin, role 
FROM users 
WHERE email = 'holyghostaccount@gmail.com';

-- Step 2: If user exists, update to admin
UPDATE users 
SET 
    is_admin = true, 
    role = 'admin',
    updated_at = NOW()
WHERE email = 'holyghostaccount@gmail.com';

-- Step 3: If user doesn't exist yet (they need to sign in first)
-- After they sign in with Google OAuth, run this:
/*
INSERT INTO users (id, email, full_name, is_admin, role, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name', 'Admin User'),
    true,
    'admin',
    NOW(),
    NOW()
FROM auth.users au
WHERE au.email = 'holyghostaccount@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    is_admin = true,
    role = 'admin',
    updated_at = NOW();
*/

-- Step 4: Verify the admin was added
SELECT id, email, full_name, is_admin, role, created_at
FROM users 
WHERE is_admin = true
ORDER BY created_at DESC;

-- =====================================================
-- ALTERNATIVE: If user hasn't signed in yet
-- =====================================================
-- The user needs to:
-- 1. Go to https://www.suigeneriszim.co.zw/admin/dashboard
-- 2. Sign in with Google using holyghostaccount@gmail.com
-- 3. Then run the UPDATE statement above to grant admin access
-- =====================================================
