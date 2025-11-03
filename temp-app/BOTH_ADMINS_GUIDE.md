# 👥 Make BOTH Users Admin

## 🎯 **Admin Users**

1. **evertonmasiiwa14@gmail.com** ✅
2. **kudakwasher8@gmail.com** ✅

---

## ⚡ **QUICK FIX** (2 minutes)

### **Step 1: Open Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"**
4. Click **"New Query"**

---

### **Step 2: Run This SQL**

```sql
-- Make BOTH users admin
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'evertonmasiiwa14@gmail.com';

UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'kudakwasher8@gmail.com';

-- Verify both admins
SELECT 
  email,
  role,
  is_admin,
  CASE 
    WHEN is_admin = true THEN '✅ ADMIN'
    ELSE '❌ NOT ADMIN'
  END as status
FROM public.users
WHERE email IN ('evertonmasiiwa14@gmail.com', 'kudakwasher8@gmail.com')
ORDER BY email;
```

---

### **Step 3: Expected Result**

```
email                      | role  | is_admin | status
---------------------------|-------|----------|----------
evertonmasiiwa14@gmail.com | admin | true     | ✅ ADMIN
kudakwasher8@gmail.com     | admin | true     | ✅ ADMIN
```

---

## ✅ **After Running SQL**

### **For BOTH Users**:

1. **Log out** completely
2. **Clear browser cache**: `Ctrl + Shift + Delete`
3. **Close all tabs**
4. **Restart browser**
5. **Log back in**
6. **Go to**: https://www.suigeneriszim.co.zw/admin
7. **Both should have full admin access!** ✅

---

## 🔍 **Verify All Admins**

To see all admin users in your system:

```sql
SELECT 
  email,
  role,
  is_admin,
  full_name,
  created_at
FROM public.users
WHERE is_admin = true
ORDER BY email;
```

---

## 📊 **Admin Permissions**

Both users will have access to:
- ✅ Admin Dashboard
- ✅ Product Management
- ✅ Order Management
- ✅ Loan Applications Review
- ✅ Stock Management
- ✅ Reports & Analytics
- ✅ Invoice & Quotation Generation
- ✅ User Management
- ✅ All admin features

---

## 🚨 **Important Notes**

1. **Both users must sign up first** before you can make them admin
2. **Both must log out and back in** after SQL update
3. **Clear cache** for changes to take effect
4. **Wait 1-2 minutes** for changes to propagate

---

## 🎯 **To Add More Admins Later**

Just add another UPDATE statement:

```sql
UPDATE public.users
SET 
  role = 'admin',
  is_admin = true,
  updated_at = NOW()
WHERE email = 'newemail@example.com';
```

---

## ✅ **Checklist**

- [ ] Ran SQL for evertonmasiiwa14@gmail.com
- [ ] Ran SQL for kudakwasher8@gmail.com
- [ ] Verified both users are admin
- [ ] Both users logged out
- [ ] Both users cleared cache
- [ ] Both users logged back in
- [ ] Both can access /admin
- [ ] Both have full admin features

---

**File**: `MAKE_BOTH_ADMINS.sql`  
**Time**: 2 minutes  
**Result**: 2 admins with full access! ✅
