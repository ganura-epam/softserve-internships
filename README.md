# SoftServe Internship Website

A modern, minimalist landing page for SoftServe IT Services internship programs targeting BTech Computer Science students.

## Features

- 🎨 Modern minimalist design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Lightning-fast static website
- 📧 Resume upload with email notifications
- 🔒 Secure file handling
- ☁️ AWS-ready deployment architecture

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Form Service**: FormSpree (free tier)
- **Hosting**: AWS S3 + CloudFront + Route53
- **SSL**: AWS Certificate Manager (ACM)

## Project Structure

```
SoftServe1/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # All styling
├── js/
│   └── main.js         # Form handling and interactions
├── assets/
│   ├── logo.svg        # Company logo
│   └── images/         # Course images (to be added)
├── README.md           # This file
└── aws-deploy.sh       # Automated deployment script
```

## Setup Instructions

### 1. FormSpree Configuration (5 minutes)

Before deploying, you need to set up the resume upload form:

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form with email: **ganura@gmail.com**
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
5. Open `index.html` and replace `YOUR_FORM_ID` on line 182:
   ```html
   <form id="applicationForm" class="application-form"
         action="https://formspree.io/f/YOUR_FORM_ID"
         method="POST" enctype="multipart/form-data">
   ```
   With your actual form ID:
   ```html
   <form id="applicationForm" class="application-form"
         action="https://formspree.io/f/xyzabc123"
         method="POST" enctype="multipart/form-data">
   ```

**FormSpree Free Tier:**
- 50 submissions/month
- File uploads supported
- Email notifications
- No credit card required

### 2. Add Course Images (Optional)

For better visual appeal, add 5 images to `assets/images/`:

**Option A: Download from Unsplash (Recommended)**
```bash
# Cloud Computing
curl -o assets/images/cloud.jpg "https://source.unsplash.com/800x600/?cloud-computing,technology"

# Data Analytics
curl -o assets/images/data-analytics.jpg "https://source.unsplash.com/800x600/?data-visualization,analytics"

# Data Science
curl -o assets/images/data-science.jpg "https://source.unsplash.com/800x600/?artificial-intelligence,machine-learning"

# Web Development
curl -o assets/images/web-dev.jpg "https://source.unsplash.com/800x600/?web-development,coding"

# GenAI
curl -o assets/images/genai.jpg "https://source.unsplash.com/800x600/?artificial-intelligence,neural-network"
```

**Option B: Use CSS Gradients**
The website already uses attractive gradient backgrounds for cards. Images are optional!

### 3. Local Testing

Test the website on your local machine:

```bash
# Using Python 3 (recommended)
python3 -m http.server 8000

# OR using Python 2
python -m SimpleHTTPServer 8000

# OR using Node.js (if installed)
npx serve .
```

