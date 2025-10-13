# ⚡ Quick Start Guide - Deploy in 15 Minutes!

## 🎯 What You'll Get

- ✅ Website live on GitHub Pages
- ✅ Admin dashboard accessible online
- ✅ Database hosted on Supabase
- ✅ Automatic deployments on every push

## 📍 Your URLs

- **Website**: https://kuda-ux.github.io/suigeneris_project/
- **Admin**: https://kuda-ux.github.io/suigeneris_project/admin
- **GitHub Repo**: https://github.com/Kuda-ux/suigeneris_project

## 🚀 3-Step Deployment

### Step 1: Get Supabase Credentials (5 minutes)

1. Go to https://supabase.com/dashboard
2. Open your project: **suigeneris_project**
3. Click **Settings** → **API**
4. Copy these two values:
   - **Project URL**
   - **Anon public key**
5. Keep them handy!

### Step 2: Push to GitHub (2 minutes)

Open PowerShell in your project folder and run:

```powershell
.\deploy-to-github.ps1
```

Or manually:
```powershell
git init
git add .
git commit -m "Deploy Sui Generis Store"
git remote add origin https://github.com/Kuda-ux/suigeneris_project.git
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub (8 minutes)

1. **Add Secrets**:
   - Go to: https://github.com/Kuda-ux/suigeneris_project/settings/secrets/actions
   - Click **New repository secret**
   - Add:
     - Name: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: (your Supabase URL)
   - Click **Add secret**
   - Repeat for:
     - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: (your Supabase Anon Key)

2. **Enable GitHub Pages**:
   - Go to: https://github.com/Kuda-ux/suigeneris_project/settings/pages
   - Under **Source**, select **GitHub Actions**
   - Click **Save**

3. **Watch Deployment**:
   - Go to: https://github.com/Kuda-ux/suigeneris_project/actions
   - Click on the running workflow
   - Wait 2-5 minutes for completion

## ✅ Done!

Visit your live website:
**https://kuda-ux.github.io/suigeneris_project/**

## 🔐 Admin Access

- URL: https://kuda-ux.github.io/suigeneris_project/admin
- Email: admin@suigeneris.com
- Password: admin123

⚠️ **Change this password immediately after first login!**

## 🔄 Update Your Site

Whenever you make changes:

```powershell
git add .
git commit -m "Your update message"
git push origin main
```

GitHub will automatically rebuild and redeploy!

## 📚 Need More Help?

- **Detailed Guide**: See `DEPLOYMENT_GUIDE.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Troubleshooting**: Check the guides above

## 🎉 Congratulations!

Your Sui Generis Store is now live and accessible to the world!
