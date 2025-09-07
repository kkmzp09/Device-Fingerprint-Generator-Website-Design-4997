import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleGenerator from './components/SingleGenerator';
import BulkGenerator from './components/BulkGenerator';
import AdvancedTab from './components/AdvancedTab';
import AnalyticsTab from './components/AnalyticsTab';
import TabNavigation from './components/TabNavigation';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingActionButton from './components/FloatingActionButton';
import NotificationToast from './components/NotificationToast';
import StatsCard from './components/StatsCard';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import SafeIcon from './common/SafeIcon';

const { FiTarget, FiLayers, FiSettings, FiBarChart3, FiZap, FiShield, FiUsers, FiTrendingUp } = FiIcons;
const { BiDevices } = BiIcons;

function App() {
  const [activeTab, setActiveTab] = useState('single');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const tabs = [
    { id: 'single', label: 'Single Generator', icon: FiTarget },
    { id: 'bulk', label: 'Bulk Generator', icon: FiLayers },
    { id: 'advanced', label: 'Advanced Config', icon: FiSettings },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3 }
  ];

  const stats = [
    { 
      icon: BiDevices, 
      label: 'Fingerprints Generated', 
      value: '12,847', 
      change: '+12%',
      color: 'blue'
    },
    { 
      icon: FiZap, 
      label: 'Success Rate', 
      value: '99.9%', 
      change: '+0.1%',
      color: 'green'
    },
    { 
      icon: FiShield, 
      label: 'Privacy Score', 
      value: '95/100', 
      change: '+2',
      color: 'purple'
    },
    { 
      icon: FiUsers, 
      label: 'Active Users', 
      value: '2,341', 
      change: '+8%',
      color: 'orange'
    }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <AnimatedBackground />
        
        <div className="relative z-10">
          <Header />
          
          <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 px-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
                Device Fingerprint Generator
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Generate realistic device fingerprints for testing, privacy research, and security analysis with advanced configuration options.
              </p>
            </motion.div>

            {/* Stats Section - Fixed Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full mb-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="w-full"
                  >
                    <StatsCard {...stat} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 w-full"
            >
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12 w-full"
            >
              <AnimatePresence mode="wait">
                {activeTab === 'single' && (
                  <motion.div
                    key="single"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      <div className="w-full">
                        <SingleGenerator onNotification={showNotification} />
                      </div>
                      <div className="w-full space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <SafeIcon icon={FiTarget} className="mr-2 text-blue-500" />
                            Single Generation Features
                          </h3>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                              <SafeIcon icon={FiZap} className="mr-2 text-green-500 text-sm" />
                              Instant fingerprint generation
                            </li>
                            <li className="flex items-center">
                              <SafeIcon icon={FiShield} className="mr-2 text-blue-500 text-sm" />
                              Privacy-focused parameters
                            </li>
                            <li className="flex items-center">
                              <SafeIcon icon={FiTrendingUp} className="mr-2 text-purple-500 text-sm" />
                              Real-time validation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'bulk' && (
                  <motion.div
                    key="bulk"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      <div className="w-full">
                        <BulkGenerator onNotification={showNotification} />
                      </div>
                      <div className="w-full space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <SafeIcon icon={FiLayers} className="mr-2 text-purple-500" />
                            Bulk Generation Features
                          </h3>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center">
                              <SafeIcon icon={FiZap} className="mr-2 text-green-500 text-sm" />
                              Generate up to 10,000 fingerprints
                            </li>
                            <li className="flex items-center">
                              <SafeIcon icon={FiShield} className="mr-2 text-blue-500 text-sm" />
                              Batch processing with progress tracking
                            </li>
                            <li className="flex items-center">
                              <SafeIcon icon={FiTrendingUp} className="mr-2 text-purple-500 text-sm" />
                              Multiple export formats
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'advanced' && (
                  <motion.div
                    key="advanced"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <AdvancedTab />
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <AnalyticsTab />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center w-full">
                  <SafeIcon icon={FiZap} className="text-4xl text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Generate thousands of fingerprints in seconds with our optimized algorithms.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center w-full">
                  <SafeIcon icon={FiShield} className="text-4xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Privacy Focused
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All generation happens locally in your browser. No data is sent to our servers.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center w-full">
                  <SafeIcon icon={FiSettings} className="text-4xl text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Highly Configurable
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced configuration options for precise control over fingerprint generation.
                  </p>
                </div>
              </div>
            </motion.div>
          </main>

          <Footer />
          
          <FloatingActionButton onNotification={showNotification} />
          
          {/* Notification Toast */}
          <AnimatePresence>
            {notification && (
              <NotificationToast
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;