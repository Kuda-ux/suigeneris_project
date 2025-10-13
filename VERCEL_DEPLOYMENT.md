# 🚀 Vercel Deployment Guide - Complete Setup

## 🎯 What You'll Deploy

- ✅ **Frontend (Next.js)** - Main website + Admin dashboard
- ✅ **Backend (NestJS API)** - Full REST API with authentication
- ✅ **Database (Supabase)** - PostgreSQL database

## 📍 Your Live URLs (After Deployment)

- **Frontend**: `https://suigeneris-project.vercel.app`
- **Backend API**: `https://suigeneris-api.vercel.app`
- **Admin Dashboard**: `https://suigeneris-project.vercel.app/admin`

---

## 🗄️ Part 1: Set Up Supabase Database (10 minutes)

### Step 1.1: Get Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Open your project: **suigeneris_project**
3. Go to **Settings** → **API**
4. Copy and save these:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: `eyJxxx...`

### Step 1.2: Get Database Connection Strings

1. Go to **Settings** → **Database**
2. Scroll to **Connection String** section
3. Select **Connection Pooling** (for Prisma)
4. Copy the string and replace `[YOUR-PASSWORD]` with your database password
5. Save as: **DATABASE_URL**

Example:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

6. Also copy the **Direct Connection** string
7. Save as: **DIRECT_URL**

### Step 1.3: Set Up Database Schema

1. Open terminal in project root
2. Create `.env` file in `apps/api/` folder:

```bash
DATABASE_URL="your_connection_pooling_string_here"
DIRECT_URL="your_direct_connection_string_here"
```

3. Run migrations:

```bash
cd apps/api
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run db:seed
```

---

## 🌐 Part 2: Push to GitHub (5 minutes)

### Step 2.1: Initialize Git

```bash
# In project root
git init
git add .
git commit -m "Initial commit: Sui Generis Store"
```

### Step 2.2: Push to GitHub

```bash
git remote add origin https://github.com/Kuda-ux/suigeneris_project.git
git branch -M main
git push -u origin main
```

---

## 🎨 Part 3: Deploy Frontend to Vercel (10 minutes)

### Step 3.1: Sign Up/Login to Vercel

1. Go to https://vercel.com
2. Click **Sign Up** (or **Login**)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 3.2: Import Frontend Project

1. Click **Add New** → **Project**
2. Find and select: **suigeneris_project**
3. Click **Import**

### Step 3.3: Configure Frontend

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: Click **Edit** → Select `temp-app`

**Build Settings**:
- Build Command: `pnpm run build`
- Output Directory: `.next` (auto-detected)
- Install Command: `pnpm install`

### Step 3.4: Add Environment Variables

Click **Environment Variables** and add:

| Name | Value | Notes |
|------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | From Step 1.1 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key | From Step 1.1 |
| `NEXT_PUBLIC_API_URL` | `https://suigeneris-api.vercel.app` | We'll deploy API next |

**Important**: Leave `NEXT_PUBLIC_API_URL` as placeholder for now. We'll update it after deploying the backend.

### Step 3.5: Deploy Frontend

1. Click **Deploy**
2. Wait 2-5 minutes for build to complete
3. Once done, you'll see: ✅ **Production Deployment Ready**
4. Click **Visit** to see your live site!

Your frontend URL will be something like:
```
https://suigeneris-project-xxxxx.vercel.app
```

---

## 🔧 Part 4: Deploy Backend API to Vercel (10 minutes)

### Step 4.1: Create New Project for API

1. Go back to Vercel dashboard
2. Click **Add New** → **Project**
3. Select **suigeneris_project** again (yes, same repo!)
4. Click **Import**

### Step 4.2: Configure Backend

**Framework Preset**: Other

**Root Directory**: Click **Edit** → Select `apps/api`

**Build Settings**:
- Build Command: `pnpm run build`
- Output Directory: `dist`
- Install Command: `pnpm install`

### Step 4.3: Add Backend Environment Variables

Click **Environment Variables** and add:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | Your Supabase Connection Pooling URL | From Step 1.2 |
| `DIRECT_URL` | Your Supabase Direct Connection URL | From Step 1.2 |
| `JWT_SECRET` | Generate random string | See below |
| `JWT_REFRESH_SECRET` | Generate different random string | See below |
| `NODE_ENV` | `production` | Required |
| `PORT` | `3000` | Optional |

**Generate JWT Secrets**:
```bash
# Run these commands to generate secure secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4.4: Deploy Backend

1. Click **Deploy**
2. Wait 3-5 minutes for build to complete
3. Once done, copy your API URL (e.g., `https://suigeneris-api-xxxxx.vercel.app`)

### Step 4.5: Test Backend

Visit: `https://your-api-url.vercel.app/api/health`

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

---

## 🔗 Part 5: Connect Frontend to Backend (5 minutes)

