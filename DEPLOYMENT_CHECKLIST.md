# 📋 Deployment Checklist for Sui Generis Store

## Before You Start

- [ ] GitHub account created
- [ ] Supabase project created (name: suigeneris_project)
- [ ] Git installed on your computer

## Step 1: Supabase Setup

### Get Your Credentials
- [ ] Log in to Supabase: https://supabase.com/dashboard
- [ ] Open your project: `suigeneris_project`
- [ ] Go to Settings → API
- [ ] Copy **Project URL**: `_______________________________`
- [ ] Copy **Anon Key**: `_______________________________`
- [ ] Go to Settings → Database
- [ ] Copy **Connection Pooling String**: `_______________________________`
- [ ] Copy **Direct Connection String**: `_______________________________`

### Set Up Database
- [ ] Create `.env` file in `apps/api/` folder
- [ ] Add DATABASE_URL and DIRECT_URL
- [ ] Run: `cd apps/api`
- [ ] Run: `pnpm prisma migrate deploy`
- [ ] Run: `pnpm prisma generate`
- [ ] Run: `pnpm run db:seed`

## Step 2: GitHub Setup

### Push Code to GitHub
- [ ] Open PowerShell in project folder
- [ ] Run: `.\deploy-to-github.ps1`
- [ ] OR manually:
  - [ ] `git init`
  - [ ] `git add .`
  - [ ] `git commit -m "Initial commit"`
  - [ ] `git remote add origin https://github.com/Kuda-ux/suigeneris_project.git`
  - [ ] `git branch -M main`
  - [ ] `git push -u origin main`

### Configure GitHub Secrets
- [ ] Go to: https://github.com/Kuda-ux/suigeneris_project
- [ ] Click: Settings → Secrets and variables → Actions
- [ ] Add secret: `NEXT_PUBLIC_SUPABASE_URL` (your Supabase URL)
- [ ] Add secret: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase Anon Key)
- [ ] Add secret: `NEXT_PUBLIC_API_URL` (your API URL - add later if deploying backend)

### Enable GitHub Pages
- [ ] Go to: Settings → Pages
- [ ] Source: Select "GitHub Actions"
- [ ] Save

## Step 3: Deploy Frontend

- [ ] Go to Actions tab
- [ ] Watch "Deploy to GitHub Pages" workflow
- [ ] Wait for completion (2-5 minutes)
- [ ] Visit: https://kuda-ux.github.io/suigeneris_project/

## Step 4: Deploy Backend (Optional)

### Choose Your Platform:

#### Option A: Vercel (Recommended)
- [ ] Go to: https://vercel.com
- [ ] Sign in with GitHub
- [ ] Import `suigeneris_project` repository
- [ ] Root Directory: `apps/api`
- [ ] Add environment variables
- [ ] Deploy

#### Option B: Render
- [ ] Go to: https://render.com
- [ ] Sign in with GitHub
- [ ] Create Web Service
- [ ] Connect repository
- [ ] Configure and deploy

#### Option C: Railway
- [ ] Go to: https://railway.app
- [ ] Sign in with GitHub
- [ ] Deploy from GitHub repo
- [ ] Configure and deploy

### After Backend Deployment
- [ ] Copy your backend URL
- [ ] Go to GitHub → Settings → Secrets
- [ ] Update `NEXT_PUBLIC_API_URL` with backend URL
- [ ] Re-run GitHub Actions workflow

## Step 5: Verify Everything Works

### Frontend Checks
- [ ] Visit: https://kuda-ux.github.io/suigeneris_project/
- [ ] Homepage loads correctly
- [ ] Products page shows items
- [ ] Product details work
- [ ] Cart functionality works
- [ ] Admin dashboard accessible at `/admin`
- [ ] Admin login works (admin@suigeneris.com / admin123)

### Backend Checks (if deployed)
- [ ] Visit: `your-api-url/api/health`
- [ ] Returns: `{"status":"ok"}`
- [ ] API endpoints respond correctly

### Database Checks
- [ ] Go to Supabase → Table Editor
- [ ] Verify tables exist
- [ ] Check if data is seeded
- [ ] Test a database query

## 🎉 Deployment Complete!

Your Sui Generis Store is now live at:
- **Website**: https://kuda-ux.github.io/suigeneris_project/
- **Admin**: https://kuda-ux.github.io/suigeneris_project/admin

## 📝 Important Notes

1. **Admin Credentials**: 
   - Email: admin@suigeneris.com
   - Password: admin123
   - ⚠️ Change this password immediately after first login!

2. **Updating Your Site**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
   GitHub will automatically redeploy!

3. **Environment Variables**:
   - Never commit `.env` files
   - Always use GitHub Secrets for sensitive data
   - Update secrets when credentials change

## 🐛 Troubleshooting

If something doesn't work:
- [ ] Check GitHub Actions logs
- [ ] Verify all secrets are set correctly
- [ ] Check Supabase logs
- [ ] Review browser console for errors
- [ ] See DEPLOYMENT_GUIDE.md for detailed troubleshooting

## 📞 Need Help?

Refer to `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.
