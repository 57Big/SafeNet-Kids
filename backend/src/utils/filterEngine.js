const { toxicWords, inappropriateTopics } = require('./toxicWords');

/**
 * Keyword-based filtering engine
 * Analyzes text for toxic/harmful content
 */
class FilterEngine {
  /**
   * Analyze text and return result with score
   * @param {string} text - Text to analyze
   * @param {boolean} parentMode - Parent control mode (stricter filtering)
   * @returns {object} - Analysis result
   */
  static analyzeText(text, parentMode = false) {
    if (!text || text.trim().length === 0) {
      return {
        result: 'Xavfsiz',
        score: 0,
        detectedKeywords: [],
        details: 'Matn topilmadi'
      };
    }

    const normalizedText = text.toLowerCase().trim();
    const detectedKeywords = [];
    let score = 0;

    // Parent mode: stricter scoring
    const multiplier = parentMode ? 1.5 : 1;

    // Check high severity words (30 points each, 45 in parent mode)
    toxicWords.high.forEach(word => {
      if (normalizedText.includes(word.toLowerCase())) {
        detectedKeywords.push(word);
        score += 30 * multiplier;
      }
    });

    // Check medium severity words (15 points each, 22.5 in parent mode)
    toxicWords.medium.forEach(word => {
      if (normalizedText.includes(word.toLowerCase())) {
        detectedKeywords.push(word);
        score += 15 * multiplier;
      }
    });

    // Check low severity words (5 points each, 7.5 in parent mode)
    toxicWords.low.forEach(word => {
      if (normalizedText.includes(word.toLowerCase())) {
        detectedKeywords.push(word);
        score += 5 * multiplier;
      }
    });

    // Check inappropriate topics (25 points each, 37.5 in parent mode)
    inappropriateTopics.forEach(topic => {
      if (normalizedText.includes(topic.toLowerCase())) {
        detectedKeywords.push(topic);
        score += 25 * multiplier;
      }
    });

    // Cap score at 100
    score = Math.min(score, 100);

    // Determine result based on score
    // Parent mode has lower threshold (stricter)
    let result;
    const threshold = parentMode ? 20 : 30;

    if (score === 0) {
      result = 'Xavfsiz';
    } else if (score < threshold) {
      result = 'Shubhali';
    } else {
      result = 'Zararli';
    }

    return {
      result,
      score: Math.round(score),
      detectedKeywords: [...new Set(detectedKeywords)], // Remove duplicates
      details: this.getDetails(result, detectedKeywords, parentMode)
    };
  }

  /**
   * Get human-readable details about the analysis
   * @param {string} result - Analysis result
   * @param {array} keywords - Detected keywords
   * @param {boolean} parentMode - Parent control mode
   * @returns {string} - Details message
   */
  static getDetails(result, keywords, parentMode = false) {
    const modePrefix = parentMode ? '[Ota-ona nazorati] ' : '';

    if (result === 'Xavfsiz') {
      return modePrefix + 'Matn bolalar uchun xavfsiz hisoblanadi.';
    } else if (result === 'Shubhali') {
      return modePrefix + `Matnda shubhali so'zlar topildi: ${keywords.slice(0, 3).join(', ')}. Ehtiyot bo'ling.`;
    } else {
      return modePrefix + `Matnda zararli kontent aniqlandi: ${keywords.slice(0, 3).join(', ')}. Bu bolalar uchun xavfli!`;
    }
  }

  /**
   * Get statistics for keywords
   * @param {array} keywords - Detected keywords
   * @returns {object} - Statistics
   */
  static getKeywordStats(keywords) {
    const stats = {
      high: 0,
      medium: 0,
      low: 0,
      topics: 0
    };

    keywords.forEach(keyword => {
      if (toxicWords.high.includes(keyword)) stats.high++;
      else if (toxicWords.medium.includes(keyword)) stats.medium++;
      else if (toxicWords.low.includes(keyword)) stats.low++;
      else if (inappropriateTopics.includes(keyword)) stats.topics++;
    });

    return stats;
  }
}

module.exports = FilterEngine;
