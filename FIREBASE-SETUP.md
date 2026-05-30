# Firebase Firestore Setup Guide

## Overview

All application submissions are now stored in **Firebase Firestore** - a free cloud database from Google.

**Benefits:**
- ✅ **100% FREE** - 50,000 reads/day, 20,000 writes/day
- ✅ Real-time database accessible from anywhere
- ✅ Built-in admin console to view applications
- ✅ Works with GitHub Pages (client-side)
- ✅ Automatic timestamps and data organization
- ✅ Export data to JSON/CSV

---

## Setup Steps (15 minutes)

### Step 1: Create Firebase Project (5 minutes)

1. Go to: https://console.firebase.google.com/
2. Click **Add project** (or **Create a project**)
3. Project name: `softserve-internships` (or any name)
4. Click **Continue**
5. **Google Analytics:** Disable (not needed) or keep default
6. Click **Create project**
7. Wait for project creation (~30 seconds)
8. Click **Continue**

---

### Step 2: Create Firestore Database (3 minutes)

1. In Firebase Console, click **Firestore Database** in left sidebar
2. Click **Create database**
3. **Location:** Choose closest to you (e.g., `asia-south1` for India)
4. Click **Next**
5. **Security rules:** Start in **test mode** (we'll secure it later)
6. Click **Enable**
7. Wait for database creation (~1 minute)

---

### Step 3: Get Firebase Configuration (2 minutes)

1. Click the **gear icon** ⚙️ (top left) → **Project settings**
2. Scroll down to **Your apps** section
3. Click the **Web icon** `</>`
4. **App nickname:** `SoftServe Website`
5. **Don't** check "Firebase Hosting" (we use GitHub Pages)
6. Click **Register app**
7. You'll see a code snippet like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "softserve-internships.firebaseapp.com",
  projectId: "softserve-internships",
  storageBucket: "softserve-internships.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

8. **COPY this entire config object**

---

### Step 4: Update Website Code (3 minutes)

1. Open: `js/main.js` in your code editor
2. Find around line 5-11 and replace:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

with **your actual Firebase config** (the one you copied)

3. Save the file

---

### Step 5: Set Up Security Rules (2 minutes)

**Important:** Secure your database to prevent abuse!

1. In Firebase Console → **Firestore Database**
2. Click **Rules** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to applications collection
    match /applications/{document} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'phone', 'college', 'year', 'track', 'cgpa', 'resume_url'])
                    && request.resource.data.name is string
                    && request.resource.data.email is string
                    && request.resource.data.phone is string;

      // Only you can read application data (requires authentication)
      allow read: if request.auth != null;

      // No updates or deletes from public
      allow update, delete: if false;
    }
  }
}
```

4. Click **Publish**

**What this does:**
- ✅ Anyone can submit applications (create)
- ✅ Validates required fields
- ✅ Only authenticated users can read data (you via console)
- ❌ No one can update or delete applications

---

## Testing

1. **Refresh your browser** (or restart local server)
2. Fill out the application form
3. Upload a test resume
4. Click **Submit Application**
5. You should see: `✓ Application submitted successfully!`
6. Check browser console (F12) - should show: `✓ Application saved to Firebase with ID: abc123...`

---

## Viewing Applications

### Method 1: Firebase Console (Recommended)

1. Go to: https://console.firebase.google.com/
2. Select your project: `softserve-internships`
3. Click **Firestore Database** in left sidebar
4. Click **applications** collection
5. See all submitted applications with all details!

**Each document contains:**
- name
- email
- phone
- college
- year
- track
- cgpa
- message
- resume_url (click to download)
- resume_filename
- submitted_at (ISO timestamp)
- timestamp (server timestamp)

### Method 2: Export Data

**Export to JSON:**
1. Firebase Console → Firestore Database
2. Click on `applications` collection
3. Click **Export** icon
4. Choose format and download

**Using Firebase CLI (advanced):**
```bash
npm install -g firebase-tools
firebase login
firebase firestore:export ./export-folder
```

---

## Firebase Free Tier Limits

**Firestore Free Tier (Spark Plan):**
- 50,000 document reads per day
- 20,000 document writes per day
- 20,000 document deletes per day
- 1 GB storage
- 10 GB/month bandwidth

**For internship applications:**
- Average: 10-50 submissions/day
- You'll use ~0.1% of free tier
- **Won't need to upgrade!**

---

## Data Structure

Each application is stored as a document in the `applications` collection:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "college": "ABC University",
  "year": "3rd Year BTech",
  "track": "Cloud Computing",
  "cgpa": "8.5 CGPA",
  "message": "I am passionate about...",
  "resume_url": "https://res.cloudinary.com/...",
  "resume_filename": "john_resume.pdf",
  "submitted_at": "2026-05-30T12:34:56.789Z",
  "timestamp": Firebase Timestamp
}
```

