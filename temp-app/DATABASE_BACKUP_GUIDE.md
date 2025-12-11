# Supabase Database Backup & Protection Guide

## ⚠️ Important: Supabase Free Tier Limitations

Supabase free tier projects:
- **Pause after 1 week** of inactivity
- **May be deleted** after extended inactivity (90+ days)
- Limited to 500MB database size
- Limited to 2 projects

---

## 🛡️ Solution 1: Keep-Alive Endpoint (Prevents Pausing)

We've created an API endpoint that keeps your database active.

### Endpoint URL
```
https://www.suigeneriszim.co.zw/api/keep-alive
```

### How to Use

#### Option A: Free Cron Service (Recommended)
Use a free service like **cron-job.org** or **UptimeRobot**:

1. Go to https://cron-job.org (free account)
2. Create a new cron job:
   - **URL**: `https://www.suigeneriszim.co.zw/api/keep-alive`
   - **Schedule**: Every 3 days (or daily for safety)
   - **Method**: GET
3. Save and activate

#### Option B: GitHub Actions (Free)
Create `.github/workflows/keep-alive.yml`:
```yaml
name: Keep Supabase Alive
on:
  schedule:
    - cron: '0 0 */3 * *'  # Every 3 days
  workflow_dispatch:  # Manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Database
        run: curl -s https://www.suigeneriszim.co.zw/api/keep-alive
```

#### Option C: Manual
Visit the URL in your browser every few days:
```
https://www.suigeneriszim.co.zw/api/keep-alive
```

---

## 💾 Solution 2: Local Database Backups

### Prerequisites
```bash
cd temp-app
npm install dotenv
```

### Running a Backup

```bash
cd temp-app
node scripts/backup-database.js
```

This will:
- Create a `backups/` folder
- Export all tables to JSON files
- Generate a backup summary

### Backup Location
```
temp-app/
  backups/
    backup-2024-01-15T10-30-00-000Z/
      products.json
      users.json
      orders.json
      order_items.json
      loan_applications.json
      inventory.json
      cart.json
      _backup-summary.json
```

### Restoring from Backup

```bash
cd temp-app
node scripts/restore-database.js backup-2024-01-15T10-30-00-000Z
```

---

## 📅 Recommended Backup Schedule

| Frequency | Action |
|-----------|--------|
| **Daily** | Keep-alive ping (automated) |
| **Weekly** | Manual backup to local machine |
| **Monthly** | Copy backups to external drive/cloud |

---

## 🔄 Alternative: Upgrade to Supabase Pro

For $25/month, Supabase Pro offers:
- ✅ No project pausing
- ✅ Daily automatic backups
- ✅ 8GB database size
- ✅ Point-in-time recovery

---

## 📋 Quick Backup Checklist

- [ ] Set up cron-job.org to ping keep-alive endpoint
- [ ] Run backup script weekly
- [ ] Store backups in multiple locations:
  - [ ] Local machine
  - [ ] External hard drive
  - [ ] Cloud storage (Google Drive, Dropbox)
- [ ] Test restore process occasionally

---

## 🆘 Emergency Recovery

If your Supabase project gets paused:
1. Log into Supabase Dashboard
2. Click "Restore Project"
3. Wait for restoration (usually instant)

If project is deleted:
1. Create new Supabase project
2. Run database schema setup (supabase-setup.sql)
3. Use restore script with latest backup

---

## 📞 Contact

For assistance with database issues:
- WhatsApp: +263 78 411 6938
- Email: Check Supabase dashboard for notifications
