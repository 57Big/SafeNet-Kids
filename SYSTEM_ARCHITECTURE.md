# Tizim Arxitekturasi va Ishlash Tartibi

**SafeNet Kids - Bolalar uchun Internet Xavfsizligi Tizimi**

---

## Mundarija

1. [Umumiy Arxitektura](#1-umumiy-arxitektura)
2. [Komponentlar Tuzilishi](#2-komponentlar-tuzilishi)
3. [Ma'lumotlar Oqimi](#3-malumotlar-oqimi)
4. [Ma'lumotlar Bazasi Arxitekturasi](#4-malumotlar-bazasi-arxitekturasi)
5. [API Arxitekturasi](#5-api-arxitekturasi)
6. [Xavfsizlik Arxitekturasi](#6-xavfsizlik-arxitekturasi)
7. [Asosiy Funksiyalarning Ishlash Algoritmlari](#7-asosiy-funksiyalarning-ishlash-algoritmlari)
8. [Deployment va Scalability](#8-deployment-va-scalability)

---

## 1. Umumiy Arxitektura

SafeNet Kids tizimi uch qatlamli (3-tier) arxitekturaga asoslangan:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                  (Frontend - React SPA)                      │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Analyze  │  │ Website  │  │  Admin   │   │
│  │   Page   │  │   Page   │  │  Filter  │  │  Panel   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│                    Port: 3000                                │
└───────────────────────┬───────────────────────────────────┘
                        │
                        │ HTTP REST API
                        │ (JSON)
                        │
┌───────────────────────▼───────────────────────────────────┐
│                   APPLICATION LAYER                         │
│                  (Backend - Express.js)                     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Endpoints                          │    │
│  │  /api/analyze                                       │    │
│  │  /api/check-website                                 │    │
│  │  /api/unified-stats                                 │    │
│  │  /api/unified-history                               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Controllers │  │  Services   │  │    Utils     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                               │
│                    Port: 5001                                │
└───────────┬───────────────────────┬──────────────────────┘
            │                       │
            │                       │
┌───────────▼────────┐    ┌────────▼──────────┐
│   DATA LAYER       │    │  EXTERNAL APIs     │
│   (MongoDB)        │    │  (OpenAI GPT-3.5)  │
│                    │    │                    │
│  ┌──────────────┐ │    │  ┌──────────────┐ │
│  │  Analysis    │ │    │  │  AI Analysis │ │
│  │  Collection  │ │    │  │  & Explain   │ │
│  └──────────────┘ │    │  └──────────────┘ │
│                    │    │                    │
│  ┌──────────────┐ │    │                    │
│  │ WebsiteCheck │ │    │                    │
│  │  Collection  │ │    │                    │
│  └──────────────┘ │    │                    │
└────────────────────┘    └────────────────────┘
```

### Arxitektura Printsiplari

1. **Separation of Concerns**: Har bir qatlam o'z mas'uliyatiga ega
2. **RESTful API**: Standart HTTP metodlar va JSON format
3. **Stateless**: Server har bir so'rovni mustaqil ravishda qayta ishlaydi
4. **Microservices-oriented**: Komponentlar o'zaro bog'liq, lekin mustaqil
5. **Security-first**: Xavfsizlik barcha qatlamlarda ta'minlangan

---

## 2. Komponentlar Tuzilishi

### 2.1 Frontend Arxitekturasi

```
frontend/
│
├── public/
│   └── index.html              # HTML entry point
│
├── src/
│   ├── index.js                # React entry point
│   │
│   ├── App.js                  # Main application component
│   │   └── Routing logic       # React Router configuration
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.js           # Navigation bar (rendered on all pages)
│   │   ├── Loading.js          # Loading spinner/indicator
│   │   ├── ResultDisplay.js    # Analysis result display component
│   │   └── ScrollToTop.js      # Auto scroll to top on route change
│   │
│   ├── pages/                  # Page-level components
│   │   ├── Home.js             # Landing page
│   │   ├── Analyze.js          # Text analysis page
│   │   │   └── Uses: filterEngine, aiService
│   │   ├── WebsiteFilter.js    # Website checking page
│   │   │   └── Uses: urlFilter, aiService
│   │   ├── Admin.js            # Admin dashboard
│   │   │   └── Statistics, history, filters
│   │   └── About.js            # About project page
│   │
│   ├── services/
│   │   └── api.js              # Axios API client
│   │       ├── analyzeText()
│   │       ├── checkWebsite()
│   │       ├── getUnifiedStats()
│   │       ├── getUnifiedHistory()
│   │       └── deleteAnalysis()
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── App.css         # Global styles
│   │
│   └── utils/
│       └── helpers.js          # Utility functions (if any)
```

#### Frontend Component Hierarchy

```
App
├── Navbar
└── Router
    ├── Home
    ├── Analyze
    │   ├── Loading (conditional)
    │   └── ResultDisplay (conditional)
    ├── WebsiteFilter
    │   ├── Loading (conditional)
    │   └── ResultDisplay (conditional)
    ├── Admin
    │   ├── Statistics Section
    │   ├── Filter Controls
    │   └── History Table
    └── About
```

### 2.2 Backend Arxitekturasi

```
backend/
│
├── config/
│   └── database.js             # MongoDB connection configuration
│       └── Mongoose connection with error handling
│
├── src/
│   ├── server.js               # Application entry point
│   │   ├── Express setup
│   │   ├── Middleware configuration
│   │   ├── Routes registration
│   │   └── Error handling
│   │
│   ├── controllers/            # Business logic handlers
│   │   ├── analysisController.js
│   │   │   └── analyzeText()   # Text analysis logic
│   │   ├── websiteController.js
│   │   │   └── checkWebsite()  # Website checking logic
│   │   └── unifiedHistoryController.js
│   │       ├── getUnifiedStats()    # Combined statistics
│   │       ├── getUnifiedHistory()  # Combined history
│   │       └── deleteAnalysis()     # Delete entry
│   │
│   ├── models/                 # MongoDB schemas
│   │   ├── Analysis.js         # Text analysis schema
│   │   │   ├── text            # Original text
│   │   │   ├── result          # Safe/Suspicious/Harmful
│   │   │   ├── score           # 0-100 score
│   │   │   ├── detectedKeywords # Array of found keywords
│   │   │   ├── explanation     # AI explanation
│   │   │   ├── parentMode      # Boolean
│   │   │   └── timestamp       # Date
│   │   │
│   │   └── WebsiteCheck.js     # Website check schema
│   │       ├── url             # Full URL
│   │       ├── domain          # Domain name
│   │       ├── result          # Safe/Suspicious/Blocked
│   │       ├── category        # adult/gambling/violence/safe/unknown
│   │       ├── reason          # Explanation
│   │       ├── parentMode      # Boolean
│   │       └── timestamp       # Date
│   │
│   ├── routes/                 # API route definitions
│   │   ├── analysisRoutes.js
│   │   │   └── POST /api/analyze
│   │   ├── websiteRoutes.js
│   │   │   └── POST /api/check-website
│   │   └── unifiedHistoryRoutes.js
│   │       ├── GET /api/unified-stats
│   │       ├── GET /api/unified-history
│   │       └── DELETE /api/analysis/:id
│   │
│   ├── services/               # External service integrations
│   │   └── aiService.js
│   │       └── getAIExplanation()  # OpenAI GPT-3.5 integration
│   │
│   ├── utils/                  # Utility functions
│   │   ├── filterEngine.js     # Text filtering engine
│   │   │   ├── analyzeText()   # Main analysis function
│   │   │   └── Scoring logic
│   │   ├── urlFilter.js        # URL filtering engine
│   │   │   ├── checkURL()      # Main URL check function
│   │   │   ├── Blocked domains list
│   │   │   └── Category detection
│   │   └── toxicWords.js       # Keyword database
│   │       ├── HIGH severity (50+ points)
│   │       ├── MEDIUM severity (20-30 points)
│   │       └── LOW severity (5-10 points)
│   │
│   └── middleware/
│       └── errorHandler.js     # Global error handler
│
└── .env                        # Environment variables
    ├── PORT=5001
    ├── MONGODB_URI
    ├── OPENAI_API_KEY
    └── NODE_ENV
```

#### Backend Layer Architecture

```
┌──────────────────────────────────────────────────┐
│              HTTP REQUEST                         │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│         MIDDLEWARE LAYER                          │
│  ┌────────────────────────────────────────┐     │
│  │ 1. Helmet (Security headers)           │     │
│  │ 2. CORS (Cross-origin policy)          │     │
│  │ 3. Rate Limiter (100 req/15min)        │     │
│  │ 4. Body Parser (JSON, max 10MB)        │     │
│  │ 5. Morgan (HTTP logging)               │     │
│  └────────────────────────────────────────┘     │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│              ROUTING LAYER                        │
│  ┌────────────────────────────────────────┐     │
│  │ Route matching                          │     │
│  │ /api/analyze → analysisRoutes          │     │
│  │ /api/check-website → websiteRoutes     │     │
│  │ /api/unified-* → unifiedHistoryRoutes  │     │
│  └────────────────────────────────────────┘     │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│           CONTROLLER LAYER                        │
│  ┌────────────────────────────────────────┐     │
│  │ Business logic processing               │     │
│  │ Input validation                        │     │
│  │ Service orchestration                   │     │
│  └────────────────────────────────────────┘     │
└──────────────────┬───────────────────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
┌─────────▼─────────┐  ┌───▼──────────────────────┐
│  SERVICE LAYER    │  │    UTILITY LAYER          │
│  ┌──────────────┐ │  │  ┌──────────────────┐   │
│  │ AI Service   │ │  │  │ filterEngine     │   │
│  │ (OpenAI)     │ │  │  │ urlFilter        │   │
│  └──────────────┘ │  │  │ toxicWords       │   │
└───────────────────┘  │  └──────────────────┘   │
                       └──────────┬───────────────┘
                                  │
                       ┌──────────▼───────────────┐
                       │     MODEL LAYER          │
                       │  ┌──────────────────┐   │
                       │  │ Mongoose Models  │   │
                       │  │ - Analysis       │   │
                       │  │ - WebsiteCheck   │   │
                       │  └──────────────────┘   │
                       └──────────┬───────────────┘
                                  │
                       ┌──────────▼───────────────┐
                       │    DATABASE LAYER        │
                       │      (MongoDB)           │
                       └──────────────────────────┘
```

---

## 3. Ma'lumotlar Oqimi

### 3.1 Matn Tahlili Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER INPUT                                                │
│    User types text in Analyze.js page                       │
│    Optional: Toggles "Parent Mode"                          │
│    Clicks "Tahlil qilish" button                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP POST /api/analyze
                       │ Body: { text: "...", parentMode: false }
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 2. BACKEND RECEIVES REQUEST                                  │
│    ├─ Rate limiter checks (100 req/15min)                   │
│    ├─ CORS validation                                        │
│    ├─ Body parser extracts JSON                             │
│    └─ Routes to analysisController.analyzeText()            │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 3. CONTROLLER PROCESSING (analysisController.js)            │
│    ├─ Validates input (text length, required fields)        │
│    ├─ Calls filterEngine.analyzeText()                      │
│    │                                                          │
│    │  ┌────────────────────────────────────────┐           │
│    │  │ 3a. FILTER ENGINE PROCESSING           │           │
│    │  │     (utils/filterEngine.js)            │           │
│    │  │                                         │           │
│    │  │ Step 1: Text normalization             │           │
│    │  │  - Convert to lowercase                │           │
│    │  │  - Remove punctuation                  │           │
│    │  │                                         │           │
│    │  │ Step 2: Keyword matching               │           │
│    │  │  - Load from toxicWords.js             │           │
│    │  │  - Check HIGH severity (50pts each)    │           │
│    │  │  - Check MEDIUM severity (20-30pts)    │           │
│    │  │  - Check LOW severity (5-10pts)        │           │
│    │  │                                         │           │
│    │  │ Step 3: Score calculation              │           │
│    │  │  - Sum all keyword points              │           │
│    │  │  - Apply Parent Mode multiplier (x1.5) │           │
│    │  │  - Cap at 100 maximum                  │           │
│    │  │                                         │           │
│    │  │ Step 4: Result determination           │           │
│    │  │  - score >= 50: "Zararli"             │           │
│    │  │  - score >= 20: "Shubhali"            │           │
│    │  │  - score < 20: "Xavfsiz"              │           │
│    │  └────────────────────────────────────────┘           │
│    │                                                          │
│    ├─ Calls aiService.getAIExplanation()                    │
│    │                                                          │
│    │  ┌────────────────────────────────────────┐           │
│    │  │ 3b. AI SERVICE PROCESSING              │           │
│    │  │     (services/aiService.js)            │           │
│    │  │                                         │           │
│    │  │ IF OpenAI API key exists:              │           │
│    │  │  - Create prompt in Uzbek              │           │
│    │  │  - Call OpenAI GPT-3.5 Turbo API       │           │
│    │  │  - Get detailed explanation            │           │
│    │  │  - Get parent recommendations          │           │
│    │  │                                         │           │
│    │  │ ELSE (Fallback):                       │           │
│    │  │  - Return generic explanation          │           │
│    │  │  - Based on detected keywords          │           │
│    │  └────────────────────────────────────────┘           │
│    │                                                          │
│    ├─ Save to MongoDB (Analysis model)                      │
│    └─ Return response to frontend                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Response (JSON)
                       │ {success: true, data: {...}}
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 4. FRONTEND DISPLAYS RESULT                                  │
│    ├─ ResultDisplay component shows:                        │
│    │   - Color-coded result badge (green/yellow/red)        │
│    │   - Score with progress bar                            │
│    │   - Detected keywords list                             │
│    │   - AI explanation (expandable)                        │
│    └─ User can analyze another text or navigate away        │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Website Tekshirish Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER INPUT                                                │
│    User enters URL in WebsiteFilter.js page                 │
│    Optional: Toggles "Parent Mode"                          │
│    Clicks "Tekshirish" button                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP POST /api/check-website
                       │ Body: { url: "https://...", parentMode: false }
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 2. BACKEND RECEIVES REQUEST                                  │
│    ├─ Rate limiter checks                                    │
│    ├─ Routes to websiteController.checkWebsite()            │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 3. CONTROLLER PROCESSING (websiteController.js)             │
│    ├─ Validates URL format                                   │
│    ├─ Extracts domain name                                   │
│    ├─ Calls urlFilter.checkURL()                            │
│    │                                                          │
│    │  ┌────────────────────────────────────────┐           │
│    │  │ 3a. URL FILTER PROCESSING              │           │
│    │  │     (utils/urlFilter.js)               │           │
│    │  │                                         │           │
│    │  │ Step 1: Domain extraction              │           │
│    │  │  - Parse URL                           │           │
│    │  │  - Extract domain (e.g., example.com)  │           │
│    │  │                                         │           │
│    │  │ Step 2: Blocked domain check           │           │
│    │  │  - Check against BLOCKED_DOMAINS list  │           │
│    │  │  - Categories:                         │           │
│    │  │    * adult (pornography, etc.)         │           │
│    │  │    * gambling (casino, betting)        │           │
│    │  │    * violence (weapons, gore)          │           │
│    │  │    * malware (phishing, malicious)     │           │
│    │  │  - IF found: Return "Bloklangan"       │           │
│    │  │                                         │           │
│    │  │ Step 3: URL keyword analysis           │           │
│    │  │  - Check URL path for suspicious terms │           │
│    │  │  - Keywords: adult, xxx, porn, bet, etc│           │
│    │  │  - IF found: Return "Shubhali"         │           │
│    │  │                                         │           │
│    │  │ Step 4: Safe domain check              │           │
│    │  │  - Check against SAFE_DOMAINS list     │           │
│    │  │  - Categories: education, government   │           │
│    │  │  - IF found: Return "Xavfsiz"          │           │
│    │  │                                         │           │
│    │  │ Step 5: Unknown domain handling        │           │
│    │  │  IF Parent Mode ON:                    │           │
│    │  │   - Return "Shubhali"                  │           │
│    │  │  ELSE:                                 │           │
│    │  │   - Return "Xavfsiz" (category: unknown)│          │
│    │  └────────────────────────────────────────┘           │
│    │                                                          │
│    ├─ Save to MongoDB (WebsiteCheck model)                  │
│    └─ Return response to frontend                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Response (JSON)
                       │ {success: true, data: {...}}
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 4. FRONTEND DISPLAYS RESULT                                  │
│    ├─ ResultDisplay component shows:                        │
│    │   - Status badge (Safe/Suspicious/Blocked)             │
│    │   - Category with icon                                 │
│    │   - Detailed reason/explanation                        │
│    └─ User can check another URL or navigate away           │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Admin Panel Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ADMIN OPENS PANEL                                         │
│    Admin navigates to /admin page                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Parallel Requests:
                       │ GET /api/unified-stats
                       │ GET /api/unified-history?type=all&page=1&limit=20
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 2. BACKEND AGGREGATES DATA                                   │
│    (unifiedHistoryController.js)                            │
│                                                               │
│    ┌────────────────────────────────────────┐              │
│    │ 2a. GET UNIFIED STATISTICS             │              │
│    │                                         │              │
│    │ Step 1: Query Analysis collection      │              │
│    │  - Count total text analyses           │              │
│    │  - Count by result (safe/suspicious/   │              │
│    │    harmful)                             │              │
│    │  - Find most common keywords           │              │
│    │                                         │              │
│    │ Step 2: Query WebsiteCheck collection  │              │
│    │  - Count total website checks          │              │
│    │  - Count by result                     │              │
│    │  - Count by category                   │              │
│    │                                         │              │
│    │ Step 3: Combine statistics             │              │
│    │  - Total = text + website              │              │
│    │  - Breakdown by type                   │              │
│    │  - Breakdown by result                 │              │
│    └────────────────────────────────────────┘              │
│                                                               │
│    ┌────────────────────────────────────────┐              │
│    │ 2b. GET UNIFIED HISTORY                │              │
│    │                                         │              │
│    │ Step 1: Query based on filter          │              │
│    │  - IF type='all': Query both collections│             │
│    │  - IF type='text': Query Analysis only │              │
│    │  - IF type='website': Query Website only│             │
│    │                                         │              │
│    │ Step 2: Sort by timestamp (newest first)│             │
│    │                                         │              │
│    │ Step 3: Apply pagination               │              │
│    │  - Skip = (page - 1) * limit           │              │
│    │  - Limit = items per page              │              │
│    │                                         │              │
│    │ Step 4: Add type field to each entry   │              │
│    │  - 'text' or 'website'                 │              │
│    │  - For easy frontend rendering         │              │
│    └────────────────────────────────────────┘              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Response (JSON)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 3. FRONTEND RENDERS DASHBOARD                                │
│    ├─ Statistics cards:                                      │
│    │   - Total checks                                        │
│    │   - Safe/Suspicious/Harmful counts                     │
│    │   - Text vs Website breakdown                          │
│    │                                                          │
│    ├─ Filter controls:                                       │
│    │   - "Hammasi" / "Matn" / "Sayt" tabs                   │
│    │                                                          │
│    └─ History table:                                         │
│        - Timestamp                                           │
│        - Type (Text/Website)                                 │
│        - Content preview                                     │
│        - Result badge                                        │
│        - Delete button                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Ma'lumotlar Bazasi Arxitekturasi

### 4.1 MongoDB Collection Schemas

#### Analysis Collection

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated
  text: String,                     // Original text to analyze (required)
  result: String,                   // "Xavfsiz" | "Shubhali" | "Zararli" (required)
  score: Number,                    // 0-100 (required)
  detectedKeywords: [               // Array of found keywords
    {
      word: String,                 // The keyword found
      severity: String,             // "HIGH" | "MEDIUM" | "LOW"
      points: Number                // Points contributed
    }
  ],
  explanation: String,              // AI or fallback explanation
  details: String,                  // Additional details
  parentMode: Boolean,              // Was parent mode enabled?
  timestamp: Date,                  // ISO 8601 format

  // Mongoose metadata
  __v: Number,                      // Version key
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-generated
}
```

**Indexes:**
- `timestamp: -1` - For fast sorting by date (descending)
- `result: 1` - For filtering by result type
- `parentMode: 1` - For filtering by parent mode

#### WebsiteCheck Collection

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated
  url: String,                      // Full URL (required)
  domain: String,                   // Extracted domain (required)
  result: String,                   // "Xavfsiz" | "Shubhali" | "Bloklangan" (required)
  category: String,                 // Category type (required)
                                    // Values: "adult" | "gambling" | "violence"
                                    //         | "malware" | "safe" | "unknown"
  categoryName: String,             // Display name in Uzbek
                                    // "Kattalar uchun kontent" | "Qimor o'yinlari"
                                    // | "Zo'ravonlik" | "Zararli dastur"
                                    // | "Xavfsiz" | "Noma'lum"
  reason: String,                   // Explanation for the result
  parentMode: Boolean,              // Was parent mode enabled?
  timestamp: Date,                  // ISO 8601 format

  // Mongoose metadata
  __v: Number,                      // Version key
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-generated
}
```

**Indexes:**
- `timestamp: -1` - For fast sorting by date (descending)
- `result: 1` - For filtering by result type
- `category: 1` - For filtering by category
- `domain: 1` - For checking duplicate domains
- `parentMode: 1` - For filtering by parent mode

### 4.2 Database Operations

#### Common Queries

**Save new analysis:**
```javascript
const analysis = new Analysis({
  text: "Sample text",
  result: "Xavfsiz",
  score: 0,
  detectedKeywords: [],
  explanation: "AI explanation",
  parentMode: false,
  timestamp: new Date()
});
await analysis.save();
```

**Get unified statistics:**
```javascript
// Count analyses by result
const textStats = await Analysis.aggregate([
  {
    $group: {
      _id: '$result',
      count: { $sum: 1 }
    }
  }
]);

// Count website checks by result
const websiteStats = await WebsiteCheck.aggregate([
  {
    $group: {
      _id: '$result',
      count: { $sum: 1 }
    }
  }
]);
```

**Get paginated history:**
```javascript
const history = await Analysis.find()
  .sort({ timestamp: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .lean();
```

**Delete entry:**
```javascript
await Analysis.findByIdAndDelete(id);
// or
await WebsiteCheck.findByIdAndDelete(id);
```

### 4.3 Data Retention and Cleanup

**Current Strategy:**
- No automatic deletion
- Manual deletion via Admin panel
- Unlimited history storage

**Future Considerations:**
- Implement TTL (Time To Live) index for auto-cleanup
- Archive old records to separate collection
- Compress old data for storage efficiency

---

## 5. API Arxitekturasi

### 5.1 RESTful API Design Principles

1. **Resource-based URLs**: `/api/resource`
2. **HTTP methods**: GET (read), POST (create), DELETE (remove)
3. **JSON format**: All requests and responses use JSON
4. **Status codes**: Appropriate HTTP status codes
5. **Consistent response structure**: `{success, data/error, message}`

### 5.2 API Endpoints Specification

#### POST /api/analyze

**Purpose**: Analyze text for harmful content

**Request:**
```http
POST /api/analyze HTTP/1.1
Content-Type: application/json

{
  "text": "Tahlil qilinadigan matn",
  "parentMode": false
}
```

**Validation:**
- `text`: Required, string, min 1 char, max 10,000 chars
- `parentMode`: Optional, boolean, default `false`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "60f7b1c9e4b0a8c8f8e8e8e8",
    "result": "Xavfsiz",
    "score": 0,
    "detectedKeywords": [],
    "explanation": "Matn xavfsiz. Hech qanday zararli kontent topilmadi.",
    "details": "...",
    "parentMode": false,
    "timestamp": "2026-03-29T10:30:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Matn kiritilishi shart"
}
```

**Response Error (429 - Rate Limit):**
```json
{
  "success": false,
  "error": "Juda ko'p so'rov yuborildi, keyinroq urinib ko'ring"
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Serverda xatolik yuz berdi"
}
```

#### POST /api/check-website

**Purpose**: Check website safety

**Request:**
```http
POST /api/check-website HTTP/1.1
Content-Type: application/json

{
  "url": "https://example.com",
  "parentMode": false
}
```

**Validation:**
- `url`: Required, string, valid URL format
- `parentMode`: Optional, boolean, default `false`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "60f7b1c9e4b0a8c8f8e8e8e9",
    "url": "https://example.com",
    "domain": "example.com",
    "result": "Xavfsiz",
    "category": "safe",
    "categoryName": "Xavfsiz",
    "reason": "Bu sayt xavfsiz kategoriyada.",
    "parentMode": false,
    "timestamp": "2026-03-29T10:35:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Noto'g'ri URL formati"
}
```

#### GET /api/unified-stats

**Purpose**: Get combined statistics for all checks

**Request:**
```http
GET /api/unified-stats HTTP/1.1
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byType": {
      "text": 100,
      "website": 50
    },
    "byResult": {
      "safe": 120,
      "suspicious": 20,
      "harmful": 10
    },
    "details": {
      "text": {
        "total": 100,
        "safe": 80,
        "suspicious": 15,
        "harmful": 5,
        "topKeywords": [
          { "word": "keyword1", "count": 10 },
          { "word": "keyword2", "count": 5 }
        ]
      },
      "website": {
        "total": 50,
        "safe": 40,
        "suspicious": 5,
        "blocked": 5,
        "byCategory": {
          "adult": 3,
          "gambling": 2,
          "violence": 0,
          "malware": 0,
          "safe": 40,
          "unknown": 5
        }
      }
    }
  }
}
```

#### GET /api/unified-history

**Purpose**: Get combined history of all checks

**Request:**
```http
GET /api/unified-history?type=all&page=1&limit=20 HTTP/1.1
```

**Query Parameters:**
- `type`: Optional, `"all"` | `"text"` | `"website"`, default `"all"`
- `page`: Optional, integer, default `1`
- `limit`: Optional, integer, default `20`, max `100`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "_id": "60f7b1c9e4b0a8c8f8e8e8e8",
        "type": "text",
        "text": "Analyzed text",
        "result": "Xavfsiz",
        "score": 0,
        "timestamp": "2026-03-29T10:30:00.000Z"
      },
      {
        "_id": "60f7b1c9e4b0a8c8f8e8e8e9",
        "type": "website",
        "url": "https://example.com",
        "domain": "example.com",
        "result": "Xavfsiz",
        "category": "safe",
        "timestamp": "2026-03-29T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 150,
      "itemsPerPage": 20
    }
  }
}
```

#### DELETE /api/analysis/:id

**Purpose**: Delete a specific analysis or website check

**Request:**
```http
DELETE /api/analysis/60f7b1c9e4b0a8c8f8e8e8e8 HTTP/1.1
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Tahlil o'chirildi"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "error": "Tahlil topilmadi"
}
```

### 5.3 Error Handling

**Global Error Handler Middleware:**

```javascript
// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Noto\'g\'ri ma\'lumot formati'
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Noto\'g\'ri ID formati'
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Serverda xatolik yuz berdi'
  });
};
```

---

## 6. Xavfsizlik Arxitekturasi

### 6.1 Security Layers

```
┌──────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                        │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 1: HTTP Security Headers (Helmet.js)        │ │
│  │  - X-Content-Type-Options: nosniff               │ │
│  │  - X-Frame-Options: DENY                          │ │
│  │  - X-XSS-Protection: 1; mode=block               │ │
│  │  - Strict-Transport-Security: max-age=31536000   │ │
│  │  - Content-Security-Policy                        │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 2: CORS (Cross-Origin Resource Sharing)     │ │
│  │  - Development: Allow localhost + devtunnels      │ │
│  │  - Production: Whitelist specific domains         │ │
│  │  - Credentials: Enabled                           │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 3: Rate Limiting (express-rate-limit)       │ │
│  │  - Window: 15 minutes                             │ │
│  │  - Max requests: 100 per IP                       │ │
│  │  - Prevents: DDoS, brute force, spam             │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 4: Input Validation                         │ │
│  │  - Text length limits (max 10MB)                  │ │
│  │  - URL format validation                          │ │
│  │  - JSON structure validation                      │ │
│  │  - Sanitize user input                            │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 5: Environment Variables (.env)             │ │
│  │  - API keys stored securely                       │ │
│  │  - Database credentials hidden                    │ │
│  │  - Not committed to Git                           │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Layer 6: MongoDB Security                         │ │
│  │  - Parameterized queries (no SQL injection)       │ │
│  │  - Mongoose validation schemas                    │ │
│  │  - Connection with authentication                 │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 6.2 Security Best Practices Implemented

#### 1. Helmet.js Configuration

```javascript
app.use(helmet());
```

Automatically sets:
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - Enables XSS filter
- `Strict-Transport-Security` - Enforces HTTPS

#### 2. CORS Configuration

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    // Development
    if (process.env.NODE_ENV !== 'production') {
      if (origin.includes('localhost') ||
          origin.includes('127.0.0.1') ||
          origin.includes('devtunnels.ms')) {
        return callback(null, true);
      }
    }

    // Production
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
```

#### 3. Rate Limiting

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: 'Juda ko\'p so\'rov yuborildi'
});

app.use('/api/', limiter);
```

#### 4. Input Validation Example

```javascript
// Text analysis validation
if (!text || typeof text !== 'string') {
  return res.status(400).json({
    success: false,
    error: 'Matn kiritilishi shart'
  });
}

if (text.length > 10000) {
  return res.status(400).json({
    success: false,
    error: 'Matn juda uzun (max 10000 belgi)'
  });
}
```

#### 5. Environment Variables

```env
# .env file (NOT committed to Git)
PORT=5001
MONGODB_URI=mongodb://localhost:27017/safenet-kids
OPENAI_API_KEY=sk-...
NODE_ENV=development
```

#### 6. Mongoose Validation

```javascript
const analysisSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Matn kiritilishi shart'],
    maxlength: [10000, 'Matn juda uzun']
  },
  result: {
    type: String,
    required: true,
    enum: ['Xavfsiz', 'Shubhali', 'Zararli']
  },
  // ...
});
```

### 6.3 Security Threats and Mitigations

| Threat | Mitigation | Implementation |
|--------|------------|----------------|
| **XSS (Cross-Site Scripting)** | Helmet XSS filter, Input sanitization | `helmet()`, Input validation |
| **CSRF (Cross-Site Request Forgery)** | CORS policy, SameSite cookies | `cors()` middleware |
| **SQL Injection** | Mongoose parameterized queries | Mongoose ODM |
| **DDoS / Spam** | Rate limiting | `express-rate-limit` |
| **Clickjacking** | X-Frame-Options header | `helmet()` |
| **Man-in-the-Middle** | HTTPS enforcement | Strict-Transport-Security |
| **Data leakage** | Environment variables | `dotenv`, `.gitignore` |
| **Unhandled errors** | Global error handler | `errorHandler` middleware |

---

## 7. Asosiy Funksiyalarning Ishlash Algoritmlari

### 7.1 Matn Tahlili Algoritmi (filterEngine.js)

```javascript
/**
 * TEXT ANALYSIS ALGORITHM
 *
 * Input: text (string), parentMode (boolean)
 * Output: { result, score, detectedKeywords }
 */

