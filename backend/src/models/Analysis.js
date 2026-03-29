const mongoose = require('mongoose');

/**
 * Analysis Schema - stores each text analysis
 */
const analysisSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 10000
    },
    result: {
      type: String,
      enum: ['Xavfsiz', 'Shubhali', 'Zararli'],
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    detectedKeywords: [{
      type: String
    }],
    aiExplanation: {
      type: String,
      default: ''
    },
    analysisType: {
      type: String,
      enum: ['keyword', 'ai', 'hybrid'],
      default: 'hybrid'
    },
    ipAddress: {
      type: String,
      default: 'unknown'
    },
    parentMode: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
analysisSchema.index({ timestamp: -1 });
analysisSchema.index({ result: 1 });

module.exports = mongoose.model('Analysis', analysisSchema);
