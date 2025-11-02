# 📧 Automated Email Notifications Setup Guide

## 🎯 Overview

Your loan application system now sends **automatic emails** to:
1. ✅ **Applicants** - Confirmation when they submit
2. ✅ **Applicants** - Status updates (approved/rejected/under review)
3. ✅ **Admin** - Notification when new application is received

---

## 🚀 **Setup Steps**

### **Step 1: Create Resend Account** (FREE - 3,000 emails/month)

1. **Go to**: https://resend.com
2. **Sign up** with your email
3. **Verify** your email address
4. **Go to Dashboard**

### **Step 2: Get API Key**

1. In Resend Dashboard, click **"API Keys"**
2. Click **"Create API Key"**
3. Name it: `Sui Generis Production`
4. **Copy the API key** (starts with `re_...`)

### **Step 3: Add API Key to Vercel**

1. Go to **Vercel Dashboard**: https://vercel.com
2. Select your project: `suigeneris_project`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   ```
   Name: RESEND_API_KEY
   Value: re_your_api_key_here
   Environment: Production, Preview, Development
   ```
6. Click **"Save"**

### **Step 4: Verify Domain (IMPORTANT)**

To send emails from `@suigeneriszim.co.zw`, you need to verify your domain:

#### **Option A: Use Resend's Domain (Quick Start)**
For testing, use: `noreply@resend.dev`
- ✅ Works immediately
- ✅ No setup required
- ⚠️ Shows "via resend.dev" in inbox

#### **Option B: Verify Your Domain (Recommended)**

1. In Resend Dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `suigeneriszim.co.zw`
4. Resend will show DNS records to add

**DNS Records to Add** (in your domain registrar):

```
Type: TXT
Name: @
Value: [Resend will provide]

Type: CNAME  
Name: resend._domainkey
Value: [Resend will provide]

Type: MX
Name: @
Value: [Resend will provide]
Priority: 10
```

5. Add these records to your domain DNS settings
6. Wait 24-48 hours for verification
7. Once verified, emails will come from `@suigeneriszim.co.zw`

---

## 📧 **Email Templates**

### **1. Application Confirmation Email**

**Sent to**: Applicant  
**When**: Immediately after submission  
**Subject**: `Application Received - LA-12345678`

**Contains**:
- ✅ Success confirmation
- ✅ Application number
- ✅ Product details
- ✅ Loan term
- ✅ Next steps (48-hour review)
- ✅ Contact information

### **2. Status Update Email**

**Sent to**: Applicant  
**When**: Admin changes application status  
**Subject**: `Application Approved/Rejected - LA-12345678`

**Status Types**:
- ✅ **Approved** - Green badge, congratulations message
- ❌ **Rejected** - Red badge, contact us message
- 🔍 **Under Review** - Orange badge, in-progress message
- 📋 **Pending** - Blue badge, waiting message

**Contains**:
- Status badge with color
- Application number
- Admin notes (if any)
- Next steps
- Contact information

### **3. Admin Notification Email**

**Sent to**: `info@suigeneriszim.co.zw`  
**When**: New application submitted  
**Subject**: `🔔 New Loan Application - LA-12345678`

**Contains**:
- Applicant details
- Product information
- Loan amount and term
- Action required notice
- Link to admin dashboard

---

## 🎨 **Email Design Features**

### **Professional Design**:
- ✅ Sui Generis branding (red gradient header)
- ✅ Responsive (works on mobile)
- ✅ Clean, modern layout
- ✅ Color-coded status badges
- ✅ Clear call-to-actions
- ✅ Contact information footer

### **Email Sections**:
1. **Header** - Red gradient with logo
2. **Status Badge** - Visual indicator
3. **Main Content** - Details and message
4. **Info Box** - Application details table
5. **Next Steps** - Action items
6. **Contact Section** - Phone, email, address
7. **Footer** - Copyright and disclaimer

---

## 🔧 **Technical Implementation**

### **Files Created**:

1. **`src/lib/email.ts`** - Email service with 3 functions:
   - `sendApplicationConfirmationEmail()` - Applicant confirmation
   - `sendApplicationStatusUpdateEmail()` - Status updates
   - `sendAdminNotificationEmail()` - Admin alerts

2. **`src/app/api/loan-applications/route.ts`** - Updated to:
   - Send confirmation email on POST
   - Send status update email on PATCH
   - Send admin notification on POST

### **Email Flow**:

```
1. User submits application
   ↓
2. Application saved to database
   ↓
3. Email sent to applicant (confirmation)
   ↓
4. Email sent to admin (notification)
   ↓
5. Admin reviews in dashboard
   ↓
6. Admin updates status (approve/reject)
   ↓
7. Email sent to applicant (status update)
```

---

## 📊 **Email Limits & Pricing**

### **Resend Free Tier**:
- ✅ **3,000 emails/month** - FREE
- ✅ **100 emails/day** - FREE
- ✅ Unlimited domains
- ✅ API access
- ✅ Email logs
- ✅ Webhooks

### **Estimated Usage**:
- **Per Application**: 2 emails (confirmation + admin notification)
- **Per Status Update**: 1 email
- **Monthly Capacity**: ~1,000 applications (well within limit)

### **If You Need More**:
- **Pro Plan**: $20/month for 50,000 emails
- **Business Plan**: $80/month for 100,000 emails

---

## ✅ **Testing the Emails**

### **Test 1: Submit Application**

1. Go to: https://www.suigeneriszim.co.zw/loan-application
2. Fill out the form with **your real email**
3. Submit the application
4. **Check your inbox** for confirmation email
5. **Check** `info@suigeneriszim.co.zw` for admin notification

### **Test 2: Status Update**

