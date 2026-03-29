const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// POST /api/analyze - Analyze text
router.post('/analyze', analysisController.analyzeText);

// GET /api/history - Get analysis history
router.get('/history', analysisController.getHistory);

// GET /api/stats - Get statistics
router.get('/stats', analysisController.getStats);

// DELETE /api/analysis/:id - Delete analysis
router.delete('/analysis/:id', analysisController.deleteAnalysis);

module.exports = router;
