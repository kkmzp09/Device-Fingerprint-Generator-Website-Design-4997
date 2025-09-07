// Mock data for realistic fingerprint generation
const mockData = {
  userAgents: {
    windows: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    ],
    mac: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0'
    ],
    mobile: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 14; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    ]
  },
  
  screens: {
    desktop: ['1920x1080', '2560x1440', '3840x2160', '1366x768', '1440x900', '1680x1050'],
    mobile: ['375x667', '414x896', '390x844', '360x640', '412x915', '393x851']
  },
  
  timezones: [
    'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 
    'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney', 'America/Chicago'
  ],
  
  languages: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'pt-BR'],
  
  plugins: [
    'Chrome PDF Plugin', 'Chromium PDF Plugin', 'Microsoft Edge PDF Plugin',
    'WebKit built-in PDF', 'Chrome PDF Viewer', 'PDF.js'
  ],

  deviceModels: {
    iPhone: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13'],
    Android: ['Samsung Galaxy S24', 'Google Pixel 8', 'OnePlus 12', 'Xiaomi 14', 'Samsung Galaxy A54'],
    Desktop: ['MacBook Pro M3', 'Dell XPS 13', 'ThinkPad X1 Carbon', 'Surface Laptop 5', 'iMac M3']
  },

  regions: {
    'north-america': {
      countries: ['United States', 'Canada', 'Mexico'],
      timezones: ['America/New_York', 'America/Los_Angeles', 'America/Chicago'],
      languages: ['en-US', 'es-MX', 'fr-CA']
    },
    'europe': {
      countries: ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy'],
      timezones: ['Europe/London', 'Europe/Berlin', 'Europe/Paris'],
      languages: ['en-GB', 'de-DE', 'fr-FR', 'es-ES', 'it-IT']
    },
    'asia': {
      countries: ['Japan', 'China', 'South Korea', 'India', 'Singapore'],
      timezones: ['Asia/Tokyo', 'Asia/Shanghai', 'Asia/Seoul', 'Asia/Kolkata'],
      languages: ['ja-JP', 'zh-CN', 'ko-KR', 'hi-IN', 'en-SG']
    }
  }
};

// Utility functions
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const applyRandomization = (value, level, alternatives = []) => {
  const randomChance = level / 100;
  if (Math.random() < randomChance && alternatives.length > 0) {
    return getRandomItem(alternatives);
  }
  return value;
};

const simulateAging = (baseValue, ageMonths, usageIntensity) => {
  const intensityMultiplier = {
    light: 0.5,
    medium: 1.0,
    heavy: 1.5,
    extreme: 2.0
  };
  
  const agingFactor = (ageMonths / 12) * intensityMultiplier[usageIntensity];
  
  // Simulate performance degradation
  if (typeof baseValue === 'number') {
    return Math.max(baseValue * (1 - agingFactor * 0.1), baseValue * 0.7);
  }
  
  return baseValue;
};

const simulateDeviceWear = (fingerprint, wearLevel, options) => {
  const wearFactor = wearLevel / 100;
  
  if (options.batteryDegradation) {
    fingerprint.battery = {
      level: Math.max(0.1, 1 - wearFactor * 0.3),
      charging: Math.random() > 0.7
    };
  }
  
  if (options.performanceImpact) {
    fingerprint.performance = {
      memory: Math.max(2, 8 - wearFactor * 2),
      cores: Math.max(2, 8 - Math.floor(wearFactor * 2))
    };
  }
  
  return fingerprint;
};

const getGeographicData = (region, country) => {
  if (region && region !== 'global' && mockData.regions[region]) {
    const regionData = mockData.regions[region];
    return {
      country: country || getRandomItem(regionData.countries),
      timezone: getRandomItem(regionData.timezones),
      language: getRandomItem(regionData.languages)
    };
  }
  
  return {
    country: country || getRandomItem(['Unite States', 'United Kingdom', 'Germany', 'Japan']),
    timezone: getRandomItem(mockData.timezones),
    language: getRandomItem(mockData.languages)
  };
};

const getTimePeriodData = (year, month, browserVersion) => {
  const targetDate = new Date(year, month - 1);
  const now = new Date();
  const monthsDiff = (now.getFullYear() - year) * 12 + (now.getMonth() - month + 1);
  
  let userAgent = getRandomItem(mockData.userAgents.windows);
  
  if (browserVersion === 'period-appropriate' && monthsDiff > 6) {
    // Simulate older browser versions
    userAgent = userAgent.replace(/Chrome\/\d+/, `Chrome/${Math.max(90, 120 - monthsDiff)}`);
  } else if (browserVersion === 'legacy' && monthsDiff > 12) {
    userAgent = userAgent.replace(/Chrome\/\d+/, `Chrome/${Math.max(70, 100 - monthsDiff)}`);
  }
  
  return {
    userAgent,
    timestamp: targetDate.toISOString(),
    browserVersion: browserVersion
  };
};

