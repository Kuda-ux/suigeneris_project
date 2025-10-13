# ⚡ Quick Deploy Guide - 30 Minutes to Live!

## 🎯 Goal: Get Your Sui Generis Store Online FAST

Follow these steps in order. Don't skip any!

---

## ✅ Before You Start (5 min)

### Create Accounts (if you don't have them):
1. **GitHub**: https://github.com/signup
2. **Supabase**: https://supabase.com (sign up with GitHub)
3. **Vercel**: https://vercel.com (sign up with GitHub)

### Have Ready:
- [ ] Project folder open
- [ ] PowerShell/Terminal ready
- [ ] Notepad open for saving credentials

---

## 🗄️ STEP 1: Supabase Setup (8 min)

### 1.1 Create Project
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Name: `suigeneris_project`
4. Password: Create strong password → **SAVE THIS!**
5. Region: Choose closest
6. Click "Create"
7. Wait 2 minutes

### 1.2 Get Credentials
1. Settings → API
2. Copy **Project URL** → Save in notepad
3. Copy **anon public** key → Save in notepad
4. Settings → Database
5. Copy **Connection pooling** URL → Replace `[YOUR-PASSWORD]` → Save
6. Copy **Direct connection** URL → Replace `[YOUR-PASSWORD]` → Save

### 1.3 Setup Database
```bash
cd "C:\Users\S.G.T ZW\Desktop\suigeneris_project"
cd apps/api
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run db:seed
```

✅ **Database Ready!**

---

## 📦 STEP 2: GitHub Push (3 min)

```bash
cd "C:\Users\S.G.T ZW\Desktop\suigeneris_project"
git init
git add .
git commit -m "Deploy Sui Generis Store"
git remote add origin https://github.com/Kuda-ux/suigeneris_project.git
git push -u origin main
```

✅ **Code on GitHub!**

---

## 🎨 STEP 3: Deploy Frontend (7 min)

1. Go to: https://vercel.com/new
2. Import: `suigeneris_project`
3. Root Directory: `temp-app`
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key
   - `NEXT_PUBLIC_API_URL` = `https://suigeneris-api.vercel.app`
5. Click "Deploy"
6. Wait 3 minutes
7. Rename to: `suigeneris-store`

✅ **Frontend Live!**

---

## 🔧 STEP 4: Deploy Backend (7 min)

1. Go to: https://vercel.com/new
2. Import: `suigeneris_project` (same repo)
3. Root Directory: `apps/api`
4. Generate secrets:
```bash
node generate-secrets.js
```
5. Add Environment Variables:
   - `DATABASE_URL` = Connection pooling URL
   - `DIRECT_URL` = Direct connection URL
   - `JWT_SECRET` = First generated secret
   - `JWT_REFRESH_SECRET` = Second generated secret
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
6. Click "Deploy"
7. Wait 4 minutes
8. Rename to: `suigeneris-api`

✅ **Backend Live!**

---

## 🔗 STEP 5: Connect (2 min)

1. Go to Frontend project in Vercel
2. Settings → Environment Variables
3. Edit `NEXT_PUBLIC_API_URL`
4. Change to: `https://suigeneris-api.vercel.app`
5. Save
6. Deployments → Redeploy

✅ **Connected!**

---

## ✅ STEP 6: Test (3 min)

### Visit Your Site:
```
https://suigeneris-store.vercel.app
```

### Test Admin:
```
https://suigeneris-store.vercel.app/admin
Email: admin@suigeneris.com
Password: admin123
```

### Change Password Immediately!

---

## 🎉 YOU'RE LIVE!

**Your URLs**:
- Website: `https://suigeneris-store.vercel.app`
- Admin: `https://suigeneris-store.vercel.app/admin`
- API: `https://suigeneris-api.vercel.app`

**To Update**:
```bash
git add .
git commit -m "Update"
git push
```

---

## 🆘 Problems?

See **COMPLETE_DEPLOYMENT_GUIDE.md** for detailed troubleshooting.

---

**Total Time**: ~30 minutes  
**Cost**: $0 (Free!)  
**Status**: 🚀 DEPLOYED!
