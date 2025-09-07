import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiX, FiDownload, FiShare2, FiStar, FiHelpCircle } = FiIcons;

const FloatingActionButton = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: FiDownload, label: 'Download', action: () => console.log('Download'), color: 'bg-green-500' },
    { icon: FiShare2, label: 'Share', action: () => console.log('Share'), color: 'bg-blue-500' },
    { icon: FiStar, label: 'Rate', action: () => console.log('Rate'), color: 'bg-yellow-500' },
    { icon: FiHelpCircle, label: 'Help', action: () => console.log('Help'), color: 'bg-purple-500' }
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group`}
              >
                <SafeIcon icon={action.icon} className="text-lg" />
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden group-hover:block hidden"
                >
                  {action.label}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <SafeIcon icon={isOpen ? FiX : FiPlus} className="text-2xl" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;