# ⚡ Quick Supabase Setup - 5 Minutes

Your project is now connected to Supabase! Here's what's done and what's next:

## ✅ Already Completed

1. ✅ `.env.local` file created with your credentials
2. ✅ Supabase client configured (`src/lib/supabase.ts`)
3. ✅ Database types defined (`src/types/database.types.ts`)
4. ✅ Dependencies installed (`@supabase/supabase-js`)

## 🎯 Next: Set Up Database Tables (5 minutes)

### Step 1: Go to Supabase SQL Editor

1. Open: **https://supabase.com/dashboard/project/dtdpxfqepyjiyhejrcsl**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"** button

### Step 2: Run the Setup Script

Copy the entire content from `supabase-setup.sql` file in your project root and paste it into the SQL editor, then click **"Run"** (or press Ctrl+Enter).

The script will create:
- ✅ Users table
- ✅ Products table
- ✅ Orders table
- ✅ Order items table
- ✅ Cart table
- ✅ Inventory table
- ✅ Security policies (Row Level Security)
- ✅ Sample admin user

### Step 3: Verify Tables Were Created

1. Click **"Table Editor"** in the left sidebar
2. You should see all 6 tables listed

### Step 4: Test Your Connection

1. Start your dev server:
   ```powershell
   cd temp-app
   npm run dev
   ```

2. Open your browser to: **http://localhost:3000/test-supabase**

3. You should see: ✅ "Connected to Supabase!"

## 🚀 Deploy to Vercel (Optional - 10 minutes)

### Step 1: Push to GitHub (Already Done!)

Your code is already on GitHub at: **https://github.com/Kuda-ux/suigeneris_project**

### Step 2: Deploy to Vercel

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select: `Kuda-ux/suigeneris_project`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `temp-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables in Vercel

Click **"Environment Variables"** and add these:

```
NEXT_PUBLIC_SUPABASE_URL = https://dtdpxfqepyjiyhejrcsl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZHB4ZnFlcHlqaXloZWpyY3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTIyNjIsImV4cCI6MjA3NTkyODI2Mn0.BQ4J6EbJv0bjULe7g3u6bZwypRWXKvzRGwAsn7meNac
DATABASE_URL = postgresql://postgres:Marcus24#@db.dtdpxfqepyjiyhejrcsl.supabase.co:5432/postgres
DIRECT_URL = postgresql://postgres:Marcus24#@db.dtdpxfqepyjiyhejrcsl.supabase.co:5432/postgres
```

### Step 4: Deploy!

Click **"Deploy"** and wait 2-3 minutes. Your site will be live at: `https://your-project.vercel.app`

---

## 🎉 You're All Set!

Your Sui Generis Store is now:
- ✅ Connected to Supabase database
- ✅ Ready for local development
- ✅ Ready to deploy to Vercel

### Quick Commands:

```powershell
# Start development server
cd temp-app
npm run dev

# Test Supabase connection
# Open: http://localhost:3000/test-supabase

# Build for production
npm run build

# Start production server
npm start
```

---

## 🆘 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
Run: `cd temp-app && npm install`

### "Invalid API key"
Check your `.env.local` file has the correct credentials

### "Relation 'products' does not exist"
Run the SQL setup script in Supabase SQL Editor

### Environment variables not working
Restart your dev server after changing `.env.local`

---

**Need more help?** Check `SUPABASE_SETUP_GUIDE.md` for detailed instructions!
