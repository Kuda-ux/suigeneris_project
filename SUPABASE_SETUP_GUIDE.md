# 🚀 Supabase Setup Guide for Sui Generis Store

Your project is already on GitHub at: **https://github.com/Kuda-ux/suigeneris_project**

Now let's connect it to Supabase for your database!

---

## 📋 What You'll Set Up

✅ **Supabase Database** - PostgreSQL database for your products, orders, and users  
✅ **Environment Variables** - Secure connection to Supabase  
✅ **Supabase Client** - JavaScript library to interact with your database  
✅ **Database Schema** - Tables and security policies

---

## STEP 1: Create Supabase Project (5 minutes)

### 1.1 Sign Up for Supabase

1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign in with GitHub (easiest option)
4. Authorize Supabase to access your GitHub account

### 1.2 Create New Project

1. Click **"New Project"**
2. Fill in the details:
   - **Organization**: Select or create one
   - **Name**: `suigeneris-store`
   - **Database Password**: Create a strong password (SAVE THIS - you'll need it!)
   - **Region**: Choose closest to you (e.g., `US East (North Virginia)`)
   - **Pricing Plan**: Free (perfect for development)
3. Click **"Create new project"**
4. Wait 2-3 minutes for Supabase to set up your database

---

## STEP 2: Get Your Supabase Credentials (2 minutes)

### 2.1 Find Your Project Settings

1. In your Supabase dashboard, click on your project
2. Click the **⚙️ Settings** icon (bottom left)
3. Click **"API"** in the settings menu

### 2.2 Copy These Values

You'll see several important values. Copy these:

1. **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
2. **anon/public key** (under "Project API keys" - the `anon` `public` key)
3. **Database Password** (the one you created earlier)

### 2.3 Get Database Connection Strings

1. Still in Settings, click **"Database"** (left sidebar)
2. Scroll down to **"Connection string"**
3. Select **"URI"** tab
4. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@...`)
5. Replace `[YOUR-PASSWORD]` with your actual database password

---

## STEP 3: Set Up Environment Variables (3 minutes)

### 3.1 Create .env.local File

1. Open your project in VS Code
2. Navigate to the `temp-app` folder
3. Create a new file called `.env.local`
4. Add the following content (replace with your actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Database Connection (for backend/API)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

### 3.2 Verify .gitignore

Your `.gitignore` already includes `.env.local`, so your credentials won't be pushed to GitHub. ✅

---

## STEP 4: Install Supabase Client (2 minutes)

Open your terminal in the project root and run:

```powershell
cd temp-app
pnpm add @supabase/supabase-js
```

Or if you prefer npm:

```powershell
cd temp-app
npm install @supabase/supabase-js
```

---

## STEP 5: Create Supabase Client Configuration (3 minutes)

### 5.1 Create Supabase Utils Folder

Create this file: `temp-app/src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 5.2 Create TypeScript Types (Optional but Recommended)

Create this file: `temp-app/src/types/database.types.ts`

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          category: string | null
          brand: string | null
          stock_count: number
          in_stock: boolean
          images: string[] | null
          specifications: Json | null
          warranty: string | null
          created_at: string
          updated_at: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          total_amount: number
          status: string
          shipping_address: Json | null
          payment_method: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
```

---

## STEP 6: Set Up Database Schema (5 minutes)

### 6.1 Run SQL Setup Script

1. Go to your Supabase dashboard
2. Click **"SQL Editor"** (left sidebar)
3. Click **"New query"**
4. Copy the contents of `supabase-setup.sql` from your project root
5. Paste it into the SQL editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Database setup completed successfully!"

### 6.2 Verify Tables Were Created

1. Click **"Table Editor"** (left sidebar)
2. You should see these tables:
   - ✅ users
   - ✅ products
   - ✅ orders
   - ✅ order_items
   - ✅ cart
   - ✅ inventory

---

## STEP 7: Test the Connection (3 minutes)

### 7.1 Create a Test Page

Create this file: `temp-app/src/app/test-supabase/page.tsx`

```tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5)

        if (error) throw error
        setProducts(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!loading && !error && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success!</strong> Connected to Supabase
          <p className="mt-2">Found {products.length} products</p>
        </div>
      )}
      
      {products.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Products:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
```

### 7.2 Test It

1. Start your development server:
   ```powershell
   cd temp-app
   pnpm dev
   ```

2. Open your browser to: **http://localhost:3000/test-supabase**

3. You should see:
   - ✅ "Success! Connected to Supabase" (green message)
   - ✅ Number of products found (might be 0 if you haven't added any yet)

---

## STEP 8: Add Sample Data (Optional - 5 minutes)

### 8.1 Insert Sample Products

Go back to Supabase SQL Editor and run:

```sql
INSERT INTO products (name, description, price, category, brand, stock_count, in_stock, images)
VALUES 
  ('MacBook Pro 14"', 'Apple M3 Pro chip, 16GB RAM, 512GB SSD', 1999.99, 'laptops', 'Apple', 10, true, ARRAY['https://example.com/macbook.jpg']),
  ('iPhone 15 Pro', '256GB, Titanium Blue', 1199.99, 'phones', 'Apple', 25, true, ARRAY['https://example.com/iphone.jpg']),
  ('HP LaserJet Pro', 'Wireless Color Printer', 299.99, 'printers', 'HP', 15, true, ARRAY['https://example.com/printer.jpg']),
  ('AirPods Pro', 'Active Noise Cancellation', 249.99, 'accessories', 'Apple', 50, true, ARRAY['https://example.com/airpods.jpg']),
  ('Dell XPS 15', 'Intel i7, 32GB RAM, 1TB SSD', 1799.99, 'laptops', 'Dell', 8, true, ARRAY['https://example.com/dell.jpg']);
```

### 8.2 Refresh Your Test Page

Reload **http://localhost:3000/test-supabase** and you should see the 5 products!

---

## STEP 9: Deploy to Vercel with Supabase (10 minutes)

### 9.1 Push Your Changes to GitHub

```powershell
git add .
git commit -m "Add Supabase integration"
git push origin main
```

### 9.2 Add Environment Variables to Vercel

1. Go to: **https://vercel.com/dashboard**
2. Select your project (or import it from GitHub if not yet deployed)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `DATABASE_URL` = your database connection string
   - `DIRECT_URL` = your database connection string
5. Click **"Save"**
6. Redeploy your project

---

## 🎉 You're Done!

Your Sui Generis Store is now connected to Supabase!

### What You Can Do Now:

✅ **Store products** in your Supabase database  
✅ **Manage users** with Supabase Auth  
✅ **Process orders** with real-time updates  
✅ **Scale automatically** as your store grows  
✅ **Access from anywhere** - your data is in the cloud

### Next Steps:

1. **Add Authentication**: Use Supabase Auth for user login
2. **Create Admin Panel**: Build forms to add/edit products
3. **Set Up Storage**: Use Supabase Storage for product images
4. **Enable Real-time**: Get live updates when orders come in

### Useful Resources:

- 📚 Supabase Docs: https://supabase.com/docs
- 🎓 Supabase Tutorials: https://supabase.com/docs/guides
- 💬 Supabase Discord: https://discord.supabase.com

---

## 🆘 Troubleshooting

### "Error: Invalid API key"
- Double-check your `.env.local` file
- Make sure you copied the **anon/public** key, not the service_role key
- Restart your dev server after changing `.env.local`

### "Error: relation 'products' does not exist"
- Run the `supabase-setup.sql` script in Supabase SQL Editor
- Verify tables were created in Table Editor

### "Error: Failed to fetch"
- Check your Supabase project URL is correct
- Verify your project is not paused (free tier pauses after 7 days of inactivity)
- Check your internet connection

### Environment variables not working
- Make sure the file is named `.env.local` (not `.env.local.txt`)
- Restart your development server
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are only available server-side

---

**Need Help?** Check the `COMPLETE_DEPLOYMENT_GUIDE.md` for more deployment options!
