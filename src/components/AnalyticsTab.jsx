import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import SafeIcon from '../common/SafeIcon';
import StatsCard from './StatsCard';
import AnimatedCard from './AnimatedCard';

const { FiBarChart3, FiTrendingUp, FiTrendingDown, FiUsers, FiGlobe, FiClock, FiTarget } = FiIcons;
const { BiDevices } = BiIcons;

const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = () => {
      setTimeout(() => {
        setAnalyticsData({
          totalGenerated: 12847,
          successRate: 99.9,
          avgGenerationTime: 0.12,
          topDeviceTypes: [
            { name: 'Desktop', count: 7508, percentage: 58.4 },
            { name: 'Mobile', count: 4231, percentage: 32.9 },
            { name: 'Tablet', count: 1108, percentage: 8.7 }
          ],
          topBrowsers: [
            { name: 'Chrome', count: 6423, percentage: 50.0 },
            { name: 'Firefox', count: 2569, percentage: 20.0 },
            { name: 'Safari', count: 2569, percentage: 20.0 },
            { name: 'Edge', count: 1286, percentage: 10.0 }
          ],
          generationTrend: [
            { date: '2024-01-01', count: 120 },
            { date: '2024-01-02', count: 180 },
            { date: '2024-01-03', count: 150 },
            { date: '2024-01-04', count: 220 },
            { date: '2024-01-05', count: 280 },
            { date: '2024-01-06', count: 190 },
            { date: '2024-01-07', count: 240 }
          ]
        });
      }, 1000);
    };

    loadAnalytics();
  }, [timeRange]);

  const stats = [
    {
      icon: BiDevices,
      label: 'Total Generated',
      value: analyticsData?.totalGenerated.toLocaleString() || '0',
      change: '+12%',
      color: 'blue'
    },
    {
      icon: FiTarget,
      label: 'Success Rate',
      value: analyticsData ? `${analyticsData.successRate}%` : '0%',
      change: '+0.1%',
      color: 'green'
    },
    {
      icon: FiClock,
      label: 'Avg Generation Time',
      value: analyticsData ? `${analyticsData.avgGenerationTime}s` : '0s',
      change: '-5%',
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights into your fingerprint generation activity
        </p>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      {analyticsData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Types Chart */}
          <AnimatedCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <SafeIcon icon={BiDevices} className="mr-2 text-blue-500" />
              Device Types Distribution
            </h3>
            <div className="space-y-4">
              {analyticsData.topDeviceTypes.map((device, index) => (
                <motion.div
                  key={device.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                    <span className="text-gray-700 dark:text-gray-300">{device.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {device.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {device.percentage}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>

          {/* Browser Distribution Chart */}
          <AnimatedCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <SafeIcon icon={FiGlobe} className="mr-2 text-green-500" />
              Browser Distribution
            </h3>
            <div className="space-y-4">
              {analyticsData.topBrowsers.map((browser, index) => (
                <motion.div
                  key={browser.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500' : 
                      index === 1 ? 'bg-orange-500' : 
                      index === 2 ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <span className="text-gray-700 dark:text-gray-300">{browser.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {browser.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {browser.percentage}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      )}

      {/* Generation Trend */}
      {analyticsData && (
        <AnimatedCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="mr-2 text-purple-500" />
            Generation Trend (Last 7 Days)
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.generationTrend.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ height: 0 }}
                animate={{ height: `${(day.count / 300) * 100}%` }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-md flex-1 min-h-[20px] relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.count}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(day.date).getDate()}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* Loading State */}
      {!analyticsData && (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading analytics...</span>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;