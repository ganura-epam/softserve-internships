# EmailJS Setup Guide for SoftServe Internships

## Overview

EmailJS allows you to send emails with resume attachments directly from your website - completely FREE for up to 200 emails/month!

**What you'll get:**
- ✅ Direct resume file upload (PDF/DOC, up to 2MB)
- ✅ Drag & drop support
- ✅ Emails sent to ganura@gmail.com with resume attached
- ✅ Uses your Gmail account securely
- ✅ No backend server needed
- ✅ 100% FREE (200 emails/month)

---

## Setup Steps (15 minutes)

### Step 1: Create EmailJS Account (2 minutes)

1. Go to: https://www.emailjs.com/
2. Click **Sign Up** (top right)
3. Choose **Sign up with Google** (use ganura@gmail.com)
4. Verify your email if prompted

---

### Step 2: Add Email Service (3 minutes)

1. After login, go to: https://dashboard.emailjs.com/admin
2. Click **Email Services** in left sidebar
3. Click **Add New Service** button
4. Select **Gmail**
5. Click **Connect Account**
6. Sign in with your Gmail account (ganura@gmail.com)
7. Click **Allow** to grant permissions
8. Service will be created with ID like: `service_xxxxxxx`
9. **COPY the Service ID** - you'll need it later

---

### Step 3: Create Email Template (5 minutes)

1. Click **Email Templates** in left sidebar
2. Click **Create New Template**
3. Delete the default content
4. **Copy and paste this template:**

```
Subject: New Internship Application - {{track}} - {{from_name}}

Hello,

You have received a new internship application:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPLICANT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
College: {{college}}
Year: {{year}}
Preferred Track: {{track}}
CGPA/Percentage: {{cgpa}}

Why join SoftServe:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Resume is attached to this email.

---
This application was submitted via SoftServe Internships website.
```

5. **Important Settings:**
   - **To email:** `ganura@gmail.com`
   - **From name:** `{{from_name}}`
   - **From email:** Leave as default or set to `noreply@emailjs.com`
   - **Reply to:** `{{from_email}}`

6. Click **Settings** tab (top)
7. Enable **Attachments** toggle
8. In the attachments field, enter: `resume_file`
9. Template ID will be shown (like: `template_xxxxxxx`)
10. **COPY the Template ID** - you'll need it later
11. Click **Save**

---

### Step 4: Get Your Public Key (1 minute)

1. Click **Account** in left sidebar
2. Click **General** tab
3. Find **Public Key** section
4. **COPY the Public Key** (looks like: `xxxxxxxxxxxxx`)

---

### Step 5: Update Website Code (5 minutes)

Now update your website with the 3 IDs you copied:

1. Open: `js/main.js` in your code editor
2. Find line 5 and replace:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
   with:
   ```javascript
   emailjs.init("xxxxxxxxxxxxx"); // Paste your Public Key here
   ```

3. Find around line 112 and replace:
   ```javascript
   const response = await emailjs.send(
       'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
       'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
       templateParams
   );
   ```
   with:
   ```javascript
   const response = await emailjs.send(
       'service_xxxxxxx',  // Paste your Service ID
       'template_xxxxxxx', // Paste your Template ID
       templateParams
   );
   ```

4. Save the file

---

### Step 6: Test the Setup

1. Open `index.html` in a browser locally (or wait for GitHub Pages deployment)
2. Fill out the application form
3. Upload a test PDF resume (drag & drop or click to browse)
4. Click **Submit Application**
5. Wait 10-15 seconds
6. Check ganura@gmail.com inbox (check spam folder too on first try)
7. You should receive an email with the resume attached!

---

## Configuration Summary

You need to replace 3 values in `js/main.js`:

| Placeholder | Replace With | Where to Find |
|------------|-------------|---------------|
| `YOUR_PUBLIC_KEY` | Your Public Key | Account → General |
| `YOUR_SERVICE_ID` | Service ID (service_xxx) | Email Services → Gmail |
| `YOUR_TEMPLATE_ID` | Template ID (template_xxx) | Email Templates → Your template |

---

## Important Notes

### File Size Limits
- Maximum 2MB per resume
- Only PDF, DOC, DOCX files accepted
- Validation happens before submission

### Email Limits (FREE Plan)
- 200 emails per month
- 500 requests per day
- If you need more, upgrade to paid plan ($9/month for 1,000 emails)

### Security
- Your Gmail credentials are NOT in the code
- EmailJS connects to your Gmail via OAuth (secure)
- Public Key is safe to expose (it's meant to be public)
- Only your domain can use it (configure allowed domains in EmailJS)

### Domain Restrictions (Recommended)
1. In EmailJS Dashboard → Account → Security
2. Add allowed domain: `ganura-epam.github.io`
3. This prevents others from using your EmailJS account

---

## Troubleshooting

### Issue: Email not received
**Solutions:**
- Check spam/junk folder
- Verify Service ID and Template ID are correct in code
- Check EmailJS dashboard → **Logs** for error messages
- Ensure Gmail service is connected (green status)

### Issue: "Failed to send application" error
**Solutions:**
- Open browser console (F12) and check for errors
- Verify Public Key is correct
- Check file size is under 2MB
- Ensure internet connection is stable

### Issue: Attachment not included
**Solutions:**
- Verify template has "Attachments" enabled
- Check attachment field is named: `resume_file`
- Ensure file is under 2MB
- Try with PDF instead of DOC

### Issue: Rate limit exceeded
**Solutions:**
- You've hit the 200 emails/month limit
- Upgrade to paid plan: https://dashboard.emailjs.com/admin/account/billing
- Or wait until next month

---

## Upgrading Later

When you need more than 200 emails/month:

**Personal Plan ($9/month):**
- 1,000 emails/month
- 10,000 requests/day
- Priority support

**Business Plan ($25/month):**
- 10,000 emails/month
- 100,000 requests/day
- Custom email templates
- Remove EmailJS branding

---

## Alternative: Using SendGrid (If needed later)

If you need more features:
- SendGrid offers 100 emails/day FREE forever
- Better deliverability
- More advanced features
- Setup is more complex (requires API key management)

---

## Support

**EmailJS Documentation:** https://www.emailjs.com/docs/
**Need Help?** Contact: ganura@gmail.com

---

## Quick Reference

After setup, your code should look like:

```javascript
// Line 5
emailjs.init("abc123def456"); // Your actual Public Key

// Line 112
const response = await emailjs.send(
    'service_abc123',   // Your actual Service ID
    'template_xyz789',  // Your actual Template ID
    templateParams
);
```

That's it! Your website is now ready to accept resume uploads and send them to your email! 🎉
