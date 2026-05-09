# Quick Deployment Checklist

## ✅ Pre-Deployment (Complete these first)

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account at https://cloud.mongodb.com
- [ ] Create a free cluster
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Copy connection string

### 2. Install Dependencies
```bash
npm install
```

## ✅ Deploy to Vercel

### Quick Deploy (5 minutes)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Add Environment Variables in Vercel Dashboard
Go to: Project Settings → Environment Variables

Add these 4 variables:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/sai-counsellors
JWT_SECRET=random-32-character-secret-key-here
ADMIN_USER=admin
ADMIN_PASS=your-password
```

### Deploy to Production
```bash
vercel --prod
```

## ✅ Connect Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records at your domain registrar:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait 5-60 minutes for DNS propagation

## ✅ Test Everything

- [ ] Visit your domain: `https://yourdomain.com`
- [ ] Test form submission on landing page
- [ ] Login at: `https://yourdomain.com/login`
- [ ] Check dashboard shows submitted lead
- [ ] Test delete functionality
- [ ] Test CSV export

## 🎉 Done!

Your site is live at:
- Production: `https://yourdomain.com`
- Vercel URL: `https://sai-counsellors.vercel.app`

## Need Help?
Check `DEPLOYMENT.md` for detailed troubleshooting guide.
