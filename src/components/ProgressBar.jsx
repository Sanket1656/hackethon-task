import React from 'react';

/**
 * ProgressBar component
 * Displays upload progress with percentage
 * @param {number} progress - Upload progress percentage (0-100)
 */
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Uploading...
        </span>
        <span className="text-sm font-bold text-blue-600">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full w-full bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Please wait while your file is being uploaded...
      </div>
    </div>
  );
};

export default ProgressBar;

// Made with Bob
