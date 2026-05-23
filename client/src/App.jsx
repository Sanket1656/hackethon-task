import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import FileList from './components/FileList';

/**
 * Main App component
 * Manages the overall application state and layout
 */
function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**
   * Handle successful upload
   * Triggers file list refresh
   */
  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Navigation bar */}
      <Navbar />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Upload section */}
        <div className="mb-8">
          <UploadBox onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* File list section */}
        <div>
          <FileList refreshTrigger={refreshTrigger} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <span className="font-semibold">PDF Upload & Tracking System</span> - Built with MERN Stack
            </p>
            <p className="text-xs text-gray-500">
              MongoDB • Express.js • React.js • Node.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
