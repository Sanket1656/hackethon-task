# 🔧 Deployment Troubleshooting Guide

This guide helps you fix common errors when deploying to Vercel or other platforms.

## 🚨 Common Deployment Errors & Solutions

### 1. MongoDB Connection Error

**Error Messages:**
```
MongooseError: The `uri` parameter to `openUri()` must be a string
Error: connect ECONNREFUSED
MongoDB Connection Error
```

**Cause:** Missing or incorrect `MONGODB_URI` environment variable

**Solution:**

#### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free tier)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `pdf-upload-system`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pdf-upload-system?retryWrites=true&w=majority
```

#### Step 3: Add to Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
   - **Environment:** Production, Preview, Development
3. Click "Save"
4. Redeploy your project

---

### 2. Port Already in Use (Local Development)

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Cause:** Port 5000 is already occupied by another process

**Solution:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or kill all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Mac/Linux:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use
npx kill-port 5000
```

---

### 3. Environment Variables Not Found

**Error Messages:**
```
process.env.MONGODB_URI is undefined
Cannot read property 'MONGODB_URI' of undefined
```

**Cause:** Environment variables not set in deployment platform

**Solution for Vercel:**

1. **Backend Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-upload-system
   PORT=5000
   MAX_FILE_SIZE=157286400
   NODE_ENV=production
   ```

2. **Frontend Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```

3. **How to Add:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add each variable
   - Select all environments (Production, Preview, Development)
   - Click "Save"
   - **Important:** Redeploy after adding variables

---

### 4. CORS Error

**Error Message:**
```
Access to fetch at 'https://backend.vercel.app/api/upload' from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Cause:** Backend not configured to accept requests from frontend domain

**Solution:**

Update `server/server.js`:

```javascript
// Replace this:
app.use(cors());

// With this:
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app',
    'https://your-frontend-*.vercel.app' // For preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

Then commit and push:
```bash
git add .
git commit -m "Fix CORS configuration"
git push
```

---

### 5. File Upload Fails on Vercel

**Error Message:**
```
File size exceeds limit
Request Entity Too Large
```

**Cause:** Vercel has a 4.5MB body size limit for serverless functions

**Solutions:**

#### Option A: Use Vercel Blob Storage (Recommended)
```bash
npm install @vercel/blob
```

Update upload logic to use Vercel Blob instead of local filesystem.

#### Option B: Use External Storage
- AWS S3
- Cloudinary
- Google Cloud Storage

#### Option C: Reduce File Size Limit
Update `server/.env`:
```env
MAX_FILE_SIZE=4500000  # 4.5MB
```

---

### 6. Build Fails

**Error Messages:**
```
Build failed
Module not found
Cannot find module
```

**Cause:** Missing dependencies or incorrect build configuration

**Solution:**

1. **Check package.json:**
   ```json
   {
     "scripts": {
       "build": "vite build",
       "start": "node server.js"
     }
   }
   ```

2. **Install all dependencies:**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd server
   npm install
   ```

3. **Verify vercel.json:**
   - Frontend: [`vercel.json`](vercel.json:1)
   - Backend: [`server/vercel.json`](server/vercel.json:1)

4. **Clear cache and rebuild:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

---

### 7. API Endpoint Not Found (404)

**Error Message:**
```
404 Not Found
Cannot GET /api/upload
```

**Cause:** Incorrect API URL or routing issue

**Solution:**

1. **Check Frontend API URL:**
   
   In `src/services/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
   ```

2. **Verify Backend Routes:**
   
   In `server/server.js`:
   ```javascript
   app.use('/api', fileRoutes);
   ```

3. **Test Endpoints:**
   ```bash
   # Health check
   curl https://your-backend.vercel.app/health
   
   # API endpoint
   curl https://your-backend.vercel.app/api/files
   ```

---

### 8. MongoDB Network Access Error

**Error Message:**
```
MongoNetworkError: connection timed out
MongoServerSelectionError: connect ETIMEDOUT
```

**Cause:** IP address not whitelisted in MongoDB Atlas

**Solution:**

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"
6. Wait 2-3 minutes for changes to propagate
7. Redeploy your application

---

### 9. Deployment Succeeds but App Doesn't Work

**Symptoms:**
- Deployment shows "Success"
- But app shows errors or blank page

**Solution:**

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Select your project
   - Click "Deployments"
   - Click on latest deployment
   - Check "Build Logs" and "Function Logs"

2. **Check Browser Console:**
   - Open your deployed app
   - Press F12 (Developer Tools)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Verify Environment Variables:**
   - Ensure all variables are set
   - Check for typos in variable names
   - Verify values are correct

4. **Test Backend Separately:**
   ```bash
   curl https://your-backend.vercel.app/health
   ```

---

## 📋 Pre-Deployment Checklist

Before deploying, verify:

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string obtained and tested
- [ ] All environment variables documented
- [ ] `.env` file NOT in repository
- [ ] `.env.example` file IS in repository
- [ ] CORS configured with frontend URL
- [ ] API URL updated in frontend
- [ ] Both frontend and backend build successfully locally
- [ ] All dependencies in package.json

---

## 🔍 Debugging Steps

### Step 1: Check Vercel Logs
```
Vercel Dashboard → Project → Deployments → Latest → Logs
```

### Step 2: Check Browser Console
```
F12 → Console Tab → Look for errors
```

### Step 3: Test Backend Health
```bash
curl https://your-backend.vercel.app/health
```

### Step 4: Test API Endpoints
```bash
# Get files
curl https://your-backend.vercel.app/api/files

# Upload file (test with small file)
curl -X POST -F "file=@test.pdf" https://your-backend.vercel.app/api/upload
```

### Step 5: Verify Environment Variables
```
Vercel Dashboard → Project → Settings → Environment Variables
```

---

## 🆘 Still Having Issues?

### 1. Check Documentation
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Complete deployment guide
- [`ENVIRONMENT_VARIABLES.md`](ENVIRONMENT_VARIABLES.md) - Environment setup
- [`README.md`](README.md) - Project overview

### 2. Common Solutions
- Redeploy after changing environment variables
- Clear browser cache
- Wait 2-3 minutes after MongoDB changes
- Check all URLs are HTTPS in production

### 3. Get Help
- Check Vercel deployment logs
- Review MongoDB Atlas logs
- Open GitHub issue with error details
- Contact support with specific error messages

---

## 📞 Support Resources

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas Docs:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
- **Project Issues:** [GitHub Issues](https://github.com/Sanket1656/pdf-upload-tracking-system/issues)

---

**Remember:** Most deployment errors are due to missing environment variables or incorrect MongoDB configuration. Double-check these first! 🔍