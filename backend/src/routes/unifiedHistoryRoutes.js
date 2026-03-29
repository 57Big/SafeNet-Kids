const express = require('express');
const router = express.Router();
const unifiedHistoryController = require('../controllers/unifiedHistoryController');

// GET /api/unified-history - Get unified history (text + website)
router.get('/unified-history', unifiedHistoryController.getUnifiedHistory);

// GET /api/unified-stats - Get unified statistics
router.get('/unified-stats', unifiedHistoryController.getUnifiedStats);

module.exports = router;