function analyzeText(text, parentMode = false) {
  // Step 1: Normalize text
  const normalizedText = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');

  // Step 2: Initialize scoring
  let score = 0;
  let detectedKeywords = [];

  // Step 3: Check HIGH severity keywords
  for (const keyword of HIGH_SEVERITY_WORDS) {
    if (normalizedText.includes(keyword.word)) {
      score += keyword.points; // 50+ points
      detectedKeywords.push({
        word: keyword.word,
        severity: 'HIGH',
        points: keyword.points
      });
    }
  }

  // Step 4: Check MEDIUM severity keywords
  for (const keyword of MEDIUM_SEVERITY_WORDS) {
    if (normalizedText.includes(keyword.word)) {
      score += keyword.points; // 20-30 points
      detectedKeywords.push({
        word: keyword.word,
        severity: 'MEDIUM',
        points: keyword.points
      });
    }
  }

  // Step 5: Check LOW severity keywords
  for (const keyword of LOW_SEVERITY_WORDS) {
    if (normalizedText.includes(keyword.word)) {
      score += keyword.points; // 5-10 points
      detectedKeywords.push({
        word: keyword.word,
        severity: 'LOW',
        points: keyword.points
      });
    }
  }

  // Step 6: Apply Parent Mode multiplier
  if (parentMode) {
    score = Math.floor(score * 1.5);
  }

  // Step 7: Cap score at 100
  score = Math.min(score, 100);

  // Step 8: Determine result
  let result;
  if (score >= 50) {
    result = 'Zararli';
  } else if (score >= 20) {
    result = 'Shubhali';
  } else {
    result = 'Xavfsiz';
  }

  return {
    result,
    score,
    detectedKeywords
  };
}
```

**Scoring Examples:**

| Scenario | Keywords Found | Base Score | Parent Mode | Final Score | Result |
|----------|---------------|------------|-------------|-------------|--------|
| Clean text | None | 0 | No | 0 | Xavfsiz |
| Mild profanity | 2 LOW | 15 | No | 15 | Xavfsiz |
| Mild profanity | 2 LOW | 15 | Yes | 22 | Shubhali |
| Moderate | 1 MEDIUM | 25 | No | 25 | Shubhali |
| Severe | 1 HIGH | 50 | No | 50 | Zararli |
| Very severe | 2 HIGH | 100 | No | 100 | Zararli |

### 7.2 URL Filtrlash Algoritmi (urlFilter.js)

```javascript
/**
 * URL FILTERING ALGORITHM
 *
 * Input: url (string), parentMode (boolean)
 * Output: { result, category, reason }
 */

