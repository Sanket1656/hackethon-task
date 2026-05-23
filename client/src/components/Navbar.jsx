import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

/**
 * Navbar component
 * Displays the application header with logo and title
 */
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <FaFilePdf className="text-red-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">
                PDF Upload System
              </h1>
              <p className="text-blue-100 text-xs">
                Upload, Track & Manage PDFs
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white text-sm">
              <span className="font-semibold">Max Size:</span> 150MB
            </div>
            <div className="h-6 w-px bg-blue-400"></div>
            <div className="text-white text-sm">
              <span className="font-semibold">Format:</span> PDF Only
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Made with Bob
