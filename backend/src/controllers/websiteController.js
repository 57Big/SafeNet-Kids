const WebsiteCheck = require('../models/WebsiteCheck');
const URLFilter = require('../utils/urlFilter');

/**
 * Check website URL for safety
 * POST /api/check-website
 */
exports.checkWebsite = async (req, res) => {
  try {
    const { url, parentMode = false } = req.body;

    // Validate input
    if (!url || url.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'URL kiritilmagan'
      });
    }

    // Check URL
    const checkResult = URLFilter.checkURL(url, parentMode);

    // Save to database
    const websiteCheck = new WebsiteCheck({
      url,
      domain: checkResult.domain,
      result: checkResult.result,
      category: checkResult.category,
      reason: checkResult.reason,
      parentMode,
      ipAddress: req.ip || req.connection.remoteAddress
    });

    await websiteCheck.save();

    // Return result
    res.status(200).json({
      success: true,
      data: {
        id: websiteCheck._id,
        url,
        domain: checkResult.domain,
        result: checkResult.result,
        category: checkResult.category,
        categoryName: URLFilter.getCategoryName(checkResult.category),
        reason: checkResult.reason,
        parentMode,
        timestamp: websiteCheck.timestamp
      }
    });

  } catch (error) {
    console.error('Website Check Error:', error);
    res.status(500).json({
      success: false,
      message: 'URL tekshirishda xatolik yuz berdi'
    });
  }
};

/**
 * Get website check history
 * GET /api/website-history
 */
exports.getWebsiteHistory = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const checks = await WebsiteCheck.find()
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await WebsiteCheck.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        checks,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Website History Error:', error);
    res.status(500).json({
      success: false,
      message: 'Tarixni olishda xatolik'
    });
  }
};

/**
 * Get website statistics
 * GET /api/website-stats
 */
exports.getWebsiteStats = async (req, res) => {
  try {
    const total = await WebsiteCheck.countDocuments();
    const safe = await WebsiteCheck.countDocuments({ result: 'Xavfsiz' });
    const suspicious = await WebsiteCheck.countDocuments({ result: 'Shubhali' });
    const blocked = await WebsiteCheck.countDocuments({ result: 'Bloklangan' });

    // Category breakdown
    const byCategory = await WebsiteCheck.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Most checked domains
    const topDomains = await WebsiteCheck.aggregate([
      {
        $group: {
          _id: '$domain',
          count: { $sum: 1 },
          lastResult: { $last: '$result' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Parent mode usage
    const parentModeCount = await WebsiteCheck.countDocuments({ parentMode: true });

    res.status(200).json({
      success: true,
      data: {
        total,
        byResult: {
          safe,
          suspicious,
          blocked
        },
        byCategory,
        topDomains,
        parentModeUsage: {
          total: parentModeCount,
          percentage: total > 0 ? ((parentModeCount / total) * 100).toFixed(1) : 0
        },
        filterStats: URLFilter.getStats()
      }
    });

  } catch (error) {
    console.error('Website Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Statistikani olishda xatolik'
    });
  }
};
