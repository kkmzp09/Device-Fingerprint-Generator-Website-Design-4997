import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon 
            icon={tab.icon} 
            className={`text-lg ${
              activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
            }`} 
          />
          <span className="hidden sm:inline">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default TabNavigation;