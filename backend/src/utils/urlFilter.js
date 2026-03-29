/**
 * URL/Website filtering engine
 * Checks if a website is safe for children
 */

// Blocked domains and keywords
const blockedDomains = [
  // Adult content
  'pornhub.com',
  'xvideos.com',
  'xnxx.com',
  'redtube.com',
  'youporn.com',

  // Gambling
  'bet365.com',
  'casino.com',
  'poker.com',
  '1xbet.com',
  'mostbet.com',

  // Violence/weapons
  'buyguns.com',
  'weaponsmarket.com',

  // Malware/phishing (examples)
  'free-download-virus.com',
  'click-here-win.com',
];

// Suspicious keywords in URLs
const suspiciousKeywords = [
  'porn',
  'xxx',
  'adult',
  'sex',
  'casino',
  'gambling',
  'bet',
  'weapon',
  'gun',
  'drug',
  'darkweb',
  'hack',
  'crack',
  'pirate',
  'torrent',
  'warez',
];

// Safe/educational domains
const safeDomains = [
  'google.com',
  'youtube.com',
  'wikipedia.org',
  'edu.uz',
  'gov.uz',
  'natlib.uz',
  'ziyonet.uz',
  'kun.uz',
  'bbc.com',
  'britannica.com',
  'khanacademy.org',
  'github.com',
];

class URLFilter {
  /**
   * Check if URL is safe for children
   * @param {string} url - URL to check
   * @param {boolean} parentMode - Parent control mode (stricter)
   * @returns {object} - Check result
   */
  static checkURL(url, parentMode = false) {
    try {
      // Validate URL
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      const fullURL = url.toLowerCase();

      // Check if explicitly blocked
      const isBlocked = blockedDomains.some(blocked =>
        domain.includes(blocked) || fullURL.includes(blocked)
      );

      if (isBlocked) {
        return {
          result: 'Bloklangan',
          category: this.detectCategory(fullURL),
          reason: 'Bu sayt zararli kontent kategoriyasiga kiradi va bloklanadi.',
          domain
        };
      }

      // Check for suspicious keywords
      const hasSuspiciousKeyword = suspiciousKeywords.some(keyword =>
        fullURL.includes(keyword)
      );

      if (hasSuspiciousKeyword) {
        return {
          result: parentMode ? 'Bloklangan' : 'Shubhali',
          category: this.detectCategory(fullURL),
          reason: parentMode
            ? 'Ota-ona nazorati rejimida: Shubhali kontent aniqlandi va bloklandi.'
            : 'URL manzilida shubhali so\'zlar topildi. Ehtiyot bo\'ling.',
          domain
        };
      }

      // Check if explicitly safe
      const isSafe = safeDomains.some(safe =>
        domain.includes(safe)
      );

      if (isSafe) {
        return {
          result: 'Xavfsiz',
          category: 'safe',
          reason: 'Bu sayt ishonchli va bolalar uchun xavfsiz.',
          domain
        };
      }

      // Unknown domain - be cautious in parent mode
      if (parentMode) {
        return {
          result: 'Shubhali',
          category: 'unknown',
          reason: 'Ota-ona nazorati rejimida: Noma\'lum sayt. Tekshirish tavsiya etiladi.',
          domain
        };
      }

      // Default: Unknown but not blocked
      return {
        result: 'Xavfsiz',
        category: 'unknown',
        reason: 'Sayt bazada yo\'q, lekin xavfli belgilar topilmadi. Ehtiyot bo\'lish tavsiya etiladi.',
        domain
      };

    } catch (error) {
      return {
        result: 'Bloklangan',
        category: 'malware',
        reason: 'Noto\'g\'ri URL manzil formati.',
        domain: 'invalid'
      };
    }
  }

  /**
   * Detect category based on keywords
   * @param {string} url - URL to analyze
   * @returns {string} - Category
   */
  static detectCategory(url) {
    const urlLower = url.toLowerCase();

    if (urlLower.includes('porn') || urlLower.includes('xxx') || urlLower.includes('sex') || urlLower.includes('adult')) {
      return 'adult';
    }
    if (urlLower.includes('casino') || urlLower.includes('bet') || urlLower.includes('gambling') || urlLower.includes('poker')) {
      return 'gambling';
    }
    if (urlLower.includes('weapon') || urlLower.includes('gun') || urlLower.includes('violence')) {
      return 'violence';
    }
    if (urlLower.includes('hack') || urlLower.includes('crack') || urlLower.includes('virus')) {
      return 'malware';
    }

    return 'unknown';
  }

  /**
   * Get category name in Uzbek
   * @param {string} category - Category code
   * @returns {string} - Uzbek name
   */
  static getCategoryName(category) {
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

  /**
   * Add domain to blocked list (for admin)
   * @param {string} domain - Domain to block
   */
  static addBlockedDomain(domain) {
    if (!blockedDomains.includes(domain)) {
      blockedDomains.push(domain);
      return true;
    }
    return false;
  }

  /**
   * Get statistics about blocked/safe domains
   * @returns {object} - Statistics
   */
  static getStats() {
    return {
      blockedDomainsCount: blockedDomains.length,
      safeDomainsCount: safeDomains.length,
      suspiciousKeywordsCount: suspiciousKeywords.length
    };
  }
}

module.exports = URLFilter;
