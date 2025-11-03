-- FIX ADMIN ACCESS FOR evertonmasiiwa14@gmail.com
-- Run this in Supabase SQL Editor NOW

-- Update the user to admin role
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'evertonmasiiwa14@gmail.com';

-- Verify the update worked
SELECT 
  email,
  role,
  is_admin,
  updated_at
FROM public.users
WHERE email = 'evertonmasiiwa14@gmail.com';