1. Go to admin dashboard
2. Find the test application
3. Change status to "Approved"
4. Add admin notes (optional)
5. Save changes
6. **Check applicant's email** for status update

### **Expected Results**:
- ✅ Emails arrive within 1-2 seconds
- ✅ Professional design
- ✅ All details correct
- ✅ Links work
- ✅ Mobile-friendly

---

## 🐛 **Troubleshooting**

### **Issue 1: Emails Not Sending**

**Check**:
1. ✅ `RESEND_API_KEY` is set in Vercel
2. ✅ API key is correct (starts with `re_`)
3. ✅ Environment variables are saved
4. ✅ Redeployed after adding env vars

**Solution**:
```bash
# Redeploy to apply environment variables
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

### **Issue 2: Emails Go to Spam**

**Causes**:
- Using `@resend.dev` domain
- Domain not verified
- No SPF/DKIM records

**Solution**:
1. Verify your domain in Resend
2. Add DNS records (SPF, DKIM, DMARC)
3. Wait 24-48 hours for propagation
4. Test again

### **Issue 3: Wrong Email Address**

**Check**:
- Admin email in `email.ts` line 458: `info@suigeneriszim.co.zw`
- Applicant email from form data
- Email format is valid

**Solution**:
Update admin email in `src/lib/email.ts`:
```typescript
to: ['your-admin-email@example.com'],
```

### **Issue 4: Email Formatting Issues**

**Check**:
- HTML renders correctly
- Images load
- Links work
- Mobile responsive

**Solution**:
Test emails at: https://www.mail-tester.com

---

## 📝 **Customization**

### **Change Email Content**:

Edit `src/lib/email.ts`:

```typescript
// Change subject line
subject: `Your Custom Subject - ${application_number}`,

// Change message
message = 'Your custom message here';

// Change colors
statusColor = '#your-color-code';
```

### **Change Admin Email**:

Line 458 in `src/lib/email.ts`:
```typescript
to: ['your-admin-email@example.com'],
```

### **Add CC/BCC**:

```typescript
to: ['applicant@example.com'],
cc: ['manager@example.com'],
bcc: ['records@example.com'],
```

### **Add Attachments**:

```typescript
attachments: [
  {
    filename: 'terms.pdf',
    path: '/path/to/terms.pdf',
  },
],
```

---

## 🔒 **Security Best Practices**

### **Environment Variables**:
- ✅ Never commit API keys to Git
- ✅ Use Vercel environment variables
- ✅ Different keys for dev/prod
- ✅ Rotate keys periodically

### **Email Content**:
- ✅ Don't include sensitive data (passwords, full card numbers)
- ✅ Use application numbers instead of IDs
- ✅ Sanitize user input
- ✅ Use HTTPS links only

### **Rate Limiting**:
- ✅ Resend has built-in rate limits
- ✅ Monitor usage in dashboard
- ✅ Set up alerts for high usage

---

## 📈 **Monitoring & Analytics**

### **Resend Dashboard**:
- View all sent emails
- Check delivery status
- See open rates (if enabled)
- Track bounces and complaints
- View error logs

### **Metrics to Monitor**:
- ✅ Emails sent per day
- ✅ Delivery rate (should be >95%)
- ✅ Bounce rate (should be <5%)
- ✅ Complaint rate (should be <0.1%)

### **Set Up Webhooks** (Optional):
Track email events:
- `email.sent` - Email sent successfully
- `email.delivered` - Email delivered to inbox
- `email.bounced` - Email bounced
- `email.complained` - Marked as spam

---

## 🎯 **Next Steps**

### **Immediate**:
1. ✅ Create Resend account
2. ✅ Get API key
3. ✅ Add to Vercel environment variables
4. ✅ Redeploy application
5. ✅ Test with real application

### **Within 24 Hours**:
1. ✅ Verify domain in Resend
2. ✅ Add DNS records
3. ✅ Test email delivery
4. ✅ Check spam score

### **Ongoing**:
1. ✅ Monitor email delivery
2. ✅ Check admin notifications daily
3. ✅ Respond to applicants within 48 hours
4. ✅ Review email logs weekly

---

## 📞 **Support**

### **Resend Support**:
- **Docs**: https://resend.com/docs
- **Email**: support@resend.com
- **Discord**: https://resend.com/discord

### **Common Questions**:

**Q: How long does domain verification take?**  
A: 24-48 hours after adding DNS records

**Q: Can I use Gmail/Outlook?**  
A: Not recommended. Use Resend for transactional emails.

**Q: What if I exceed 3,000 emails?**  
A: Upgrade to Pro plan ($20/month for 50,000 emails)

**Q: Can I customize the email design?**  
A: Yes! Edit the HTML in `src/lib/email.ts`

**Q: Are emails GDPR compliant?**  
A: Yes, Resend is GDPR compliant. Include unsubscribe link if needed.

---

## ✅ **Checklist**

### **Setup**:
- [ ] Created Resend account
- [ ] Got API key
- [ ] Added to Vercel environment variables
- [ ] Redeployed application
- [ ] Tested with real email

### **Domain Verification** (Optional but Recommended):
- [ ] Added domain to Resend
- [ ] Added DNS records
- [ ] Waited for verification
- [ ] Tested email delivery

### **Testing**:
- [ ] Submitted test application
- [ ] Received confirmation email
- [ ] Admin received notification
- [ ] Updated application status
- [ ] Received status update email

### **Production**:
- [ ] Emails sending successfully
- [ ] No spam issues
- [ ] Admin monitoring notifications
- [ ] Response time < 48 hours

---

**Status**: ✅ **READY TO DEPLOY**  
**Email Service**: Resend  
**Cost**: FREE (up to 3,000 emails/month)  
**Setup Time**: 10 minutes  
**Emails**: 3 types (confirmation, status update, admin notification)
