# 📄 PDF Upload & Tracking System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for uploading, tracking, and managing large PDF files with real-time progress monitoring.

## ✨ Features

### Frontend Features
- 🎨 Modern, responsive UI with Tailwind CSS
- 📤 Drag-and-drop file upload support
- 📊 Real-time upload progress tracking
- ✅ Client-side file validation (PDF only, max 150MB)
- 📱 Mobile-responsive design
- 🔔 Toast notifications for user feedback
- 📥 Download uploaded files
- 🗑️ Delete files with confirmation
- 📋 File list with detailed information
- ⚡ Smooth animations and transitions

### Backend Features
- 🔒 Secure file upload with Multer
- 📁 Unique filename generation
- ✅ Server-side validation (PDF only, max 150MB)
- 💾 MongoDB database for metadata storage
- 🔄 RESTful API endpoints
- ⚠️ Comprehensive error handling
- 📦 MVC architecture

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
hackethon-task/
├── client/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileList.jsx    # File list component
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── ProgressBar.jsx # Upload progress
│   │   │   └── UploadBox.jsx   # Upload interface
│   │   ├── services/
│   │   │   └── api.js          # API service
│   │   ├── utils/
│   │   │   └── formatFileSize.js # Utility functions
│   │   ├── App.jsx             # Main component
│   │   ├── App.css             # Custom styles
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   └── vercel.json             # Vercel config
│
├── server/                      # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── fileController.js   # Business logic
│   ├── middleware/
│   │   └── upload.js           # Multer configuration
│   ├── models/
│   │   └── File.js             # File schema
│   ├── routes/
│   │   └── fileRoutes.js       # API routes
│   ├── uploads/                # Uploaded files storage
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   ├── package.json            # Backend dependencies
│   ├── server.js               # Entry point
│   └── vercel.json             # Vercel config
│
├── README.md                    # Main documentation
├── DEPLOYMENT.md                # Deployment guides
└── [other docs]                 # Additional documentation
```

See [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) for complete details.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sanket1656/pdf-upload-tracking-system.git
cd pdf-upload-tracking-system
```

### Step 2: Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/pdf-upload-system
PORT=5000
MAX_FILE_SIZE=157286400
```

5. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

6. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to client directory:
```bash
cd ../client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload a PDF file |
| GET | `/files` | Get all uploaded files |
| GET | `/download/:id` | Download a specific file |
| DELETE | `/files/:id` | Delete a specific file |

### API Examples

#### Upload File
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@/path/to/file.pdf"
```

#### Get All Files
```bash
curl http://localhost:5000/api/files
```

#### Download File
```bash
curl http://localhost:5000/api/download/{fileId} --output file.pdf
```

#### Delete File
```bash
curl -X DELETE http://localhost:5000/api/files/{fileId}
```

## 🎯 Usage Guide

### Uploading Files

1. **Drag and Drop**: Drag a PDF file onto the upload zone
2. **Browse**: Click "Browse Files" to select a file
3. **Validation**: File is validated (PDF only, max 50MB)
4. **Upload**: Click "Upload File" button
5. **Progress**: Watch real-time upload progress
6. **Success**: File appears in the list below

### Managing Files

- **Download**: Click the download button to save the file
- **Delete**: Click the delete button (with confirmation)
- **View Details**: See file name, size, and upload date

## 🔧 Configuration

### Backend Configuration

Edit `server/.env`:
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/pdf-upload-system

# Server port
PORT=5000

# Maximum file size (150MB in bytes)
MAX_FILE_SIZE=157286400
```

### Frontend Configuration

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🧪 Testing

### Test Backend
```bash
cd server
npm start
# Visit http://localhost:5000/health
```

### Test Frontend
```bash
npm run dev
# Visit http://localhost:5173
```

### Test File Upload
1. Open the application in browser
2. Select or drag a PDF file (up to 150MB)
3. Click "Upload File"
4. Verify file appears in the list
5. Test download and delete functions

## 📦 Building for Production

### Build Frontend
```bash
npm run build
```

The production build will be in the `dist/` directory.

### Deploy Backend
```bash
cd server
npm start
```

## 🚀 Deployment

This project is ready for deployment on Vercel. See detailed guides:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - GitHub repository setup
- **[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)** - Environment configuration
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist

### Quick Deploy

1. Push code to GitHub
2. Import to Vercel (backend & frontend separately)
3. Configure environment variables
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

### File Upload Fails
- Check file size (max 150MB)
- Verify file type (PDF only)
- Check server logs for errors
- Ensure `uploads/` directory exists

### CORS Issues
- Verify backend CORS configuration
- Check API URL in frontend
- Ensure both servers are running

### Port Already in Use
```bash
# Change port in .env (backend)
PORT=5001

# Vite will automatically use next available port
```

## 🔒 Security Considerations

- File type validation (client and server)
- File size limits enforced
- Unique filename generation
- Input sanitization
- Error handling without exposing sensitive data

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] File preview functionality
- [ ] Search and filter files
- [ ] Pagination for large file lists
- [ ] Multiple file upload
- [ ] File compression
- [ ] Dark mode
- [ ] File sharing links
- [ ] Upload history
- [ ] Cloud storage integration (AWS S3)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Sanket1656**
- GitHub: [@Sanket1656](https://github.com/Sanket1656)

Built with ❤️ using MERN Stack

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, please open an issue in the repository.

---

**Happy Coding! 🚀**
