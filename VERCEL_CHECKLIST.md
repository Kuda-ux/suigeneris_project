# ✅ Vercel Deployment Checklist

## 📋 Pre-Deployment

- [ ] Supabase project created: `suigeneris_project`
- [ ] GitHub repository created: `https://github.com/Kuda-ux/suigeneris_project`
- [ ] Vercel account created (sign up with GitHub)
- [ ] Code pushed to GitHub

## 🗄️ Database Setup

- [ ] Supabase Project URL copied: `_______________________________`
- [ ] Supabase Anon Key copied: `_______________________________`
- [ ] Database Connection Pooling URL copied: `_______________________________`
- [ ] Direct Connection URL copied: `_______________________________`
- [ ] `.env` file created in `apps/api/`
- [ ] Prisma migrations run: `pnpm prisma migrate deploy`
- [ ] Prisma client generated: `pnpm prisma generate`
- [ ] Database seeded: `pnpm run db:seed`

## 🎨 Frontend Deployment

- [ ] Logged into Vercel: https://vercel.com
- [ ] Clicked "Add New" → "Project"
- [ ] Imported `suigeneris_project` repository
- [ ] Set Root Directory to: `temp-app`
- [ ] Framework detected as: Next.js
- [ ] Added environment variable: `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added environment variable: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added environment variable: `NEXT_PUBLIC_API_URL` (placeholder)
- [ ] Clicked "Deploy"
- [ ] Deployment successful ✅
- [ ] Frontend URL: `_______________________________`

## 🔧 Backend Deployment

- [ ] Created new Vercel project for API
- [ ] Imported same `suigeneris_project` repository
- [ ] Set Root Directory to: `apps/api`
- [ ] Framework set to: Other
- [ ] Build Command: `pnpm run build`
- [ ] Output Directory: `dist`
- [ ] Added environment variable: `DATABASE_URL`
- [ ] Added environment variable: `DIRECT_URL`
- [ ] Generated JWT_SECRET: `_______________________________`
- [ ] Generated JWT_REFRESH_SECRET: `_______________________________`
- [ ] Added environment variable: `JWT_SECRET`
- [ ] Added environment variable: `JWT_REFRESH_SECRET`
- [ ] Added environment variable: `NODE_ENV` = `production`
- [ ] Clicked "Deploy"
- [ ] Deployment successful ✅
- [ ] Backend URL: `_______________________________`
- [ ] Tested health endpoint: `/api/health` returns `{"status":"ok"}`

## 🔗 Connect Frontend to Backend

- [ ] Opened Frontend project in Vercel
- [ ] Went to Settings → Environment Variables
- [ ] Updated `NEXT_PUBLIC_API_URL` with actual backend URL
- [ ] Saved changes
- [ ] Went to Deployments tab
- [ ] Clicked "Redeploy" on latest deployment
- [ ] Redeployment successful ✅

## ✅ Verification

### Frontend Tests
- [ ] Homepage loads: `https://your-frontend-url.vercel.app`
- [ ] Products page works
- [ ] Product details page works
- [ ] Cart functionality works
- [ ] Add to cart saves correctly
- [ ] Navigation works properly

### Admin Dashboard Tests
- [ ] Admin page accessible: `/admin`
- [ ] Login works (admin@suigeneris.com / admin123)
- [ ] Overview tab shows data
- [ ] Products tab loads
- [ ] Stock management works
- [ ] Orders tab functional
- [ ] Reports can be generated
- [ ] Analytics displays correctly

### API Tests
- [ ] Health check works: `/api/health`
- [ ] Products API responds: `/api/products`
- [ ] Authentication works
- [ ] Database queries execute
- [ ] No CORS errors in browser console

### Database Tests
- [ ] Supabase dashboard shows tables
- [ ] Products table has data
- [ ] Users table exists
- [ ] Orders table ready
- [ ] Can query data in Supabase SQL editor

## 🔐 Security

- [ ] Changed admin password from default
- [ ] JWT secrets are strong (32+ characters)
- [ ] JWT secrets are different from each other
- [ ] Environment variables not committed to Git
- [ ] `.env` files in `.gitignore`
- [ ] Supabase RLS policies reviewed

## 📊 Post-Deployment

- [ ] Custom domain added (optional)
- [ ] Vercel Analytics enabled
- [ ] Error monitoring set up
- [ ] Performance baseline recorded
- [ ] Team members added to projects
- [ ] Backup strategy planned

## 🎉 Launch Complete!

### Your Live URLs:
- **Website**: `_______________________________`
- **Admin**: `_______________________________/admin`
- **API**: `_______________________________`

### Admin Credentials:
- **Email**: admin@suigeneris.com
- **Password**: ⚠️ CHANGE THIS IMMEDIATELY!

### Next Steps:
1. Share URLs with team
2. Test all functionality thoroughly
3. Monitor error logs
4. Plan first updates
5. Celebrate! 🎊

## 📝 Notes

Use this space for important notes or issues encountered:

```
_______________________________________________________________________

_______________________________________________________________________

_______________________________________________________________________

_______________________________________________________________________
```

## 🔄 Update Workflow

To update your deployed site:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy both frontend and backend!

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Status**: ⬜ In Progress  ⬜ Complete  ⬜ Issues Found
