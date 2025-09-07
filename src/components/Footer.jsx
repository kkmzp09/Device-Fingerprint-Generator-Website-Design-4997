import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFingerprint, FiCode, FiHeart } = FiIcons;

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiFingerprint} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                Fingerprint Generator
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">
              A free and open-source tool for generating device fingerprints for testing and development purposes.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 transition-colors">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCode} className="text-blue-500" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiHeart} className="text-red-500" />
                <span>Free Forever</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg transition-colors">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 transition-colors">
              <li>• Single fingerprint generation</li>
              <li>• Bulk fingerprint creation</li>
              <li>• Multiple export formats (JSON, TXT, CSV)</li>
              <li>• Social sharing capabilities</li>
              <li>• Mobile-friendly interface</li>
              <li>• Dark mode support</li>
            </ul>
          </div>

          {/* Usage */}
          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg transition-colors">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 transition-colors">
              <li>• Web development testing</li>
              <li>• Browser compatibility testing</li>
              <li>• Security research</li>
              <li>• Educational purposes</li>
              <li>• Quality assurance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 transition-colors">
          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
            © 2024 Device Fingerprint Generator. Made with ❤️ for developers.
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 transition-colors">
            <span>Privacy Friendly</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No Data Collection</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;