function checkURL(url, parentMode = false) {
  // Step 1: Parse URL and extract domain
  let domain;
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname.replace('www.', '');
  } catch (error) {
    return {
      result: 'Xavfsiz',
      category: 'unknown',
      reason: 'Noto\'g\'ri URL formati'
    };
  }

  // Step 2: Check blocked domains
  for (const blockedDomain of BLOCKED_DOMAINS) {
    if (domain.includes(blockedDomain.domain)) {
      return {
        result: 'Bloklangan',
        category: blockedDomain.category,
        categoryName: getCategoryName(blockedDomain.category),
        reason: `Bu sayt ${blockedDomain.category} kategoriyasida bloklangan`
      };
    }
  }

  // Step 3: Check suspicious URL patterns
  const suspiciousKeywords = [
    'adult', 'xxx', 'porn', 'sex',
    'bet', 'casino', 'gamble',
    'violence', 'weapon', 'drug'
  ];

  const urlLower = url.toLowerCase();
  for (const keyword of suspiciousKeywords) {
    if (urlLower.includes(keyword)) {
      return {
        result: 'Shubhali',
        category: 'unknown',
        categoryName: 'Noma\'lum',
        reason: 'URL da shubhali kalit so\'zlar topildi'
      };
    }
  }

  // Step 4: Check safe domains
  const safeDomains = [
    'edu.uz', 'gov.uz', 'wikipedia.org',
    'google.com', 'youtube.com' // (content filtered)
  ];

  for (const safeDomain of safeDomains) {
    if (domain.includes(safeDomain)) {
      return {
        result: 'Xavfsiz',
        category: 'safe',
        categoryName: 'Xavfsiz',
        reason: 'Bu sayt xavfsiz kategoriyada'
      };
    }
  }

  // Step 5: Handle unknown domains
  if (parentMode) {
    return {
      result: 'Shubhali',
      category: 'unknown',
      categoryName: 'Noma\'lum',
      reason: 'Ota-ona nazorati rejimida noma\'lum saytlar shubhali deb belgilanadi'
    };
  }

  return {
    result: 'Xavfsiz',
    category: 'unknown',
    categoryName: 'Noma\'lum',
    reason: 'Bu sayt haqida ma\'lumot yo\'q'
  };
}
```

**Decision Tree:**

```
URL Input
    │
    ├─ Parse URL ─→ Invalid? ─→ Return "Xavfsiz" (unknown)
    │
    ├─ Check Blocked Domains
    │      │
    │      └─ Match found? ─→ Return "Bloklangan" (category)
    │
    ├─ Check URL Keywords
    │      │
    │      └─ Suspicious found? ─→ Return "Shubhali" (unknown)
    │
    ├─ Check Safe Domains
    │      │
    │      └─ Match found? ─→ Return "Xavfsiz" (safe)
    │
    └─ Unknown Domain
           │
           ├─ Parent Mode ON? ─→ Return "Shubhali" (unknown)
           │
           └─ Parent Mode OFF? ─→ Return "Xavfsiz" (unknown)
