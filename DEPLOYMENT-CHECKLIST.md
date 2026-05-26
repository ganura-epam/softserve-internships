# ✅ SoftServe Website - Deployment Checklist

Use this checklist to ensure a smooth deployment process.

---

## 📋 Pre-Deployment Phase

### FormSpree Configuration
- [ ] Created FormSpree account at https://formspree.io
- [ ] Signed up using ganura@gmail.com
- [ ] Created new form in FormSpree dashboard
- [ ] Copied form endpoint ID (e.g., `xyzabc123`)
- [ ] Opened `index.html` in text editor
- [ ] Found line 182: `action="https://formspree.io/f/YOUR_FORM_ID"`
- [ ] Replaced `YOUR_FORM_ID` with actual form ID
- [ ] Saved `index.html`
- [ ] Verified form ID is correct (no typos)

**Quick command to update:**
```bash
sed -i '' 's/YOUR_FORM_ID/xyzabc123/g' index.html
# Replace xyzabc123 with your actual form ID
```

### AWS Prerequisites
- [ ] AWS account created
- [ ] AWS CLI installed (`aws --version` works)
- [ ] Ran `aws configure` with credentials
- [ ] Verified credentials: `aws sts get-caller-identity`
- [ ] Noted AWS Account ID: ___________________

### Domain Planning
- [ ] Decided on domain name: ___________________
- [ ] Checked availability (if not already owned)
- [ ] Budget approved: $12-14/year for domain
- [ ] Budget approved: $1-3/month for hosting

---

## 🧪 Local Testing Phase

### Start Local Server
- [ ] Opened terminal
- [ ] Navigated to project: `cd /Users/anurag_gupta2/Downloads/SoftServe1`
- [ ] Started server: `python3 -m http.server 8000`
- [ ] Opened browser to http://localhost:8000

### Visual Inspection
- [ ] Logo appears in top right corner
- [ ] Hero section loads with gradient
- [ ] All 5 internship cards visible:
  - [ ] Cloud Computing (purple gradient)
  - [ ] Data Analytics (pink gradient)
  - [ ] Data Science (blue gradient)
  - [ ] Web Development (yellow/orange gradient)
  - [ ] Generative AI (teal gradient)
- [ ] "Why SoftServe" section displays
- [ ] Application form visible
- [ ] Footer displays correctly

### Functionality Testing
- [ ] Clicked all navigation links
- [ ] "Explore Opportunities" button scrolls to internships
- [ ] All cards have hover effects
- [ ] Form fields accept input
- [ ] Dropdown menus work
- [ ] File upload field present

### Responsive Design Testing
- [ ] Resized browser to mobile width (375px)
- [ ] Checked tablet view (768px)
- [ ] Checked desktop view (1920px)
- [ ] All sections stack properly on mobile
- [ ] Text is readable at all sizes
- [ ] Buttons are touch-friendly on mobile

### Browser Compatibility (Optional)
- [ ] Tested in Chrome
- [ ] Tested in Safari
- [ ] Tested in Firefox
- [ ] Tested in Edge

**Stop server:** Press `Ctrl+C` in terminal

---

## 🚀 AWS Deployment Phase

### Domain Availability Check
- [ ] Checked if domain is available:
```bash
aws route53domains check-domain-availability \
    --domain-name softserve.com \
    --region us-east-1
```
- [ ] Domain available? ⬜ YES  ⬜ NO
- [ ] If NO, chose alternative: ___________________

### Run Deployment Script
- [ ] Made script executable: `chmod +x aws-deploy.sh`
- [ ] Ran deployment: `./aws-deploy.sh www.softserve.com`
- [ ] Confirmed deployment when prompted
- [ ] Script completed without errors

### Certificate Validation
- [ ] Opened AWS Console → Certificate Manager
- [ ] Found certificate for softserve.com
- [ ] Clicked "Create records in Route 53" button
- [ ] Waited 5-30 minutes for validation
- [ ] Certificate status shows "Issued"
- [ ] Noted certificate ARN: ___________________

### CloudFront Deployment
- [ ] Waited for CloudFront distribution creation (15-20 min)
- [ ] Checked status in AWS Console → CloudFront
- [ ] Distribution status shows "Deployed"
- [ ] Noted distribution ID: ___________________
- [ ] Noted CloudFront domain: ___________________

### DNS Configuration
- [ ] Route53 hosted zone created
- [ ] Noted hosted zone ID: ___________________
- [ ] DNS records created for www subdomain
- [ ] DNS records created for apex domain
- [ ] Noted nameservers (if domain registered elsewhere)

### Domain Registrar Update (If Needed)
- [ ] Logged into domain registrar
- [ ] Updated nameservers to Route53 nameservers
- [ ] Saved changes
- [ ] Noted propagation may take 24-48 hours

### Deployment Info
- [ ] Found `deployment-info.txt` in project folder
- [ ] Reviewed all resource IDs and ARNs
- [ ] Saved backup copy of deployment info
- [ ] Stored credentials securely

---

## ✅ Post-Deployment Verification

