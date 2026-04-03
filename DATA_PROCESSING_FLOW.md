# Ma'lumotlarni Qabul Qilish va Dastlabki Qayta Ishlash Jarayoni

**SafeNet Kids - Data Input & Preprocessing Flow**

---

## Mundarija

1. [Umumiy Ma'lumot](#1-umumiy-malumot)
2. [Ma'lumot Kirish Nuqtalari](#2-malumot-kirish-nuqtalari)
3. [Request Processing Pipeline](#3-request-processing-pipeline)
4. [Matn Tahlili - Ma'lumot Qayta Ishlash](#4-matn-tahlili---malumot-qayta-ishlash)
5. [Website Tekshirish - Ma'lumot Qayta Ishlash](#5-website-tekshirish---malumot-qayta-ishlash)
6. [Validation va Error Handling](#6-validation-va-error-handling)
7. [Data Sanitization](#7-data-sanitization)
8. [Response Formatting](#8-response-formatting)

---

## 1. Umumiy Ma'lumot

SafeNet Kids tizimida ma'lumotlar qabul qilish va dastlabki qayta ishlash jarayoni bir necha bosqichlardan iborat. Har bir bosqichda ma'lumotlar tekshiriladi, tozalanadi va keyingi qayta ishlash uchun tayyorlanadi.

### Asosiy Printsiplar

- **Validation First**: Har qanday ma'lumot avval tekshiriladi
- **Sanitization**: Xavfli kontentlarni tozalash
- **Early Return**: Xatolik topilsa darhol javob qaytariladi
- **Logging**: Barcha jarayonlar log qilinadi
- **Type Safety**: Ma'lumot turlari qat'iy tekshiriladi

---

## 2. Ma'lumot Kirish Nuqtalari

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA INPUT SOURCES                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐    ┌─────────────────────────────┐
│   FRONTEND APPLICATION      │    │    EXTERNAL CLIENTS         │
│   (React SPA)               │    │    (API Consumers)          │
│                             │    │                             │
│  ├─ Analyze.js              │    │  ├─ Mobile Apps             │
│  │   └─ Text input          │    │  ├─ Browser Extensions      │
│  │   └─ Parent mode toggle  │    │  ├─ Third-party Services    │
│  │                          │    │  └─ Testing Tools (Postman) │
│  ├─ WebsiteFilter.js        │    │                             │
│  │   └─ URL input           │    │                             │
│  │   └─ Parent mode toggle  │    │                             │
│  │                          │    │                             │
│  └─ Admin.js                │    │                             │
│      └─ History requests    │    │                             │
│      └─ Delete requests     │    │                             │
└──────────────┬──────────────┘    └──────────────┬──────────────┘
               │                                   │
               │                                   │
               └─────────────┬─────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │ JSON Format
                             │
               ┌─────────────▼─────────────────────┐
               │     BACKEND API SERVER            │
               │     (Express.js)                  │
               │     Port: 5001                    │
               └───────────────────────────────────┘
```

### Input Endpoints

| Endpoint | Method | Purpose | Input Data |
|----------|--------|---------|------------|
| `/api/analyze` | POST | Matn tahlili | `{ text, parentMode }` |
| `/api/check-website` | POST | Website tekshirish | `{ url, parentMode }` |
| `/api/unified-stats` | GET | Statistika olish | Query params |
| `/api/unified-history` | GET | Tarix olish | `{ type, page, limit }` |
| `/api/analysis/:id` | DELETE | Tahlilni o'chirish | URL param: `id` |

---

## 3. Request Processing Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                    REQUEST PROCESSING PIPELINE                    │
│                     (Har bir so'rov uchun)                       │
└──────────────────────────────────────────────────────────────────┘

  HTTP REQUEST
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: MIDDLEWARE LAYER                                      │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1.1 Helmet.js - Security Headers                    │    │
│  │     ├─ Set X-Content-Type-Options                   │    │
│  │     ├─ Set X-Frame-Options                          │    │
│  │     ├─ Set X-XSS-Protection                         │    │
│  │     └─ Set CSP headers                              │    │
│  │     Result: Headers added ✓                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1.2 CORS Validation                                  │    │
│  │     Check origin:                                    │    │
│  │     ├─ Is it localhost? (dev mode)                  │    │
│  │     ├─ Is it devtunnels.ms? (dev mode)              │    │
│  │     ├─ Is it whitelisted domain? (prod mode)        │    │
│  │     │                                                │    │
│  │     If NO → Reject with CORS error                  │    │
│  │     If YES → Continue ✓                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1.3 Rate Limiter                                     │    │
│  │     Check request count from IP:                     │    │
│  │     ├─ Current window: 15 minutes                   │    │
│  │     ├─ Request count: X/100                         │    │
│  │     │                                                │    │
│  │     If X > 100 → Reject (429 Too Many Requests)     │    │
│  │     If X ≤ 100 → Continue ✓                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1.4 Body Parser                                      │    │
│  │     Parse incoming data:                             │    │
│  │     ├─ Content-Type: application/json                │    │
│  │     ├─ Max size: 10MB                                │    │
│  │     │                                                │    │
│  │     If parsing fails → Reject (400 Bad Request)     │    │
│  │     If success → req.body populated ✓               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 1.5 Morgan Logger (Development)                      │    │
│  │     Log request:                                     │    │
│  │     ├─ Method: POST                                  │    │
│  │     ├─ URL: /api/analyze                             │    │
│  │     ├─ Status: -                                     │    │
│  │     └─ Response time: -                              │    │
│  │     Logged to console ✓                              │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: ROUTING LAYER                                         │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 2.1 Route Matching                                   │    │
│  │     Match request to route:                          │    │
│  │                                                       │    │
│  │     POST /api/analyze                                │    │
│  │       → analysisRoutes                               │    │
│  │       → analysisController.analyzeText()             │    │
│  │                                                       │    │
│  │     POST /api/check-website                          │    │
│  │       → websiteRoutes                                │    │
│  │       → websiteController.checkWebsite()             │    │
│  │                                                       │    │
│  │     GET /api/unified-stats                           │    │
│  │       → unifiedHistoryRoutes                         │    │
│  │       → unifiedHistoryController.getUnifiedStats()   │    │
│  │                                                       │    │
│  │     If no match → 404 handler                        │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: CONTROLLER LAYER                                      │
│         (Ma'lumotni qayta ishlash boshlanadi)                │
│                                                                │
│  Continue to Step 4 or Step 5...                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Matn Tahlili - Ma'lumot Qayta Ishlash

### 4.1 Input Reception Flow

```
POST /api/analyze
Body: { text: "...", parentMode: false }
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ CONTROLLER: analysisController.analyzeText()                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: INPUT EXTRACTION                                     │
│                                                                │
│  const { text, parentMode } = req.body;                       │
│                                                                │
│  Extracted values:                                            │
│  ├─ text: (any type, needs validation)                       │
│  └─ parentMode: (any type, needs validation)                 │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 2: VALIDATION                                           │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 1: Text Existence                   │    │
│  │                                                       │    │
│  │   if (!text) {                                       │    │
│  │     return 400 Error: "Matn kiritilishi shart"      │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   ✓ Text exists                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 2: Text Type                        │    │
│  │                                                       │    │
│  │   if (typeof text !== 'string') {                   │    │
│  │     return 400 Error: "Matn string bo'lishi kerak"  │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   ✓ Text is string                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 3: Text Length                      │    │
│  │                                                       │    │
│  │   if (text.trim().length === 0) {                   │    │
│  │     return 400 Error: "Bo'sh matn"                   │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   if (text.length > 10000) {                        │    │
│  │     return 400 Error: "Matn juda uzun"              │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   ✓ Text length is valid (1-10000 chars)            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 4: Parent Mode Type                 │    │
│  │                                                       │    │
│  │   const isParentMode = Boolean(parentMode);          │    │
│  │                                                       │    │
│  │   ✓ Parent mode converted to boolean                │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 3: SANITIZATION & PREPROCESSING                         │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 1: Trim whitespace                              │    │
│  │                                                       │    │
│  │   let cleanText = text.trim();                       │    │
│  │                                                       │    │
│  │   Before: "  Hello world  "                          │    │
│  │   After:  "Hello world"                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 2: Remove excessive whitespace                  │    │
│  │                                                       │    │
│  │   cleanText = cleanText.replace(/\s+/g, ' ');        │    │
│  │                                                       │    │
│  │   Before: "Hello    world"                           │    │
│  │   After:  "Hello world"                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 3: Create normalized version for analysis       │    │
│  │                                                       │    │
│  │   const normalizedText = cleanText.toLowerCase()     │    │
│  │     .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')   │    │
│  │     .replace(/\s+/g, ' ')                            │    │
│  │     .trim();                                         │    │
│  │                                                       │    │
│  │   Original:    "Hello, World!"                       │    │
│  │   Normalized:  "hello world"                         │    │
│  │                                                       │    │
│  │   Note: Original text is kept for display            │    │
│  │         Normalized text is used for keyword matching │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 4: ANALYSIS PROCESSING                                  │
│                                                                │
│  Call: filterEngine.analyzeText(normalizedText, isParentMode) │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Filter Engine Processing:                            │    │
│  │                                                       │    │
│  │ 1. Load keyword database (toxicWords.js)             │    │
│  │    ├─ HIGH severity: 50+ points                     │    │
│  │    ├─ MEDIUM severity: 20-30 points                 │    │
│  │    └─ LOW severity: 5-10 points                     │    │
│  │                                                       │    │
│  │ 2. Scan text for keywords                           │    │
│  │    ├─ Check HIGH keywords                           │    │
│  │    ├─ Check MEDIUM keywords                         │    │
│  │    └─ Check LOW keywords                            │    │
│  │                                                       │    │
│  │ 3. Calculate score                                   │    │
│  │    ├─ Sum all keyword points                        │    │
│  │    ├─ Apply Parent Mode multiplier (x1.5)           │    │
│  │    └─ Cap at 100                                    │    │
│  │                                                       │    │
│  │ 4. Determine result                                  │    │
│  │    ├─ score >= 50: "Zararli"                       │    │
│  │    ├─ score >= 20: "Shubhali"                      │    │
│  │    └─ score < 20: "Xavfsiz"                        │    │
│  │                                                       │    │
│  │ Returns:                                             │    │
│  │ {                                                    │    │
│  │   result: "Xavfsiz",                                │    │
│  │   score: 0,                                         │    │
│  │   detectedKeywords: []                              │    │
│  │ }                                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 5: AI EXPLANATION (Optional)                            │
│                                                                │
│  Call: aiService.getAIExplanation(cleanText, result,          │
│                                   detectedKeywords)           │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ IF OpenAI API Key exists:                            │    │
│  │   ├─ Create prompt in Uzbek                         │    │
│  │   ├─ Call OpenAI GPT-3.5 Turbo                      │    │
│  │   └─ Get detailed explanation                       │    │
│  │                                                       │    │
│  │ ELSE:                                                │    │
│  │   └─ Return fallback explanation                    │    │
│  │                                                       │    │
│  │ Returns: explanation (string)                        │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 6: DATABASE STORAGE                                     │
│                                                                │
│  Create document:                                             │
│  const analysis = new Analysis({                              │
│    text: cleanText,              // Original cleaned text     │
│    result: result,               // "Xavfsiz" | "Shubhali"... │
│    score: score,                 // 0-100                     │
│    detectedKeywords: keywords,   // Array                     │
│    explanation: aiExplanation,   // AI or fallback            │
│    details: "...",               // Additional info           │
│    parentMode: isParentMode,     // Boolean                   │
│    timestamp: new Date()         // Current time              │
│  });                                                          │
│                                                                │
│  Save to MongoDB:                                             │
│  await analysis.save();                                       │
│                                                                │
│  Returns: saved document with _id                             │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 7: RESPONSE FORMATTING                                  │
│                                                                │
│  Format response:                                             │
│  res.status(200).json({                                       │
│    success: true,                                             │
│    data: {                                                    │
│      id: analysis._id,                                        │
│      result: analysis.result,                                 │
│      score: analysis.score,                                   │
│      detectedKeywords: analysis.detectedKeywords,             │
│      explanation: analysis.explanation,                       │
│      details: analysis.details,                               │
│      parentMode: analysis.parentMode,                         │
│      timestamp: analysis.timestamp                            │
│    }                                                          │
│  });                                                          │
│                                                                │
│  HTTP 200 OK                                                  │
│  Content-Type: application/json                               │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
                      RESPONSE SENT
```

### 4.2 Text Normalization Examples

| Step | Input | Output | Purpose |
|------|-------|--------|---------|
| Original | `"  Hello,  World!  "` | `"  Hello,  World!  "` | User input |
| Trim | `"  Hello,  World!  "` | `"Hello,  World!"` | Remove leading/trailing spaces |
| Clean spaces | `"Hello,  World!"` | `"Hello, World!"` | Single spaces only |
| Lowercase | `"Hello, World!"` | `"hello, world!"` | Case-insensitive matching |
| Remove punctuation | `"hello, world!"` | `"hello world"` | Clean text for analysis |
| Final | `"hello world"` | `"hello world"` | Ready for keyword matching |

---

## 5. Website Tekshirish - Ma'lumot Qayta Ishlash

### 5.1 Input Reception Flow

```
POST /api/check-website
Body: { url: "https://example.com", parentMode: false }
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ CONTROLLER: websiteController.checkWebsite()                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: INPUT EXTRACTION                                     │
│                                                                │
│  const { url, parentMode } = req.body;                        │
│                                                                │
│  Extracted values:                                            │
│  ├─ url: (any type, needs validation)                        │
│  └─ parentMode: (any type, needs validation)                 │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 2: VALIDATION                                           │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 1: URL Existence                    │    │
│  │                                                       │    │
│  │   if (!url) {                                        │    │
│  │     return 400 Error: "URL kiritilishi shart"       │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   ✓ URL exists                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 2: URL Type                         │    │
│  │                                                       │    │
│  │   if (typeof url !== 'string') {                    │    │
│  │     return 400 Error: "URL string bo'lishi kerak"   │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   ✓ URL is string                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Validation Check 3: Parent Mode Type                 │    │
│  │                                                       │    │
│  │   const isParentMode = Boolean(parentMode);          │    │
│  │                                                       │    │
│  │   ✓ Parent mode converted to boolean                │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 3: URL PARSING & SANITIZATION                          │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 1: Trim and clean URL                           │    │
│  │                                                       │    │
│  │   let cleanURL = url.trim();                         │    │
│  │                                                       │    │
│  │   Before: "  https://example.com  "                  │    │
│  │   After:  "https://example.com"                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 2: Add protocol if missing                      │    │
│  │                                                       │    │
│  │   if (!cleanURL.startsWith('http://') &&            │    │
│  │       !cleanURL.startsWith('https://')) {           │    │
│  │     cleanURL = 'https://' + cleanURL;               │    │
│  │   }                                                  │    │
│  │                                                       │    │
│  │   Before: "example.com"                              │    │
│  │   After:  "https://example.com"                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 3: Parse URL using URL API                      │    │
│  │                                                       │    │
│  │   try {                                              │    │
│  │     const urlObj = new URL(cleanURL);               │    │
│  │                                                       │    │
│  │     Parsed components:                               │    │
│  │     ├─ protocol: "https:"                           │    │
│  │     ├─ hostname: "www.example.com"                  │    │
│  │     ├─ pathname: "/path/to/page"                    │    │
│  │     ├─ search: "?query=value"                       │    │
│  │     └─ hash: "#section"                             │    │
│  │                                                       │    │
│  │   } catch (error) {                                  │    │
│  │     return 400 Error: "Noto'g'ri URL formati"       │    │
│  │   }                                                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Step 4: Extract and normalize domain                 │    │
│  │                                                       │    │
│  │   let domain = urlObj.hostname;                      │    │
│  │                                                       │    │
│  │   // Remove 'www.' prefix                            │    │
│  │   domain = domain.replace(/^www\./i, '');           │    │
│  │                                                       │    │
│  │   // Convert to lowercase                            │    │
│  │   domain = domain.toLowerCase();                     │    │
│  │                                                       │    │
│  │   Before: "WWW.Example.COM"                          │    │
│  │   After:  "example.com"                              │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 4: URL FILTERING                                        │
│                                                                │
│  Call: urlFilter.checkURL(cleanURL, domain, isParentMode)    │
│                                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ URL Filter Processing:                               │    │
│  │                                                       │    │
│  │ 1. Check BLOCKED_DOMAINS list                       │    │
│  │    ├─ Adult content domains                         │    │
│  │    ├─ Gambling domains                              │    │
│  │    ├─ Violence domains                              │    │
│  │    ├─ Malware domains                               │    │
│  │    │                                                 │    │
│  │    IF match found:                                   │    │
│  │      → Return "Bloklangan" + category               │    │
│  │                                                       │    │
│  │ 2. Check URL for suspicious keywords                │    │
│  │    Keywords: adult, xxx, porn, bet, casino, etc.    │    │
│  │    │                                                 │    │
│  │    IF keyword found:                                 │    │
│  │      → Return "Shubhali" + unknown                  │    │
│  │                                                       │    │
│  │ 3. Check SAFE_DOMAINS list                          │    │
│  │    ├─ Educational domains (.edu.uz)                 │    │
│  │    ├─ Government domains (.gov.uz)                  │    │
│  │    ├─ Trusted sites (wikipedia, google, etc.)       │    │
│  │    │                                                 │    │
│  │    IF match found:                                   │    │
│  │      → Return "Xavfsiz" + safe                      │    │
│  │                                                       │    │
│  │ 4. Handle unknown domains                           │    │
│  │    IF Parent Mode ON:                                │    │
│  │      → Return "Shubhali" + unknown                  │    │
│  │    ELSE:                                             │    │
│  │      → Return "Xavfsiz" + unknown                   │    │
│  │                                                       │    │
│  │ Returns:                                             │    │
│  │ {                                                    │    │
│  │   result: "Xavfsiz",                                │    │
│  │   category: "safe",                                 │    │
│  │   categoryName: "Xavfsiz",                          │    │
│  │   reason: "Bu sayt xavfsiz kategoriyada"            │    │
│  │ }                                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 5: DATABASE STORAGE                                     │
│                                                                │
│  Create document:                                             │
│  const websiteCheck = new WebsiteCheck({                      │
│    url: cleanURL,                // Full cleaned URL          │
│    domain: domain,               // Normalized domain         │
│    result: result,               // "Xavfsiz" | "Shubhali"... │
│    category: category,           // "safe" | "adult"...       │
│    categoryName: categoryName,   // Display name              │
│    reason: reason,               // Explanation               │
│    parentMode: isParentMode,     // Boolean                   │
│    timestamp: new Date()         // Current time              │
│  });                                                          │
│                                                                │
│  Save to MongoDB:                                             │
│  await websiteCheck.save();                                   │
│                                                                │
│  Returns: saved document with _id                             │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 6: RESPONSE FORMATTING                                  │
│                                                                │
│  Format response:                                             │
│  res.status(200).json({                                       │
│    success: true,                                             │
│    data: {                                                    │
│      id: websiteCheck._id,                                    │
│      url: websiteCheck.url,                                   │
│      domain: websiteCheck.domain,                             │
│      result: websiteCheck.result,                             │
│      category: websiteCheck.category,                         │
│      categoryName: websiteCheck.categoryName,                 │
│      reason: websiteCheck.reason,                             │
│      parentMode: websiteCheck.parentMode,                     │
│      timestamp: websiteCheck.timestamp                        │
│    }                                                          │
│  });                                                          │
│                                                                │
│  HTTP 200 OK                                                  │
│  Content-Type: application/json                               │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
                      RESPONSE SENT
```

### 5.2 URL Parsing Examples

| Step | Input | Output | Purpose |
|------|-------|--------|---------|
| Original | `"  example.com  "` | `"  example.com  "` | User input |
| Trim | `"  example.com  "` | `"example.com"` | Remove spaces |
| Add protocol | `"example.com"` | `"https://example.com"` | Valid URL |
| Parse | `"https://example.com"` | URL object | Extract components |
| Extract domain | URL object | `"example.com"` | Domain extraction |
| Normalize | `"WWW.Example.COM"` | `"example.com"` | Lowercase, no www |

---

## 6. Validation va Error Handling

### 6.1 Validation Checklist

```
┌──────────────────────────────────────────────────────────────┐
│                    VALIDATION MATRIX                          │
└──────────────────────────────────────────────────────────────┘

TEXT ANALYSIS (/api/analyze)
├─ text field
│  ├─ ✓ Exists (not null/undefined)
│  ├─ ✓ Type is string
│  ├─ ✓ Not empty after trim
│  ├─ ✓ Length <= 10,000 characters
│  └─ ✓ Contains valid UTF-8 characters
│
└─ parentMode field
   ├─ ✓ Optional (defaults to false)
   ├─ ✓ Converted to boolean
   └─ ✓ Accepted values: true, false, 1, 0, "true", "false"

WEBSITE CHECK (/api/check-website)
├─ url field
│  ├─ ✓ Exists (not null/undefined)
│  ├─ ✓ Type is string
│  ├─ ✓ Valid URL format (after adding protocol)
│  ├─ ✓ Has valid hostname
│  └─ ✓ Length <= 2048 characters
│
└─ parentMode field
   ├─ ✓ Optional (defaults to false)
   ├─ ✓ Converted to boolean
   └─ ✓ Accepted values: true, false, 1, 0, "true", "false"

UNIFIED HISTORY (/api/unified-history)
├─ type query param
│  ├─ ✓ Optional (defaults to "all")
│  ├─ ✓ Allowed values: "all", "text", "website"
│  └─ ✓ Case-insensitive
│
├─ page query param
│  ├─ ✓ Optional (defaults to 1)
│  ├─ ✓ Positive integer
│  └─ ✓ >= 1
│
└─ limit query param
   ├─ ✓ Optional (defaults to 20)
   ├─ ✓ Positive integer
   ├─ ✓ >= 1
   └─ ✓ <= 100 (max limit)

DELETE ANALYSIS (/api/analysis/:id)
└─ id URL param
   ├─ ✓ Exists
   ├─ ✓ Valid MongoDB ObjectId format
   └─ ✓ 24 hex characters
```

### 6.2 Error Response Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING FLOW                        │
└──────────────────────────────────────────────────────────────┘

Validation Error
       │
       ▼
┌─────────────────────────────┐
│ Immediate Return            │
│                             │
│ res.status(400).json({      │
│   success: false,           │
│   error: "Error message"    │
│ });                         │
└─────────────────────────────┘

Examples:
  ├─ Missing field:      "Matn kiritilishi shart"
  ├─ Wrong type:         "Matn string bo'lishi kerak"
  ├─ Too long:           "Matn juda uzun (max 10000 belgi)"
  ├─ Empty:              "Bo'sh matn"
  ├─ Invalid URL:        "Noto'g'ri URL formati"
  └─ Invalid ObjectId:   "Noto'g'ri ID formati"


Database Error
       │
       ▼
┌─────────────────────────────┐
│ Caught in try-catch         │
│                             │
│ res.status(500).json({      │
│   success: false,           │
│   error: "Database error"   │
│ });                         │
└─────────────────────────────┘


External API Error (OpenAI)
       │
       ▼
┌─────────────────────────────┐
│ Graceful Fallback           │
│                             │
│ - Log error                 │
│ - Use fallback explanation  │
│ - Continue processing       │
│ - Don't fail request        │
└─────────────────────────────┘


Unhandled Error
       │
       ▼
┌─────────────────────────────┐
│ Global Error Handler        │
│ (middleware/errorHandler)   │
│                             │
│ res.status(500).json({      │
│   success: false,           │
│   error: "Server error"     │
│ });                         │
└─────────────────────────────┘
```

---

## 7. Data Sanitization

### 7.1 Text Sanitization Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                TEXT SANITIZATION PIPELINE                     │
└──────────────────────────────────────────────────────────────┘

Input: "  Hello,  <script>alert('XSS')</script>  World!  "

Step 1: Trim whitespace
  ├─ Remove leading spaces
  ├─ Remove trailing spaces
  └─ Result: "Hello,  <script>alert('XSS')</script>  World!"

Step 2: Normalize whitespace
  ├─ Replace multiple spaces with single space
  ├─ Replace tabs with spaces
  ├─ Replace newlines with spaces
  └─ Result: "Hello, <script>alert('XSS')</script> World!"

Step 3: Remove HTML/Script tags (if needed)
  ├─ Replace /<[^>]*>/g with ''
  └─ Result: "Hello, alert('XSS') World!"

Step 4: Escape special characters (if needed)
  ├─ Replace < with &lt;
  ├─ Replace > with &gt;
  ├─ Replace & with &amp;
  └─ Result: "Hello, alert('XSS') World!" (no changes in this example)

Step 5: Convert to lowercase (for analysis only)
  └─ Result: "hello, alert('xss') world!"

Step 6: Remove punctuation (for analysis only)
  ├─ Replace /[.,\/#!$%\^&\*;:{}=\-_`~()]/g with ' '
  └─ Result: "hello alert xss world"

Step 7: Final normalization
  ├─ Trim again
  ├─ Collapse multiple spaces
  └─ Result: "hello alert xss world"

IMPORTANT NOTES:
- Original text is stored as-is (after basic cleaning)
- Normalized text is used only for keyword matching
- We DON'T remove HTML tags by default (user might legitimately discuss code)
- Parent mode may apply stricter sanitization
```

### 7.2 URL Sanitization Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                 URL SANITIZATION PIPELINE                     │
└──────────────────────────────────────────────────────────────┘

Input: "  WWW.Example.COM/path?query=value#section  "

Step 1: Trim whitespace
  └─ Result: "WWW.Example.COM/path?query=value#section"

Step 2: Add protocol if missing
  └─ Result: "https://WWW.Example.COM/path?query=value#section"

Step 3: Parse URL
  ├─ protocol: "https:"
  ├─ hostname: "WWW.Example.COM"
  ├─ pathname: "/path"
  ├─ search: "?query=value"
  └─ hash: "#section"

Step 4: Normalize hostname
  ├─ Remove 'www.' prefix
  ├─ Convert to lowercase
  ├─ Result: "example.com"

Step 5: Validate domain
  ├─ Check if valid domain format
  ├─ Check if not IP address (optional)
  └─ Check if not localhost

Step 6: Reconstruct clean URL
  └─ Result: "https://example.com/path?query=value#section"

SECURITY CHECKS:
✓ Reject javascript: protocol
✓ Reject file: protocol
✓ Reject data: protocol
✓ Only allow http: and https:
✓ Validate hostname format
✓ Check for path traversal attempts (../)
✓ Limit URL length (max 2048 chars)
```

---

## 8. Response Formatting

### 8.1 Success Response Structure

```javascript
// TEXT ANALYSIS SUCCESS RESPONSE
{
  "success": true,
  "data": {
    "id": "60f7b1c9e4b0a8c8f8e8e8e8",      // MongoDB ObjectId
    "result": "Xavfsiz",                    // Result category
    "score": 0,                             // Safety score (0-100)
    "detectedKeywords": [                   // Found keywords array
      {
        "word": "keyword",
        "severity": "HIGH",
        "points": 50
      }
    ],
    "explanation": "AI explanation...",     // Detailed explanation
    "details": "Additional info...",        // Extra details
    "parentMode": false,                    // Was parent mode enabled
    "timestamp": "2026-03-29T10:30:00Z"     // ISO 8601 timestamp
  }
}

// WEBSITE CHECK SUCCESS RESPONSE
{
  "success": true,
  "data": {
    "id": "60f7b1c9e4b0a8c8f8e8e8e9",
    "url": "https://example.com",
    "domain": "example.com",
    "result": "Xavfsiz",
    "category": "safe",
    "categoryName": "Xavfsiz",
    "reason": "Bu sayt xavfsiz kategoriyada",
    "parentMode": false,
    "timestamp": "2026-03-29T10:35:00Z"
  }
}

// STATISTICS SUCCESS RESPONSE
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
      // ... detailed stats
    }
  }
}
```

### 8.2 Error Response Structure

```javascript
// VALIDATION ERROR (400)
{
  "success": false,
  "error": "Matn kiritilishi shart"
}

// NOT FOUND ERROR (404)
{
  "success": false,
  "error": "Tahlil topilmadi"
}

// RATE LIMIT ERROR (429)
{
  "success": false,
  "error": "Juda ko'p so'rov yuborildi, keyinroq urinib ko'ring"
}

// SERVER ERROR (500)
{
  "success": false,
  "error": "Serverda xatolik yuz berdi"
}

// CORS ERROR (403)
{
  "success": false,
  "error": "CORS not allowed"
}
```

### 8.3 Response Headers

```
Standard Headers (all responses):
  ├─ Content-Type: application/json; charset=utf-8
  ├─ X-Content-Type-Options: nosniff
  ├─ X-Frame-Options: DENY
  ├─ X-XSS-Protection: 1; mode=block
  ├─ Strict-Transport-Security: max-age=31536000
  └─ Access-Control-Allow-Origin: <allowed-origin>

CORS Headers (preflight):
  ├─ Access-Control-Allow-Methods: GET, POST, DELETE
  ├─ Access-Control-Allow-Headers: Content-Type, Authorization
  └─ Access-Control-Max-Age: 86400

Rate Limit Headers:
  ├─ X-RateLimit-Limit: 100
  ├─ X-RateLimit-Remaining: 95
  └─ X-RateLimit-Reset: 1680000000
```

---

## Xulosa

SafeNet Kids tizimida ma'lumotlarni qabul qilish va dastlabki qayta ishlash jarayoni quyidagi bosqichlardan iborat:

1. **Input Reception**: Frontend yoki external client'dan ma'lumot qabul qilish
2. **Middleware Processing**: Security, CORS, Rate Limiting, Body Parsing
3. **Routing**: To'g'ri controller'ga yo'naltirish
4. **Validation**: Ma'lumotlarni tekshirish va validatsiya qilish
5. **Sanitization**: Ma'lumotlarni tozalash va normalizatsiya qilish
6. **Processing**: Asosiy biznes logikani bajarish (tahlil/tekshirish)
7. **Storage**: Ma'lumotlarni MongoDB'ga saqlash
8. **Response**: Formatlangan javob qaytarish

Har bir bosqichda:
- ✅ **Xavfsizlik** ta'minlanadi
- ✅ **Validatsiya** qilinadi
- ✅ **Error handling** mavjud
- ✅ **Logging** amalga oshiriladi
- ✅ **Performance** optimallashtirilgan

Bu jarayon tizimning ishonchliligini, xavfsizligini va to'g'ri ishlashini ta'minlaydi.

---

**© 2026 SafeNet Kids - Ma'lumotlarni Qayta Ishlash Tizimi**
