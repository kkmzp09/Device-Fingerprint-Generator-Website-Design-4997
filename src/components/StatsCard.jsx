import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const StatsCard = ({ icon, label, value, change, color }) => {
  const isPositive = change.startsWith('+');
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  const iconColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Icon and Label */}
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg flex items-center justify-center`}>
            <SafeIcon 
              icon={icon} 
              className="text-white text-xl"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {label}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>

        {/* Right side - Change indicator */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }`}>
          <SafeIcon 
            icon={isPositive ? FiTrendingUp : FiTrendingDown} 
            className="text-xs"
          />
          <span>{change}</span>
        </div>
      </div>

      {/* Bottom progress bar or additional info */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-1.5 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {isPositive ? 'Trending up' : 'Trending down'} from last period
        </p>
      </div>
    </motion.div>
  );
};

export default StatsCard;