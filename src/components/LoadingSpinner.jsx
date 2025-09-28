import React from 'react';
import { Globe } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 mx-auto mb-4"></div>
          <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Travel Explorer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Loading your adventure...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
