# 📁 Project Structure

Your project is now organized with separate `client/` and `server/` directories.

## 🏗️ Current Structure

```
hackethon-task/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── UploadBox.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── formatFileSize.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   └── vite.svg
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── fileController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   └── File.js
│   ├── routes/
│   │   └── fileRoutes.js
│   ├── uploads/
│   │   └── .gitkeep
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── vercel.json
│
├── .gitignore                       # Root gitignore
├── .vscode/                         # VS Code settings
├── CONTRIBUTING.md                  # Contribution guidelines
├── DEPLOYMENT_CHECKLIST.md          # Pre-deployment checklist
├── DEPLOYMENT_TROUBLESHOOTING.md    # Deployment error solutions
├── DEPLOYMENT.md                    # Vercel deployment guide
├── ENVIRONMENT_VARIABLES.md         # Environment setup guide
├── GITHUB_SETUP.md                  # GitHub setup instructions
├── LICENSE                          # MIT License
├── PRESENTATION_GUIDE.md            # Presentation guide
├── PROJECT_STRUCTURE.md             # This file
├── QUICK_REFERENCE.md               # Quick reference
├── README.md                        # Main documentation
├── RENDER_DEPLOYMENT.md             # Render deployment guide
└── SETUP_GUIDE.md                   # Setup instructions
```

## 🚀 Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📦 Deployment Settings

### Render Deployment

**Backend Service:**
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  ```
  MONGODB_URI=mongodb+srv://...
  PORT=10000
  MAX_FILE_SIZE=157286400
  NODE_ENV=production
  ```

**Frontend Static Site:**
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:**
  ```
  VITE_API_BASE_URL=https://your-backend.onrender.com/api
  ```

### Vercel Deployment

**Backend:**
- **Root Directory:** `server`
- **Framework Preset:** Other
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)

**Frontend:**
- **Root Directory:** `client`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 🔧 Configuration Files

### Client Configuration
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `.env.example` - Environment variables template

### Server Configuration
- `server.js` - Express server entry point
- `.env` - Environment variables (not in Git)
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

## 📝 Important Notes

1. **Environment Files:**
   - `client/.env.example` - Template for frontend env vars
   - `server/.env` - Actual backend env vars (not in Git)
   - `server/.env.example` - Template for backend env vars

2. **Git Ignore:**
   - Root `.gitignore` - Ignores common files
   - `server/.gitignore` - Ignores server-specific files
   - Both ignore `.env` files and `node_modules`

3. **Dependencies:**
   - Install separately for client and server
   - Each has its own `package.json`
   - Each has its own `node_modules`

## 🔄 Migration from Old Structure

If you had files in the root, they've been moved:
- Frontend files → `client/`
- Backend files → `server/`
- Documentation → Root (unchanged)

## 📚 Documentation

All documentation files remain in the root directory for easy access:
- Setup guides
- Deployment guides
- Troubleshooting guides
- Contributing guidelines

## 🆘 Need Help?

Refer to:
- [`README.md`](README.md) - Main documentation
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md) - Setup instructions
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Deployment guide
- [`RENDER_DEPLOYMENT.md`](RENDER_DEPLOYMENT.md) - Render-specific guide