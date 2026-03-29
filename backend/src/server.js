require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('../config/database');
const analysisRoutes = require('./routes/analysisRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const unifiedHistoryRoutes = require('./routes/unifiedHistoryRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Juda ko\'p so\'rov yuborildi, keyinroq urinib ko\'ring'
});

app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    // Development: Allow localhost and VS Code tunnels
    if (process.env.NODE_ENV !== 'production') {
      // Allow localhost
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
      // Allow VS Code dev tunnels (*.devtunnels.ms)
      if (origin.includes('devtunnels.ms')) {
        return callback(null, true);
      }
    }

    // Production: Only allow your domain
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = ['https://yourdomain.com'];
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    }

    callback(new Error('CORS not allowed'));
  },
  credentials: true
};

app.use(cors(corsOptions));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server ishlayapti',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api', analysisRoutes);
app.use('/api', websiteRoutes);
app.use('/api', unifiedHistoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Yo\'nalish topilmadi'
  });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`\n🚀 Server ${PORT}-portda ishga tushdi`);
  console.log(`📝 Muhit: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`💾 MongoDB: ${process.env.MONGODB_URI || 'Not configured'}\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});
