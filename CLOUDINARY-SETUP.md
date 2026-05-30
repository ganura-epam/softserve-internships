# Cloudinary Setup Guide - FREE File Upload Solution

## Overview

This solution uses **Cloudinary** (free cloud storage) to handle resume uploads, then sends the download link via email.

**Benefits:**
- ✅ **100% FREE** - 25 GB storage, 25 GB bandwidth/month
- ✅ Secure file uploads
- ✅ No file size email restrictions
- ✅ Works with GitHub Pages
- ✅ Professional solution
- ✅ No credit card required

**How It Works:**
1. User uploads resume → Goes to Cloudinary
2. Cloudinary returns secure download URL
3. Email sent with resume download link
4. You click link to view/download resume

---

## Setup Steps (10 minutes)

### Step 1: Create Cloudinary Account (3 minutes)

1. Go to: https://cloudinary.com/users/register_free
2. Sign up with email or Google (use ganura@gmail.com)
3. Fill in the form:
   - **Cloud Name:** Choose something like `softserve-resumes` (remember this!)
   - **Name:** Your name
   - **Email:** ganura@gmail.com
4. Verify your email
5. Log in to dashboard

---

### Step 2: Get Your Cloud Name (1 minute)

1. After login, you'll see the **Dashboard**
2. Look for **Account Details** section
3. Find **Cloud Name** (e.g., `softserve-resumes` or `dxxxxxxxx`)
4. **COPY the Cloud Name** - you'll need it

---

### Step 3: Create Upload Preset (4 minutes)

Upload presets allow unsigned uploads from the browser (secure way).

1. In Cloudinary Dashboard, click **Settings** (gear icon, top right)
2. Click **Upload** tab in left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Configure the preset:
   - **Upload preset name:** `softserve_internships`
   - **Signing Mode:** Select **Unsigned** ⚠️ IMPORTANT
   - **Folder:** `resumes` (optional, helps organize files)
   - **Resource type:** `Raw` (for PDF/DOC files)
   - **Access mode:** `public` (so you can download via URL)
   - **Unique filename:** Enable (prevents name conflicts)
6. Click **Save**
7. **COPY the Upload Preset name** (e.g., `softserve_internships`)

---

### Step 4: Update Website Code (2 minutes)

Now update your JavaScript with Cloudinary credentials:

1. Open: `js/main.js` in your code editor
2. Find around line 86-87 and replace:
   ```javascript
   const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
   const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
   ```
   with:
   ```javascript
   const CLOUDINARY_CLOUD_NAME = 'softserve-resumes'; // Your actual cloud name
   const CLOUDINARY_UPLOAD_PRESET = 'softserve_internships'; // Your actual preset name
   ```
3. Save the file

---

### Step 5: Test It! (5 minutes)

