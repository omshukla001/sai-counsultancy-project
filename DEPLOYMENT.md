# Sai Counsellors - Vercel Deployment Guide

## Prerequisites
1. MongoDB Atlas account (free tier works)
2. Vercel account (free tier works)
3. Your custom domain

## Step 1: Setup MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user (Database Access → Add New User)
4. Whitelist all IPs (Network Access → Add IP → Allow Access from Anywhere: `0.0.0.0/0`)
5. Get connection string (Connect → Connect your application → Copy connection string)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `sai-counsellors`

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? sai-counsellors
# - Directory? ./
# - Override settings? No
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository (GitHub/GitLab/Bitbucket)
3. Configure project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

## Step 3: Add Environment Variables
In Vercel Dashboard (Settings → Environment Variables), add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sai-counsellors?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
ADMIN_USER=admin
ADMIN_PASS=your-secure-password-here
```

**Important:** Use a strong random string for JWT_SECRET (at least 32 characters)

## Step 4: Connect Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `saicounsellors.com`)
3. Follow DNS configuration instructions:
   - **If using Vercel nameservers:** Point your domain's nameservers to Vercel
   - **If using external DNS:** Add A record pointing to `76.76.21.21` or CNAME to `cname.vercel-dns.com`
4. Wait for DNS propagation (5-60 minutes)

## Step 5: Test Your Deployment

### Test Landing Page
Visit: `https://your-domain.com`

### Test Admin Login
1. Visit: `https://your-domain.com/login`
2. Login with credentials from ADMIN_USER and ADMIN_PASS

### Test Form Submission
1. Fill form on landing page
2. Check dashboard for new lead

## Project Structure
```
sai-couns/
├── api/
│   ├── _auth.js       # JWT authentication helpers
│   ├── _db.js         # MongoDB connection & schema
│   ├── leads.js       # GET/POST/DELETE /api/leads
│   └── login.js       # POST /api/login
├── public/
│   ├── index.html     # Landing page with form
│   ├── login.html     # Admin login
│   └── dashboard.html # Admin dashboard
├── vercel.json        # Vercel routing config
├── package.json       # Dependencies
└── .env.example       # Environment variables template

```

## API Endpoints
- `POST /api/login` - Admin authentication (returns JWT)
- `POST /api/leads` - Submit lead (public)
- `GET /api/leads` - Get all leads (protected, requires JWT)
- `DELETE /api/leads?id=xxx` - Delete lead (protected)

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGO_URI is correct in Vercel environment variables
- Verify MongoDB Atlas allows connections from `0.0.0.0/0`
- Check database user credentials

### "Unauthorized" on dashboard
- Clear browser localStorage and login again
- Verify JWT_SECRET is set in Vercel
- Check ADMIN_USER and ADMIN_PASS match your login credentials

### Domain not working
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings

### API routes returning 404
- Verify `vercel.json` exists in project root
- Redeploy: `vercel --prod`

## Security Notes
- Never commit `.env` file to Git
- Use strong passwords for ADMIN_PASS
- Use a random 32+ character string for JWT_SECRET
- Regularly update dependencies: `npm update`

## Support
For issues, check:
- Vercel deployment logs: Dashboard → Deployments → View Function Logs
- MongoDB Atlas logs: Atlas Dashboard → Monitoring
