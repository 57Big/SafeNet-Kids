const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

// POST /api/check-website - Check website URL
router.post('/check-website', websiteController.checkWebsite);

// GET /api/website-history - Get website check history
router.get('/website-history', websiteController.getWebsiteHistory);

// GET /api/website-stats - Get website statistics
router.get('/website-stats', websiteController.getWebsiteStats);

module.exports = router;