Open browser: [http://localhost:8000](http://localhost:8000)

**Test Checklist:**
- [ ] Logo displays correctly in top right
- [ ] All 5 internship cards visible
- [ ] Responsive design works (resize browser)
- [ ] Form fields accept input
- [ ] Resume upload shows file name
- [ ] Submit button works (test after FormSpree setup)

## AWS Deployment

### Prerequisites

1. **AWS Account**: [Sign up here](https://aws.amazon.com/)
2. **AWS CLI**: [Installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
3. **AWS CLI Configured**: Run `aws configure` with your credentials

### Step 1: Check Domain Availability

```bash
# Check if softserve.com is available
aws route53domains check-domain-availability \
    --domain-name softserve.com \
    --region us-east-1
```

**If domain is taken**, consider alternatives:
- softserve-internships.com
- joinsoftserve.com
- softserve-careers.com
- softserve.tech

### Step 2: Register Domain (if needed)

**Option A: Via Route53**
```bash
# Register domain (replace with available domain)
aws route53domains register-domain \
    --domain-name softserve.com \
    --duration-in-years 1 \
    --admin-contact FirstName=John,LastName=Doe,ContactType=PERSON,AddressLine1="123 Street",City="City",State="ST",CountryCode=IN,ZipCode=12345,PhoneNumber="+91.1234567890",Email=ganura@gmail.com \
    --registrant-contact FirstName=John,LastName=Doe,ContactType=PERSON,AddressLine1="123 Street",City="City",State="ST",CountryCode=IN,ZipCode=12345,PhoneNumber="+91.1234567890",Email=ganura@gmail.com \
    --tech-contact FirstName=John,LastName=Doe,ContactType=PERSON,AddressLine1="123 Street",City="City",State="ST",CountryCode=IN,ZipCode=12345,PhoneNumber="+91.1234567890",Email=ganura@gmail.com \
    --region us-east-1
```

**Option B: Via AWS Console** (Easier)
1. Go to Route53 → Registered domains → Register domain
2. Search for available domain
3. Complete registration (takes 1-3 days)

**Cost**: $12-14/year for .com domain

### Step 3: Automated Deployment Script

Use the included deployment script for easy setup:

```bash
# Make script executable
chmod +x aws-deploy.sh

# Run deployment (replace with your domain)
./aws-deploy.sh www.softserve.com
```

### Step 4: Manual Deployment (Alternative)

If you prefer manual setup:

#### 4.1 Create S3 Bucket
```bash
DOMAIN="www.softserve.com"
REGION="us-east-1"

# Create bucket
aws s3 mb s3://$DOMAIN --region $REGION

# Enable static website hosting
aws s3 website s3://$DOMAIN --index-document index.html --error-document index.html

# Upload files
aws s3 sync . s3://$DOMAIN --exclude "*.sh" --exclude "*.md" --exclude ".git/*"

# Make files public
aws s3api put-bucket-policy --bucket $DOMAIN --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::'$DOMAIN'/*"
  }]
}'
```

#### 4.2 Request SSL Certificate
```bash
# Request certificate (must be in us-east-1 for CloudFront)
aws acm request-certificate \
    --domain-name softserve.com \
    --subject-alternative-names www.softserve.com \
    --validation-method DNS \
    --region us-east-1

# Note the CertificateArn from output
```

**Validate Certificate:**
1. Go to AWS Console → Certificate Manager
2. Click on certificate
3. Add DNS records to Route53 (button provided)
4. Wait 5-30 minutes for validation

#### 4.3 Create CloudFront Distribution

```bash
# Create distribution (replace CERTIFICATE_ARN)
aws cloudfront create-distribution \
    --origin-domain-name $DOMAIN.s3-website-$REGION.amazonaws.com \
    --default-root-object index.html \
    --viewer-certificate ACMCertificateArn=CERTIFICATE_ARN,SSLSupportMethod=sni-only \
    --aliases softserve.com,www.softserve.com

# Note the DistributionDomainName (e.g., d1234abcd.cloudfront.net)
```

#### 4.4 Configure Route53

```bash
# Create hosted zone
aws route53 create-hosted-zone --name softserve.com --caller-reference $(date +%s)

# Note the HostedZoneId and NameServers

# Create A record (replace HOSTED_ZONE_ID and CLOUDFRONT_DOMAIN)
aws route53 change-resource-record-sets \
    --hosted-zone-id HOSTED_ZONE_ID \
    --change-batch '{
      "Changes": [{
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "www.softserve.com",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "CLOUDFRONT_DOMAIN",
            "EvaluateTargetHealth": false
          }
        }
      }]
    }'
```

#### 4.5 Update Domain Nameservers

If domain registered elsewhere:
1. Get Route53 nameservers: `aws route53 get-hosted-zone --id HOSTED_ZONE_ID`
2. Update nameservers at your domain registrar
3. Wait 24-48 hours for DNS propagation

### Step 5: Verify Deployment

```bash
# Check S3 bucket
aws s3 ls s3://www.softserve.com

# Check CloudFront status
aws cloudfront list-distributions --query 'DistributionList.Items[*].[DomainName,Status]'

# Test website
curl -I https://www.softserve.com
```

**Manual Tests:**
- [ ] Visit https://www.softserve.com
- [ ] Check HTTPS (green lock icon)
- [ ] Test on mobile device
- [ ] Submit a test application
- [ ] Verify email received at ganura@gmail.com

## Updating the Website

After making changes:

```bash
# Upload updated files to S3
aws s3 sync . s3://www.softserve.com \
    --exclude "*.sh" --exclude "*.md" --exclude ".git/*" \
    --delete

# Invalidate CloudFront cache (replace DISTRIBUTION_ID)
aws cloudfront create-invalidation \
    --distribution-id DISTRIBUTION_ID \
    --paths "/*"
```

## Cost Breakdown

**Monthly AWS Costs:**
- S3 Storage: ~$0.02/month (for small website)
- S3 Requests: ~$0.01/month
- CloudFront: ~$0.50-2/month (depends on traffic)
- Route53 Hosted Zone: $0.50/month
- **Total: ~$1-3/month**

**Annual Costs:**
- Domain Registration: $12-14/year
- **Grand Total: ~$25-50/year**

**Free Tier Benefits** (First 12 months):
- S3: 5GB storage free
- CloudFront: 50GB data transfer free
- Route53: Hosted zone not included in free tier

## Troubleshooting

### Form not submitting
- Check FormSpree endpoint in index.html
- Verify FormSpree account is active
- Check browser console for errors

### Website not loading
- Verify S3 bucket policy allows public access
- Check CloudFront distribution status (deployed)
- Confirm DNS records in Route53

### SSL Certificate issues
- Ensure certificate is in us-east-1 region
- Verify DNS validation records added
- Wait for certificate status: "Issued"

### DNS not resolving
- Check nameservers updated at registrar
- Wait 24-48 hours for propagation
- Use `dig www.softserve.com` to test

## Support & Maintenance

**Regular Tasks:**
- Monitor FormSpree submission count (50/month limit)
- Review AWS billing dashboard
- Update content as needed
- Check for broken links

**Security Best Practices:**
- Enable CloudFront logging
- Set up AWS billing alerts
- Regularly review S3 bucket policies
- Keep dependencies updated

## Future Enhancements

Potential improvements:
- Add Google Analytics
- Implement A/B testing
- Add testimonials section
- Create FAQ page
- Multi-language support
- Add blog section
- Integrate with ATS (Applicant Tracking System)

## License

© 2026 SoftServe IT Services. All rights reserved.

## Contact

For issues or questions:
- Email: ganura@gmail.com
- Website: www.softserve.com
