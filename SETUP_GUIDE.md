# 🚀 Quick Setup Guide - PDF Upload & Tracking System

This guide will help you set up and run the PDF Upload & Tracking System in just a few minutes.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- ✅ Node.js (v16 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB installed or MongoDB Atlas account - [Download](https://www.mongodb.com/try/download/community)
- ✅ Git (optional) - [Download](https://git-scm.com/)
- ✅ A code editor (VS Code recommended)

## ⚡ Quick Start (5 Minutes)

### Step 1: Install MongoDB (if not installed)

**Windows:**
```bash
# Download and install from: https://www.mongodb.com/try/download/community
# MongoDB will start automatically as a service
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Use it in `.env` file

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection
# For local MongoDB: mongodb://localhost:27017/pdf-upload-system
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/pdf-upload-system

# Start the backend server
npm run dev
```

✅ Backend should now be running on `http://localhost:5000`

### Step 3: Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to project root (if in server directory)
cd ..

# Install dependencies
npm install

# Start the frontend
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

### Step 4: Test the Application

1. Open browser and go to `http://localhost:5173`
2. Drag and drop a PDF file or click "Browse Files"
3. Click "Upload File"
4. Watch the progress bar
5. See your file in the list below
6. Try downloading and deleting files

## 🎯 Detailed Setup Instructions

### Backend Configuration

1. **Environment Variables** (`server/.env`):
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/pdf-upload-system

# Server Port
PORT=5000

# Max File Size (150MB in bytes)
MAX_FILE_SIZE=157286400
```

2. **MongoDB Connection Options**:

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/pdf-upload-system
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pdf-upload-system?retryWrites=true&w=majority
```

3. **Start Backend**:
```bash
cd server

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Frontend Configuration

1. **API Configuration** (if backend is on different port):

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

2. **Start Frontend**:
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Verification Steps

### 1. Check Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Check MongoDB Connection
Look for this in backend terminal:
```
✅ MongoDB Connected: localhost
📊 Database: pdf-upload-system
🚀 Server running on port 5000
```

### 3. Check Frontend
Open `http://localhost:5173` in browser - you should see the upload interface.

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error:** `MongoDB Connection Error`

**Solutions:**
- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux) or check Services (Windows)
- Check connection string in `.env`
- For Atlas: Whitelist your IP address in MongoDB Atlas dashboard
- Verify username/password in connection string

### Issue 2: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Change port in server/.env
PORT=5001

# Or kill the process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue 3: Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running
- Check CORS configuration in `server/server.js`
- Verify API URL in `src/services/api.js`

### Issue 5: File Upload Fails

**Possible Causes:**
- File size exceeds 150MB
- File is not a PDF
- Backend not running
- `uploads/` directory doesn't exist

**Solution:**
```bash
# Create uploads directory manually
cd server
mkdir uploads
```

## 📦 Dependencies Installation

### Backend Dependencies
```bash
cd server
npm install express mongoose multer cors dotenv
npm install --save-dev nodemon
```

### Frontend Dependencies
```bash
npm install react react-dom axios react-hot-toast react-icons
npm install --save-dev @vitejs/plugin-react tailwindcss postcss autoprefixer
```

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] MongoDB connection successful
- [ ] Frontend loads in browser
- [ ] Can select PDF file
- [ ] Can drag and drop PDF file
- [ ] Upload progress shows correctly
- [ ] File appears in list after upload
- [ ] Can download uploaded file
- [ ] Can delete uploaded file
- [ ] Toast notifications work
- [ ] Responsive design works on mobile

## 🔧 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Nodemon restarts server on file changes

### Debugging
```bash
# Backend logs
cd server
npm run dev
# Watch terminal for errors

# Frontend logs
# Open browser DevTools (F12)
# Check Console tab for errors
```

### Database Management

**View MongoDB Data:**
```bash
# Using MongoDB Compass (GUI)
# Download: https://www.mongodb.com/products/compass

# Using MongoDB Shell
mongosh
use pdf-upload-system
db.files.find()
```

## 🚀 Production Deployment

### Build Frontend
```bash
npm run build
# Output in dist/ directory
```

### Deploy Backend
```bash
cd server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=<your-production-mongodb-uri>
PORT=5000
MAX_FILE_SIZE=157286400
```

## 📞 Need Help?

If you encounter any issues:

1. Check the error message in terminal
2. Review the troubleshooting section above
3. Check MongoDB connection
4. Verify all dependencies are installed
5. Ensure both servers are running
6. Check browser console for frontend errors

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Backend shows "MongoDB Connected" message
- ✅ Frontend loads without errors
- ✅ You can upload a PDF file
- ✅ Progress bar shows during upload
- ✅ File appears in the list
- ✅ Download and delete work correctly

## 🎉 You're All Set!

Your PDF Upload & Tracking System is now ready to use. Start uploading files and enjoy the real-time progress tracking!

---

**Need more help?** Check the main [README.md](README.md) for detailed documentation.