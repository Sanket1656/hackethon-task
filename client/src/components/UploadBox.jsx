import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaTimes } from 'react-icons/fa';
import { isPDF, isValidFileSize, formatFileSize } from '../utils/formatFileSize';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast';
import api from '../services/api';

/**
 * UploadBox component
 * Handles file selection, drag-and-drop, validation, and upload
 */
const UploadBox = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Maximum file size (150MB)
  const MAX_FILE_SIZE = 157286400;

  /**
   * Handle file selection
   */
  const handleFileSelect = (file) => {
    // Validate file type
    if (!isPDF(file)) {
      toast.error('Only PDF files are allowed!');
      return;
    }

    // Validate file size
    if (!isValidFileSize(file, MAX_FILE_SIZE)) {
      toast.error('File size exceeds 150MB limit!');
      return;
    }

    setSelectedFile(file);
    toast.success('File selected successfully!');
  };

  /**
   * Handle file input change
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  /**
   * Handle drag over
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  /**
   * Handle file upload
   */
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first!');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await api.uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      toast.success(response.message || 'File uploaded successfully!');
      
      // Reset state
      setSelectedFile(null);
      setUploadProgress(0);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'Upload failed!');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Remove selected file
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('File removed');
  };

  /**
   * Open file picker
   */
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload PDF File
      </h2>

      {/* Drag and Drop Zone */}
      <div
        className={`border-3 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt
          className={`mx-auto text-6xl mb-4 transition-colors duration-300 ${
            isDragging ? 'text-blue-500' : 'text-gray-400'
          }`}
        />
        <p className="text-gray-600 mb-2 font-medium">
          Drag and drop your PDF file here
        </p>
        <p className="text-gray-400 text-sm mb-4">or</p>
        <button
          onClick={handleBrowseClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          disabled={isUploading}
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        <p className="text-xs text-gray-500 mt-4">
          Maximum file size: 150MB • PDF files only
        </p>
      </div>

      {/* Selected File Info */}
      {selectedFile && !isUploading && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <FaFilePdf className="text-red-600 text-3xl" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-600">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
              title="Remove file"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6 animate-slide-up">
          <ProgressBar progress={uploadProgress} />
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <div className="mt-6">
          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBox;

// Made with Bob