```

### 7.3 AI Tushuntirish Algoritmi (aiService.js)

```javascript
/**
 * AI EXPLANATION ALGORITHM
 *
 * Input: text, result, detectedKeywords
 * Output: explanation (string)
 */

async function getAIExplanation(text, result, detectedKeywords) {
  // Step 1: Check if OpenAI API key exists
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackExplanation(result, detectedKeywords);
  }

  try {
    // Step 2: Create prompt in Uzbek
    const prompt = `
      Siz bolalar uchun internet xavfsizligi bo'yicha mutaxassis sun'iy intellektsiz.

      Quyidagi matn tahlil qilindi va natija: "${result}"
      Topilgan kalit so'zlar: ${JSON.stringify(detectedKeywords)}

      Matn: "${text}"

      Iltimos, ushbu natijani ota-onalar uchun oddiy va tushunarli tilda tushuntiring.
      Nima uchun bu matn "${result}" deb belgilangani va ota-onalar qanday harakat qilishi kerakligi haqida maslahat bering.
    `;

    // Step 3: Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Siz bolalar uchun internet xavfsizligi bo\'yicha mutaxassis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds
      }
    );

    // Step 4: Extract explanation
    const explanation = response.data.choices[0].message.content;
    return explanation;

  } catch (error) {
    // Step 5: Fallback on error
    console.error('OpenAI API Error:', error.message);
    return getFallbackExplanation(result, detectedKeywords);
  }
}