### Immediate Checks (After 20 minutes)
- [ ] CloudFront distribution fully deployed
- [ ] Certificate validated and active
- [ ] S3 bucket contains all files
- [ ] Bucket policy allows public read

### DNS Propagation (After 2-6 hours)
- [ ] Checked DNS: `dig www.softserve.com`
- [ ] DNS returns CloudFront domain
- [ ] Both www and apex resolve correctly

### Website Functionality (After DNS works)
- [ ] Visited https://www.softserve.com
- [ ] Website loads successfully
- [ ] HTTPS works (green lock icon)
- [ ] Certificate is valid (not expired)
- [ ] All sections render correctly
- [ ] Images/logo display properly
- [ ] CSS styling applied correctly
- [ ] JavaScript functions work

### Form Testing
- [ ] Filled out application form with test data
- [ ] Selected internship track
- [ ] Uploaded test resume (PDF)
- [ ] Clicked "Submit Application"
- [ ] Saw success message
- [ ] Received email at ganura@gmail.com
- [ ] Email contains all form data
- [ ] Resume attachment present in email

### Mobile Testing
- [ ] Opened site on smartphone
- [ ] Tested on iOS device (if available)
- [ ] Tested on Android device (if available)
- [ ] All sections visible
- [ ] Touch interactions work
- [ ] Form submits successfully
- [ ] File upload works on mobile

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Images load quickly
- [ ] No console errors in browser
- [ ] Smooth scrolling works
- [ ] Animations smooth (not janky)

### Cross-Browser Testing
- [ ] Tested in Chrome (desktop)
- [ ] Tested in Safari (desktop)
- [ ] Tested in Firefox (desktop)
- [ ] Tested in Edge (desktop)
- [ ] Tested in mobile browsers

---

## 🎯 Go-Live Checklist

### Final Verification
- [ ] Website accessible globally
- [ ] HTTPS certificate valid
- [ ] All links work
- [ ] No broken images
- [ ] Form submissions work
- [ ] Emails being received
- [ ] Mobile responsive
- [ ] Fast load times (<3s)

### Marketing Prep
- [ ] Took screenshots of website
- [ ] Created social media posts
- [ ] Prepared email announcement
- [ ] Updated LinkedIn company page
- [ ] Informed HR/recruitment team

### Monitoring Setup
- [ ] Set up AWS billing alerts
- [ ] Monitor FormSpree usage (50 free/month)
- [ ] Check email inbox regularly
- [ ] Review application submissions

### Documentation
- [ ] Saved all deployment info
- [ ] Documented any issues encountered
- [ ] Created troubleshooting notes
- [ ] Shared access with team members

---

## 📊 Success Metrics

### Week 1 Goals
- [ ] Website uptime: 99.9%
- [ ] At least 10 test submissions
- [ ] Zero downtime incidents
- [ ] All emails delivered successfully

### Month 1 Goals
- [ ] Received applications from students
- [ ] Website traffic analytics set up
- [ ] Positive feedback from applicants
- [ ] Cost stays under $5/month

---

## 🔧 Troubleshooting Reference

### Issue: Domain not resolving
**Solution:** Wait 24-48 hours for DNS propagation
```bash
# Check DNS status
dig www.softserve.com
nslookup www.softserve.com
```

### Issue: SSL certificate error
**Solution:** Ensure certificate is validated
- Go to AWS Console → Certificate Manager
- Check certificate status
- Add DNS validation records if missing

### Issue: Website shows 403 Forbidden
**Solution:** Check S3 bucket policy
```bash
# Re-apply bucket policy
aws s3api put-bucket-policy --bucket www.softserve.com --policy file://policy.json
```

### Issue: Form not submitting
**Solution:** Verify FormSpree ID in HTML
- Check line 182 in index.html
- Ensure form ID is correct
- Test FormSpree form independently

### Issue: CloudFront not serving updates
**Solution:** Invalidate cache
```bash
# Create invalidation
aws cloudfront create-invalidation \
    --distribution-id YOUR_DIST_ID \
    --paths "/*"
```

---

## 📞 Support Contacts

### AWS Support
- Documentation: https://docs.aws.amazon.com
- Console: https://console.aws.amazon.com
- Support: Your AWS account support plan

### FormSpree Support
- Website: https://formspree.io
- Email: support@formspree.io
- Documentation: https://help.formspree.io

### Domain Registrar
- Route53 Console: https://console.aws.amazon.com/route53
- AWS Support for domain issues

---

## 🎉 Completion Confirmation

I confirm that:
- [ ] All pre-deployment tasks completed
- [ ] Local testing passed successfully
- [ ] AWS deployment completed without errors
- [ ] Post-deployment verification passed
- [ ] Website is live and accessible
- [ ] Application form works and emails received
- [ ] Mobile testing completed
- [ ] Documentation saved and backed up

**Deployment Date:** ___________________
**Deployed By:** ___________________
**Website URL:** https://www.softserve.com
**Status:** 🟢 LIVE AND OPERATIONAL

---

## 📝 Notes & Observations

Use this space to note any issues, customizations, or important information:

```
[Your notes here]







```

---

**Congratulations! Your SoftServe Internship Website is now live! 🚀**

Start receiving applications from talented BTech students!
