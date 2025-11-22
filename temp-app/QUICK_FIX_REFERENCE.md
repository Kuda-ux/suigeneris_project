# ⚡ Quick Fix Reference Card

## 🎯 Your New Supabase Project

```
Project ID: flmyvxwsnjzizgsosntl
Project URL: https://flmyvxwsnjzizgsosntl.supabase.co
```

---

## 📝 Environment Variables Template

Copy this into `.env.local` and Vercel:

```env
# Frontend
NEXT_PUBLIC_SUPABASE_URL=https://flmyvxwsnjzizgsosntl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXl2eHdzbmp6aXpnc29zbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDQ3NTAsImV4cCI6MjA3NTg4MDc1MH0.QgqhRhV4qSR7FUxrQT2Y68bB5_qUuIRdCxcwbhszlj4

# Backend (Get from Supabase)
SUPABASE_SERVICE_ROLE_KEY=[Get from Settings → API → service_role]
DATABASE_URL=[Get from Settings → Database → URI tab]
DIRECT_URL=[Get from Settings → Database → Direct connection tab]

# Email (unchanged)
RESEND_API_KEY=re_JvRnFS8c_8TMg3wqzpA9ANRmeKCgpBf2y
```

---

## 🔑 Where to Get Missing Values

### Service Role Key
1. Supabase Dashboard → `flmyvxwsnjzizgsosntl`
2. Settings → **API**
3. Find **"service_role"** under Project API keys
4. Copy the full key

### Database URLs
1. Supabase Dashboard → `flmyvxwsnjzizgsosntl`
2. Settings → **Database**
3. Scroll to **Connection string**
4. **URI tab** → Copy for `DATABASE_URL`
5. **Direct connection tab** → Copy for `DIRECT_URL`

**If password shows `[YOUR-PASSWORD]`:**
- Click "Reset database password"
- Set new password
- Connection strings will update automatically

---

## ✅ Quick Steps

1. **Get credentials** from Supabase (above)
2. **Update `.env.local`** with all 5 Supabase variables
3. **Test locally**: `npm run dev` → try login at localhost:3000
4. **Update Vercel** env vars (Settings → Environment Variables)
5. **Redeploy** on Vercel
6. **Clear cache** and test live site

---

## 🚨 Red Flags

If you see these, env vars are WRONG:

❌ `dtdpxfqepyjiyhejrcsl` anywhere  
❌ `ERR_NAME_NOT_RESOLVED`  
❌ `Failed to fetch`  
❌ Old Supabase URL in console

Should see:

✅ `flmyvxwsnjzizgsosntl` in all URLs  
✅ No DNS errors  
✅ Login works  
✅ Data loads

---

## 📞 Need Help?

Send me:
1. Screenshot of Supabase Settings → API
2. Browser console errors (F12)
3. What happens when you try to login
