# 👤 Make evertonmasiiwa14@gmail.com an Admin

## 🎯 Quick Steps

### **Step 1: User Must Sign Up First**

The user **must create an account** on your website before you can make them admin.

1. **Go to**: https://www.suigeneriszim.co.zw
2. **Click** "Sign In" or "Sign Up"
3. **Register** with email: `evertonmasiiwa14@gmail.com`
4. **Verify** the email (check inbox for Supabase verification email)
5. **Complete** the signup process

⚠️ **IMPORTANT**: The user MUST sign up first. You cannot make someone admin if they don't have an account!

---

### **Step 2: Grant Admin Access in Supabase**

After the user has signed up:

1. **Go to**: https://supabase.com/dashboard
2. **Select** your project: `suigeneris_project`
3. **Click** "SQL Editor" in the left sidebar
4. **Click** "New Query"
5. **Copy and paste** this SQL:

```sql
-- Make evertonmasiiwa14@gmail.com an admin
DO $$
DECLARE
  user_id_var uuid;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO user_id_var
  FROM auth.users
  WHERE email = 'evertonmasiiwa14@gmail.com';

  IF user_id_var IS NULL THEN
    RAISE NOTICE 'User not found. They need to sign up first.';
  ELSE
    -- Update or insert the user profile with admin role
    INSERT INTO public.users (id, email, role, is_admin, created_at, updated_at)
    VALUES (
      user_id_var,
      'evertonmasiiwa14@gmail.com',
      'admin',
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET
      role = 'admin',
      is_admin = true,
      updated_at = NOW();

    RAISE NOTICE 'Successfully granted admin access!';
  END IF;
END $$;
```

6. **Click** "Run" (or press F5)
7. **Check** the output - should say "Successfully granted admin access!"

---

### **Step 3: Verify Admin Access**

Run this query to verify:

```sql
SELECT 
  u.id,
  u.email,
  p.role,
  p.is_admin,
  p.created_at
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'evertonmasiiwa14@gmail.com';
```

**Expected Result**:
```
email: evertonmasiiwa14@gmail.com
role: admin
is_admin: true
```

---

### **Step 4: Test Admin Access**

1. **Log in** as `evertonmasiiwa14@gmail.com`
2. **Go to**: https://www.suigeneriszim.co.zw/admin
3. **You should see** the admin dashboard ✅

---

## 🔧 **Alternative Method: Direct Database Update**

If you prefer to use the Supabase Table Editor:

1. **Go to**: Supabase Dashboard → Table Editor
2. **Select** `auth.users` table
3. **Find** the user with email `evertonmasiiwa14@gmail.com`
4. **Copy** their `id` (UUID)
5. **Go to** `public.users` table
6. **Insert** or **Update** a row:
   - `id`: [paste the UUID from step 4]
   - `email`: `evertonmasiiwa14@gmail.com`
   - `role`: `admin`
   - `is_admin`: `true`
   - `created_at`: `now()`
   - `updated_at`: `now()`
7. **Save**

---

## 🚨 **Troubleshooting**

### **Issue 1: "User not found"**
**Cause**: User hasn't signed up yet  
**Solution**: User must create account first at your website

### **Issue 2: "Table 'users' does not exist"**
**Cause**: Database schema not set up  
**Solution**: Run the main database setup script first

### **Issue 3: "Still can't access admin dashboard"**
**Cause**: User needs to log out and log back in  
**Solution**: 
1. Log out completely
2. Clear browser cache
3. Log back in
4. Try accessing `/admin` again

### **Issue 4: "Permission denied"**
**Cause**: Row Level Security (RLS) policies  
**Solution**: Check RLS policies on `users` table allow admin access

---

## 📋 **Admin Permissions**

Once made admin, `evertonmasiiwa14@gmail.com` will have access to:

- ✅ Admin Dashboard (`/admin`)
- ✅ Product Management
- ✅ Order Management
- ✅ Loan Applications Review
- ✅ Stock Management
- ✅ Reports & Analytics
- ✅ Invoice & Quotation Generation
- ✅ User Management
- ✅ All admin features

---

## 🔒 **Security Notes**

### **Admin Privileges**:
- Can view all orders
- Can approve/reject loan applications
- Can manage products and inventory
- Can view customer data
- Can generate reports

### **Best Practices**:
1. Only grant admin to trusted users
2. Use strong passwords
3. Enable 2FA if available
4. Regularly review admin users
5. Remove admin access when no longer needed

---

## 📝 **To Add More Admins Later**

Just replace the email in the SQL query:

```sql
WHERE email = 'newemail@example.com';
```

And in the INSERT/UPDATE:

```sql
VALUES (
  user_id_var,
  'newemail@example.com',  -- Change this
  'admin',
  true,
  NOW(),
  NOW()
)
```

---

## ✅ **Checklist**

- [ ] User signed up at website
- [ ] User verified email
- [ ] Ran SQL query in Supabase
- [ ] Verified admin status in database
- [ ] User logged out and back in
- [ ] User can access `/admin` dashboard
- [ ] All admin features working

---

## 🎉 **Success!**

Once completed, `evertonmasiiwa14@gmail.com` will have full admin access to your Sui Generis Technologies admin dashboard!

---

**File Location**: `temp-app/make-admin.sql`  
**Run In**: Supabase SQL Editor  
**Time Required**: 2 minutes  
**Difficulty**: Easy
