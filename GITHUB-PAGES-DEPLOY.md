# 🚀 Deploy SoftServe Website to GitHub Pages

Complete guide to deploy your website for **FREE** on GitHub Pages!

---

## ✅ Prerequisites

- [ ] GitHub account ([Sign up here](https://github.com))
- [ ] Git installed on your computer
- [ ] Terminal/Command Prompt access

---

## 📋 Deployment Steps

### Step 1: Initialize Git Repository

```bash
# Navigate to project directory
cd /Users/anurag_gupta2/Downloads/SoftServe1

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: SoftServe Technologies internship website"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub:** https://github.com
2. **Click "+" icon** (top right) → "New repository"
3. **Repository name:** `softserve-internships` (or any name you like)
4. **Description:** "SoftServe Technologies Internship Portal"
5. **Visibility:** Public (required for free GitHub Pages)
6. **DO NOT** initialize with README (we already have files)
7. **Click "Create repository"**

### Step 3: Connect Local to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/softserve-internships.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/softserve-internships.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down** to "Pages" in left sidebar
4. **Under "Source":**
   - Branch: `main`
   - Folder: `/ (root)`
5. **Click "Save"**

GitHub will show: "Your site is ready to be published at `https://YOUR_USERNAME.github.io/softserve-internships/`"

### Step 5: Wait for Deployment (2-5 minutes)

- GitHub will build and deploy automatically
- Refresh the Pages settings page
- When ready: "Your site is live at..."
- Click the link to view your website! 🎉

---

## 🌐 Your Website URL

After deployment, your website will be available at:

**Default URL:**
```
https://YOUR_USERNAME.github.io/softserve-internships/
```

**Example:**
```
https://johndoe.github.io/softserve-internships/
```

---

## 🔧 Enable FormSpree Production Mode

Currently, form submissions are in DEMO mode. To enable real submissions:

### Option 1: Enable Real Submissions

Edit `js/main.js`:

1. Find the comment `/* PRODUCTION MODE:`
2. Delete the entire DEMO MODE section (lines with `setTimeout`)
3. Uncomment the PRODUCTION MODE block
4. Save and push:

```bash
git add js/main.js
git commit -m "Enable FormSpree production mode"
git push
```

### Option 2: Keep Demo Mode

Leave as-is for testing. Update later when ready to receive applications.

---

## 🔄 Updating Your Website

Whenever you make changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Update: describe what you changed"

# Push to GitHub
git push

# GitHub Pages auto-deploys in 1-2 minutes
```

---

## 🎨 Custom Domain Setup (Optional)

Want to use `www.softserve.com` instead of GitHub URL?

### Step 1: Buy Domain

Purchase domain from:
- Namecheap ($8-12/year)
- GoDaddy ($10-15/year)
- Google Domains ($12/year)

### Step 2: Create CNAME File

Create file `CNAME` (no extension) in your repository root:

```bash
echo "www.softserve.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Step 3: Configure DNS

At your domain registrar, add these DNS records:

**For www subdomain:**
```
Type: CNAME
Host: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**For apex domain (optional):**
```
Type: A
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 3600
```

### Step 4: Enable HTTPS

1. Go to repository Settings → Pages
2. Check "Enforce HTTPS"
3. Wait 10-20 minutes for certificate

**DNS propagation:** 24-48 hours

---

## 📊 GitHub Pages Limits

✅ **Free tier includes:**
- ✅ 1GB storage
- ✅ 100GB bandwidth/month
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Unlimited repositories

**Your website (~50KB) can handle:**
- ~2 million page views per month! 🚀

---

## 🐛 Troubleshooting

### Issue: "Page Not Found" (404)

**Solution:**
- Wait 2-5 minutes after enabling Pages
- Check Settings → Pages shows "Your site is live"
- Verify branch is `main` and folder is `/ (root)`

### Issue: CSS/JS Not Loading

**Solution:**
- Check file paths are relative (no leading `/`)
- Clear browser cache
- Hard refresh: Cmd+Shift+R or Ctrl+Shift+F5

### Issue: Form Not Submitting

**Solution:**
- Check FormSpree ID in `index.html` line 174
- Enable production mode in `js/main.js`
- Test FormSpree form independently

### Issue: Changes Not Showing

**Solution:**
- Wait 1-2 minutes for auto-deployment
- Check Actions tab for build status
- Clear browser cache

---

## 📝 Git Commands Cheatsheet

```bash
# Check status
git status

# Add specific file
git add index.html

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git restore filename.html
```

---

## 🎯 Deployment Checklist

Before going live:

- [ ] FormSpree configured with correct email
- [ ] Test form submission (if production mode enabled)
- [ ] All links working
- [ ] Logo displays correctly
- [ ] Mobile responsive tested
- [ ] Browser compatibility checked (Chrome, Safari, Firefox)
- [ ] No console errors (press F12)
- [ ] Meta description added for SEO
- [ ] Favicon added (optional)

---

## 🚀 Going Live Steps Summary

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit: SoftServe Technologies website"

# 2. Create GitHub repo, then connect
git remote add origin https://github.com/YOUR_USERNAME/softserve-internships.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages (in Settings)
# 4. Wait 2-5 minutes
# 5. Visit: https://YOUR_USERNAME.github.io/softserve-internships/
```

---

## 🎉 Success!

Your website is now:
- ✅ Live on the internet
- ✅ Free hosting forever
- ✅ Auto-deploys when you push
- ✅ HTTPS enabled
- ✅ Fast global CDN
- ✅ Custom domain ready

**Share your website URL with students and start receiving applications!**

---

## 📞 Support

- **GitHub Pages Docs:** https://pages.github.com
- **Git Tutorial:** https://try.github.io
- **FormSpree Help:** https://help.formspree.io

---

**Estimated time to deploy:** 10-15 minutes
**Cost:** $0 (completely free!)
