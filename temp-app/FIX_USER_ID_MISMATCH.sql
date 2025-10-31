-- ============================================
-- FIX USER ID MISMATCH
-- The problem: Different IDs in auth.users vs public.users
-- ============================================

-- STEP 1: Check what's in auth.users
SELECT 
    'auth.users' as source,
    id, 
    email, 
    created_at
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 2: Check what's in public.users
SELECT 
    'public.users' as source,
    id, 
    email, 
    is_admin,
    role,
    created_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 3: Delete the OLD user from public.users (wrong ID)
DELETE FROM public.users 
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 4: Insert the CORRECT user from auth.users
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
    id,                    -- Use the CORRECT ID from auth.users
    email, 
    TRUE,                  -- Make admin
    'admin',               -- Admin role
    NULL,                  -- No password hash needed
    NOW(), 
    NOW()
FROM auth.users
WHERE email = 'kudakwasher8@gmail.com';

-- STEP 5: Verify the IDs now match
SELECT 
    'Verification' as check_type,
    au.id as auth_id,
    pu.id as public_id,
    CASE 
        WHEN au.id = pu.id THEN '✅ IDs MATCH!'
        ELSE '❌ IDs STILL DIFFERENT!'
    END as status,
    pu.is_admin,
    pu.role
FROM auth.users au
LEFT JOIN public.users pu ON au.email = pu.email
WHERE au.email = 'kudakwasher8@gmail.com';

-- STEP 6: Final check - show the correct user
SELECT 
    id, 
    email, 
    is_admin, 
    role,
    created_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- ============================================
-- EXPECTED RESULT:
-- - auth_id and public_id should be THE SAME
-- - is_admin should be TRUE
-- - role should be 'admin'
-- ============================================
