# 🚀 Render Deployment Guide

Complete guide for deploying your PDF Upload & Tracking System on Render.

## 📋 Prerequisites

- GitHub account with your code pushed
- MongoDB Atlas account (free tier)
- Render account (sign up at [render.com](https://render.com))

## 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `pdfuser` (or your choice)
   - Generate strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `pdf-upload-system`
   
   Example:
   ```
   mongodb+srv://pdfuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pdf-upload-system?retryWrites=true&w=majority
   ```

## 🔧 Step 2: Deploy Backend on Render

### 2.1 Create Web Service

1. **Login to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Click "Connect account" to link GitHub
   - Select your repository: `pdf-upload-tracking-system`
   - Click "Connect"

3. **Configure Service**
   - **Name:** `pdf-upload-backend` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `10000` (Render's default) |
   | `MAX_FILE_SIZE` | `157286400` |
   | `NODE_ENV` | `production` |

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://pdf-upload-backend.onrender.com`)

### 2.2 Verify Backend Deployment

Test your backend:
```bash
# Health check
curl https://your-backend.onrender.com/health

# Get files
curl https://your-backend.onrender.com/api/files
```

## 🎨 Step 3: Deploy Frontend on Render

### 3.1 Create Static Site

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Select same repository
   - Click "Connect"

2. **Configure Static Site**
   - **Name:** `pdf-upload-frontend`
   - **Branch:** `main`
   - **Root Directory:** `.` (leave empty or use root)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Add Environment Variable**
   Click "Advanced" → "Add Environment Variable"
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api` |

4. **Create Static Site**
   - Click "Create Static Site"
   - Wait for deployment
   - Copy your frontend URL

## 🔄 Step 4: Update CORS Configuration

After getting your frontend URL, update backend CORS:

1. **Update server/server.js**
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:5173',
       'https://your-frontend.onrender.com'
     ],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   };
   
   app.use(cors(corsOptions));
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Update CORS for Render deployment"
   git push
   ```

3. **Render will auto-redeploy** (takes 2-3 minutes)

## ✅ Step 5: Test Your Deployment

1. **Open Frontend URL**
   - Visit your frontend URL
   - Should see the upload interface

2. **Test File Upload**
   - Select a small PDF file
   - Click "Upload File"
   - Verify file appears in list

3. **Test Download**
   - Click download button
   - Verify file downloads

4. **Test Delete**
   - Click delete button
   - Confirm deletion
   - Verify file is removed

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** "No open ports detected"

**Solution:** Already fixed! The server now binds to `0.0.0.0` which Render requires.

### MongoDB Connection Failed

**Error:** "MongoNetworkError" or "connection timed out"

**Solutions:**
1. Verify connection string is correct
2. Check MongoDB Atlas Network Access allows 0.0.0.0/0
3. Ensure database user password is correct
4. Wait 2-3 minutes after changing Network Access

### CORS Error

**Error:** "blocked by CORS policy"

**Solution:**
1. Add your frontend URL to CORS configuration
2. Commit and push changes
3. Wait for auto-redeploy

### Build Fails

**Error:** "Build failed" or "Module not found"

**Solutions:**
1. Check `package.json` has all dependencies
2. Verify build command is correct
3. Check Render build logs for specific error
4. Ensure `node_modules` is in `.gitignore`

### File Upload Fails

**Error:** "File too large" or "Request Entity Too Large"

**Note:** Render Free tier has limitations. For large files:
1. Reduce `MAX_FILE_SIZE` to 10MB (10485760 bytes)
2. Or upgrade to paid plan
3. Or use external storage (AWS S3, Cloudinary)

## 📊 Monitoring

### Check Logs
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. View real-time logs

### Check Metrics
1. Go to service dashboard
2. Click "Metrics" tab
3. View CPU, Memory, Bandwidth usage

## 💰 Free Tier Limitations

Render Free tier includes:
- ✅ 750 hours/month
- ✅ Automatic HTTPS
- ✅ Auto-deploy from Git
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold start takes 30-60 seconds
- ⚠️ Limited bandwidth

**Note:** First request after inactivity will be slow due to cold start.

## 🔄 Auto-Deploy

Render automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Render will auto-deploy in 2-3 minutes
```

## 🆙 Upgrading

To avoid cold starts and get better performance:
1. Go to service settings
2. Change instance type from "Free" to "Starter" ($7/month)
3. Confirm upgrade

## 📝 Environment Variables Reference

### Backend Variables
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pdf-upload-system
PORT=10000
MAX_FILE_SIZE=157286400
NODE_ENV=production
```

### Frontend Variables
```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

## 🔗 Useful Links

- **Render Dashboard:** [dashboard.render.com](https://dashboard.render.com)
- **Render Docs:** [render.com/docs](https://render.com/docs)
- **MongoDB Atlas:** [cloud.mongodb.com](https://cloud.mongodb.com)
- **Your Backend:** `https://your-backend.onrender.com`
- **Your Frontend:** `https://your-frontend.onrender.com`

## 🆘 Need Help?

1. Check Render logs for errors
2. Review MongoDB Atlas logs
3. Test backend health endpoint
4. Check browser console for frontend errors
5. Refer to [`DEPLOYMENT_TROUBLESHOOTING.md`](DEPLOYMENT_TROUBLESHOOTING.md)

---

**Congratulations! Your app is now live on Render! 🎉**