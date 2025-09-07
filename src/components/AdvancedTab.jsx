import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import SafeIcon from '../common/SafeIcon';
import AnimatedButton from './AnimatedButton';
import ProgressBar from './ProgressBar';
import NotificationToast from './NotificationToast';
import { generateAdvancedFingerprint } from '../utils/fingerprintGenerator';
import { downloadJSON, downloadTXT, downloadCSV, copyToClipboard } from '../utils/downloadUtils';

const { FiSettings, FiTarget, FiCpu, FiMonitor, FiSmartphone, FiGlobe, FiClock, FiTrendingDown, FiSliders, FiRefreshCw, FiDownload, FiCopy, FiCheck, FiChevronDown, FiChevronUp, FiInfo } = FiIcons;
const { BiWorld, BiTime, BiCog } = BiIcons;
const { AiOutlineExperiment } = AiIcons;
const { MdOutlinePhoneAndroid, MdOutlineLaptop, MdOutlineTablet } = MdIcons;

const AdvancedTab = () => {
  const [config, setConfig] = useState({
    // Custom Parameters
    customParams: {
      userAgent: '',
      screenResolution: '',
      timezone: '',
      language: '',
      platform: '',
      cookiesEnabled: null,
      javaEnabled: null,
      plugins: []
    },
    
    // Randomization Level
    randomizationLevel: 50,
    
    // Geographic Targeting
    geographic: {
      region: 'global',
      country: '',
      city: '',
      timezone: 'auto'
    },
    
    // Time-based Generation
    timeBased: {
      enabled: false,
      targetYear: new Date().getFullYear(),
      targetMonth: new Date().getMonth() + 1,
      browserVersion: 'latest'
    },
    
    // Fingerprint Aging
    aging: {
      enabled: false,
      deviceAge: 12, // months
      usageIntensity: 'medium',
      updateFrequency: 'normal'
    },
    
    // Device Wear Simulation
    deviceWear: {
      enabled: false,
      wearLevel: 30,
      batteryDegradation: false,
      performanceImpact: false,
      softwareUpdates: true
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFingerprint, setGeneratedFingerprint] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    customParams: true,
    randomization: false,
    geographic: false,
    timeBased: false,
    aging: false,
    deviceWear: false
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateConfig = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateCustomParam = (key, value) => {
    setConfig(prev => ({
      ...prev,
      customParams: {
        ...prev.customParams,
        [key]: value
      }
    }));
  };

  const generateFingerprint = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      const fingerprint = await generateAdvancedFingerprint(config);
      setGeneratedFingerprint(fingerprint);
      showNotification('Advanced fingerprint generated successfully!');
    } catch (error) {
      showNotification('Error generating fingerprint', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetConfig = () => {
    setConfig({
      customParams: {
        userAgent: '',
        screenResolution: '',
        timezone: '',
        language: '',
        platform: '',
        cookiesEnabled: null,
        javaEnabled: null,
        plugins: []
      },
      randomizationLevel: 50,
      geographic: {
        region: 'global',
        country: '',
        city: '',
        timezone: 'auto'
      },
      timeBased: {
        enabled: false,
        targetYear: new Date().getFullYear(),
        targetMonth: new Date().getMonth() + 1,
        browserVersion: 'latest'
      },
      aging: {
        enabled: false,
        deviceAge: 12,
        usageIntensity: 'medium',
        updateFrequency: 'normal'
      },
      deviceWear: {
        enabled: false,
        wearLevel: 30,
        batteryDegradation: false,
        performanceImpact: false,
        softwareUpdates: true
      }
    });
    showNotification('Configuration reset to defaults');
  };

  const exportConfig = () => {
    downloadJSON([config], 'advanced-config');
    showNotification('Configuration exported successfully!');
  };

  const regions = [
    { value: 'global', label: 'Global' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'India', 'China'
  ];

  const platforms = ['Windows', 'macOS', 'Linux', 'Android', 'iOS'];
  const languages = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'pt-BR'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Advanced Configuration
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Fine-tune your fingerprint generation with advanced parameters
        </p>
      </motion.div>

      {/* Configuration Sections */}
      <div className="space-y-4">
        {/* Custom Parameters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('customParams')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiSliders} className="text-blue-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Custom Parameters
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.customParams ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.customParams && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      User Agent
                    </label>
                    <input
                      type="text"
                      value={config.customParams.userAgent}
                      onChange={(e) => updateCustomParam('userAgent', e.target.value)}
                      placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Screen Resolution
                    </label>
                    <input
                      type="text"
                      value={config.customParams.screenResolution}
                      onChange={(e) => updateCustomParam('screenResolution', e.target.value)}
                      placeholder="1920x1080"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform
                    </label>
                    <select
                      value={config.customParams.platform}
                      onChange={(e) => updateCustomParam('platform', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Auto-detect</option>
                      {platforms.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={config.customParams.language}
                      onChange={(e) => updateCustomParam('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Auto-detect</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.customParams.cookiesEnabled === true}
                      onChange={(e) => updateCustomParam('cookiesEnabled', e.target.checked ? true : null)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Cookies Enabled</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.customParams.javaEnabled === true}
                      onChange={(e) => updateCustomParam('javaEnabled', e.target.checked ? true : null)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Java Enabled</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Randomization Level */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('randomization')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={AiOutlineExperiment} className="text-purple-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Randomization Level
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.randomization ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.randomization && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Randomization Level: {config.randomizationLevel}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.randomizationLevel}
                      onChange={(e) => setConfig(prev => ({ ...prev, randomizationLevel: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Predictable</span>
                      <span>Balanced</span>
                      <span>Chaotic</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <SafeIcon icon={FiInfo} className="inline mr-1" />
                      {config.randomizationLevel < 30 ? 'Low randomization creates more consistent, predictable fingerprints' :
                       config.randomizationLevel < 70 ? 'Balanced randomization provides realistic variation' :
                       'High randomization creates highly unique but potentially unrealistic fingerprints'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Geographic Targeting */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('geographic')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiGlobe} className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Geographic Targeting
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.geographic ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.geographic && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Region
                    </label>
                    <select
                      value={config.geographic.region}
                      onChange={(e) => updateConfig('geographic', 'region', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {regions.map(region => (
                        <option key={region.value} value={region.value}>{region.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      value={config.geographic.country}
                      onChange={(e) => updateConfig('geographic', 'country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Any Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={config.geographic.city}
                      onChange={(e) => updateConfig('geographic', 'city', e.target.value)}
                      placeholder="Any city"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={config.geographic.timezone}
                      onChange={(e) => updateConfig('geographic', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                      <option value="GMT">GMT</option>
                      <option value="JST">JST</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Time-based Generation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('timeBased')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiClock} className="text-orange-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Time-based Generation
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.timeBased ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.timeBased && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.timeBased.enabled}
                      onChange={(e) => updateConfig('timeBased', 'enabled', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Time-based Generation
                    </span>
                  </label>
                </div>

                {config.timeBased.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Year
                      </label>
                      <input
                        type="number"
                        min="2010"
                        max="2024"
                        value={config.timeBased.targetYear}
                        onChange={(e) => updateConfig('timeBased', 'targetYear', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Month
                      </label>
                      <select
                        value={config.timeBased.targetMonth}
                        onChange={(e) => updateConfig('timeBased', 'targetMonth', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Browser Version
                      </label>
                      <select
                        value={config.timeBased.browserVersion}
                        onChange={(e) => updateConfig('timeBased', 'browserVersion', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="latest">Latest</option>
                        <option value="period-appropriate">Period Appropriate</option>
                        <option value="legacy">Legacy</option>
                      </select>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Fingerprint Aging */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('aging')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiTrendingDown} className="text-yellow-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Fingerprint Aging
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.aging ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.aging && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.aging.enabled}
                      onChange={(e) => updateConfig('aging', 'enabled', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Fingerprint Aging
                    </span>
                  </label>
                </div>

                {config.aging.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Device Age: {config.aging.deviceAge} months
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={config.aging.deviceAge}
                        onChange={(e) => updateConfig('aging', 'deviceAge', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>New</span>
                        <span>Moderate</span>
                        <span>Old</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Usage Intensity
                        </label>
                        <select
                          value={config.aging.usageIntensity}
                          onChange={(e) => updateConfig('aging', 'usageIntensity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="light">Light</option>
                          <option value="medium">Medium</option>
                          <option value="heavy">Heavy</option>
                          <option value="extreme">Extreme</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Update Frequency
                        </label>
                        <select
                          value={config.aging.updateFrequency}
                          onChange={(e) => updateConfig('aging', 'updateFrequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="never">Never</option>
                          <option value="rare">Rare</option>
                          <option value="normal">Normal</option>
                          <option value="frequent">Frequent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Device Wear Simulation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <button
            onClick={() => toggleSection('deviceWear')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiCpu} className="text-red-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Device Wear Simulation
              </h3>
            </div>
            <SafeIcon 
              icon={expandedSections.deviceWear ? FiChevronUp : FiChevronDown}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>

          <AnimatePresence>
            {expandedSections.deviceWear && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.deviceWear.enabled}
                      onChange={(e) => updateConfig('deviceWear', 'enabled', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Device Wear Simulation
                    </span>
                  </label>
                </div>

                {config.deviceWear.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Wear Level: {config.deviceWear.wearLevel}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.deviceWear.wearLevel}
                        onChange={(e) => updateConfig('deviceWear', 'wearLevel', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Pristine</span>
                        <span>Used</span>
                        <span>Worn</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={config.deviceWear.batteryDegradation}
                          onChange={(e) => updateConfig('deviceWear', 'batteryDegradation', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Battery Degradation</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={config.deviceWear.performanceImpact}
                          onChange={(e) => updateConfig('deviceWear', 'performanceImpact', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Performance Impact</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={config.deviceWear.softwareUpdates}
                          onChange={(e) => updateConfig('deviceWear', 'softwareUpdates', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Software Updates</span>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <AnimatedButton
          onClick={generateFingerprint}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <SafeIcon icon={isGenerating ? FiRefreshCw : FiTarget} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Advanced Fingerprint'}
        </AnimatedButton>

        <AnimatedButton
          onClick={resetConfig}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <SafeIcon icon={FiRefreshCw} className="mr-2" />
          Reset Config
        </AnimatedButton>

        <AnimatedButton
          onClick={exportConfig}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <SafeIcon icon={FiDownload} className="mr-2" />
          Export Config
        </AnimatedButton>
      </motion.div>

      {/* Generated Fingerprint Display */}
      <AnimatePresence>
        {generatedFingerprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Generated Advanced Fingerprint
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                {JSON.stringify(generatedFingerprint, null, 2)}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatedButton
                onClick={() => copyToClipboard(JSON.stringify(generatedFingerprint, null, 2))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                <SafeIcon icon={FiCopy} className="mr-2" />
                Copy
              </AnimatedButton>
              <AnimatedButton
                onClick={() => downloadJSON([generatedFingerprint], 'advanced-fingerprint')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                <SafeIcon icon={FiDownload} className="mr-2" />
                Download JSON
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
  );
};

export default AdvancedTab;