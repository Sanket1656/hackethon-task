# 🚀 Deployment Guide - Vercel

This guide will help you deploy the PDF Upload & Tracking System to Vercel.

## 📁 Project Structure

Your project now has this structure:
```
hackethon-task/
├── client/     # Frontend (React + Vite)
└── server/     # Backend (Node.js + Express)
```

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MongoDB Atlas account (for cloud database)

## 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `pdf-upload-system`
   
   Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pdf-upload-system?retryWrites=true&w=majority`

## 🔧 Step 2: Deploy Backend to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Sanket1656/pdf-upload-tracking-system.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset**: Other
     - **Root Directory**: `server` ⚠️ IMPORTANT
     - **Build Command**: Leave empty
     - **Output Directory**: Leave empty

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   MAX_FILE_SIZE=157286400
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Backend**
   ```bash
   cd server
   vercel
   ```
   
4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add PORT
   vercel env add MAX_FILE_SIZE
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Update API URL**
   - Open `src/services/api.js`
   - Update `API_BASE_URL` with your backend URL:
   ```javascript
   const API_BASE_URL = 'https://your-backend.vercel.app/api';
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

3. **Import Frontend to Vercel**
   - Go to Vercel Dashboard
   - Click "Add New" → "Project"
   - Import the same repository
   - Configure project:
     - **Framework Preset**: Vite
     - **Root Directory**: `client` ⚠️ IMPORTANT
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app is now live!

## 🔄 Step 4: Configure CORS (Backend)

Update `server/server.js` to allow your frontend domain:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Commit and push changes:
```bash
git add .
git commit -m "Update CORS configuration"
git push
```

Vercel will automatically redeploy.

## ✅ Step 5: Verify Deployment

1. **Test Backend**
   - Visit `https://your-backend.vercel.app/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try uploading a PDF file
   - Verify file appears in the list
   - Test download and delete functions

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Verify connection string is correct
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

**File Upload Fails**
- Vercel has a 4.5MB body size limit for serverless functions
- For larger files, consider using:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary

**Environment Variables Not Working**
- Redeploy after adding environment variables
- Check variable names match exactly

### Frontend Issues

**API Calls Failing**
- Verify API_BASE_URL is correct
- Check CORS configuration
- Ensure backend is deployed and running

**Build Fails**
- Check for TypeScript errors
- Verify all dependencies are in package.json
- Clear cache and rebuild

## 🔒 Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables for all secrets**
3. **Enable MongoDB IP whitelist in production**
4. **Use HTTPS only**
5. **Implement rate limiting**
6. **Add authentication for production use**

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and logs
- **MongoDB Atlas**: Monitor database performance
- **Vercel Analytics**: Track user behavior (optional)

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

## 💰 Cost Considerations

- **Vercel Free Tier**: 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Serverless function execution limits

- **MongoDB Atlas Free Tier**:
  - 512MB storage
  - Shared RAM
  - No backup

For production apps with high traffic, consider upgrading to paid tiers.

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## 🆘 Need Help?

- Check Vercel deployment logs
- Review MongoDB Atlas logs
- Open an issue on GitHub
- Contact support

---

**Deployment Complete! 🎉**

Your PDF Upload & Tracking System is now live on Vercel!