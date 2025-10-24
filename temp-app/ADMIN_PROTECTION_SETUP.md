# Admin Protection Setup

## 🔒 Protect Admin Portal from Unauthorized Access

Run this SQL in Supabase to add admin role functionality:

```sql
-- Add is_admin column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- Update RLS policy to allow admins to view all users
CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE is_admin = TRUE
    )
  );
```

## 👤 Make Yourself an Admin

After creating your account, run this SQL (replace with your email):

```sql
UPDATE public.users 
SET is_admin = TRUE 
WHERE email = 'your-email@example.com';
```

## ✅ Done!

Now only users with `is_admin = TRUE` can access the admin portal.
