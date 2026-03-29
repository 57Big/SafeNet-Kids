const Analysis = require('../models/Analysis');
const FilterEngine = require('../utils/filterEngine');
const AIService = require('../services/aiService');

/**
 * Analyze text for harmful content
 * POST /api/analyze
 */
exports.analyzeText = async (req, res) => {
  try {
    const { text, parentMode = false } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Matn kiritilmagan'
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Matn juda uzun (maksimal 10000 belgi)'
      });
    }

    // Step 1: Keyword-based filtering (stricter in parent mode)
    const keywordAnalysis = FilterEngine.analyzeText(text, parentMode);

    // Step 2: AI analysis (if needed)
    let aiExplanation = '';
    if (keywordAnalysis.score > 0) {
      const aiResult = await AIService.analyzeWithAI(text, keywordAnalysis.detectedKeywords);
      aiExplanation = aiResult.explanation;
    } else {
      // Even safe content gets a brief explanation
      const aiResult = await AIService.analyzeWithAI(text, []);
      aiExplanation = aiResult.explanation;
    }

    // Step 3: Save to database
    const analysis = new Analysis({
      text,
      result: keywordAnalysis.result,
      score: keywordAnalysis.score,
      detectedKeywords: keywordAnalysis.detectedKeywords,
      aiExplanation,
      analysisType: 'hybrid',
      ipAddress: req.ip || req.connection.remoteAddress,
      parentMode
    });

    await analysis.save();

    // Step 4: Return result
    res.status(200).json({
      success: true,
      data: {
        id: analysis._id,
        result: keywordAnalysis.result,
        score: keywordAnalysis.score,
        detectedKeywords: keywordAnalysis.detectedKeywords,
        explanation: aiExplanation,
        details: keywordAnalysis.details,
        parentMode,
        timestamp: analysis.timestamp
      }
    });

  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'Tahlil qilishda xatolik yuz berdi'
    });
  }
};

/**
 * Get analysis history
 * GET /api/history
 */
exports.getHistory = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find()
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await Analysis.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        analyses,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('History Error:', error);
    res.status(500).json({
      success: false,
      message: 'Tarixni olishda xatolik'
    });
  }
};

/**
 * Get statistics for admin panel
 * GET /api/stats
 */
exports.getStats = async (req, res) => {
  try {
    const total = await Analysis.countDocuments();
    const safe = await Analysis.countDocuments({ result: 'Xavfsiz' });
    const suspicious = await Analysis.countDocuments({ result: 'Shubhali' });
    const harmful = await Analysis.countDocuments({ result: 'Zararli' });

    // Get recent analyses (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTotal = await Analysis.countDocuments({
      timestamp: { $gte: sevenDaysAgo }
    });

    // Most common harmful keywords
    const harmfulAnalyses = await Analysis.find({
      result: { $in: ['Shubhali', 'Zararli'] }
    })
      .limit(100)
      .select('detectedKeywords');

    const keywordCounts = {};
    harmfulAnalyses.forEach(analysis => {
      analysis.detectedKeywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));

    // Average score by category
    const avgScores = await Analysis.aggregate([
      {
        $group: {
          _id: '$result',
          avgScore: { $avg: '$score' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        byCategory: {
          safe,
          suspicious,
          harmful
        },
        recentTotal,
        topKeywords,
        avgScores,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Statistikani olishda xatolik'
    });
  }
};

/**
 * Delete analysis by ID
 * DELETE /api/analysis/:id
 */
exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const analysis = await Analysis.findByIdAndDelete(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Tahlil topilmadi'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tahlil o\'chirildi'
    });

  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({
      success: false,
      message: 'O\'chirishda xatolik'
    });
  }
};
