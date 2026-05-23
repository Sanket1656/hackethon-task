import axios from 'axios';

// Base API URL - automatically uses environment variable or defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * API service for file operations
 */
const api = {
  /**
   * Upload a PDF file with progress tracking
   * @param {File} file - The file to upload
   * @param {Function} onUploadProgress - Callback for upload progress
   * @returns {Promise} - Upload response
   */
  uploadFile: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' };
    }
  },

  /**
   * Get all uploaded files
   * @returns {Promise} - List of files
   */
  getAllFiles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch files' };
    }
  },

  /**
   * Download a file
   * @param {string} fileId - The ID of the file to download
   * @param {string} fileName - The name to save the file as
   * @returns {Promise} - Download response
   */
  downloadFile: async (fileId, fileName) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download/${fileId}`, {
        responseType: 'blob',
      });

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: 'File downloaded successfully' };
    } catch (error) {
      throw error.response?.data || { message: 'Download failed' };
    }
  },

  /**
   * Delete a file
   * @param {string} fileId - The ID of the file to delete
   * @returns {Promise} - Delete response
   */
  deleteFile: async (fileId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/files/${fileId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Delete failed' };
    }
  },
};

export default api;

// Made with Bob
