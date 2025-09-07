import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import ProgressBar from './ProgressBar';
import { generateFingerprint } from '../utils/fingerprintGenerator';
import { downloadJSON, downloadTXT, downloadCSV, copyToClipboard } from '../utils/downloadUtils';

const { FiSmartphone, FiCheck, FiDownload, FiShare2, FiStar, FiCopy, FiZap } = FiIcons;
const { AiOutlineWhatsApp } = AiIcons;
const { FaTwitter, FaFacebook, FaLinkedin } = FaIcons;

const SingleGenerator = ({ onNotification }) => {
  const [fingerprint, setFingerprint] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    await new Promise(resolve => setTimeout(resolve, 1500));
    const newFingerprint = generateFingerprint();
    
    clearInterval(progressInterval);
    setProgress(100);
    
    setTimeout(() => {
      setFingerprint(newFingerprint);
      setIsGenerating(false);
      setProgress(0);
      onNotification?.('Device fingerprint generated successfully!', 'success');
    }, 300);
  };

  const handleCopy = async () => {
    if (fingerprint) {
      const success = await copyToClipboard(JSON.stringify(fingerprint, null, 2));
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onNotification?.('Fingerprint copied to clipboard!', 'success');
      }
    }
  };

  const handleDownload = (format) => {
    if (!fingerprint) return;
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    switch (format) {
      case 'json':
        downloadJSON(fingerprint, `fingerprint-${timestamp}.json`);
        break;
      case 'txt':
        downloadTXT(fingerprint, `fingerprint-${timestamp}.txt`);
        break;
      case 'csv':
        downloadCSV([fingerprint], `fingerprint-${timestamp}.csv`);
        break;
    }
    
    onNotification?.(`Fingerprint downloaded as ${format.toUpperCase()}!`, 'success');
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=Just generated a device fingerprint for testing! 🔧&url=${window.location.href}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    whatsapp: `https://wa.me/?text=Check out this device fingerprint generator: ${window.location.href}`
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    onNotification?.(`Shared on ${platform}!`, 'info');
  };

  const handleRating = (stars) => {
    setRating(stars);
    onNotification?.(`Thank you for rating ${stars} stars!`, 'success');
  };

  return (
    <AnimatedCard className="p-8 hover:shadow-2xl">
      {/* Card Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div 
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <SafeIcon icon={FiSmartphone} className="text-white text-2xl" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
          Single Device Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">
          Generate one unique device fingerprint instantly
        </p>
      </motion.div>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <AnimatedButton
          onClick={handleGenerate}
          disabled={isGenerating}
          loading={isGenerating}
          variant="primary"
          size="lg"
          icon={<SafeIcon icon={FiZap} className="text-xl" />}
          className="w-full"
        >
          {isGenerating ? 'Generating...' : 'Generate Fingerprint'}
        </AnimatedButton>

        {/* Progress Bar */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <ProgressBar 
              progress={progress} 
              color="blue" 
              animated={true}
              showLabel={true}
            />
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {fingerprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <AnimatedButton
              onClick={handleCopy}
              variant="success"
              size="sm"
              icon={<SafeIcon icon={copied ? FiCheck : FiCopy} className="text-sm" />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </AnimatedButton>

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
        {showShare && (
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
        {showReview && (
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

      {/* Download Options */}
      <AnimatePresence>
        {fingerprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center transition-colors">
              Download Options
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['json', 'txt', 'csv'].map((format, index) => (
                <motion.button
                  key={format}
                  onClick={() => handleDownload(format)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SafeIcon icon={FiDownload} className="text-xl text-gray-600 dark:text-gray-300 mx-auto mb-1 transition-colors" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium uppercase text-sm transition-colors">
                    {format}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fingerprint Display */}
      <AnimatePresence>
        {fingerprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
              Generated Fingerprint
            </h3>
            <motion.pre 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 dark:text-gray-300 text-xs font-mono bg-white dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-64 border border-gray-200 dark:border-gray-600 transition-colors"
            >
              {JSON.stringify(fingerprint, null, 2)}
            </motion.pre>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};

export default SingleGenerator;