---

## Advanced Features

### 1. Email Notifications (Optional)

Set up Firebase Cloud Functions to send emails on new submissions:

```javascript
// functions/index.js
exports.sendApplicationEmail = functions.firestore
  .document('applications/{docId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    // Send email using SendGrid, Nodemailer, etc.
  });
```

### 2. Admin Dashboard (Optional)

Build a simple admin page to view applications:
- Login with Firebase Authentication
- View applications in a table
- Filter/search by track, year, etc.
- Download resumes

### 3. Analytics

Firebase Console automatically provides:
- Number of submissions per day
- Popular tracks
- Storage usage

---

## Troubleshooting

### Issue: "Firebase not initialized"

**Solutions:**
- Check Firebase config is correct in `js/main.js`
- Verify all 6 config values are filled
- Check browser console for errors
- Ensure Firebase SDK loaded (check Network tab)

### Issue: "Permission denied"

**Solutions:**
- Check Firestore security rules allow `create`
- Verify you're in "test mode" or have correct rules
- Check all required fields are being sent

### Issue: Data not showing in Firebase Console

**Solutions:**
- Wait 5-10 seconds and refresh
- Check browser console for errors
- Verify Firestore Database is enabled
- Check you're looking at correct project

### Issue: "Quota exceeded"

**Solutions:**
- Check Firebase Console → Usage tab
- Unlikely with internships (free tier is generous)
- If needed, upgrade to Blaze (pay-as-you-go, still very cheap)

---

## Security Best Practices

✅ **Current Setup (Good for MVP):**
- Public can only create new applications
- Required field validation
- No updates or deletes allowed
- Read requires authentication

✅ **Enhanced Security (Recommended for Production):**

1. **Add reCAPTCHA** to prevent bots
2. **Rate limiting** - max 5 submissions per IP per hour
3. **Email verification** - send confirmation email
4. **Honeypot fields** - catch spam bots

---

## Backup & Export

### Automatic Backups (Paid Feature)

Firebase doesn't auto-backup on free tier. Manual options:

### Manual Export

**Option 1: Firebase Console**
- Export → Download JSON

**Option 2: Schedule Exports (Free)**
- Use GitHub Actions to export daily
- Store in Google Drive or S3

**Option 3: Firebase Extensions**
- Install "Export Collections" extension
- Auto-export to Google Cloud Storage

---

## Migration from FormSpree

If you want emails + Firebase:

1. Keep FormSpree code uncommented
2. Add Firebase code after FormSpree success
3. Get both: emails + database storage

```javascript
// After FormSpree success:
if (formspreeResponse.ok) {
  // Save to Firebase too
  await db.collection('applications').add(applicationData);
  // Show success
}
```

---

## Quick Reference

**Firebase Console:** https://console.firebase.google.com/
**View Applications:** Firestore Database → applications collection
**Security Rules:** Firestore Database → Rules tab
**Usage Stats:** Project Overview → Usage tab
**Export Data:** Firestore Database → Export

**Need Help?**
- Firebase Docs: https://firebase.google.com/docs/firestore
- Contact: ganura@gmail.com

---

## Testing Checklist

- [ ] Created Firebase project
- [ ] Enabled Firestore Database
- [ ] Copied Firebase config
- [ ] Updated js/main.js with config
- [ ] Set up security rules
- [ ] Refreshed local website
- [ ] Submitted test application
- [ ] Saw success message
- [ ] Checked browser console (no errors)
- [ ] Verified data in Firebase Console
- [ ] Clicked resume URL (works)
- [ ] 🎉 Everything working!

---

That's it! Your application now stores data in Firebase Firestore! 🚀

**100% FREE. No credit card. No limits for your use case.**