/**
 * FALLBACK EXPLANATION (No AI)
 */
function getFallbackExplanation(result, detectedKeywords) {
  if (result === 'Xavfsiz') {
    return 'Ushbu matn xavfsiz deb topildi. Hech qanday zararli kontent aniqlanmadi.';
  }

  if (result === 'Shubhali') {
    return `Ushbu matnda ${detectedKeywords.length} ta shubhali kalit so'z topildi.
            Bolangiz bilan suhbatlashib, qanday kontentlar bilan uchrashayotganini bilib oling.`;
  }

  if (result === 'Zararli') {
    return `Ushbu matnda ${detectedKeywords.length} ta zararli kalit so'z topildi.
            Bu kontent bolalar uchun mos emas. Darhol nazorat qiling va kerakli choralarni ko'ring.`;
  }
}
```

### 7.4 Parent Mode Mexanizmi

**Parent Mode ON:**

```
Text Analysis:
  - Score multiplier: x1.5
  - Threshold: 30 (instead of 20)
  - More sensitive detection

Website Check:
  - Unknown domains → "Shubhali" (instead of "Xavfsiz")
  - Stricter categorization
```

**Example Comparison:**

| Text | Keywords | Base Score | Regular Mode | Parent Mode |
|------|----------|------------|--------------|-------------|
| "Slightly bad word" | 1 LOW (10pts) | 10 | Xavfsiz (10) | Xavfsiz (15) |
| "Two bad words" | 2 LOW (20pts) | 20 | Shubhali (20) | Shubhali (30) |
| "Moderate issue" | 1 MED (25pts) | 25 | Shubhali (25) | Shubhali (37) |

---

## 8. Deployment va Scalability

### 8.1 Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                       │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Frontend (React)                                  │ │
│  │  - Build: npm run build                           │ │
│  │  - Hosting: Netlify / Vercel / Static server     │ │
│  │  - CDN: Cloudflare                                │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Backend (Node.js + Express)                      │ │
│  │  - Hosting: Heroku / DigitalOcean / AWS EC2      │ │
│  │  - Process manager: PM2                           │ │
│  │  - HTTPS: Let's Encrypt SSL                       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Database (MongoDB)                               │ │
│  │  - MongoDB Atlas (Cloud)                          │ │
│  │  - Automated backups                              │ │
│  │  - Replica set for high availability             │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 8.2 Environment-specific Configuration

**Development:**
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/safenet-kids
OPENAI_API_KEY=sk-...
CORS_ORIGIN=http://localhost:3000
```

