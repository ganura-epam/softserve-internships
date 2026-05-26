#!/bin/bash

# SoftServe Website - AWS Deployment Script
# Usage: ./aws-deploy.sh www.softserve.com

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if domain argument provided
if [ -z "$1" ]; then
    print_error "Usage: ./aws-deploy.sh <domain>"
    print_info "Example: ./aws-deploy.sh www.softserve.com"
    exit 1
fi

DOMAIN=$1
BASE_DOMAIN=${DOMAIN#www.}
REGION="us-east-1"
BUCKET_NAME=$DOMAIN

echo ""
echo "=========================================="
echo "  SoftServe AWS Deployment Script"
echo "=========================================="
echo ""
print_info "Domain: $DOMAIN"
print_info "Base Domain: $BASE_DOMAIN"
print_info "Region: $REGION"
echo ""

# Check AWS CLI installation
print_info "Checking AWS CLI installation..."
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI not found. Please install it first:"
    print_info "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi
print_success "AWS CLI found"

# Check AWS credentials
print_info "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Run: aws configure"
    exit 1
fi
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
print_success "AWS credentials configured (Account: $ACCOUNT_ID)"

echo ""
read -p "$(echo -e ${YELLOW}?${NC} Do you want to proceed with deployment? [y/N]: )" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Deployment cancelled"
    exit 0
fi

echo ""
print_info "Step 1/6: Creating S3 bucket..."

# Create S3 bucket
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb "s3://$BUCKET_NAME" --region $REGION
    print_success "S3 bucket created: $BUCKET_NAME"
else
    print_warning "S3 bucket already exists: $BUCKET_NAME"
fi

# Enable static website hosting
print_info "Enabling static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html
print_success "Static website hosting enabled"

# Set bucket policy for public read
print_info "Setting bucket policy..."
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file:///tmp/bucket-policy.json
print_success "Bucket policy applied"
rm /tmp/bucket-policy.json

echo ""
print_info "Step 2/6: Uploading website files..."

# Upload files to S3
aws s3 sync . "s3://$BUCKET_NAME" \
    --exclude "*.sh" \
    --exclude "*.md" \
    --exclude ".git/*" \
    --exclude ".DS_Store" \
    --delete

print_success "Files uploaded to S3"

# Get S3 website endpoint
WEBSITE_ENDPOINT="$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
print_success "Website endpoint: http://$WEBSITE_ENDPOINT"

echo ""
print_info "Step 3/6: Requesting SSL certificate..."

# Check if certificate already exists
CERT_ARN=$(aws acm list-certificates --region $REGION \
    --query "CertificateSummaryList[?DomainName=='$BASE_DOMAIN'].CertificateArn" \
    --output text 2>/dev/null || echo "")

if [ -z "$CERT_ARN" ]; then
    print_info "Requesting new SSL certificate..."
    CERT_ARN=$(aws acm request-certificate \
        --domain-name $BASE_DOMAIN \
        --subject-alternative-names $DOMAIN \
        --validation-method DNS \
        --region $REGION \
        --query CertificateArn \
        --output text)
    print_success "Certificate requested: $CERT_ARN"
    print_warning "⚠ IMPORTANT: You must validate the certificate via DNS"
    print_info "1. Go to AWS Console → Certificate Manager"
    print_info "2. Click on the certificate"
    print_info "3. Click 'Create records in Route 53' button"
    print_info "4. Wait 5-30 minutes for validation"
    echo ""
    read -p "$(echo -e ${YELLOW}?${NC} Press Enter after certificate is validated...)"
else
    print_warning "Certificate already exists: $CERT_ARN"
fi

echo ""
print_info "Step 4/6: Creating CloudFront distribution..."

# Check if distribution already exists
DIST_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Aliases.Items[?contains(@, '$DOMAIN')]].Id" \
    --output text 2>/dev/null || echo "")

if [ -z "$DIST_ID" ]; then
    print_info "Creating new CloudFront distribution..."

    # Create distribution config
    cat > /tmp/dist-config.json <<EOF
{
  "CallerReference": "softserve-$(date +%s)",
  "Aliases": {
    "Quantity": 2,
    "Items": ["$BASE_DOMAIN", "$DOMAIN"]
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-$BUCKET_NAME",
      "DomainName": "$WEBSITE_ENDPOINT",
      "CustomOriginConfig": {
        "HTTPPort": 80,
        "HTTPSPort": 443,
        "OriginProtocolPolicy": "http-only"
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    },
    "MinTTL": 0,
    "Compress": true,
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    }
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "$CERT_ARN",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Comment": "SoftServe Internship Website",
  "Enabled": true
}
EOF

    DIST_OUTPUT=$(aws cloudfront create-distribution \
        --distribution-config file:///tmp/dist-config.json \
        --output json)

    DIST_ID=$(echo $DIST_OUTPUT | jq -r '.Distribution.Id')
    DIST_DOMAIN=$(echo $DIST_OUTPUT | jq -r '.Distribution.DomainName')

    print_success "CloudFront distribution created: $DIST_ID"
    print_success "CloudFront domain: $DIST_DOMAIN"
    rm /tmp/dist-config.json

    print_warning "Distribution is deploying... This takes 15-20 minutes"
