import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center space-x-2 mt-8"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentPage === 1
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md hover:shadow-lg'
        }`}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </motion.button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md hover:shadow-lg'
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md hover:shadow-lg'
        }`}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
