const Analysis = require('../models/Analysis');
const WebsiteCheck = require('../models/WebsiteCheck');

/**
 * Get unified history (both text analysis and website checks)
 * GET /api/unified-history
 */
exports.getUnifiedHistory = async (req, res) => {
  try {
    const { limit = 50, page = 1, type } = req.query;
    const skip = (page - 1) * limit;

    let textAnalyses = [];
    let websiteChecks = [];

    // Fetch based on filter type
    if (!type || type === 'all' || type === 'text') {
      textAnalyses = await Analysis.find()
        .sort({ timestamp: -1 })
        .limit(type === 'text' ? parseInt(limit) : 1000)
        .select('-__v');
    }

    if (!type || type === 'all' || type === 'website') {
      websiteChecks = await WebsiteCheck.find()
        .sort({ timestamp: -1 })
        .limit(type === 'website' ? parseInt(limit) : 1000)
        .select('-__v');
    }

    // Transform to unified format
    const unifiedTextRecords = textAnalyses.map(item => ({
      _id: item._id,
      type: 'text',
      input: item.text,
      result: item.result,
      score: item.score,
      detectedKeywords: item.detectedKeywords || [],
      explanation: item.aiExplanation || item.details || '',
      parentMode: item.parentMode || false,
      timestamp: item.timestamp,
      createdAt: item.createdAt
    }));

    const unifiedWebsiteRecords = websiteChecks.map(item => ({
      _id: item._id,
      type: 'website',
      input: item.url,
      domain: item.domain,
      result: item.result,
      category: item.category,
      categoryName: getCategoryName(item.category),
      explanation: item.reason || '',
      parentMode: item.parentMode || false,
      timestamp: item.timestamp,
      createdAt: item.createdAt
    }));

    // Combine and sort by timestamp
    let allRecords = [...unifiedTextRecords, ...unifiedWebsiteRecords];
    allRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Apply pagination after combining
    const total = allRecords.length;
    const paginatedRecords = allRecords.slice(skip, skip + parseInt(limit));

    // Get counts by type
    const textCount = await Analysis.countDocuments();
    const websiteCount = await WebsiteCheck.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        records: paginatedRecords,
        counts: {
          total: total,
          text: textCount,
          website: websiteCount
        },
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Unified History Error:', error);
    res.status(500).json({
      success: false,
      message: 'Tarixni olishda xatolik'
    });
  }
};

/**
 * Get unified statistics
 * GET /api/unified-stats
 */
exports.getUnifiedStats = async (req, res) => {
  try {
    // Text analysis stats
    const textTotal = await Analysis.countDocuments();
    const textSafe = await Analysis.countDocuments({ result: 'Xavfsiz' });
    const textSuspicious = await Analysis.countDocuments({ result: 'Shubhali' });
    const textHarmful = await Analysis.countDocuments({ result: 'Zararli' });

    // Website check stats
    const websiteTotal = await WebsiteCheck.countDocuments();
    const websiteSafe = await WebsiteCheck.countDocuments({ result: 'Xavfsiz' });
    const websiteSuspicious = await WebsiteCheck.countDocuments({ result: 'Shubhali' });
    const websiteBlocked = await WebsiteCheck.countDocuments({ result: 'Bloklangan' });

    // Combined stats
    const totalChecks = textTotal + websiteTotal;
    const totalSafe = textSafe + websiteSafe;
    const totalSuspicious = textSuspicious + websiteSuspicious;
    const totalHarmful = textHarmful + websiteBlocked;

    res.status(200).json({
      success: true,
      data: {
        total: totalChecks,
        byType: {
          text: textTotal,
          website: websiteTotal
        },
        byResult: {
          safe: totalSafe,
          suspicious: totalSuspicious,
          harmful: totalHarmful
        },
        details: {
          text: {
            total: textTotal,
            safe: textSafe,
            suspicious: textSuspicious,
            harmful: textHarmful
          },
          website: {
            total: websiteTotal,
            safe: websiteSafe,
            suspicious: websiteSuspicious,
            blocked: websiteBlocked
          }
        }
      }
    });

  } catch (error) {
    console.error('Unified Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Statistikani olishda xatolik'
    });
  }
};

/**
 * Get category name in Uzbek
 */
function getCategoryName(category) {
  const names = {
    'safe': 'Xavfsiz',
    'adult': 'Kattalar uchun kontent',
    'gambling': 'Qimor o\'yinlari',
    'violence': 'Zo\'ravonlik',
    'malware': 'Zararli dastur',
    'unknown': 'Noma\'lum'
  };
  return names[category] || 'Noma\'lum';
}

module.exports = exports;
