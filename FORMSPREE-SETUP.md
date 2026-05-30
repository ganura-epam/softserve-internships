# FormSpree Setup Guide - Resume File Upload

## Overview

Your website now uses **FormSpree** to handle resume uploads and email submissions. FormSpree's free tier supports file attachments!

**What you get (FREE):**
- ✅ 50 submissions per month
- ✅ File attachments with emails
- ✅ Drag & drop file upload
- ✅ Automatic email to ganura@gmail.com
- ✅ Resume attached to email (PDF/DOC, up to 2MB)

---

## Current Status

✅ **Already configured!** Your form is using: `https://formspree.io/f/mojbpwvd`

The code is ready to work - just test it!

---

## Testing Locally

1. **Open the website locally:**
   ```bash
   cd /Users/anurag_gupta2/Downloads/SoftServe1
   open index.html
   ```

2. **Fill out the application form**

3. **Upload a resume:**
   - Click the upload area, OR
   - Drag and drop a PDF/DOC file (max 2MB)

4. **Click "Submit Application"**

5. **Check your email** (ganura@gmail.com)
   - Email should arrive within 1-2 minutes
   - Resume will be attached to the email
   - Check spam folder on first test

---

## How It Works

```
User fills form → Uploads resume → Clicks Submit
    ↓
FormSpree receives form data + file
    ↓
FormSpree sends email to ganura@gmail.com
    ↓
Resume attached to email
    ↓
Done!
```

---

## FormSpree Free Tier Limits

- **50 submissions/month** (FREE)
- File uploads: Up to 2MB per file
- Email notifications included
- No credit card required

**If you need more:**
- Basic Plan: $10/month for 1,000 submissions
- Pro Plan: $40/month for 10,000 submissions

---

## Verify FormSpree Settings

To check your FormSpree configuration:

1. Go to: https://formspree.io/forms
2. Log in with your account
3. Find form: `mojbpwvd`
4. Verify settings:
   - **Email:** ganura@gmail.com ✓
   - **File uploads:** Enabled ✓
   - **Status:** Active ✓

---

## File Upload Features

Your website now has:

✅ **Drag & drop** - Users can drag files onto upload area
✅ **Click to browse** - Traditional file picker
✅ **File validation** - Only PDF/DOC/DOCX allowed
✅ **Size limit** - 2MB maximum (validated before upload)
✅ **Preview** - Shows selected file name with remove option
✅ **Beautiful UI** - Modern, user-friendly design

---

## Troubleshooting

### Issue: File upload not working locally
**Solution:**
- Some browsers block form submissions from `file://` URLs
- Use a local server instead:
  ```bash
  # Option 1: Python
  cd /Users/anurag_gupta2/Downloads/SoftServe1
  python3 -m http.server 8000
  # Then open: http://localhost:8000

  # Option 2: PHP
  php -S localhost:8000

  # Option 3: VS Code Live Server extension
  # Right-click index.html → Open with Live Server
  ```

### Issue: Email not received
**Solutions:**
- Check spam/junk folder
- Wait 2-3 minutes (sometimes delayed)
- Verify FormSpree form is active at https://formspree.io/forms
- Check FormSpree submissions log

### Issue: "Please upload your resume" error
**Solutions:**
- Make sure file is selected before submitting
- Try clicking instead of drag & drop
- Check file is PDF/DOC/DOCX format
- Ensure file is under 2MB

### Issue: File too large error
**Solutions:**
- Compress your PDF (use online tools)
- FormSpree free tier: 2MB limit
- Upgrade FormSpree plan for larger files

---

## What Changed from Previous Version

**Before:**
- User had to upload resume to Google Drive
- Copy shareable link
- Paste link in form
- Cumbersome process

**Now:**
- Direct file upload (drag & drop or click)
- Resume automatically attached to email
- Much easier for users
- Professional experience

---

## Email Format

When someone submits an application, you'll receive an email like this:

```
From: noreply@formspree.io
To: ganura@gmail.com
Subject: New submission from your form

Name: John Doe
Email: john@example.com
Phone: +91 9876543210
College: ABC University
Year: 3rd Year BTech
Track: Cloud Computing
CGPA: 8.5 CGPA
Message: I am passionate about cloud technologies...

📎 Attachment: john_doe_resume.pdf
```

---

## Going Live

When you're ready to deploy:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add FormSpree file upload for resumes"
   git push origin main
   ```

2. **Wait 2-3 minutes** for GitHub Pages to deploy

3. **Test on live site:**
   - Visit: https://ganura-epam.github.io/softserve-internships/
   - Submit a test application
   - Verify email received

---

## Security & Privacy

✅ **Secure:**
- FormSpree uses HTTPS encryption
- Files stored temporarily (deleted after email sent)
- No public access to submitted data
- GDPR compliant

✅ **Private:**
- Only you receive the emails
- Applicants' data not shared with third parties
- Form ID is not guessable

---

## Need More Submissions?

**Current:** 50 submissions/month (FREE)

**Upgrade options:**
- **Basic:** $10/month → 1,000 submissions
- **Pro:** $40/month → 10,000 submissions
- **Custom:** Contact FormSpree for enterprise needs

Upgrade at: https://formspree.io/plans

---

## Support

**FormSpree Documentation:** https://help.formspree.io/
**Need Help?** Contact: ganura@gmail.com

---

## Quick Test Checklist

- [ ] Open index.html in browser (use local server)
- [ ] Fill out all required fields
- [ ] Upload a test PDF resume (drag & drop)
- [ ] See file name appear in preview
- [ ] Click "Submit Application"
- [ ] See success message
- [ ] Check ganura@gmail.com inbox
- [ ] Verify resume is attached to email
- [ ] Celebrate! 🎉

---

That's it! Your website is ready to accept resume uploads with FormSpree! 🚀