else
    print_warning "CloudFront distribution already exists: $DIST_ID"
    DIST_DOMAIN=$(aws cloudfront get-distribution \
        --id $DIST_ID \
        --query 'Distribution.DomainName' \
        --output text)
    print_info "CloudFront domain: $DIST_DOMAIN"
fi

echo ""
print_info "Step 5/6: Configuring Route53..."

# Check if hosted zone exists
ZONE_ID=$(aws route53 list-hosted-zones \
    --query "HostedZones[?Name=='$BASE_DOMAIN.'].Id" \
    --output text 2>/dev/null | cut -d'/' -f3 || echo "")

if [ -z "$ZONE_ID" ]; then
    print_info "Creating hosted zone..."
    ZONE_OUTPUT=$(aws route53 create-hosted-zone \
        --name $BASE_DOMAIN \
        --caller-reference "softserve-$(date +%s)" \
        --output json)

    ZONE_ID=$(echo $ZONE_OUTPUT | jq -r '.HostedZone.Id' | cut -d'/' -f3)
    print_success "Hosted zone created: $ZONE_ID"

    # Get nameservers
    NAMESERVERS=$(echo $ZONE_OUTPUT | jq -r '.DelegationSet.NameServers[]')
    print_warning "⚠ IMPORTANT: Update your domain nameservers:"
    echo "$NAMESERVERS"
    echo ""
else
    print_warning "Hosted zone already exists: $ZONE_ID"
fi

# Create A record for www
print_info "Creating DNS record for $DOMAIN..."
cat > /tmp/route53-change.json <<EOF
{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "$DOMAIN",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "$DIST_DOMAIN",
        "EvaluateTargetHealth": false
      }
    }
  }]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id $ZONE_ID \
    --change-batch file:///tmp/route53-change.json \
    --output json > /dev/null

print_success "DNS record created for $DOMAIN"
rm /tmp/route53-change.json

# Create A record for apex domain
print_info "Creating DNS record for $BASE_DOMAIN..."
cat > /tmp/route53-change-apex.json <<EOF
{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "$BASE_DOMAIN",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "$DIST_DOMAIN",
        "EvaluateTargetHealth": false
      }
    }
  }]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id $ZONE_ID \
    --change-batch file:///tmp/route53-change-apex.json \
    --output json > /dev/null

print_success "DNS record created for $BASE_DOMAIN"
rm /tmp/route53-change-apex.json

echo ""
print_info "Step 6/6: Verification..."

# Save deployment info
cat > deployment-info.txt <<EOF
SoftServe Website Deployment Information
=========================================

Deployment Date: $(date)
AWS Account: $ACCOUNT_ID
Region: $REGION

Resources Created:
- S3 Bucket: $BUCKET_NAME
- S3 Website Endpoint: http://$WEBSITE_ENDPOINT
- CloudFront Distribution ID: $DIST_ID
- CloudFront Domain: $DIST_DOMAIN
- Route53 Hosted Zone ID: $ZONE_ID
- SSL Certificate ARN: $CERT_ARN

Website URLs:
- https://$DOMAIN
- https://$BASE_DOMAIN

Next Steps:
1. Wait 15-20 minutes for CloudFront deployment
2. Ensure SSL certificate is validated (ACM console)
3. Update domain nameservers if not using Route53
4. Test website at https://$DOMAIN
5. Submit test application to verify FormSpree

Update Command:
aws s3 sync . s3://$BUCKET_NAME --exclude "*.sh" --exclude "*.md" --delete
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"

Monthly Costs (estimated):
- S3: ~\$0.02/month
- CloudFront: ~\$0.50-2/month
- Route53: ~\$0.50/month
- Total: ~\$1-3/month

Domain Registration: ~\$12-14/year (if purchased via Route53)
EOF

print_success "Deployment information saved to deployment-info.txt"

echo ""
echo "=========================================="
print_success "Deployment completed successfully!"
echo "=========================================="
echo ""
print_info "Your website will be available at:"
echo "  • https://$DOMAIN"
echo "  • https://$BASE_DOMAIN"
echo ""
print_warning "Important Notes:"
echo "  1. CloudFront deployment takes 15-20 minutes"
echo "  2. DNS propagation can take up to 48 hours"
echo "  3. Ensure SSL certificate is validated in ACM"
echo "  4. Update nameservers at your domain registrar"
echo ""
print_info "Check deployment status:"
echo "  aws cloudfront get-distribution --id $DIST_ID --query 'Distribution.Status'"
echo ""
print_info "View deployment details:"
echo "  cat deployment-info.txt"
echo ""
print_success "Happy coding! 🚀"
echo ""
