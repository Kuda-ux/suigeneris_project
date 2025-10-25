-- ============================================
-- FIX USERS TABLE - Add Missing Columns
-- Run this in Supabase SQL Editor
-- ============================================

-- Add missing columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- Now set yourself as admin
UPDATE public.users 
SET is_admin = TRUE 
WHERE email = 'kudakwasher8@gmail.com';

-- Verify it worked
SELECT id, email, full_name, is_admin, created_at
FROM public.users
WHERE email = 'kudakwasher8@gmail.com';

-- ============================================
-- DONE! You should see is_admin = true
-- ============================================
