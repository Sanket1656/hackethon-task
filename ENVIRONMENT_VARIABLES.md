# 🔐 Environment Variables Guide

This document explains all environment variables used in the PDF Upload & Tracking System.

## 📁 Backend Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

### Required Variables

#### `MONGODB_URI`
- **Description**: MongoDB connection string
- **Type**: String
- **Required**: Yes
- **Example (Local)**: `mongodb://localhost:27017/pdf-upload-system`
- **Example (Atlas)**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pdf-upload-system?retryWrites=true&w=majority`
- **Notes**: 
  - For local development, ensure MongoDB is running
  - For production, use MongoDB Atlas
  - Never commit this value to Git

#### `PORT`
- **Description**: Port number for the backend server
- **Type**: Number
- **Required**: Yes
- **Default**: `5000`
- **Example**: `5000`
- **Notes**: 
  - Use 5000 for local development
  - Vercel will override this in production

#### `MAX_FILE_SIZE`
- **Description**: Maximum file size allowed for uploads (in bytes)
- **Type**: Number
- **Required**: Yes
- **Default**: `157286400` (150MB)
- **Example**: `157286400`
- **Notes**: 
  - 150MB = 157,286,400 bytes
  - Adjust based on your needs
  - Consider Vercel's 4.5MB serverless function limit

### Optional Variables

#### `NODE_ENV`
- **Description**: Application environment
- **Type**: String
- **Required**: No
- **Default**: `development`
- **Values**: `development`, `production`, `test`
- **Example**: `production`

## 🎨 Frontend Environment Variables

The frontend uses Vite, which requires environment variables to be prefixed with `VITE_`.

Create a `.env` file in the root directory (optional):

#### `VITE_API_BASE_URL`
- **Description**: Backend API base URL
- **Type**: String
- **Required**: No (hardcoded in `src/services/api.js`)
- **Example**: `http://localhost:5000/api`
- **Production Example**: `https://your-backend.vercel.app/api`
- **Notes**: 
  - Currently configured directly in code
  - Can be moved to environment variable for flexibility

## 📝 Setup Instructions

### Local Development

1. **Backend Setup**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Edit `server/.env`**
   ```env
   MONGODB_URI=mongodb://localhost:27017/pdf-upload-system
   PORT=5000
   MAX_FILE_SIZE=157286400
   ```

3. **Frontend Setup** (Optional)
   ```bash
   # In root directory
   touch .env
   ```

4. **Edit `.env`** (Optional)
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Production (Vercel)

#### Backend Environment Variables

1. Go to Vercel Dashboard
2. Select your backend project
3. Go to Settings → Environment Variables
4. Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
| `PORT` | `5000` | Production, Preview, Development |
| `MAX_FILE_SIZE` | `157286400` | Production, Preview, Development |

#### Frontend Environment Variables

1. Go to Vercel Dashboard
2. Select your frontend project
3. Go to Settings → Environment Variables
4. Add the following (if using env vars):

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app/api` | Production, Preview, Development |

**Note**: Currently, the API URL is hardcoded in `src/services/api.js`. You can update it there or use environment variables.

## 🔒 Security Best Practices

### DO ✅
- Use `.env.example` as a template (without sensitive values)
- Add `.env` to `.gitignore`
- Use different values for development and production
- Rotate credentials regularly
- Use MongoDB Atlas for production
- Enable IP whitelisting in MongoDB Atlas
- Use strong passwords for database users

### DON'T ❌
- Commit `.env` files to Git
- Share `.env` files publicly
- Use production credentials in development
- Hardcode sensitive values in code
- Use weak passwords
- Expose database credentials in error messages

## 🔄 Updating Environment Variables

### Local Development
1. Edit `.env` file
2. Restart the server
   ```bash
   npm run dev
   ```

### Vercel Production
1. Update variables in Vercel Dashboard
2. Redeploy the project
   ```bash
   vercel --prod
   ```
   Or push to GitHub (auto-deploys)

## 🧪 Testing Environment Variables

### Backend
```bash
cd server
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
```

### Frontend (if using env vars)
```bash
node -e "console.log(import.meta.env.VITE_API_BASE_URL)"
```

## 📋 Environment Variables Checklist

Before deploying, ensure:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists with placeholder values
- [ ] All required variables are set
- [ ] MongoDB connection string is valid
- [ ] Production uses MongoDB Atlas
- [ ] API URL points to production backend
- [ ] File size limits are appropriate
- [ ] Credentials are secure and not exposed

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check `MONGODB_URI` is correct
- Verify MongoDB is running (local)
- Check network access in MongoDB Atlas
- Verify database user credentials

### "Environment variable not found"
- Ensure `.env` file exists
- Check variable names match exactly
- Restart the server after changes
- Verify `dotenv` is installed

### "File upload fails"
- Check `MAX_FILE_SIZE` value
- Verify it's in bytes (not MB)
- Consider Vercel's 4.5MB limit for serverless

### "API calls failing in production"
- Verify `VITE_API_BASE_URL` or hardcoded URL
- Check CORS configuration
- Ensure backend is deployed and running

## 📚 Additional Resources

- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Connection Strings](https://docs.atlas.mongodb.com/driver-connection/)

## 🔗 Related Files

- `server/.env.example` - Template for backend environment variables
- `server/config/database.js` - MongoDB connection configuration
- `src/services/api.js` - Frontend API configuration
- `.gitignore` - Ensures `.env` files are not committed

---

**Keep your environment variables secure! 🔒**