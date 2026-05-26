# 🚀 Quick Start Guide - SoftServe Internship Website

Get your website live in **3 simple steps**!

## ✅ Prerequisites Checklist

Before starting, ensure you have:
- [ ] AWS Account ([Sign up here](https://aws.amazon.com/))
- [ ] AWS CLI installed ([Install guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))
- [ ] AWS CLI configured (`aws configure`)
- [ ] FormSpree account ([Sign up here](https://formspree.io/))

---

## Step 1: Configure FormSpree (5 minutes)

1. **Create FormSpree Form:**
   - Go to [https://formspree.io](https://formspree.io)
   - Sign up for free account
   - Click **"+ New Form"**
   - Enter email: `ganura@gmail.com`
   - Click **"Create Form"**

2. **Get Form Endpoint:**
   - Copy the form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

3. **Update index.html:**
   ```bash
   # Open index.html and find line 182
   # Replace YOUR_FORM_ID with your actual form ID

   # Before:
   action="https://formspree.io/f/YOUR_FORM_ID"

   # After:
   action="https://formspree.io/f/xyzabc123"
   ```

   **Quick sed command:**
   ```bash
   sed -i '' 's/YOUR_FORM_ID/xyzabc123/g' index.html
   ```
   *(Replace `xyzabc123` with your actual form ID)*

✅ **Test FormSpree:**
- FormSpree free tier: 50 submissions/month
- You'll receive email notifications at ganura@gmail.com

---

## Step 2: Test Locally (Optional but Recommended)

```bash
# Start local server
python3 -m http.server 8000

# Open browser
# http://localhost:8000
```

**Check:**
- Logo displays in top right ✓
- All 5 internship cards visible ✓
- Form fields work ✓
- Mobile responsive ✓

Press `Ctrl+C` to stop server.

---

## Step 3: Deploy to AWS (20 minutes)

### Option A: Automated Deployment (Recommended)

```bash
# Run deployment script
./aws-deploy.sh www.softserve.com
```

**The script will:**
1. ✓ Create S3 bucket
2. ✓ Upload website files
3. ✓ Request SSL certificate
4. ✓ Create CloudFront distribution
5. ✓ Configure Route53 DNS
6. ✓ Set up HTTPS

**Follow prompts and wait for:**
- SSL certificate validation (5-30 minutes)
- CloudFront deployment (15-20 minutes)
- DNS propagation (up to 48 hours)

### Option B: Manual Deployment

See full instructions in `README.md`

---

## 🎯 Post-Deployment Checklist

After deployment completes:

### Immediate (15-30 minutes)
- [ ] Validate SSL certificate in AWS Certificate Manager
- [ ] Wait for CloudFront distribution to deploy
- [ ] Check deployment-info.txt for details

### Within 24 hours
- [ ] Update nameservers at domain registrar (if domain purchased elsewhere)
- [ ] Test website at https://www.softserve.com
- [ ] Verify HTTPS (green lock icon in browser)
- [ ] Test on mobile device

### Final Verification
- [ ] Submit test application
- [ ] Check email received at ganura@gmail.com
- [ ] Test all 5 internship sections
- [ ] Verify resume upload works

---

## 📊 What You Get

**Website Features:**
- ✨ Modern minimalist design
- 📱 Mobile responsive
- 🔒 HTTPS/SSL enabled
- ⚡ Global CDN (CloudFront)
- 📧 Resume upload to email
- 🎨 Professional logo
- 💼 5 internship programs

**AWS Infrastructure:**
- S3 bucket for hosting
- CloudFront for CDN
- Route53 for DNS
- ACM for SSL certificate

**Costs:**
- Monthly: ~$1-3
- Annual: ~$25-50 (including domain)

---

## 🛠️ Common Issues & Solutions

### Issue: "Domain already taken"

**Solution:** Use alternative domain
```bash
# Check availability
aws route53domains check-domain-availability \
    --domain-name softserve-careers.com \
    --region us-east-1

# Deploy with new domain
./aws-deploy.sh www.softserve-careers.com
```

**Alternatives:**
- softserve-internships.com
- joinsoftserve.com
- softserve.tech
- getsoft serve.com

### Issue: "SSL Certificate pending validation"

**Solution:**
1. Go to AWS Console → Certificate Manager
2. Click on certificate
3. Click **"Create records in Route 53"** button
4. Wait 5-30 minutes

### Issue: "Website not loading"

**Solutions:**
- Check CloudFront deployment status (takes 15-20 minutes)
- Verify nameservers updated at registrar
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

### Issue: "Form not submitting"

**Solutions:**
- Check FormSpree form ID in index.html
- Verify FormSpree account is active
- Check browser console for errors
- Test on different browser

---

## 🔄 Updating Your Website

After making changes:

```bash
# Upload to S3
aws s3 sync . s3://www.softserve.com \
    --exclude "*.sh" --exclude "*.md" --delete

# Invalidate CloudFront cache (get DIST_ID from deployment-info.txt)
aws cloudfront create-invalidation \
    --distribution-id DISTRIBUTION_ID \
    --paths "/*"
```

---

## 📞 Need Help?

**Check these files:**
- `README.md` - Full documentation
- `deployment-info.txt` - Your deployment details
- AWS Console - Visual interface

**Useful Commands:**
```bash
# Check CloudFront status
aws cloudfront get-distribution \
    --id YOUR_DIST_ID \
    --query 'Distribution.Status'

# Check DNS records
dig www.softserve.com

# Test website
curl -I https://www.softserve.com
```

**AWS Documentation:**
- [S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Setup](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html)
- [Route53 DNS](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)

---

## 🎓 Next Steps

**Enhance Your Website:**
- Add Google Analytics
- Source professional images for internship cards
- Create testimonials section
- Add FAQ page
- Set up contact form

**Monitor Performance:**
- Set up AWS billing alerts
- Monitor FormSpree submission count
- Review AWS cost explorer
- Check website analytics

**Marketing:**
- Share on college forums
- Post on LinkedIn
- Create social media posts
- Partner with college placement cells

---

## ✅ Success Indicators

Your website is live when:
- ✓ https://www.softserve.com loads
- ✓ Green lock icon (HTTPS) appears
- ✓ Logo displays in top right
- ✓ All sections visible and responsive
- ✓ Form submits successfully
- ✓ Email received at ganura@gmail.com

---

**🎉 Congratulations! Your SoftServe internship website is now live!**

Start attracting top BTech talent and building your future team.

---

*For detailed documentation, see README.md*
*For AWS deployment details, see deployment-info.txt (created after deployment)*
