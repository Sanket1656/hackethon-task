import mongoose from 'mongoose';

/**
 * File Schema for storing PDF metadata
 * Stores information about uploaded PDF files
 */
const fileSchema = new mongoose.Schema({
  // Original filename uploaded by user
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
    trim: true
  },
  
  // Unique filename stored on server (to avoid conflicts)
  fileName: {
    type: String,
    required: [true, 'Stored filename is required'],
    trim: true,
    index: true
  },
  
  // File size in bytes
  fileSize: {
    type: Number,
    required: [true, 'File size is required'],
    min: [0, 'File size cannot be negat ive']
  },
  
  // Full path where file is stored on server
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  
  // MIME type (should be application/pdf)
  mimeType: {
    type: String,
    required: [true, 'MIME type is required'],
    validate: {
      validator: function(v) {
        return v === 'application/pdf';
      },
      message: 'Only PDF files are allowed'
    }
  },
  
  // Upload timestamp
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster queries
fileSchema.index({ uploadDate: -1 });

// Virtual property to format file size
fileSchema.virtual('formattedSize').get(function() {
  const bytes = this.fileSize;
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
});

// Ensure virtuals are included in JSON output
fileSchema.set('toJSON', { virtuals: true });
fileSchema.set('toObject', { virtuals: true });

const File = mongoose.model('File', fileSchema);

export default File;

