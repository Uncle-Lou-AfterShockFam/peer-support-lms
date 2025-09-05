# 🚀 VERCEL DEPLOYMENT GUIDE

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Code

Your Next.js LMS is ready! All files are created in `/Users/louispiotti/BASEROW_FINAL/vercel-lms/`

### 2. Create GitHub Repository

```bash
cd /Users/louispiotti/BASEROW_FINAL/vercel-lms

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Peer Support LMS"

# Add GitHub remote (create repo first on GitHub)
git remote add origin https://github.com/YOUR_USERNAME/peer-support-lms.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Use Vercel CLI (Fastest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/louispiotti/BASEROW_FINAL/vercel-lms
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: peer-support-lms
# - Directory: ./
# - Deploy? Yes
```

#### Option B: Use Vercel Dashboard
1. Go to https://vercel.com/new
2. Connect your GitHub account
3. Import your `peer-support-lms` repository
4. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### 4. Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```bash
# Required Variables
BASEROW_API_URL = http://YOUR_BASEROW_SERVER_IP/api
BASEROW_TOKEN = n6thchplcU5e0mh9E5Vl9sd5Ig8PZFdR
NEXT_PUBLIC_SITE_URL = https://safepeerportal.soberafe.com
NEXT_PUBLIC_API_URL = https://safepeerportal.soberafe.com/api
```

### 5. Set Up Custom Domain

#### In Vercel Dashboard:
1. Go to Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `safepeerportal.soberafe.com`
4. Vercel will provide DNS instructions

#### In Namecheap DNS:
```
Type: A
Host: safepeerportal
Value: 76.76.19.61  (Vercel's IP - they'll provide the exact IP)
TTL: 1 min
```

### 6. Make Baserow Accessible

Your local Baserow needs to be accessible from Vercel. Options:

#### Option A: Use ngrok (Quick Testing)
```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com

# Expose your local Baserow
ngrok http 80

# Update Vercel environment variables with ngrok URL:
# BASEROW_API_URL = https://abc123.ngrok.io/api
```

#### Option B: Deploy Baserow to Cloud (Production)
```bash
# Use the production Docker setup created earlier
# Deploy to DigitalOcean, AWS, or similar
# Update BASEROW_API_URL to your cloud server
```

### 7. Test Deployment

1. Visit your Vercel deployment URL (provided after deployment)
2. Test navigation and API connections
3. Verify course data loads correctly
4. Check responsive design on mobile

### 8. Deploy Updates

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main

# Vercel automatically redeploys on git push!
```

## 🌐 Expected Result

Your LMS will be live at:
- **Development URL**: `https://peer-support-lms-xyz.vercel.app`
- **Custom Domain**: `https://safepeerportal.soberafe.com`

## ⚡ Performance Optimizations

Vercel automatically provides:
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Automatic HTTPS**: SSL certificate included
- ✅ **Edge Functions**: Server-side rendering at the edge
- ✅ **Image Optimization**: Automatic image optimization
- ✅ **Gzip Compression**: Faster page loads

## 🔧 Troubleshooting

### Common Issues:

#### 1. API Connection Failed
```bash
# Check environment variables are set correctly
# Verify BASEROW_API_URL is accessible from internet
# Test API endpoint: curl YOUR_BASEROW_API_URL/health
```

#### 2. Build Failed
```bash
# Check Vercel build logs
# Common issue: TypeScript errors
# Fix: Add "typescript": "^5.3.3" to package.json dependencies
```

#### 3. Domain Not Working
```bash
# DNS propagation takes 5-60 minutes
# Check DNS: dig safepeerportal.soberafe.com
# Verify A record points to Vercel IP
```

#### 4. Data Not Loading
```bash
# Check BASEROW_TOKEN is correct
# Verify table IDs match your Baserow setup
# Check browser console for API errors
```

## 🎯 Next Steps After Deployment

1. **Test thoroughly**: All pages, navigation, data loading
2. **Add analytics**: Google Analytics, Vercel Analytics
3. **Set up monitoring**: Uptime monitoring, error tracking
4. **Optimize performance**: Review Vercel Speed Insights
5. **Scale database**: Consider cloud Baserow hosting

## 💰 Vercel Pricing

- **Hobby Plan**: FREE
  - Perfect for testing and small deployments
  - Custom domains included
  - 100GB bandwidth/month

- **Pro Plan**: $20/month
  - Recommended for production
  - Unlimited bandwidth
  - Advanced analytics

Your LMS should fit comfortably in the FREE tier initially!

---

🎉 **Your professional LMS will be live and ready to serve students worldwide!**