const mongoose = require('mongoose');

/**
 * WebsiteCheck Schema - stores website URL checks
 */
const websiteCheckSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      maxLength: 2000
    },
    domain: {
      type: String,
      required: true
    },
    result: {
      type: String,
      enum: ['Xavfsiz', 'Shubhali', 'Bloklangan'],
      required: true
    },
    category: {
      type: String,
      enum: ['safe', 'adult', 'gambling', 'violence', 'malware', 'unknown'],
      default: 'unknown'
    },
    reason: {
      type: String,
      default: ''
    },
    parentMode: {
      type: Boolean,
      default: false
    },
    ipAddress: {
      type: String,
      default: 'unknown'
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
websiteCheckSchema.index({ timestamp: -1 });
websiteCheckSchema.index({ result: 1 });
websiteCheckSchema.index({ domain: 1 });

module.exports = mongoose.model('WebsiteCheck', websiteCheckSchema);