### Step 5.1: Update Frontend Environment Variable

1. Go to your **Frontend project** in Vercel
2. Click **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_API_URL`
4. Click **Edit**
5. Update value to your actual API URL: `https://your-api-url.vercel.app`
6. Click **Save**

### Step 5.2: Redeploy Frontend

1. Go to **Deployments** tab
2. Click the three dots (**...**) on the latest deployment
3. Click **Redeploy**
4. Wait for redeployment to complete

---

## ✅ Part 6: Verify Everything Works (5 minutes)

### Test Frontend

1. Visit your frontend URL
2. Check homepage loads
3. Browse products
4. Add items to cart
5. Test cart functionality

### Test Admin Dashboard

1. Go to: `https://your-frontend-url.vercel.app/admin`
2. Login with:
   - Email: `admin@suigeneris.com`
   - Password: `admin123`
3. Verify all tabs work:
   - Overview
   - Products
   - Stock Management
   - Orders
   - Reports
   - Analytics

### Test API Integration

1. Try adding products to cart (should save to database)
2. Create a test order
3. Check if data appears in Supabase dashboard

---

## 🎉 Success! Your Store is Live!

### Your Live URLs:

- **Website**: `https://your-frontend-url.vercel.app`
- **Admin**: `https://your-frontend-url.vercel.app/admin`
- **API**: `https://your-api-url.vercel.app`

---

## 🔄 Updating Your Site

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both frontend and backend will redeploy automatically!

### Manual Redeploy

1. Go to Vercel dashboard
2. Select your project
3. Go to **Deployments** tab
4. Click **Redeploy** on any deployment

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: 404 errors on page refresh

**Solution**: Vercel handles this automatically for Next.js. If issues persist:
1. Check `next.config.js` is correct
2. Verify no `output: 'export'` in config
3. Redeploy

**Problem**: Images not loading

**Solution**:
1. Check Supabase URL in environment variables
2. Verify image domains in `next.config.js`
3. Use Next.js Image component properly

**Problem**: API calls failing

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check API is deployed and running
3. Test API endpoint directly: `your-api-url/api/health`

### Backend Issues

**Problem**: Database connection errors

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check Supabase project is active
3. Ensure password in connection string is correct
4. Try using connection pooling URL

**Problem**: 500 Internal Server Error

**Solution**:
1. Check Vercel function logs (Settings → Functions)
2. Verify all environment variables are set
3. Check Prisma schema is up to date
4. Run migrations: `pnpm prisma migrate deploy`

**Problem**: JWT errors

**Solution**:
1. Verify `JWT_SECRET` and `JWT_REFRESH_SECRET` are set
2. Make sure they're different values
3. Check they're long enough (32+ characters)

### Database Issues

**Problem**: Tables not created

**Solution**:
```bash
cd apps/api
pnpm prisma migrate deploy
pnpm prisma generate
```

**Problem**: No data in database

**Solution**:
```bash
cd apps/api
pnpm run db:seed
```

---

## 📊 Monitoring Your Deployment

### Vercel Analytics

1. Go to your project in Vercel
2. Click **Analytics** tab
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Function Logs

1. Go to **Settings** → **Functions**
2. View real-time logs
3. Debug API issues

### Supabase Monitoring

1. Go to Supabase dashboard
2. Click **Database** → **Logs**
3. Monitor queries and connections

---

## 🔐 Security Checklist

- [ ] Change admin password after first login
- [ ] Set strong JWT secrets (32+ characters)
- [ ] Enable Supabase RLS (Row Level Security)
- [ ] Add rate limiting in API
- [ ] Use HTTPS only (Vercel does this automatically)
- [ ] Keep dependencies updated
- [ ] Monitor error logs regularly

---

## 💰 Cost Breakdown (Free Tier)

### Vercel
- **Hobby Plan**: FREE
- Includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Global CDN

### Supabase
- **Free Plan**: FREE
- Includes:
  - 500MB database
  - 1GB file storage
  - 2GB bandwidth
  - 50,000 monthly active users

**Total Cost**: $0/month! 🎉

---

## 📞 Need Help?

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### Supabase Support
- Docs: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions

### Project Issues
- Check GitHub Issues
- Review deployment logs
- Test locally first

---

## 🎓 Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Email Setup**: Configure email notifications
3. **Payment Integration**: Add Stripe/PayPal for real payments
4. **SEO Optimization**: Add meta tags and sitemap
5. **Performance**: Enable Vercel Analytics
6. **Monitoring**: Set up error tracking (Sentry)

---

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
JWT_SECRET=your-32-char-secret-here
JWT_REFRESH_SECRET=your-different-32-char-secret
NODE_ENV=production
PORT=3000
```

---

Congratulations! 🎉 Your Sui Generis Store is now live on Vercel with full functionality!
