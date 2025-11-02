-- Make evertonmasiiwa14@gmail.com an admin
-- Run this in Supabase SQL Editor

-- First, check if the user exists and get their ID
DO $$
DECLARE
  user_id_var uuid;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO user_id_var
  FROM auth.users
  WHERE email = 'evertonmasiiwa14@gmail.com';

  IF user_id_var IS NULL THEN
    RAISE NOTICE 'User with email evertonmasiiwa14@gmail.com not found. They need to sign up first.';
  ELSE
    -- Update or insert the user profile with admin role
    INSERT INTO public.users (id, email, role, is_admin, created_at, updated_at)
    VALUES (
      user_id_var,
      'evertonmasiiwa14@gmail.com',
      'admin',
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET
      role = 'admin',
      is_admin = true,
      updated_at = NOW();

    RAISE NOTICE 'Successfully granted admin access to evertonmasiiwa14@gmail.com';
  END IF;
END $$;

-- Verify the admin status
SELECT 
  u.id,
  u.email,
  p.role,
  p.is_admin,
  p.created_at
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'evertonmasiiwa14@gmail.com';
