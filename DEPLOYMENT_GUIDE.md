# 🚀 Sui Generis Store - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- GitHub account
- Supabase account with project created
- Git installed on your computer

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Get Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project: `suigeneris_project`
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### 1.2 Get Database Connection String

1. In Supabase, go to **Settings** → **Database**
2. Scroll to **Connection String** section
3. Copy the **Connection Pooling** string (for Prisma)
4. Copy the **Direct Connection** string
5. Replace `[YOUR-PASSWORD]` with your database password

Example format:
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 1.3 Set Up Database Schema

1. Open your terminal in the project directory
2. Create a `.env` file in `apps/api/` folder:

```bash
DATABASE_URL="your_connection_pooling_string"
DIRECT_URL="your_direct_connection_string"
```

3. Run Prisma migrations:

```bash
cd apps/api
pnpm prisma migrate deploy
pnpm prisma generate
pnpm run db:seed
```

## 🌐 Step 2: Deploy to GitHub

### 2.1 Initialize Git Repository

```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit: Sui Generis Store"
```

### 2.2 Connect to GitHub Repository

```bash
git remote add origin https://github.com/Kuda-ux/suigeneris_project.git
git branch -M main
git push -u origin main
```

### 2.3 Configure GitHub Secrets

1. Go to your GitHub repository: https://github.com/Kuda-ux/suigeneris_project
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value |
|------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `NEXT_PUBLIC_API_URL` | Your API URL (if deploying backend) |

### 2.4 Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## 🎯 Step 3: Deploy Frontend to GitHub Pages

### 3.1 Trigger Deployment

1. Push your code to GitHub (already done in Step 2.2)
2. Go to **Actions** tab in your repository
3. You should see the "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually 2-5 minutes)

### 3.2 Access Your Website

Once deployed, your website will be available at:
```
https://kuda-ux.github.io/suigeneris_project/
```

## 🔧 Step 4: Deploy Backend API (Optional but Recommended)

Since GitHub Pages doesn't support backend APIs, you need to deploy the NestJS API separately.

### Option A: Deploy to Vercel (Recommended - Free)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your `suigeneris_project` repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `apps/api`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `JWT_SECRET` (create a random string)
   - `JWT_REFRESH_SECRET` (create another random string)
7. Click **Deploy**

### Option B: Deploy to Render (Alternative - Free)

1. Go to https://render.com
2. Sign in with GitHub
3. Click **New** → **Web Service**
4. Connect your repository
5. Configure:
   - **Name**: `suigeneris-api`
   - **Root Directory**: `apps/api`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start:prod`
6. Add Environment Variables (same as Vercel)
7. Click **Create Web Service**

### Option C: Deploy to Railway (Alternative - Free)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Configure similar to above options

## 🔗 Step 5: Connect Frontend to Backend

After deploying your backend, update the GitHub secret:

1. Go to GitHub repository → **Settings** → **Secrets**
2. Update `NEXT_PUBLIC_API_URL` with your backend URL:
   - Vercel: `https://your-project.vercel.app`
   - Render: `https://suigeneris-api.onrender.com`
   - Railway: `https://your-project.up.railway.app`
3. Re-run the GitHub Actions workflow to redeploy with new API URL

## ✅ Step 6: Verify Deployment

### Check Frontend
1. Visit: `https://kuda-ux.github.io/suigeneris_project/`
2. Test navigation between pages
3. Check if products load correctly
4. Test the admin dashboard at `/admin`

### Check Backend (if deployed)
1. Visit: `your-api-url/api/health`
2. Should return: `{"status":"ok"}`

### Check Database
1. Go to Supabase dashboard
2. Click **Table Editor**
3. Verify tables are created and seeded with data

## 🐛 Troubleshooting

### Issue: GitHub Pages shows 404

**Solution:**
1. Check if GitHub Actions workflow completed successfully
2. Verify GitHub Pages is enabled in repository settings
3. Wait 5-10 minutes for DNS propagation

### Issue: Images not loading

**Solution:**
- Images are set to `unoptimized: true` in `next.config.js`
- Check if image paths are correct
- Verify basePath is set correctly

### Issue: API calls failing

**Solution:**
1. Check if `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is deployed and running
3. Check CORS settings in backend

### Issue: Database connection errors

**Solution:**
1. Verify DATABASE_URL is correct
2. Check if Supabase project is active
3. Ensure password in connection string is correct
4. Try using connection pooling URL instead of direct URL

## 📝 Environment Variables Summary

### Frontend (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_API_URL=https://your-api.vercel.app
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://postgres...
DIRECT_URL=postgresql://postgres...
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
PORT=3000
NODE_ENV=production
```

## 🎉 Success!

Your Sui Generis Store should now be live at:
- **Website**: https://kuda-ux.github.io/suigeneris_project/
- **Admin Dashboard**: https://kuda-ux.github.io/suigeneris_project/admin
- **API**: Your deployed backend URL

## 📞 Need Help?

If you encounter any issues:
1. Check the GitHub Actions logs
2. Review Supabase logs
3. Check backend deployment logs
4. Verify all environment variables are set correctly

## 🔄 Updating Your Site

To update your deployed site:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy your site!