**Production:**
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/safenet-kids
OPENAI_API_KEY=sk-...
CORS_ORIGIN=https://yourdomain.com
```

### 8.3 Scalability Considerations

#### Horizontal Scaling

```
Load Balancer (Nginx)
    │
    ├─ Node.js Instance 1 (PM2)
    ├─ Node.js Instance 2 (PM2)
    ├─ Node.js Instance 3 (PM2)
    └─ Node.js Instance N (PM2)
            │
            └─ MongoDB Atlas (Sharded Cluster)
```

#### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize MongoDB indexes
- Enable MongoDB caching
- Implement Redis for session storage

#### Performance Optimization

1. **Database Indexing:**
   ```javascript
   // Create indexes for frequently queried fields
   Analysis.index({ timestamp: -1 });
   Analysis.index({ result: 1 });
   WebsiteCheck.index({ timestamp: -1, result: 1 });
   ```

2. **Response Caching:**
   ```javascript
   // Cache AI explanations
   const cache = new Map();

   function getCachedExplanation(text) {
     const hash = crypto.createHash('md5').update(text).digest('hex');
     return cache.get(hash);
   }
   ```

3. **Rate Limiting per User:**
   ```javascript
   // More granular rate limiting
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100,
     keyGenerator: (req) => req.ip // Or use user ID
   });
   ```

### 8.4 Monitoring and Logging

**Logging Strategy:**

```javascript
// Development
app.use(morgan('dev'));

