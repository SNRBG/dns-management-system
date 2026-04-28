# 📤 GitHub & Vercel Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended)

1. **Go to GitHub.com**
   - Visit https://github.com/new
   - Sign in with your GitHub account

2. **Create New Repository**
   - Repository name: `dns-management-system`
   - Description: "DNS Management System - Full Stack Application"
   - Choose: Public (or Private)
   - Click "Create repository"

3. **Copy the repository URL** (You'll need this in Step 2)
   - Example: `https://github.com/your-username/dns-management-system.git`

### Option B: Using GitHub CLI

```bash
# If you don't have GitHub CLI, install it from: https://cli.github.com

gh repo create dns-management-system --public --source=. --remote=origin --push
```

---

## Step 2: Push to GitHub (via Terminal)

### Initialize Git Locally

```bash
# Navigate to project root
cd C:\Users\Admin\OneDrive\Desktop\dns-management-system

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete DNS Management System"

# Add remote repository (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR-USERNAME/dns-management-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### First Push Complete! ✅

You should see:
```
Enumerating objects: ...
Counting objects: ...
Compressing objects: ...
Writing objects: ...
remote: Create a pull request for 'main' on GitHub...
To https://github.com/YOUR-USERNAME/dns-management-system.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

### Verify on GitHub
- Visit `https://github.com/YOUR-USERNAME/dns-management-system`
- You should see all your files!

---

## Step 3: Deploy Frontend on Vercel

### Prerequisites
- GitHub repository created and pushed ✅
- Vercel account (free at https://vercel.com)

### Deploy Frontend

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" (or "Log In")
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Project**
   - Click "New Project"
   - Search for "dns-management-system"
   - Click "Import"

3. **Configure Project**
   - Framework: React (auto-detected)
   - Root Directory: `front-end`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Click "Environment Variables"

4. **Add Environment Variables**
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-api-url.com/api` (we'll update this after backend deployment)
   - For now, you can use: `http://localhost:5000/api` for local testing
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a URL like: `https://dns-management-system-xxx.vercel.app`

### Frontend Deployed! 🎉

---

## Step 4: Deploy Backend on Vercel

### Prerequisites
- Frontend deployed ✅
- MongoDB Atlas account (free at https://mongodb.com)

### Set Up MongoDB Atlas

1. **Create MongoDB Cluster**
   - Go to https://mongodb.com/cloud/atlas
   - Sign up for free tier
   - Create a cluster
   - Create a database user
   - Get connection string

2. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dns-management
   ```

### Deploy Backend

1. **Go to Vercel**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Search for "dns-management-system"
   - Click "Import"

2. **Configure Backend**
   - Framework: Other
   - Root Directory: `back-end`
   - Build Command: (leave empty)
   - Install Command: `npm install`
   - Output Directory: (leave empty)
   - Click "Environment Variables"

3. **Add Environment Variables**
   ```
   MONGO_URI: mongodb+srv://username:password@cluster.mongodb.net/dns-management
   JWT_SECRET: your-super-secret-jwt-key-12345
   NODE_ENV: production
   PORT: (leave empty - Vercel will handle this)
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a URL like: `https://dns-management-system-api-xxx.vercel.app`

### Backend Deployed! 🎉

---

## Step 5: Connect Frontend to Backend

### Update Frontend Environment Variables

1. **Go to Vercel Dashboard**
   - Click on your frontend project
   - Go to "Settings" → "Environment Variables"
   - Update `REACT_APP_API_URL` to your backend URL:
     ```
     https://your-backend-url.vercel.app/api
     ```
   - Click "Save"

2. **Redeploy Frontend**
   - Go to "Deployments"
   - Click the three dots (⋮) on latest deployment
   - Click "Redeploy"
   - Wait for deployment to complete

---

## Step 6: Test Your Deployment

### Frontend
1. Visit your frontend URL
2. Register a new account
3. Login
4. Create DNS records

### Backend API
```bash
# Test health check
curl https://your-backend-url.vercel.app/

# Test registration
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456","confirmPassword":"123456"}'
```

---

## Troubleshooting

### Frontend Issues

**"Cannot connect to backend"**
- Check `REACT_APP_API_URL` is set correctly
- Verify backend is deployed and running
- Check for CORS issues in browser console

**"Build fails"**
- Check `front-end` folder exists
- Verify `package.json` is in `front-end` folder
- Check `npm run build` works locally

### Backend Issues

**"MongoDB connection error"**
- Verify `MONGO_URI` in environment variables
- Check MongoDB user credentials
- Whitelist Vercel IPs in MongoDB Atlas (0.0.0.0/0)

**"404 Not Found"**
- Verify backend routes exist
- Check root directory setting in Vercel
- Ensure `back-end` folder exists

### General Issues

**"Deployment stuck/failed"**
- Check Vercel deployment logs
- Try redeploying
- Check git commits are pushed

**"Environment variables not updating"**
- After updating variables, must redeploy
- Clear browser cache
- Wait 1-2 minutes for changes

---

## Useful Commands

### Git Commands
```bash
# Check git status
git status

# View all commits
git log --oneline

# Make changes and push
git add .
git commit -m "Your message"
git push

# View remote
git remote -v

# Remove a file from tracking
git rm --cached filename
```

### Vercel CLI Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy project
vercel

# View deployment logs
vercel logs

# Set environment variables
vercel env add VARIABLE_NAME

# Pull production environment variables
vercel env pull
```

---

## Deployment URLs

After deployment, you'll have:

**Frontend:**
```
https://dns-management-system-xxx.vercel.app
```

**Backend:**
```
https://your-backend-url.vercel.app/api
```

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy frontend on Vercel
3. ✅ Deploy backend on Vercel
4. ✅ Connect frontend to backend
5. ✅ Test both applications
6. 🔄 Set up custom domain (optional)
7. 🔄 Configure monitoring (optional)
8. 🔄 Set up CI/CD pipeline (optional)

---

## Custom Domain (Optional)

To add a custom domain to your Vercel deployment:

1. Go to Vercel project settings
2. Go to "Domains"
3. Enter your domain name
4. Update DNS records (Vercel will provide instructions)
5. Wait for DNS propagation (up to 24 hours)

---

## Monitoring & Logs

### View Deployment Logs
- Go to Vercel dashboard
- Click on project
- Go to "Deployments"
- Click on deployment
- View logs

### Set Up Alerts
- Go to project "Settings"
- Go to "Integrations"
- Configure notifications

---

## Security Tips

✅ Never commit `.env` file (already in .gitignore)
✅ Use strong JWT secrets
✅ Keep dependencies updated
✅ Monitor deployment logs for errors
✅ Use MongoDB Atlas IP whitelist
✅ Enable HTTPS (automatic on Vercel)
✅ Regularly backup database

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Docs**: https://docs.github.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com

---

**Your DNS Management System is now live! 🚀**
