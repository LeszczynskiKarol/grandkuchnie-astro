#!/bin/bash
# deploy.sh - Deploy Grand Kuchnie to S3 + CloudFront

S3_BUCKET="www.grandkuchnie.pl"
CLOUDFRONT_ID="E3BHDI3E6KXQAJ"

cd /d/grandkuchnie-astro

echo "📦 Pushing to GitHub..."
git add .
git commit -m "git push from local" || echo "  (brak zmian do commita — kontynuuję)"
git push origin main

if [ $? -ne 0 ]; then
  echo "❌ Git push failed!"
  exit 1
fi

echo "🔨 Building Astro site..."

npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://${S3_BUCKET} --delete

echo "🏷  Setting cache-control on hashed assets (1y immutable)..."
aws s3 cp s3://${S3_BUCKET}/_assets/ s3://${S3_BUCKET}/_assets/ \
  --recursive --exclude "*" --include "*.js" \
  --metadata-directive REPLACE --content-type "application/javascript" \
  --cache-control "public, max-age=31536000, immutable" --no-progress
aws s3 cp s3://${S3_BUCKET}/_assets/ s3://${S3_BUCKET}/_assets/ \
  --recursive --exclude "*" --include "*.css" \
  --metadata-directive REPLACE --content-type "text/css" \
  --cache-control "public, max-age=31536000, immutable" --no-progress

echo "🏷  Setting cache-control on /img/ (30d)..."
aws s3 cp s3://${S3_BUCKET}/img/ s3://${S3_BUCKET}/img/ \
  --recursive --exclude "*" --include "*.png" \
  --metadata-directive REPLACE --content-type "image/png" \
  --cache-control "public, max-age=2592000" --no-progress
aws s3 cp s3://${S3_BUCKET}/img/ s3://${S3_BUCKET}/img/ \
  --recursive --exclude "*" --include "*.webp" \
  --metadata-directive REPLACE --content-type "image/webp" \
  --cache-control "public, max-age=2592000" --no-progress
aws s3 cp s3://${S3_BUCKET}/img/ s3://${S3_BUCKET}/img/ \
  --recursive --exclude "*" --include "*.jpg" --include "*.jpeg" \
  --metadata-directive REPLACE --content-type "image/jpeg" \
  --cache-control "public, max-age=2592000" --no-progress

echo "🏷  Setting short cache-control on HTML (5 min, must-revalidate)..."
aws s3 cp s3://${S3_BUCKET}/ s3://${S3_BUCKET}/ \
  --recursive --exclude "*" --include "*.html" \
  --metadata-directive REPLACE --content-type "text/html; charset=utf-8" \
  --cache-control "public, max-age=300, must-revalidate" --no-progress

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

echo "✅ Deployed to https://www.grandkuchnie.pl"