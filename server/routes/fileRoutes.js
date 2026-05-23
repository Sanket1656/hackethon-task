import express from 'express';
import {
  uploadFile,
  getAllFiles,
  downloadFile,
  deleteFile
} from '../controllers/fileController.js';
import upload, { handleMulterError } from '../middleware/upload.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload a PDF file
 * @access  Public
 */
router.post('/upload', upload.single('file'), handleMulterError, uploadFile);

/**
 * @route   GET /api/files
 * @desc    Get all uploaded files
 * @access  Public
 */
router.get('/files', getAllFiles);

/**
 * @route   GET /api/download/:id
 * @desc    Download a specific file
 * @access  Public
 */
router.get('/download/:id', downloadFile);

/**
 * @route   DELETE /api/files/:id
 * @desc    Delete a specific file
 * @access  Public
 */
router.delete('/files/:id', deleteFile);

export default router;


