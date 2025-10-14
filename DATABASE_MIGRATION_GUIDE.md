# 🗄️ Database Migration Guide

This guide will help you migrate all product data from static files to your Supabase database.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Supabase project created
- ✅ Environment variables set in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ Database schema updated (run `supabase-schema-update.sql`)

---

## 🚀 Step-by-Step Migration Process

### **Step 1: Update Database Schema**

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-schema-update.sql`
5. Click **Run**

This adds the required columns:
- `rating`, `reviews`, `image`, `features`
- `original_price`, `badge`, `sku`
- Fixes `warranty` to be boolean

### **Step 2: Install Dependencies**

```bash
cd temp-app
npm install
```

This installs `tsx` which is needed to run the migration script.

### **Step 3: Set Up Environment Variables**

Create or update `temp-app/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
- Supabase Dashboard → Settings → API

### **Step 4: Run the Migration**

```bash
cd temp-app
npm run migrate
```

This will:
- ✅ Read all 200+ products from `src/data/products.ts`
- ✅ Transform them to match database schema
- ✅ Insert/update them in Supabase
- ✅ Show progress for each product
- ✅ Display a summary at the end

**Expected Output:**
```
🚀 Starting product migration...

📦 Total products to migrate: 200+

✅ Migrated: HP EliteBook x360 1030 G3 (ID: 1)
✅ Migrated: HP 250 G10 (i5) (ID: 2)
✅ Migrated: HP 250 G10 (i7) (ID: 3)
...

============================================================
📊 Migration Summary:
============================================================
✅ Successful: 200
❌ Failed: 0
📦 Total: 200

✨ Migration complete!
🎉 All done!
```

### **Step 5: Verify Migration**

1. **Check Supabase Dashboard:**
   - Go to Table Editor → products
   - You should see all 200+ products

2. **Test API Endpoint:**
   ```bash
   curl https://your-vercel-domain.vercel.app/api/products
   ```

3. **Check Health Endpoint:**
   ```bash
   curl https://your-vercel-domain.vercel.app/api/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "productsCount": 200+
   }
   ```

---

## 🎯 What Gets Migrated

### **E-Commerce Site Data:**
- ✅ All product information (name, price, description)
- ✅ Product images (main image + gallery)
- ✅ Ratings and reviews
- ✅ Categories and brands
- ✅ Stock availability
- ✅ Features and specifications
- ✅ Warranty information
- ✅ Badges (Hot, New, Sale, etc.)

### **Stock Management Data:**
- ✅ SKU codes
- ✅ Current stock levels
- ✅ Stock status (active, low-stock, out-of-stock)
- ✅ Reorder levels
- ✅ Created/Updated timestamps

---

## 🔄 How the System Works After Migration

### **E-Commerce Site:**
- Fetches products from `/api/products`
- Uses database service layer (`src/lib/database.ts`)
- Real-time stock updates
- Search and filtering from database

### **Admin Panel:**
- Fetches from `/api/admin/products`
- CRUD operations update database directly
- Stock management synced with e-commerce
- Real-time inventory tracking

### **API Endpoints Created:**
- `GET /api/products` - List all products
- `GET /api/products?category=Laptops` - Filter by category
- `GET /api/products?search=HP` - Search products
- `GET /api/products/[id]` - Get single product
- `GET /api/admin/products` - Admin product list
- `POST /api/admin/products` - Create new product
- `GET /api/health` - Database health check

---

## 🛠️ Troubleshooting

### **Issue: Migration fails with "Missing Supabase credentials"**

**Solution:**
- Check `.env.local` file exists in `temp-app/` directory
- Verify environment variables are set correctly
- Restart the migration script

### **Issue: "relation 'products' does not exist"**

**Solution:**
- Run `supabase-schema-update.sql` in Supabase SQL Editor
- Verify table exists in Table Editor

### **Issue: "column 'rating' does not exist"**

**Solution:**
- Run `supabase-schema-update.sql` to add missing columns
- Check if all ALTER TABLE statements executed successfully

### **Issue: Some products failed to migrate**

**Solution:**
- Check the error messages in migration output
- Verify data types match (e.g., price is numeric)
- Check for null values in required fields
- Re-run migration (it uses upsert, so safe to run multiple times)

---

## 📊 Database Schema

After migration, your `products` table will have:

| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `name` | varchar | Product name |
| `sku` | varchar | Stock keeping unit |
| `category` | varchar | Product category |
| `price` | numeric | Current price |
| `original_price` | numeric | Original price (for sales) |
| `description` | text | Product description |
| `brand` | varchar | Brand name |
| `stock_count` | integer | Available stock |
| `in_stock` | boolean | Stock availability |
| `images` | text[] | Image URLs array |
| `image` | text | Main image URL |
| `rating` | decimal(2,1) | Product rating (0-5) |
| `reviews` | integer | Number of reviews |
| `features` | text[] | Product features |
| `specifications` | jsonb | Technical specs |
| `warranty` | boolean | Warranty included |
| `badge` | varchar | Badge text (Hot, New, etc.) |
| `created_at` | timestamp | Creation timestamp |
| `updated_at` | timestamp | Last update timestamp |

---

## ✅ Post-Migration Checklist

- [ ] All products visible in Supabase Table Editor
- [ ] `/api/health` shows correct product count
- [ ] E-commerce site loads products from database
- [ ] Admin panel shows all products
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Product details pages load correctly
- [ ] Stock levels display correctly
- [ ] Can create new products via admin panel
- [ ] Can update existing products

---

## 🎉 Success!

Once migration is complete:
1. Your e-commerce site will use live database data
2. Admin panel will manage real inventory
3. All changes sync between admin and storefront
4. Data persists across deployments
5. Ready for production use!

---

## 📝 Notes

- Migration is **idempotent** - safe to run multiple times
- Uses **upsert** - updates existing products, inserts new ones
- **No data loss** - existing database products are preserved
- **Rollback**: If needed, simply redeploy without running migration

---

## 🆘 Need Help?

If you encounter issues:
1. Check Supabase logs (Dashboard → Logs)
2. Check Vercel function logs
3. Verify environment variables
4. Test database connection with `/api/health`
