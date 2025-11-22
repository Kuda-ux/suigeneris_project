# 🔧 Complete Supabase Resume Fix Guide

## 🚨 Problem
Your Supabase project was paused and now has a **NEW project reference ID**:
- **OLD (dead)**: `dtdpxfqepyjiyhejrcsl` ❌
- **NEW (current)**: `flmyvxwsnjzizgsosntl` ✅

All your environment variables are still pointing to the OLD project, causing connection failures.

---

## ✅ Complete Fix Checklist

### **Step 1: Get ALL new credentials from Supabase**

Go to Supabase Dashboard → Project `flmyvxwsnjzizgsosntl`

#### A. Get API credentials (Settings → API)

Copy these values:

1. **Project URL**:
   ```
   https://flmyvxwsnjzizgsosntl.supabase.co
   ```

2. **anon public key** (you already have this):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4
   ```

3. **service_role key** (IMPORTANT - get the NEW one):
   - Look for "service_role" in Project API keys
   - Copy the FULL key (starts with `eyJ...`)
   - Make sure it contains `"ref":"flmyvxwsnjzizgsosntl"` inside

#### B. Get Database credentials (Settings → Database)

1. Scroll to **Connection string** section
2. Select **URI** tab → Copy the connection pooler string:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

3. Select **Direct connection** tab → Copy:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@db.flmyvxwsnjzizgsosntl.supabase.co:5432/postgres
   ```

**⚠️ If you don't see the password or it shows `[YOUR-PASSWORD]`:**
- Click **"Reset database password"**
- Set a new password (e.g., `Marcus24#` or something secure)
- Write it down
- The connection strings will update with the new password

---

### **Step 2: Update Local Environment (.env.local)**

1. Open (or create) `temp-app/.env.local`

2. Replace ALL Supabase variables with these NEW values:

```env
# ============================================
# SUPABASE - NEW PROJECT (flmyvxwsnjzizgsosntl)
# ============================================

# Frontend (Public)
NEXT_PUBLIC_SUPABASE_URL=https://flmyvxwsnjzizgsosntl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4

# Backend (Server-side only - NEVER expose in frontend)
SUPABASE_SERVICE_ROLE_KEY=PASTE_NEW_SERVICE_ROLE_KEY_HERE
DATABASE_URL=PASTE_CONNECTION_POOLER_STRING_HERE
DIRECT_URL=PASTE_DIRECT_CONNECTION_STRING_HERE

# ============================================
# EMAIL SERVICE (Unchanged)
# ============================================
RESEND_API_KEY=re_JvRnFS8c_8TMg3wqzpA9ANRmeKCgpBf2y
```

3. Save the file

4. **Test locally**:
   ```bash
   cd temp-app
   npm run dev
   ```

5. Open `http://localhost:3000` and try to:
   - Browse products
   - Try login
   - Check if data loads

If local works → Supabase connection is good ✅

---

### **Step 3: Update Vercel Environment Variables**

1. Go to: https://vercel.com/dashboard
2. Select your `suigeneris_project` (or `temp-app`)
3. Go to **Settings → Environment Variables**

4. **Update or Add** these variables:

#### Delete or Update OLD values:

Find and **EDIT** (or delete and recreate):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

#### Set NEW values:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://flmyvxwsnjzizgsosntl.supabase.co
Environments: Production, Preview, Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4
Environments: Production, Preview, Development

SUPABASE_SERVICE_ROLE_KEY
Value: [NEW service_role key from Supabase Settings → API]
Environments: Production, Preview, Development

DATABASE_URL
Value: [Connection pooler string from Supabase Settings → Database]
Environments: Production, Preview, Development

