# Supabase Authentication Configuration

## 🚀 **Fix Slow Sign-Up Issue**

The slow sign-up is likely because email confirmation is enabled. Follow these steps:

### **Option 1: Disable Email Confirmation (Recommended for Development)**

1. Go to Supabase Dashboard
2. Click on **Authentication** → **Providers**
3. Click on **Email** provider
4. Scroll down to **"Confirm email"**
5. **UNCHECK** "Enable email confirmations"
6. Click **Save**

Now sign-ups will be instant!

---

### **Option 2: Keep Email Confirmation (Production)**

If you want to keep email confirmation for security:

1. Go to Supabase Dashboard
2. Click on **Authentication** → **Email Templates**
3. Customize the **"Confirm signup"** template
4. Make sure your email provider is configured properly

Users will need to click the link in their email before they can sign in.

---

## 🔐 **Admin Access Setup**

### **Step 1: Sign Up First**

1. Go to your website: https://www.suigeneriszim.co.zw
2. Click **Sign Up** or **Sign In**
3. Create an account with your email

### **Step 2: Make Yourself Admin**

1. Go to Supabase Dashboard
2. Click on **SQL Editor**
3. Run this SQL (replace with YOUR email):

```sql
UPDATE public.users 
SET is_admin = TRUE 
WHERE email = 'your-email@example.com';
```

4. Click **RUN**

### **Step 3: Access Admin Dashboard**

1. Refresh your website
2. Go to: https://www.suigeneriszim.co.zw/admin
3. You should now have access!

---

## ✅ **Verify Admin Status**

To check if you're an admin, run this SQL:

```sql
SELECT email, is_admin, created_at 
FROM public.users 
WHERE email = 'your-email@example.com';
```

You should see `is_admin: true`

---

## 🔧 **Troubleshooting**

### **"Access Denied" Error**

1. Make sure you're signed in
2. Check that `is_admin = TRUE` in database
3. Sign out and sign in again
4. Clear browser cache

### **Sign-Up Takes Too Long**

1. Disable email confirmation (see Option 1 above)
2. Check your internet connection
3. Check Supabase status: https://status.supabase.com

### **Can't Sign In After Sign-Up**

If email confirmation is enabled:
1. Check your email inbox
2. Click the confirmation link
3. Then try signing in

---

## 📧 **Email Provider Setup (Optional)**

For production, configure a custom email provider:

1. Go to Supabase Dashboard
2. Click on **Project Settings** → **Auth**
3. Scroll to **SMTP Settings**
4. Configure your email provider (Gmail, SendGrid, etc.)

This will make confirmation emails arrive faster and look more professional.
