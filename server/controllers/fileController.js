import File from '../models/File.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc    Upload a PDF file
 * @route   POST /api/upload
 * @access  Public
 */
export const uploadFile = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select a PDF file.'
      });
    }

    // Create file metadata in database
    const fileData = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileSize: req.file.size,
      filePath: req.file.path,
      mimeType: req.file.mimetype
    });

    // Save to database
    await fileData.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileData._id,
        originalName: fileData.originalName,
        fileName: fileData.fileName,
        fileSize: fileData.fileSize,
        formattedSize: fileData.formattedSize,
        mimeType: fileData.mimeType,
        uploadDate: fileData.uploadDate
      }
    });

  } catch (error) {
    // If error occurs, delete the uploaded file
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
};

/**
 * @desc    Get all uploaded files
 * @route   GET /api/files
 * @access  Public
 */
export const getAllFiles = async (req, res) => {
  try {
    // Fetch all files, sorted by upload date (newest first)
    const files = await File.find()
      .sort({ uploadDate: -1 })
      .select('-__v'); // Exclude version key

    // Format response
    const formattedFiles = files.map(file => ({
      id: file._id,
      originalName: file.originalName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      formattedSize: file.formattedSize,
      mimeType: file.mimeType,
      uploadDate: file.uploadDate
    }));

    res.status(200).json({
      success: true,
      count: files.length,
      files: formattedFiles
    });

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching files',
      error: error.message
    });
  }
};

/**
 * @desc    Download a file
 * @route   GET /api/download/:id
 * @access  Public
 */
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find file in database
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Check if file exists on disk
    if (!fs.existsSync(file.filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Length', file.fileSize);

    // Stream file to response
    const fileStream = fs.createReadStream(file.filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading file',
      error: error.message
    });
  }
};

/**
 * @desc    Delete a file
 * @route   DELETE /api/files/:id
 * @access  Public
 */
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find file in database
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete file from disk
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    // Delete file metadata from database
    await File.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};

// Made with Bob
