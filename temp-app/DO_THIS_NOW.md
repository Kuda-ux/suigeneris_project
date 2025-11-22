# 🎯 DO THIS NOW - Step by Step

Follow these steps **in order**. Don't skip any.

---

## Step 1: Get Service Role Key (2 minutes)

1. Open: https://supabase.com/dashboard
2. Click on project: **flmyvxwsnjzizgsosntl**
3. Left sidebar → **Settings** → **API**
4. Scroll to **Project API keys**
5. Find the row that says **"service_role"**
6. Click **"Copy"** or **"Reveal"** and copy the FULL key
7. **Paste it somewhere safe** (Notepad)

✅ You should have a key starting with `eyJ...`

---

## Step 2: Get Database Connection Strings (2 minutes)

1. Still in Supabase dashboard
2. Left sidebar → **Settings** → **Database**
3. Scroll down to **Connection string** section

### A. Get DATABASE_URL:
1. Click the **"URI"** tab
2. Copy the entire string (starts with `postgresql://`)
3. Paste in Notepad

### B. Get DIRECT_URL:
1. Click the **"Direct connection"** tab
2. Copy the entire string (starts with `postgresql://`)
3. Paste in Notepad

**⚠️ IMPORTANT**: If you see `[YOUR-PASSWORD]` in the strings:
1. Click **"Reset database password"** button
2. Enter a new password (e.g., `Marcus24#`)
3. Click **"Save"**
4. The connection strings will now show the actual password
5. Copy them again

✅ You should now have 3 things in Notepad:
- Service role key
- DATABASE_URL
- DIRECT_URL

---

## Step 3: Update Local Environment (3 minutes)

1. Open VS Code
2. Navigate to: `temp-app` folder
3. Open (or create) file: `.env.local`
4. **Delete everything** in the file
5. **Copy and paste** this template:

```env
# Supabase - NEW PROJECT
NEXT_PUBLIC_SUPABASE_URL=https://flmyvxwsnjzizgsosntl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4

# Backend - PASTE YOUR VALUES HERE
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY_HERE
DATABASE_URL=PASTE_DATABASE_URL_HERE
DIRECT_URL=PASTE_DIRECT_URL_HERE

# Email
RESEND_API_KEY=re_JvRnFS8c_8TMg3wqzpA9ANRmeKCgpBf2y
```

6. Replace the three `PASTE_...` lines with values from your Notepad
7. **Save** the file (`Ctrl+S`)

✅ Your `.env.local` should now have all 6 variables filled in

---

## Step 4: Test Locally (2 minutes)

1. Open terminal in VS Code
2. Navigate to temp-app:
   ```bash
   cd temp-app
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

4. Open browser: `http://localhost:3000`

5. Try to:
   - Browse products
   - Click login
   - Enter any email/password

**Expected**:
- ✅ No console errors about `dtdpxfqepyjiyhejrcsl`
- ✅ Login form works (even if credentials wrong, it should TRY to connect)
- ✅ No "Failed to fetch" errors

**If it works locally** → Continue to Step 5  
**If it fails** → Stop and tell me the error

---

## Step 5: Update Vercel (5 minutes)

1. Open: https://vercel.com/dashboard
2. Find and click your project: **suigeneris_project** or **temp-app**
3. Click **Settings** tab
4. Click **Environment Variables** in left sidebar

### Update each variable:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- Find existing one or click **"Add New"**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://flmyvxwsnjzizgsosntl.supabase.co`
- Environments: Check all 3 (Production, Preview, Development)
- Click **Save**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4`
- Environments: Check all 3
- Click **Save**

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: [Paste from your Notepad]
- Environments: Check all 3
- Click **Save**

#### Variable 4: DATABASE_URL
- Name: `DATABASE_URL`
- Value: [Paste from your Notepad]
- Environments: Check all 3
- Click **Save**

#### Variable 5: DIRECT_URL
- Name: `DIRECT_URL`
- Value: [Paste from your Notepad]
- Environments: Check all 3
- Click **Save**

✅ You should now have 5 Supabase variables + 1 RESEND_API_KEY = 6 total

---

## Step 6: Redeploy (3 minutes)

1. Still in Vercel
2. Click **Deployments** tab
3. Find the latest deployment
4. Click the **"..."** menu (three dots)
5. Click **"Redeploy"**
6. Confirm: **"Redeploy"**

**Wait 2-3 minutes** for deployment to complete.

You'll see:
- Building... (1-2 min)
- Deploying... (30 sec)
- ✅ Ready

---

## Step 7: Test Live Site (2 minutes)

1. **Open Incognito/Private window** (important!)
2. Go to: https://www.suigeneriszim.co.zw
3. Press **F12** to open browser console
4. Try to:
   - Browse products
   - Click login
   - Try to login

**Check console for errors**:
- ❌ Should NOT see `dtdpxfqepyjiyhejrcsl`
- ❌ Should NOT see `ERR_NAME_NOT_RESOLVED`
- ✅ Should see `flmyvxwsnjzizgsosntl`

**If login works** → ✅ SUCCESS!  
**If still errors** → Copy console errors and send to me

---

## 🎉 Success Checklist

- [ ] Got service role key from Supabase
- [ ] Got DATABASE_URL from Supabase
- [ ] Got DIRECT_URL from Supabase
- [ ] Updated `.env.local` with all 5 Supabase vars
- [ ] Tested locally - works at localhost:3000
- [ ] Updated all 5 Supabase vars in Vercel
- [ ] Redeployed on Vercel
- [ ] Tested in Incognito - no errors
- [ ] Login works on live site
- [ ] Can access /admin

---

## 🆘 If Something Fails

**At Step 4 (Local test fails)**:
- Send me the console error
- Send me first line of your `.env.local` (just the URL line)

**At Step 7 (Live site fails)**:
- Send me screenshot of browser console (F12)
- Tell me what happens when you click login
- Send me screenshot of Vercel env vars (can blur values)

---

**Total time**: 15-20 minutes  
**Current step**: Start at Step 1 ⬆️
