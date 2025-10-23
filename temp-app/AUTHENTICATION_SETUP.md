# Authentication Setup Guide

## 🔐 Complete Authentication System for Sui Generis

This guide will help you set up the full authentication system with Google OAuth.

---

## 📦 Step 1: Install Required Packages

Run this command in the `temp-app` directory:

```bash
npm install @supabase/auth-helpers-nextjs
```

---

## 🗄️ Step 2: Create Users Table in Supabase

Go to your Supabase project → SQL Editor → New Query, and run this SQL:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
```

---

## 🔑 Step 3: Configure Google OAuth in Supabase

### A. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Application type: **Web application**
7. Add authorized redirect URIs:
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```
8. Copy the **Client ID** and **Client Secret**

### B. Configure in Supabase

1. Go to your Supabase project
2. Navigate to **Authentication** → **Providers**
3. Find **Google** and enable it
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

---

## 🌐 Step 4: Update Environment Variables

Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ✅ Step 5: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Click the **Sign In** button in the header

3. Click **Continue with Google**

4. Sign in with your Google account

5. You should be redirected back and see your name in the header!

---

## 🎯 Features Implemented

### ✅ **User Authentication**
- Google OAuth login
- Secure session management
- Auto-refresh tokens
- Persistent sessions

### ✅ **User Profile**
- Automatic profile creation on first login
- Stores: email, name, avatar, phone
- Updates on each login

### ✅ **Header Integration**
- Shows "Welcome, [Name]!" when logged in
- User dropdown menu with:
  - My Orders
  - Wishlist
  - Account Settings
  - Sign Out
- Mobile-responsive design

### ✅ **Security**
- Row Level Security (RLS) enabled
- Users can only access their own data
- Encrypted sessions
- HTTPS only in production

---

## 🛡️ Protected Routes (Coming Soon)

To protect routes that require authentication, wrap them with this:

```tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Your protected content */}
    </div>
  );
}
```

---

## 📊 Database Schema

### Users Table Structure

| Column      | Type      | Description                    |
|-------------|-----------|--------------------------------|
| id          | UUID      | Primary key (from auth.users)  |
| email       | TEXT      | User's email (unique)          |
| full_name   | TEXT      | User's full name               |
| avatar_url  | TEXT      | Profile picture URL            |
| phone       | TEXT      | Phone number                   |
| created_at  | TIMESTAMP | Account creation date          |
| updated_at  | TIMESTAMP | Last update date               |

---

## 🚀 Next Steps

1. **Install the package**: `npm install @supabase/auth-helpers-nextjs`
2. **Run the SQL** in Supabase SQL Editor
3. **Configure Google OAuth** in Supabase dashboard
4. **Test the login** on your website
5. **Deploy to production** - authentication will work automatically!

---

## 🎉 Ready to Launch!

Your authentication system is now:
- ✅ Secure
- ✅ Scalable
- ✅ User-friendly
- ✅ Production-ready

Users can now sign in with Google and their data will be safely stored in Supabase!
