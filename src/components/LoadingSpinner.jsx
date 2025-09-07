import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLoader } = FiIcons;

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 text-sm',
    md: 'w-6 h-6 text-base',
    lg: 'w-8 h-8 text-lg',
    xl: 'w-12 h-12 text-xl'
  };

  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={sizeClasses[size]}
      >
        <SafeIcon icon={FiLoader} className="w-full h-full text-blue-500 dark:text-blue-400" />
      </motion.div>
      {text && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-gray-600 dark:text-gray-300 font-medium ${sizeClasses[size].split(' ')[2]}`}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};

export default LoadingSpinner;