// Production
app.use(morgan('combined', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
```

**Health Check Endpoint:**

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server ishlayapti',
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

**Error Monitoring:**

- Integrate Sentry or LogRocket for error tracking
- Set up alerts for critical errors
- Monitor API response times

### 8.5 Backup and Recovery

**Database Backup:**

1. **Automated Daily Backups** (MongoDB Atlas)
   - Retention: 7 days
   - Point-in-time recovery

2. **Manual Backups** (Local Development)
   ```bash
   mongodump --uri="mongodb://localhost:27017/safenet-kids" --out=./backup
   ```

3. **Restore from Backup**
   ```bash
   mongorestore --uri="mongodb://localhost:27017/safenet-kids" ./backup/safenet-kids
   ```

---

## Xulosa

SafeNet Kids tizimi zamonaviy veb-texnologiyalar va sun'iy intellekt asosida qurilgan, xavfsizlik va ishonchlilikka yo'naltirilgan arxitekturaga ega. Tizim:

- ✅ **Modular**: Har bir komponent mustaqil va o'zgartirish oson
- ✅ **Scalable**: Yuqori yuklamalarga moslashuvchan
- ✅ **Secure**: Ko'p qatlamli xavfsizlik mexanizmlari
- ✅ **Maintainable**: Tushunarli kod strukturasi va hujjatlar
- ✅ **Extensible**: Yangi xususiyatlar qo'shish oson

---

**© 2026 SafeNet Kids - Bolalar uchun Internet Xavfsizligi Tizimi**
