import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

/**
 * Analyze text for harmful content
 * @param {string} text - Text to analyze
 * @param {boolean} parentMode - Parent control mode
 * @returns {Promise} - Analysis result
 */
export const analyzeText = async (text, parentMode = false) => {
  try {
    const response = await api.post('/analyze', { text, parentMode });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get analysis history
 * @param {number} limit - Number of items per page
 * @param {number} page - Page number
 * @returns {Promise} - History data
 */
export const getHistory = async (limit = 50, page = 1) => {
  try {
    const response = await api.get('/history', {
      params: { limit, page }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get statistics for admin panel
 * @returns {Promise} - Statistics data
 */
export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete analysis by ID
 * @param {string} id - Analysis ID
 * @returns {Promise} - Delete result
 */
export const deleteAnalysis = async (id) => {
  try {
    const response = await api.delete(`/analysis/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Check website URL for safety
 * @param {string} url - URL to check
 * @param {boolean} parentMode - Parent control mode
 * @returns {Promise} - Check result
 */
export const checkWebsite = async (url, parentMode = false) => {
  try {
    const response = await api.post('/check-website', { url, parentMode });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get website check history
 * @param {number} limit - Number of items per page
 * @param {number} page - Page number
 * @returns {Promise} - History data
 */
export const getWebsiteHistory = async (limit = 50, page = 1) => {
  try {
    const response = await api.get('/website-history', {
      params: { limit, page }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get website statistics
 * @returns {Promise} - Statistics data
 */
export const getWebsiteStats = async () => {
  try {
    const response = await api.get('/website-stats');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get unified history (text + website checks combined)
 * @param {number} limit - Number of items per page
 * @param {number} page - Page number
 * @param {string} type - Filter type: 'all', 'text', or 'website'
 * @returns {Promise} - Unified history data
 */
export const getUnifiedHistory = async (limit = 50, page = 1, type = 'all') => {
  try {
    const response = await api.get('/unified-history', {
      params: { limit, page, type }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get unified statistics (text + website combined)
 * @returns {Promise} - Unified statistics data
 */
export const getUnifiedStats = async () => {
  try {
    const response = await api.get('/unified-stats');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @returns {Error} - Formatted error
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || 'Serverda xatolik yuz berdi';
    return new Error(message);
  } else if (error.request) {
    // Request made but no response
    return new Error('Serverga ulanishda xatolik. Internetni tekshiring.');
  } else {
    // Something else happened
    return new Error('Kutilmagan xatolik yuz berdi');
  }
};

export default api;