// Main generation functions
export const generateFingerprint = () => {
  const deviceType = getRandomItem(['desktop', 'mobile']);
  const platform = deviceType === 'desktop' ? getRandomItem(['Windows', 'macOS', 'Linux']) : getRandomItem(['iOS', 'Android']);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    userAgent: getRandomItem(deviceType === 'desktop' ? 
      (platform === 'Windows' ? mockData.userAgents.windows : mockData.userAgents.mac) : 
      mockData.userAgents.mobile
    ),
    screen: {
      width: parseInt(getRandomItem(deviceType === 'desktop' ? mockData.screens.desktop : mockData.screens.mobile).split('x')[0]),
      height: parseInt(getRandomItem(deviceType === 'desktop' ? mockData.screens.desktop : mockData.screens.mobile).split('x')[1]),
      colorDepth: getRandomItem([24, 32]),
      pixelRatio: deviceType === 'mobile' ? getRandomItem([2, 3]) : getRandomItem([1, 2])
    },
    navigator: {
      platform: platform,
      language: getRandomItem(mockData.languages),
      cookieEnabled: Math.random() > 0.1,
      javaEnabled: Math.random() > 0.8,
      onLine: true
    },
    timezone: getRandomItem(mockData.timezones),
    plugins: Math.random() > 0.5 ? [getRandomItem(mockData.plugins)] : [],
    canvas: Math.random().toString(36).substr(2, 16),
    webgl: Math.random().toString(36).substr(2, 16),
    audio: Math.random().toString(36).substr(2, 12),
    deviceType: deviceType,
    touchSupport: deviceType === 'mobile',
    hardwareConcurrency: getRandomInRange(2, 16),
    deviceMemory: getRandomInRange(2, 32),
    connection: {
      effectiveType: getRandomItem(['4g', '3g', 'slow-2g']),
      downlink: Math.random() * 10,
      rtt: getRandomInRange(50, 300)
    }
  };
};

export const generateAdvancedFingerprint = async (config) => {
  let fingerprint = generateFingerprint();
  
  // Apply custom parameters
  if (config.customParams.userAgent) {
    fingerprint.userAgent = config.customParams.userAgent;
  }
  
  if (config.customParams.screenResolution) {
    const [width, height] = config.customParams.screenResolution.split('x').map(Number);
    fingerprint.screen.width = width;
    fingerprint.screen.height = height;
  }
  
  if (config.customParams.platform) {
    fingerprint.navigator.platform = config.customParams.platform;
  }
  
  if (config.customParams.language) {
    fingerprint.navigator.language = config.customParams.language;
  }
  
  if (config.customParams.cookiesEnabled !== null) {
    fingerprint.navigator.cookieEnabled = config.customParams.cookiesEnabled;
  }
  
  if (config.customParams.javaEnabled !== null) {
    fingerprint.navigator.javaEnabled = config.customParams.javaEnabled;
  }
  
  // Apply randomization
  fingerprint = applyRandomizationLevel(fingerprint, config.randomizationLevel);
  
  // Apply geographic targeting
  if (config.geographic.region !== 'global') {
    const geoData = getGeographicData(config.geographic.region, config.geographic.country);
    fingerprint.geographic = geoData;
    fingerprint.navigator.language = geoData.language;
    fingerprint.timezone = geoData.timezone;
  }
  
  // Apply time-based generation
  if (config.timeBased.enabled) {
    const timeData = getTimePeriodData(
      config.timeBased.targetYear,
      config.timeBased.targetMonth,
      config.timeBased.browserVersion
    );
    fingerprint.userAgent = timeData.userAgent;
    fingerprint.generatedFor = timeData.timestamp;
    fingerprint.timeBased = true;
  }
  
  // Apply aging simulation
  if (config.aging.enabled) {
    fingerprint.hardwareConcurrency = simulateAging(
      fingerprint.hardwareConcurrency,
      config.aging.deviceAge,
      config.aging.usageIntensity
    );
    fingerprint.deviceMemory = simulateAging(
      fingerprint.deviceMemory,
      config.aging.deviceAge,
      config.aging.usageIntensity
    );
    fingerprint.aging = {
      deviceAge: config.aging.deviceAge,
      usageIntensity: config.aging.usageIntensity,
      updateFrequency: config.aging.updateFrequency
    };
  }
  
  // Apply device wear simulation
  if (config.deviceWear.enabled) {
    fingerprint = simulateDeviceWear(fingerprint, config.deviceWear.wearLevel, config.deviceWear);
    fingerprint.deviceWear = {
      wearLevel: config.deviceWear.wearLevel,
      batteryDegradation: config.deviceWear.batteryDegradation,
      performanceImpact: config.deviceWear.performanceImpact
    };
  }
  
  // Add configuration metadata
  fingerprint.configurationUsed = {
    randomizationLevel: config.randomizationLevel,
    geographic: config.geographic.region !== 'global',
    timeBased: config.timeBased.enabled,
    aging: config.aging.enabled,
    deviceWear: config.deviceWear.enabled
  };
  
  return fingerprint;
};

const applyRandomizationLevel = (fingerprint, level) => {
  if (level > 70) {
    // High randomization - make values more chaotic
    fingerprint.screen.width = getRandomInRange(800, 4000);
    fingerprint.screen.height = getRandomInRange(600, 3000);
    fingerprint.hardwareConcurrency = getRandomInRange(1, 32);
    fingerprint.deviceMemory = getRandomInRange(1, 64);
  } else if (level > 30) {
    // Medium randomization - add some variation
    fingerprint.screen.width += getRandomInRange(-100, 100);
    fingerprint.screen.height += getRandomInRange(-100, 100);
    fingerprint.hardwareConcurrency += getRandomInRange(-2, 2);
    fingerprint.deviceMemory += getRandomInRange(-2, 2);
  }
  // Low randomization keeps original values mostly intact
  
  return fingerprint;
};

export const generateBulkFingerprints = async (count, onProgress) => {
  const fingerprints = [];
  const batchSize = 10;
  
  for (let i = 0; i < count; i += batchSize) {
    const batch = [];
    const remainingCount = Math.min(batchSize, count - i);
    
    for (let j = 0; j < remainingCount; j++) {
      batch.push(generateFingerprint());
    }
    
    fingerprints.push(...batch);
    
    if (onProgress) {
      onProgress(Math.min(i + batchSize, count), count);
    }
    
    // Small delay to prevent blocking
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  return fingerprints;
};