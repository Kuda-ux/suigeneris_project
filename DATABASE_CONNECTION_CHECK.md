# Database Connection Verification Guide

## ✅ Steps to Verify Database Connection

### 1. **Check Vercel Environment Variables**

Go to your Vercel dashboard:
1. Navigate to your project → Settings → Environment Variables
2. Verify these variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `DATABASE_URL` (optional, for backend operations)

**How to get these values:**
- Go to https://supabase.com/dashboard
- Select your project
- Go to Settings → API
- Copy the Project URL and anon/public key

### 2. **Test the Health Check Endpoint**

Once deployed, visit:
```
https://your-vercel-domain.vercel.app/api/health
```

**Expected Response (Success):**
```json
{
  "status": "ok",
  "message": "Database connected successfully",
  "supabaseConfigured": true,
  "timestamp": "2025-01-14T05:00:00.000Z"
}
```

**Expected Response (Not Configured):**
```json
{
  "status": "error",
  "message": "Database connection failed",
  "error": "...",
  "supabaseConfigured": false
}
```

### 3. **Verify Supabase Tables Exist**

In your Supabase dashboard:
1. Go to Table Editor
2. Verify these tables exist:
   - `products`
   - `orders`
   - `order_items`
   - `users` (if using auth)

If tables don't exist, run the SQL from:
- `supabase-setup.sql`

### 4. **Test from Browser Console**

Open your deployed site and run in browser console:
```javascript
// This will test if Supabase client is initialized
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### 5. **Check Vercel Deployment Logs**

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the "Build Logs" for any Supabase-related errors
4. Check "Function Logs" for runtime errors

---

## 🔧 Common Issues & Solutions

### Issue 1: Environment Variables Not Set
**Symptom:** `Missing Supabase environment variables` error

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add the required variables
3. Redeploy the application

### Issue 2: Database Tables Don't Exist
**Symptom:** `relation "products" does not exist`

**Solution:**
1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `supabase-setup.sql`
3. Verify tables in Table Editor

### Issue 3: RLS (Row Level Security) Blocking Access
**Symptom:** `new row violates row-level security policy`

**Solution:**
1. Go to Supabase → Authentication → Policies
2. Add policies to allow public read access:
```sql
-- Allow public read access to products
CREATE POLICY "Allow public read access" ON products
FOR SELECT USING (true);
```

### Issue 4: CORS Errors
**Symptom:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
1. Go to Supabase → Settings → API
2. Add your Vercel domain to allowed origins
3. Or use Supabase's built-in CORS handling

---

## 📋 Quick Verification Checklist

- [ ] Vercel environment variables are set
- [ ] Supabase project is created and active
- [ ] Database tables exist (run `supabase-setup.sql`)
- [ ] RLS policies allow necessary access
- [ ] `/api/health` endpoint returns success
- [ ] No errors in Vercel function logs
- [ ] Products load on the homepage

---

## 🚀 Next Steps After Verification

1. **Populate Database:**
   - Add products via Supabase dashboard or admin panel
   - Test CRUD operations

2. **Enable Authentication (Optional):**
   - Configure Supabase Auth providers
   - Update RLS policies for authenticated users

3. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor Supabase usage in dashboard

4. **Set Up Backups:**
   - Configure Supabase automatic backups
   - Export data regularly

---

## 📞 Need Help?

If database connection fails:
1. Check Vercel deployment logs
2. Check Supabase logs (Dashboard → Logs)
3. Verify API keys are correct
4. Test connection with `/api/health` endpoint