1. **Refresh your browser** (http://localhost:8000/index.html)
2. Fill out the application form
3. Upload a test PDF resume (drag & drop or click)
4. Click **Submit Application**
5. Wait for success message
6. **Check ganura@gmail.com inbox**

You should receive an email like:
```
Name: John Doe
Email: john@example.com
...
Resume URL: https://res.cloudinary.com/softserve-resumes/raw/upload/v1234567890/resumes/abc123_resume.pdf
Resume Filename: john_resume.pdf
```

7. **Click the resume URL** to download/view the file

---

## Configuration Summary

You need to replace 2 values in `js/main.js`:

| Placeholder | Replace With | Where to Find |
|------------|-------------|---------------|
| `YOUR_CLOUD_NAME` | Your Cloud Name | Dashboard → Account Details |
| `YOUR_UPLOAD_PRESET` | Upload Preset name | Settings → Upload → Upload presets |

**Example:**
```javascript
const CLOUDINARY_CLOUD_NAME = 'softserve-resumes';
const CLOUDINARY_UPLOAD_PRESET = 'softserve_internships';
```

---

## Cloudinary Free Tier Limits

**FREE Plan (Forever):**
- 25 GB storage
- 25 GB bandwidth per month
- 25 credits per month (transformations)
- Unlimited uploads
- **More than enough for internship applications!**

**File Size:**
- Up to 10 MB per file (free tier)
- More than enough for resumes

**Bandwidth Calculation:**
- Average resume: 500 KB
- 25 GB = ~50,000 resume downloads/month
- You'll be fine! 😊

---

## Security Settings (Recommended)

To prevent abuse of your upload preset:

1. In Cloudinary Dashboard → **Settings** → **Upload**
2. Find your upload preset
3. Add **Upload restrictions:**
   - **Allowed formats:** `pdf,doc,docx`
   - **Max file size:** `10485760` (10 MB in bytes)
4. Enable **Rate limiting** if available
5. Save changes

---

## Email Format You'll Receive

```
Subject: New submission from your form

Name: John Doe
Email: john@example.com
Phone: +91 9876543210
College: ABC University
Year: 3rd Year BTech
Track: Cloud Computing
CGPA: 8.5 CGPA
Message: I am passionate about...

Resume URL: https://res.cloudinary.com/softserve-resumes/raw/upload/resumes/john_resume.pdf
Resume Filename: john_resume.pdf
```

**To view resume:** Click the URL in the email

---

## Managing Uploaded Resumes

### View All Resumes:
1. Go to Cloudinary Dashboard
2. Click **Media Library** in left sidebar
3. Navigate to `resumes` folder
4. See all uploaded resumes with details

### Download Resume:
- Click on any file in Media Library
- Click **Download** button

### Delete Old Resumes:
- Select files in Media Library
- Click **Delete** to free up space

---

## Troubleshooting

### Issue: "Failed to upload resume to cloud storage"
**Solutions:**
- Check Cloud Name is correct in code
- Check Upload Preset is correct in code
- Ensure Upload Preset is set to **Unsigned**
- Verify internet connection
- Check file is under 10MB

### Issue: "Invalid upload preset"
**Solutions:**
- Preset must be **Unsigned** (not signed)
- Check spelling of preset name in code
- Verify preset exists in Cloudinary dashboard

### Issue: Can't download resume from email link
**Solutions:**
- Check Access Mode is set to **public** in preset
- Verify URL is complete (no truncation in email)
- Try copying full URL to browser
- Check Cloudinary account is active

### Issue: File upload very slow
**Solutions:**
- Compress PDF (use online tools)
- Check internet speed
- Try smaller file
- Cloudinary has CDN - should be fast

---

## Advantages of This Approach

✅ **For You:**
- Completely free
- No file size limitations from email services
- All resumes stored in one place (Cloudinary dashboard)
- Easy to manage and organize
- Professional cloud storage

✅ **For Applicants:**
- Same easy drag & drop experience
- Fast uploads (Cloudinary has global CDN)
- Large files supported (up to 10MB)
- Reliable delivery

---

## Alternative: Direct Download Email Template

Want the email to look nicer? Update your FormSpree email template to include a download button:

1. Go to FormSpree dashboard
2. Edit your form's email template
3. Add HTML like:
```html
<a href="{{resume_url}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
  📥 Download Resume
</a>
```

This makes the email more professional with a clickable button.

---

## Upgrading (If Needed Later)

If you exceed 25 GB/month bandwidth:

**Plus Plan ($99/month):**
- 156 GB bandwidth
- More storage
- Advanced features

**But honestly:** With resumes averaging 500KB, you'd need 50,000+ downloads/month to hit the limit. You'll be fine on the free tier!

---

## Privacy & Security

✅ **Secure:**
- Files uploaded over HTTPS
- Secure URLs (hard to guess)
- Can set expiration on URLs if needed
- GDPR compliant

✅ **Private:**
- Files not publicly listed
- Only those with URL can access
- You control access modes
- Can delete anytime

---

## Quick Reference

**Cloudinary Dashboard:** https://console.cloudinary.com/
**Media Library:** Dashboard → Media Library
**Settings:** Dashboard → Settings (gear icon)
**Upload Presets:** Settings → Upload → Upload presets

**Need Help?**
- Cloudinary Docs: https://cloudinary.com/documentation
- Contact: ganura@gmail.com

---

## Testing Checklist

- [ ] Created Cloudinary account
- [ ] Copied Cloud Name
- [ ] Created Upload Preset (Unsigned mode)
- [ ] Copied Upload Preset name
- [ ] Updated js/main.js with both values
- [ ] Refreshed browser
- [ ] Filled test application form
- [ ] Uploaded test resume
- [ ] Clicked Submit
- [ ] Received success message
- [ ] Got email with resume URL
- [ ] Clicked URL and downloaded resume
- [ ] 🎉 It works!

---

That's it! You now have a completely FREE, professional resume upload system! 🚀

**No monthly fees. No credit card. No limits for your use case.**
