-- Check your admin status
-- Run this in Supabase SQL Editor

SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at,
  updated_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- If is_admin is FALSE or NULL, run this to make yourself admin:
-- UPDATE public.users 
-- SET is_admin = TRUE 
-- WHERE email = 'kudakwasher8@gmail.com';

-- Then verify again:
-- SELECT email, is_admin FROM public.users WHERE email = 'kudakwasher8@gmail.com';
