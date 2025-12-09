#!/bin/bash
# deploy.sh - Deploy Grand Kuchnie to S3 + CloudFront

S3_BUCKET="www.grandkuchnie.pl"
CLOUDFRONT_ID="E3BHDI3E6KXQAJ"

echo "🔨 Building Astro site..."
cd /d/grandkuchnie-astro
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://${S3_BUCKET} --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

echo "✅ Deployed to https://www.grandkuchnie.pl"