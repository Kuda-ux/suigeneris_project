# Database Migration Guide

## 🚀 Quick Start

### Step 1: Install Dependencies (RUNNING NOW)
```bash
npm install @supabase/supabase-js
```

### Step 2: Set Up Environment Variables

Make sure your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get these from:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the URL and anon/public key

### Step 3: Update Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- File: supabase-schema-update.sql (in project root)
-- This adds all necessary columns for the admin system
```

Go to your Supabase project → SQL Editor → Paste the contents of `supabase-schema-update.sql` → Run

### Step 4: Run Migration

```bash
npm run migrate
```

This will:
- ✅ Connect to your Supabase database
- ✅ Migrate all 200+ products from static data
- ✅ Show progress for each product
- ✅ Display summary when complete

---

## ✅ After Migration

Your admin system will have:
- ✅ All products in Supabase database
- ✅ Full CRUD operations working
- ✅ Real-time inventory management
- ✅ Persistent data across sessions

---

## 🔧 Troubleshooting

### Error: "Cannot find module @supabase/supabase-js"
**Solution:** Run `npm install @supabase/supabase-js`

### Error: "Invalid Supabase credentials"
**Solution:** Check your `.env.local` file has correct URL and key

### Error: "Column does not exist"
**Solution:** Run the schema update SQL in Supabase first

---

## 📝 What Gets Migrated

- ✅ 200+ products with all details
- ✅ Product names, descriptions, prices
- ✅ Stock counts and SKUs
- ✅ Categories and brands
- ✅ Images and specifications
- ✅ Ratings and reviews

---

## 🎯 Next Steps After Migration

1. **Test the Admin Panel:**
   - Go to `/admin`
   - Login with credentials
   - View products from database
   - Try adding/editing/deleting

2. **Test the E-commerce Site:**
   - Go to `/products`
   - Products should load from database
   - Search and filtering should work

3. **Verify in Supabase:**
   - Go to Supabase Dashboard
   - Table Editor → products
   - You should see all 200+ products

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Run migration
npm run migrate

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🆘 Need Help?

If migration fails:
1. Check Supabase credentials in `.env.local`
2. Verify schema is updated in Supabase
3. Check console for specific error messages
4. Ensure you have internet connection to Supabase

The migration is safe to run multiple times - it uses upsert operations!