DIRECT_URL
Value: [Direct connection string from Supabase Settings → Database]
Environments: Production, Preview, Development
```

5. **Save all changes**

6. **Redeploy**:
   - Vercel should prompt "Redeploy to apply changes"
   - Or go to **Deployments** → Click "..." → **Redeploy**

---

### **Step 4: Verify Database Tables Exist**

After resume, your database might be empty. Check:

1. In Supabase: **Table Editor**
2. Look for tables:
   - `users`
   - `products`
   - `orders`
   - `loan_applications`
   - etc.

#### If tables are MISSING:

You need to recreate the database schema. I can help with this - we have SQL scripts ready:
- `supabase-setup.sql`
- `UPDATE_LAPTOP_PRICES_2024.sql`

Let me know and I'll guide you through running them.

#### If tables EXIST but are EMPTY:

You need to re-import data. We can run the laptop inventory script and other seed data.

---

### **Step 5: Test Everything**

After Vercel redeploy completes (2-3 minutes):

1. **Clear browser cache**:
   - Press `Ctrl + Shift + Delete`
   - Clear "Cached images and files"
   - Or use **Incognito/Private window**

2. **Test the live site**:
   - Go to: https://www.suigeneriszim.co.zw
   - Browse products
   - Try to login
   - Go to `/admin`

3. **Check browser console** (F12):
   - Should see NO errors about `dtdpxfqepyjiyhejrcsl`
   - Should see NO `ERR_NAME_NOT_RESOLVED`
   - Auth should work

---

## 🔍 Quick Diagnostic Checks

### Check 1: Verify Supabase is actually running

Open in browser:
```
https://flmyvxwsnjzizgsosntl.supabase.co
```

**Expected**: Should load (might show JSON or Supabase page)  
**If error**: Project not fully resumed yet - wait 5 minutes and try again

### Check 2: Verify new keys are correct

In browser console on your site (F12 → Console), type:
```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

**Expected**: `https://flmyvxwsnjzizgsosntl.supabase.co`  
**If shows old URL**: Env vars not updated or need to redeploy

### Check 3: Test database connection

In Supabase SQL Editor, run:
```sql
SELECT NOW();
```

**Expected**: Shows current timestamp  
**If error**: Database not fully resumed

---

## 🚨 Common Issues & Fixes

### Issue 1: "Failed to fetch" / ERR_NAME_NOT_RESOLVED

**Cause**: Still using old project URL  
**Fix**: Double-check ALL env vars point to `flmyvxwsnjzizgsosntl`, then redeploy

### Issue 2: "Invalid API key"

**Cause**: Using old anon key or service key  
**Fix**: Get NEW keys from Settings → API for the NEW project

### Issue 3: "Database connection failed"

**Cause**: DATABASE_URL still points to old project  
**Fix**: Update DATABASE_URL and DIRECT_URL with new connection strings

### Issue 4: "No tables found"

**Cause**: Database is empty after resume  
**Fix**: Run schema setup SQL scripts (I can help with this)

### Issue 5: Vercel deployment succeeds but site still broken

**Cause**: Browser cache showing old version  
**Fix**: 
- Hard refresh: `Ctrl + Shift + R`
- Or use Incognito window
- Or clear all cache

---

## 📋 Final Checklist

Before asking for help, verify:

- [ ] Supabase project `flmyvxwsnjzizgsosntl` is **Active** (not paused)
- [ ] Can access `https://flmyvxwsnjzizgsosntl.supabase.co` in browser
- [ ] Updated `.env.local` with ALL 5 new Supabase variables
- [ ] Tested locally - login works at `localhost:3000`
- [ ] Updated ALL 5 Supabase env vars in Vercel
- [ ] Redeployed on Vercel
- [ ] Cleared browser cache or used Incognito
- [ ] Checked browser console - no errors about old URL
- [ ] Verified tables exist in Supabase Table Editor

---

## 🆘 If Still Not Working

Send me:

1. **Screenshot** of Supabase Settings → API showing:
   - Project URL
   - First 20 characters of anon key

2. **Screenshot** of Vercel env vars (can blur sensitive parts)

3. **Browser console errors** (F12 → Console tab)

4. **What happens** when you try to:
   - Load homepage
   - Login
   - Access `/admin`

---

## 📝 Summary

**What changed**:
- Old project: `dtdpxfqepyjiyhejrcsl` (dead)
- New project: `flmyvxwsnjzizgsosntl` (active)

**What you need to update** (5 variables):
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `SUPABASE_SERVICE_ROLE_KEY`
4. `DATABASE_URL`
5. `DIRECT_URL`

**Where to update**:
- `.env.local` (for local dev)
- Vercel env vars (for production)

**After updating**:
- Redeploy on Vercel
- Clear browser cache
- Test everything

---

**Time needed**: 10-15 minutes  
**Difficulty**: Medium  
**Result**: Fully working site with new Supabase project ✅
