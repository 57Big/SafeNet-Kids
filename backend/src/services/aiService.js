const axios = require('axios');

/**
 * AI Service for analyzing text using OpenAI API
 */
class AIService {
  /**
   * Analyze text using OpenAI GPT
   * @param {string} text - Text to analyze
   * @param {array} detectedKeywords - Keywords found by keyword filter
   * @returns {object} - AI analysis result
   */
  static async analyzeWithAI(text, detectedKeywords = []) {
    // If no API key, return fallback response
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return this.getFallbackAnalysis(text, detectedKeywords);
    }

    try {
      const prompt = this.buildPrompt(text, detectedKeywords);

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Siz bolalar uchun internet xavfsizligini tahlil qiluvchi sun\'iy intellektsiz. Uzbek tilida javob bering.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 seconds timeout
        }
      );

      const aiExplanation = response.data.choices[0].message.content.trim();
      return {
        success: true,
        explanation: aiExplanation
      };

    } catch (error) {
      console.error('AI Service Error:', error.message);
      // Return fallback if AI fails
      return this.getFallbackAnalysis(text, detectedKeywords);
    }
  }

  /**
   * Build prompt for AI analysis
   * @param {string} text - Text to analyze
   * @param {array} detectedKeywords - Detected keywords
   * @returns {string} - Prompt
   */
  static buildPrompt(text, detectedKeywords) {
    let prompt = `Quyidagi matnni bolalar uchun xavfsizlik nuqtai nazaridan tahlil qiling va natijani Uzbek tilida tushuntiring:\n\n"${text}"\n\n`;

    if (detectedKeywords.length > 0) {
      prompt += `Topilgan shubhali so'zlar: ${detectedKeywords.join(', ')}\n\n`;
    }

    prompt += `Qisqa (2-3 jumla) va tushunarli tushuntiring:\n`;
    prompt += `1. Nima uchun bu matn xavfli yoki xavfsiz?\n`;
    prompt += `2. Qanday xavflar bo'lishi mumkin?\n`;
    prompt += `3. Ota-onalarga qanday maslahat berasiz?`;

    return prompt;
  }

  /**
   * Get fallback analysis when AI is not available
   * @param {string} text - Text to analyze
   * @param {array} detectedKeywords - Detected keywords
   * @returns {object} - Fallback analysis
   */
  static getFallbackAnalysis(text, detectedKeywords) {
    let explanation = '';

    if (detectedKeywords.length === 0) {
      explanation = 'Bu matn bolalar uchun xavfsiz ko\'rinadi. Hech qanday shubhali yoki zararli so\'zlar topilmadi. Lekin, bolalarning internet faoliyatini muntazam nazorat qilish tavsiya etiladi.';
    } else if (detectedKeywords.length <= 2) {
      explanation = `Matnda "${detectedKeywords.join(', ')}" kabi shubhali so'zlar topildi. Bu so'zlar bolalar uchun noqulay bo'lishi mumkin. Ota-onalar bu kontentni tekshirib ko'rishlari kerak va bolalarga tushuntirish berishlari lozim.`;
    } else {
      explanation = `Matnda ko'plab zararli so'zlar aniqlandi: "${detectedKeywords.slice(0, 3).join(', ')}" va boshqalar. Bu kontent bolalar uchun mutlaqo mos emas. Ota-onalar darhol aralashishlari va bolalarni bu turdagi kontentdan himoya qilishlari zarur.`;
    }

    return {
      success: true,
      explanation,
      source: 'fallback'
    };
  }
}

module.exports = AIService;
