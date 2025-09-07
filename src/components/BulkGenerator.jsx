import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import SafeIcon from '../common/SafeIcon';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import ProgressBar from './ProgressBar';
import { generateBulkFingerprints } from '../utils/fingerprintGenerator';
import { downloadJSON, downloadTXT, downloadCSV, copyToClipboard } from '../utils/downloadUtils';

const { FiLayers, FiDownload, FiShare2, FiStar, FiZap, FiCopy, FiCheck } = FiIcons;
const { AiOutlineWhatsApp } = AiIcons;
const { FaTwitter, FaFacebook, FaLinkedin } = FaIcons;
const { BiExport } = BiIcons;

const BulkGenerator = ({ onNotification }) => {
  const [count, setCount] = useState(10);
  const [fingerprints, setFingerprints] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [copiedText, setCopiedText] = useState('');

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setProgress(0);
      setFingerprints([]); // Clear previous results
      
      // Progress tracking
      const progressCallback = (current, total) => {
        setProgress((current / total) * 100);
      };
      
      // Generate fingerprints with progress tracking
      const newFingerprints = await generateBulkFingerprints(count, progressCallback);
      
      // Complete the progress
      setProgress(100);
      
      // Small delay for smooth transition
      setTimeout(() => {
        setFingerprints(newFingerprints);
        setIsGenerating(false);
        setProgress(0);
        onNotification?.(`Successfully generated ${count} device fingerprints!`, 'success');
      }, 500);
      
    } catch (error) {
      console.error('Error generating fingerprints:', error);
      setIsGenerating(false);
      setProgress(0);
      onNotification?.('Error generating fingerprints. Please try again.', 'error');
    }
  };

  const handleDownload = (format) => {
    if (fingerprints.length === 0) return;
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    try {
      switch (format) {
        case 'json':
          downloadJSON(fingerprints, `bulk-fingerprints-${timestamp}.json`);
          break;
        case 'txt':
          downloadTXT(fingerprints, `bulk-fingerprints-${timestamp}.txt`);
          break;
        case 'csv':
          downloadCSV(fingerprints, `bulk-fingerprints-${timestamp}.csv`);
          break;
      }
      
      onNotification?.(`${fingerprints.length} fingerprints downloaded as ${format.toUpperCase()}!`, 'success');
    } catch (error) {
      console.error('Download error:', error);
      onNotification?.('Download failed. Please try again.', 'error');
    }
  };

  const handleCopyAll = async () => {
    if (fingerprints.length === 0) return;
    
    try {
      const jsonString = JSON.stringify(fingerprints, null, 2);
      const success = await copyToClipboard(jsonString);
      
      if (success) {
        setCopiedText('all');
        setTimeout(() => setCopiedText(''), 2000);
        onNotification?.(`All ${fingerprints.length} fingerprints copied to clipboard!`, 'success');
      } else {
        onNotification?.('Failed to copy to clipboard', 'error');
      }
    } catch (error) {
      console.error('Copy error:', error);
      onNotification?.('Failed to copy to clipboard', 'error');
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=Just generated ${fingerprints.length} device fingerprints for testing! 🔧&url=${window.location.href}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    whatsapp: `https://wa.me/?text=Check out this device fingerprint generator: ${window.location.href}`
  };

  const handleShare = (platform) => {
    try {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      onNotification?.(`Shared on ${platform}!`, 'info');
    } catch (error) {
      console.error('Share error:', error);
      onNotification?.('Failed to share. Please try again.', 'error');
    }
  };

  const handleRating = (stars) => {
    setRating(stars);
    onNotification?.(`Thank you for rating ${stars} stars!`, 'success');
  };

  return (
    <AnimatedCard delay={0.1} className="p-8 hover:shadow-2xl">
      {/* Card Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div 
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          whileHover={{ 
            scale: 1.1,
            rotate: -5,
            boxShadow: "0 15px 30px rgba(147, 51, 234, 0.4)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <SafeIcon icon={FiLayers} className="text-white text-2xl" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
          Bulk Device Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">
          Generate multiple device fingerprints at once
        </p>
      </motion.div>

      {/* Count Input */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 text-center transition-colors">
          Number of Fingerprints
        </label>
        <div className="relative max-w-xs mx-auto">
          <motion.input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
            whileFocus={{ scale: 1.02 }}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-center text-lg font-medium focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all"
            disabled={isGenerating}
          />
          <motion.div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SafeIcon icon={FiLayers} className="text-purple-400" />
          </motion.div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2 transition-colors">
          Maximum: 1,000 fingerprints
        </p>
      </motion.div>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <AnimatedButton
          onClick={handleGenerate}
          disabled={isGenerating}
          loading={isGenerating}
          variant="secondary"
          size="lg"
          icon={<SafeIcon icon={FiZap} className="text-xl" />}
          className="w-full"
        >
          {isGenerating ? `Generating ${count} Fingerprints...` : `Generate ${count} Fingerprints`}
        </AnimatedButton>

        {/* Progress Bar */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <ProgressBar 
                progress={progress} 
                color="purple" 
                animated={true}
                showLabel={true}
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-purple-600 dark:text-purple-400 text-sm font-medium text-center mt-2 transition-colors"
              >
                Generating {count} unique fingerprints... {Math.round(progress)}%
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Download Section - More Prominent */}
      <AnimatePresence>
        {fingerprints.length > 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6 mb-8 shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-center mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <SafeIcon icon={FiCheck} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                🎉 Generation Complete!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Successfully generated <span className="font-bold text-green-600 dark:text-green-400">{fingerprints.length}</span> unique fingerprints
              </p>
            </motion.div>

            {/* Download Options Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {[
                { format: 'json', icon: FiDownload, label: 'JSON', color: 'from-blue-500 to-blue-600' },
                { format: 'csv', icon: BiExport, label: 'CSV', color: 'from-green-500 to-green-600' },
                { format: 'txt', icon: FiDownload, label: 'TXT', color: 'from-purple-500 to-purple-600' },
                { format: 'copy', icon: copiedText === 'all' ? FiCheck : FiCopy, label: copiedText === 'all' ? 'Copied!' : 'Copy All', color: 'from-orange-500 to-orange-600' }
              ].map((option, index) => (
                <motion.button
                  key={option.format}
                  onClick={() => option.format === 'copy' ? handleCopyAll() : handleDownload(option.format)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={option.format === 'copy' && copiedText === 'all'}
                  className={`p-4 bg-gradient-to-r ${option.color} text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    option.format === 'copy' && copiedText === 'all' ? 'opacity-75' : ''
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: option.format === 'copy' && copiedText === 'all' ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SafeIcon icon={option.icon} className="text-xl" />
                  </motion.div>
                  <span className="text-sm font-semibold">
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{fingerprints.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Generated</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Options</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">✓</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Ready</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {fingerprints.length > 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <AnimatedButton
              onClick={() => setShowShare(!showShare)}
              variant="outline"
              size="sm"
              icon={<SafeIcon icon={FiShare2} className="text-sm" />}
            >
              Share
            </AnimatedButton>

            <AnimatedButton
              onClick={() => setShowReview(!showReview)}
              variant="ghost"
              size="sm"
              icon={<SafeIcon icon={FiStar} className="text-sm" />}
            >
              Rate
            </AnimatedButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && fingerprints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 mb-6 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center transition-colors">
              Share This Tool
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { platform: 'twitter', icon: FaTwitter, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/30' },
                { platform: 'facebook', icon: FaFacebook, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/30' },
                { platform: 'linkedin', icon: FaLinkedin, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/30' },
                { platform: 'whatsapp', icon: AiOutlineWhatsApp, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/30' }
              ].map((social) => (
                <motion.button
                  key={social.platform}
                  onClick={() => handleShare(social.platform)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 ${social.bgColor} border border-gray-200 dark:border-gray-600 rounded-lg text-center hover:shadow-md transition-all`}
                >
                  <SafeIcon icon={social.icon} className={`text-xl ${social.color} mx-auto mb-1`} />
                  <span className={`text-xs font-medium capitalize ${social.color}`}>
                    {social.platform}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReview && fingerprints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 mb-6 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center transition-colors">
              Rate Your Experience
            </h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  onClick={() => handleRating(star)}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1"
                >
                  <SafeIcon 
                    icon={FiStar} 
                    className={`text-2xl transition-all duration-200 ${
                      star <= rating 
                        ? 'text-yellow-500 fill-current drop-shadow-lg' 
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm transition-colors">
              How would you rate this tool?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Preview */}
      <AnimatePresence>
        {fingerprints.length > 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
              Generated Fingerprints Preview
            </h3>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 max-h-64 overflow-auto transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">
                  Preview: First 3 fingerprints of {fingerprints.length} total
                </p>
                <motion.button
                  onClick={handleCopyAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                >
                  <SafeIcon icon={copiedText === 'all' ? FiCheck : FiCopy} className="text-xs" />
                  <span>{copiedText === 'all' ? 'Copied!' : 'Copy All'}</span>
                </motion.button>
              </div>
              <pre className="text-gray-700 dark:text-gray-300 text-xs font-mono transition-colors">
                {JSON.stringify(fingerprints.slice(0, 3), null, 2)}
              </pre>
              {fingerprints.length > 3 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500 dark:text-gray-400 text-xs mt-2 transition-colors"
                >
                  ... and {fingerprints.length - 3} more fingerprints
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};

export default BulkGenerator;