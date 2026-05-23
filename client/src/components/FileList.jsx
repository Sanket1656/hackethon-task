import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaDownload, FaTrash, FaSpinner } from 'react-icons/fa';
import { formatFileSize, formatDate } from '../utils/formatFileSize';
import toast from 'react-hot-toast';
import api from '../services/api';

/**
 * FileList component
 * Displays list of uploaded files with download and delete actions
 */
const FileList = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  /**
   * Fetch all files from API
   */
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await api.getAllFiles();
      setFiles(response.files || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch files');
      console.error('Fetch files error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle file download
   */
  const handleDownload = async (fileId, fileName) => {
    try {
      toast.loading('Downloading file...', { id: 'download' });
      await api.downloadFile(fileId, fileName);
      toast.success('File downloaded successfully!', { id: 'download' });
    } catch (error) {
      toast.error(error.message || 'Download failed', { id: 'download' });
      console.error('Download error:', error);
    }
  };

  /**
   * Handle file delete
   */
  const handleDelete = async (fileId, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      setDeletingId(fileId);
      const response = await api.deleteFile(fileId);
      toast.success(response.message || 'File deleted successfully!');
      
      // Remove file from list
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      toast.error(error.message || 'Delete failed');
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Fetch files on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto mt-8">
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-4xl" />
          <span className="ml-3 text-gray-600 font-medium">Loading files...</span>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto mt-8">
        <div className="text-center py-12">
          <FaFilePdf className="mx-auto text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No files uploaded yet
          </h3>
          <p className="text-gray-400">
            Upload your first PDF file to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Uploaded Files
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {files.length} {files.length === 1 ? 'File' : 'Files'}
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">File Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Upload Date</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={file.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <FaFilePdf className="text-red-600 text-2xl flex-shrink-0" />
                    <span className="text-gray-800 font-medium truncate max-w-xs">
                      {file.originalName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {file.formattedSize || formatFileSize(file.fileSize)}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {formatDate(file.uploadDate)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleDownload(file.id, file.originalName)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                      title="Download"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id, file.originalName)}
                      disabled={deletingId === file.id}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      {deletingId === file.id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <FaFilePdf className="text-red-600 text-2xl flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium truncate">
                  {file.originalName}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {file.formattedSize || formatFileSize(file.fileSize)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(file.uploadDate)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload(file.id, file.originalName)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaDownload />
                <span>Download</span>
              </button>
              <button
                onClick={() => handleDelete(file.id, file.originalName)}
                disabled={deletingId === file.id}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {deletingId === file.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaTrash />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;

// Made with Bob
