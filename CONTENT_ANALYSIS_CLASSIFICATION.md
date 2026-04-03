# Kontentni Tahlil Qilish va Tasniflash Jarayoni

**SafeNet Kids - Content Analysis & Classification Flow**

---

## Mundarija

1. [Umumiy Ko'rinish](#1-umumiy-korinish)
2. [Matn Tahlili Blok-Sxemasi](#2-matn-tahlili-blok-sxemasi)
3. [Website Tasniflash Blok-Sxemasi](#3-website-tasniflash-blok-sxemasi)
4. [Scoring Algoritmi](#4-scoring-algoritmi)
5. [Keyword Database Tuzilishi](#5-keyword-database-tuzilishi)
6. [Tasniflash Darajalari](#6-tasniflash-darajalari)
7. [Parent Mode Ta'siri](#7-parent-mode-tasiri)
8. [AI Integration Flow](#8-ai-integration-flow)

---

## 1. Umumiy Ko'rinish

SafeNet Kids tizimida kontent tahlili ikki asosiy yo'nalishda amalga oshiriladi:

```
┌──────────────────────────────────────────────────────────────┐
│                CONTENT ANALYSIS OVERVIEW                      │
└──────────────────────────────────────────────────────────────┘

                    USER INPUT
                        │
                        ├─────────────────┬─────────────────┐
                        │                 │                 │
                        ▼                 ▼                 ▼
                ┌───────────────┐ ┌──────────────┐ ┌──────────────┐
                │  TEXT CONTENT │ │ URL/WEBSITE  │ │    FILE      │
                │   ANALYSIS    │ │  FILTERING   │ │  (Future)    │
                └───────┬───────┘ └──────┬───────┘ └──────────────┘
                        │                 │
                        │                 │
                ┌───────▼─────────────────▼───────┐
                │    CLASSIFICATION ENGINE         │
                │                                  │
                │  ├─ Keyword Matching             │
                │  ├─ Pattern Recognition          │
                │  ├─ Score Calculation            │
                │  ├─ Category Assignment          │
                │  └─ AI Enhancement (Optional)    │
                └──────────────┬───────────────────┘
                               │
                               ▼
                        RESULT OUTPUT
                        │
                        ├─────────────┬─────────────┬─────────────┐
                        ▼             ▼             ▼             ▼
                   ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
                   │ Xavfsiz │ │ Shubhali │ │ Zararli  │ │Bloklangan│
                   │(Safe)   │ │(Suspicio)│ │(Harmful) │ │(Blocked) │
                   └─────────┘ └──────────┘ └──────────┘ └──────────┘
```

---

## 2. Matn Tahlili Blok-Sxemasi

### 2.1 Asosiy Tahlil Jarayoni

```
                            START
                              │
                              ▼
                    ┌─────────────────┐
                    │ Matn qabul qilish│
                    │ Input: text      │
                    └─────────┬────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Validatsiya      │
                    │ - Mavjudmi?      │
                    │ - String?        │
                    │ - Uzunlik OK?    │
                    └─────────┬────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Valid emas?      │
                    └─────────┬─────────┘
                         YES  │  NO
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌───────────────┐    ┌──────────────┐
            │ Return Error  │    │ Davom etish  │
            │ 400 Bad Req   │    └──────┬───────┘
            └───────────────┘           │
                                        ▼
                              ┌─────────────────┐
                              │ Normalizatsiya   │
                              │ - Lowercase      │
                              │ - Trim spaces    │
                              │ - Remove punct   │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Keyword Database │
                              │ ni yuklash       │
                              │ - HIGH words     │
                              │ - MEDIUM words   │
                              │ - LOW words      │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Keyword Scanning │
                              │ (Detailed below) │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Score Calculation│
                              │ (Detailed below) │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │  Parent Mode?   │
                              └─────────┬────────┘
                                   YES  │  NO
                              ┌─────────┴─────────┐
                              ▼                   ▼
                    ┌──────────────────┐    ┌─────────┐
                    │ Score × 1.5      │    │ Score   │
                    │ (Qattiqroq)      │    │ (Normal)│
                    └──────────┬───────┘    └────┬────┘
                               │                 │
                               └────────┬────────┘
                                        ▼
                              ┌─────────────────┐
                              │ Score > 100?    │
                              └─────────┬────────┘
                                   YES  │  NO
                              ┌─────────┴─────────┐
                              ▼                   ▼
                    ┌──────────────┐      ┌──────────┐
                    │ Score = 100  │      │ Keep     │
                    │ (Cap limit)  │      │ Score    │
                    └──────┬───────┘      └────┬─────┘
                           │                   │
                           └─────────┬─────────┘
                                     ▼
                           ┌─────────────────┐
                           │ Classification  │
                           │ (See 2.2)       │
                           └─────────┬────────┘
                                     │
                                     ▼
                           ┌─────────────────┐
                           │ AI Explanation  │
                           │ (Optional)      │
                           └─────────┬────────┘
                                     │
                                     ▼
                           ┌─────────────────┐
                           │ MongoDB'ga      │
                           │ saqlash         │
                           └─────────┬────────┘
                                     │
                                     ▼
                           ┌─────────────────┐
                           │ Response return │
                           └─────────────────┘
                                     │
                                     ▼
                                   END
```

### 2.2 Classification Decision Tree

```
                        SCORE MAVJUD
                              │
                              ▼
                    ┌─────────────────┐
                    │  Score >= 50?   │
                    └─────────┬────────┘
                         YES  │  NO
                    ┌─────────┴─────────┐
                    ▼                   ▼
          ┌──────────────────┐   ┌──────────────┐
          │  ZARARLI         │   │ Score >= 20? │
          │  (Harmful)       │   └──────┬───────┘
          │                  │      YES │  NO
          │ Attributes:      │   ┌──────┴──────┐
          │ - result: Zararli│   ▼             ▼
          │ - color: red     │ ┌─────────┐ ┌────────┐
          │ - icon: ❌       │ │SHUBHALI │ │XAVFSIZ │
          │ - action: Block  │ │(Suspic.)│ │ (Safe) │
          │                  │ │         │ │        │
          │ Recommendations: │ │Attrib:  │ │Attrib: │
          │ - Darhol nazorat │ │-result: │ │-result:│
          │ - Ota-ona bilan  │ │ Shubh. │ │ Xavfsiz│
          │   suhbat         │ │-color:  │ │-color: │
          │ - Manba tekshir  │ │ yellow │ │ green  │
          └──────────────────┘ │-icon: ⚠│ │-icon:✅│
                               │-action: │ │-action:│
                               │ Monitor │ │ Allow  │
                               │         │ │        │
                               │Recommen:│ │Recommen│
                               │-Kuzatish│ │-Davom  │
                               │-Suhbat  │ │ etish  │
                               └─────────┘ └────────┘
```

### 2.3 Keyword Scanning Algorithm

```
                    START KEYWORD SCAN
                              │
                              ▼
                    ┌─────────────────┐
                    │ Initialize:      │
                    │ score = 0        │
                    │ keywords = []    │
                    └─────────┬────────┘
                              │
                              ▼
                    ┌─────────────────────────┐
                    │ SCAN HIGH SEVERITY      │
                    │ (50+ points each)       │
                    └─────────┬───────────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │ For each HIGH keyword in database:    │
          │                                       │
          │   if (normalizedText.includes(word)) {│
          │     score += keyword.points           │
          │     detectedKeywords.push({           │
          │       word: keyword.word,             │
          │       severity: 'HIGH',               │
          │       points: keyword.points          │
          │     })                                │
          │   }                                   │
          └───────────────────┬───────────────────┘
                              │
                              ▼
                    ┌─────────────────────────┐
                    │ SCAN MEDIUM SEVERITY    │
                    │ (20-30 points each)     │
                    └─────────┬───────────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │ For each MEDIUM keyword in database:  │
          │                                       │
          │   if (normalizedText.includes(word)) {│
          │     score += keyword.points           │
          │     detectedKeywords.push({...})      │
          │   }                                   │
          └───────────────────┬───────────────────┘
                              │
                              ▼
                    ┌─────────────────────────┐
                    │ SCAN LOW SEVERITY       │
                    │ (5-10 points each)      │
                    └─────────┬───────────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │ For each LOW keyword in database:     │
          │                                       │
          │   if (normalizedText.includes(word)) {│
          │     score += keyword.points           │
          │     detectedKeywords.push({...})      │
          │   }                                   │
          └───────────────────┬───────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Return:          │
                    │ - score          │
                    │ - detectedKeywords│
                    └─────────────────┘
                              │
                              ▼
                           END SCAN
```

---

## 3. Website Tasniflash Blok-Sxemasi

### 3.1 URL Filtering Flow

```
                            START
                              │
                              ▼
                    ┌─────────────────┐
                    │ URL qabul qilish │
                    │ Input: url       │
                    └─────────┬────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Validatsiya      │
                    │ - Mavjudmi?      │
                    │ - String?        │
                    │ - Format OK?     │
                    └─────────┬────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Valid emas?      │
                    └─────────┬─────────┘
                         YES  │  NO
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌───────────────┐    ┌──────────────┐
            │ Return Error  │    │ Davom etish  │
            │ 400 Bad Req   │    └──────┬───────┘
            └───────────────┘           │
                                        ▼
                              ┌─────────────────┐
                              │ URL Parsing      │
                              │ - Add protocol   │
                              │ - Extract domain │
                              │ - Normalize      │
                              └─────────┬────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Parse SUCCESS?  │
                              └─────────┬────────┘
                                   YES  │  NO
                              ┌─────────┴─────────┐
                              │                   ▼
                              │         ┌──────────────────┐
                              │         │ Return:          │
                              │         │ - Xavfsiz        │
                              │         │ - category:      │
                              │         │   unknown        │
                              │         └──────────────────┘
                              ▼
                    ┌─────────────────────┐
                    │ CHECK 1:            │
                    │ Blocked Domains DB  │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Domain in         │
                    │ BLOCKED list?     │
                    └─────────┬─────────┘
                         YES  │  NO
                    ┌─────────┴─────────┐
                    ▼                   ▼
          ┌──────────────────┐   ┌──────────────┐
          │ Return:          │   │ CHECK 2:     │
          │ - Bloklangan     │   │ URL Keywords │
          │ - category:      │   └──────┬───────┘
          │   (adult/        │          │
          │    gambling/     │          ▼
          │    violence/     │   ┌──────────────┐
          │    malware)      │   │ Suspicious   │
          │ - reason:        │   │ keyword in   │
          │   "Blocked in    │   │ URL?         │
          │   [category]"    │   └──────┬───────┘
          └──────────────────┘      YES │  NO
                                   ┌────┴────┐
                                   ▼         ▼
                         ┌──────────────┐ ┌────────────┐
                         │ Return:      │ │ CHECK 3:   │
                         │ - Shubhali   │ │ Safe       │
                         │ - category:  │ │ Domains DB │
                         │   unknown    │ └─────┬──────┘
                         │ - reason:    │       │
                         │   "Suspicious│       ▼
                         │   keyword"   │ ┌────────────┐
                         └──────────────┘ │ Domain in  │
                                          │ SAFE list? │
                                          └─────┬──────┘
                                           YES  │  NO
                                      ┌─────────┴──────┐
                                      ▼                ▼
                            ┌──────────────┐  ┌──────────────┐
                            │ Return:      │  │ CHECK 4:     │
                            │ - Xavfsiz    │  │ Parent Mode? │
                            │ - category:  │  └──────┬───────┘
                            │   safe       │     YES │  NO
                            │ - reason:    │  ┌──────┴──────┐
                            │   "Safe site"│  ▼             ▼
                            └──────────────┘ ┌────────┐ ┌────────┐
                                             │Return: │ │Return: │
                                             │Shubhali│ │Xavfsiz │
                                             │unknown │ │unknown │
                                             └────────┘ └────────┘
                                                   │       │
                                                   └───┬───┘
                                                       ▼
                                              ┌────────────────┐
                                              │ MongoDB'ga     │
                                              │ saqlash        │
                                              └────────┬───────┘
                                                       ▼
                                              ┌────────────────┐
                                              │ Response return│
                                              └────────────────┘
                                                       │
                                                       ▼
                                                     END
```

### 3.2 Domain Category Classification

```
                    DOMAIN TASNIFLASH
                            │
                            ▼
              ┌─────────────────────────┐
              │ Domain: example.com     │
              └─────────────┬───────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   ADULT      │ │   GAMBLING   │ │  VIOLENCE    │
    │   CONTENT    │ │              │ │              │
    ├──────────────┤ ├──────────────┤ ├──────────────┤
    │ Keywords:    │ │ Keywords:    │ │ Keywords:    │
    │ - porn       │ │ - casino     │ │ - weapon     │
    │ - xxx        │ │ - bet        │ │ - gore       │
    │ - sex        │ │ - gamble     │ │ - fight      │
    │ - adult      │ │ - poker      │ │ - war        │
    │              │ │              │ │              │
    │ Domains:     │ │ Domains:     │ │ Domains:     │
    │ - *.xxx      │ │ - bet365     │ │ - explicit   │
    │ - *.porn     │ │ - 1xbet      │ │   violence   │
    │ - explicit   │ │ - casino     │ │   sites      │
    │   sites      │ │   sites      │ │              │
    │              │ │              │ │              │
    │ Action:      │ │ Action:      │ │ Action:      │
    │ BLOKLANGAN   │ │ BLOKLANGAN   │ │ BLOKLANGAN   │
    └──────────────┘ └──────────────┘ └──────────────┘
            │               │               │
            └───────────────┼───────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   MALWARE    │ │     SAFE     │ │   UNKNOWN    │
    │              │ │              │ │              │
    ├──────────────┤ ├──────────────┤ ├──────────────┤
    │ Keywords:    │ │ Domains:     │ │ No match in  │
    │ - phishing   │ │ - .edu.uz    │ │ any category │
    │ - scam       │ │ - .gov.uz    │ │              │
    │ - virus      │ │ - wikipedia  │ │ If Parent:   │
    │ - malware    │ │ - google     │ │  SHUBHALI    │
    │              │ │ - youtube    │ │              │
    │ Indicators:  │ │              │ │ If Normal:   │
    │ - suspicious │ │ Categories:  │ │  XAVFSIZ     │
    │   TLD        │ │ - Education  │ │              │
    │ - typosquatt │ │ - Government │ │              │
    │              │ │ - Reference  │ │              │
    │ Action:      │ │              │ │              │
    │ BLOKLANGAN   │ │ Action:      │ │              │
    │              │ │ XAVFSIZ      │ │              │
    └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 4. Scoring Algoritmi

### 4.1 Point Calculation System

```
┌──────────────────────────────────────────────────────────────┐
│                  SCORING CALCULATION FLOW                     │
└──────────────────────────────────────────────────────────────┘

    START with score = 0
          │
          ▼
    ┌─────────────────────────────────┐
    │ HIGH SEVERITY KEYWORDS          │
    │ Points per keyword: 50-70       │
    ├─────────────────────────────────┤
    │ Example keywords:               │
    │ - pornography      → 70 points  │
    │ - violence         → 60 points  │
    │ - drugs           → 65 points  │
    │ - explicit        → 50 points  │
    │                                 │
    │ Found: 1 HIGH keyword           │
    │ Score: 0 + 70 = 70             │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ MEDIUM SEVERITY KEYWORDS        │
    │ Points per keyword: 20-30       │
    ├─────────────────────────────────┤
    │ Example keywords:               │
    │ - profanity       → 30 points  │
    │ - hate           → 25 points  │
    │ - discrimination → 25 points  │
    │ - threat         → 20 points  │
    │                                 │
    │ Found: 2 MEDIUM keywords        │
    │ Score: 70 + 30 + 25 = 125      │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ LOW SEVERITY KEYWORDS           │
    │ Points per keyword: 5-10        │
    ├─────────────────────────────────┤
    │ Example keywords:               │
    │ - mild profanity  → 10 points  │
    │ - slang          → 5 points   │
    │ - questionable   → 7 points   │
    │                                 │
    │ Found: 1 LOW keyword            │
    │ Score: 125 + 10 = 135          │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ PARENT MODE CHECK               │
    └─────────────┬───────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
    [YES/ON]          [NO/OFF]
         │                 │
         ▼                 ▼
    ┌─────────┐      ┌─────────┐
    │ Score × │      │ Score   │
    │  1.5    │      │ remains │
    │         │      │ same    │
    │ 135×1.5 │      │ 135     │
    │ = 202.5 │      │         │
    └────┬────┘      └────┬────┘
         │                │
         └────────┬───────┘
                  ▼
    ┌─────────────────────────────────┐
    │ FLOOR & CAP                     │
    │                                 │
    │ score = Math.floor(score)       │
    │ if (score > 100) score = 100    │
    │                                 │
    │ Result: min(202, 100) = 100     │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ FINAL SCORE: 100                │
    └─────────────────────────────────┘
```

### 4.2 Scoring Examples

```
SCENARIO 1: Clean Text
  Input: "Hello, how are you?"
  ├─ HIGH keywords found: 0 → 0 points
  ├─ MEDIUM keywords found: 0 → 0 points
  ├─ LOW keywords found: 0 → 0 points
  ├─ Base score: 0
  ├─ Parent mode: OFF
  └─ Final score: 0 → XAVFSIZ

SCENARIO 2: Mild Profanity
  Input: "This is stupid and annoying"
  ├─ HIGH keywords found: 0 → 0 points
  ├─ MEDIUM keywords found: 0 → 0 points
  ├─ LOW keywords found: 2 → 15 points
  ├─ Base score: 15
  ├─ Parent mode: OFF
  └─ Final score: 15 → XAVFSIZ

SCENARIO 3: Mild Profanity + Parent Mode
  Input: "This is stupid and annoying"
  ├─ HIGH keywords found: 0 → 0 points
  ├─ MEDIUM keywords found: 0 → 0 points
  ├─ LOW keywords found: 2 → 15 points
  ├─ Base score: 15
  ├─ Parent mode: ON → 15 × 1.5 = 22.5
  └─ Final score: 22 → SHUBHALI

SCENARIO 4: Moderate Issue
  Input: "I hate this person, they are stupid"
  ├─ HIGH keywords found: 0 → 0 points
  ├─ MEDIUM keywords found: 1 → 25 points (hate)
  ├─ LOW keywords found: 1 → 10 points (stupid)
  ├─ Base score: 35
  ├─ Parent mode: OFF
  └─ Final score: 35 → SHUBHALI

SCENARIO 5: Severe Content
  Input: "Explicit violent pornography content"
  ├─ HIGH keywords found: 3 → 180 points
  │   - pornography: 70 pts
  │   - violent: 60 pts
  │   - explicit: 50 pts
  ├─ MEDIUM keywords found: 0 → 0 points
  ├─ LOW keywords found: 0 → 0 points
  ├─ Base score: 180
  ├─ Parent mode: OFF
  ├─ Capped at: 100
  └─ Final score: 100 → ZARARLI

SCENARIO 6: Multiple Medium + Parent
  Input: "Hate speech with discrimination and threats"
  ├─ HIGH keywords found: 0 → 0 points
  ├─ MEDIUM keywords found: 3 → 75 points
  │   - hate: 25 pts
  │   - discrimination: 25 pts
  │   - threat: 25 pts
  ├─ LOW keywords found: 0 → 0 points
  ├─ Base score: 75
  ├─ Parent mode: ON → 75 × 1.5 = 112.5
  ├─ Capped at: 100
  └─ Final score: 100 → ZARARLI
```

---

## 5. Keyword Database Tuzilishi

### 5.1 Database Schema

```javascript
// toxicWords.js

const TOXIC_WORDS = {

  // HIGH SEVERITY (50-70 points)
  // Critical keywords that immediately flag content as harmful
  HIGH: [
    {
      word: 'pornography',
      points: 70,
      category: 'adult',
      language: 'en'
    },
    {
      word: 'porn',
      points: 70,
      category: 'adult',
      language: 'en'
    },
    {
      word: 'xxx',
      points: 70,
      category: 'adult',
      language: 'en'
    },
    {
      word: 'violence',
      points: 60,
      category: 'violence',
      language: 'en'
    },
    {
      word: 'drugs',
      points: 65,
      category: 'drugs',
      language: 'en'
    },
    {
      word: 'weapon',
      points: 60,
      category: 'violence',
      language: 'en'
    },
    {
      word: 'suicide',
      points: 70,
      category: 'self-harm',
      language: 'en'
    },
    // Uzbek equivalents
    {
      word: 'zo\'ravonlik',
      points: 60,
      category: 'violence',
      language: 'uz'
    }
    // ... more HIGH keywords
  ],

  // MEDIUM SEVERITY (20-30 points)
  // Concerning keywords that indicate suspicious content
  MEDIUM: [
    {
      word: 'hate',
      points: 25,
      category: 'hate-speech',
      language: 'en'
    },
    {
      word: 'discrimination',
      points: 25,
      category: 'hate-speech',
      language: 'en'
    },
    {
      word: 'threat',
      points: 25,
      category: 'violence',
      language: 'en'
    },
    {
      word: 'bully',
      points: 20,
      category: 'bullying',
      language: 'en'
    },
    {
      word: 'abuse',
      points: 30,
      category: 'abuse',
      language: 'en'
    },
    // Uzbek equivalents
    {
      word: 'nafrat',
      points: 25,
      category: 'hate-speech',
      language: 'uz'
    }
    // ... more MEDIUM keywords
  ],

  // LOW SEVERITY (5-10 points)
  // Mild keywords that may indicate inappropriate content
  LOW: [
    {
      word: 'stupid',
      points: 10,
      category: 'profanity',
      language: 'en'
    },
    {
      word: 'idiot',
      points: 10,
      category: 'profanity',
      language: 'en'
    },
    {
      word: 'annoying',
      points: 5,
      category: 'mild',
      language: 'en'
    },
    {
      word: 'dumb',
      points: 8,
      category: 'profanity',
      language: 'en'
    },
    // Uzbek equivalents
    {
      word: 'ahmoq',
      points: 10,
      category: 'profanity',
      language: 'uz'
    }
    // ... more LOW keywords
  ]
};
```

### 5.2 Keyword Category Distribution

```
┌──────────────────────────────────────────────────────────────┐
│              KEYWORD CATEGORIES & DISTRIBUTION                │
└──────────────────────────────────────────────────────────────┘

CATEGORY: ADULT CONTENT
├─ Total keywords: 150+
├─ Severity distribution:
│  ├─ HIGH: 80%  (120 keywords)
│  ├─ MEDIUM: 15% (23 keywords)
│  └─ LOW: 5%   (7 keywords)
└─ Example keywords: porn, xxx, adult, explicit, sexual

CATEGORY: VIOLENCE
├─ Total keywords: 100+
├─ Severity distribution:
│  ├─ HIGH: 60%  (60 keywords)
│  ├─ MEDIUM: 30% (30 keywords)
│  └─ LOW: 10%   (10 keywords)
└─ Example keywords: weapon, gore, kill, fight, attack

CATEGORY: DRUGS
├─ Total keywords: 80+
├─ Severity distribution:
│  ├─ HIGH: 70%  (56 keywords)
│  ├─ MEDIUM: 25% (20 keywords)
│  └─ LOW: 5%   (4 keywords)
└─ Example keywords: cocaine, marijuana, heroin, meth

CATEGORY: HATE SPEECH
├─ Total keywords: 90+
├─ Severity distribution:
│  ├─ HIGH: 40%  (36 keywords)
│  ├─ MEDIUM: 50% (45 keywords)
│  └─ LOW: 10%   (9 keywords)
└─ Example keywords: hate, discrimination, racism, slur

CATEGORY: GAMBLING
├─ Total keywords: 60+
├─ Severity distribution:
│  ├─ HIGH: 50%  (30 keywords)
│  ├─ MEDIUM: 40% (24 keywords)
│  └─ LOW: 10%   (6 keywords)
└─ Example keywords: casino, bet, poker, gamble

CATEGORY: PROFANITY (MILD)
├─ Total keywords: 70+
├─ Severity distribution:
│  ├─ HIGH: 0%   (0 keywords)
│  ├─ MEDIUM: 30% (21 keywords)
│  └─ LOW: 70%   (49 keywords)
└─ Example keywords: stupid, idiot, dumb, annoying

TOTAL DATABASE:
├─ Total unique keywords: 500+
├─ Languages supported: 2 (English, Uzbek)
└─ Regular updates: Monthly additions
```

---

## 6. Tasniflash Darajalari

### 6.1 Classification Levels

```
┌──────────────────────────────────────────────────────────────┐
│                  CLASSIFICATION HIERARCHY                     │
└──────────────────────────────────────────────────────────────┘

LEVEL 1: XAVFSIZ (SAFE)
├─ Score Range: 0-19
├─ Color Code: Green (RGB: 34, 197, 94)
├─ Icon: ✅
├─ Status: Cleared
├─ Action: Allow
├─ Description:
│  - No harmful keywords detected
│  - Safe for children
│  - No parental intervention needed
├─ Examples:
│  ├─ "Hello, how are you today?"
│  ├─ "I love learning new things"
│  └─ "Can you help me with homework?"
└─ Recommendation:
   └─ Continue normal usage

LEVEL 2: SHUBHALI (SUSPICIOUS)
├─ Score Range: 20-49
├─ Color Code: Yellow (RGB: 234, 179, 8)
├─ Icon: ⚠️
├─ Status: Warning
├─ Action: Monitor
├─ Description:
│  - Some concerning keywords detected
│  - May contain inappropriate content
│  - Requires monitoring
├─ Examples:
│  ├─ "I hate this stupid game"
│  ├─ "That person is really annoying"
│  └─ "This is discrimination against us"
├─ Recommendation:
│  ├─ Monitor child's activity
│  ├─ Have conversation about content
│  └─ Consider enabling Parent Mode

LEVEL 3: ZARARLI (HARMFUL)
├─ Score Range: 50-100
├─ Color Code: Red (RGB: 239, 68, 68)
├─ Icon: ❌
├─ Status: Blocked
├─ Action: Block & Alert
├─ Description:
│  - Harmful keywords detected
│  - Definitely inappropriate for children
│  - Immediate action required
├─ Examples:
│  ├─ Content with explicit violence
│  ├─ Pornographic material
│  └─ Drug-related content
└─ Recommendation:
   ├─ Immediately block access
   ├─ Alert parents
   ├─ Investigate source
   └─ Have serious conversation

LEVEL 4: BLOKLANGAN (BLOCKED) - Website Only
├─ Score Range: N/A (Domain-based)
├─ Color Code: Dark Red (RGB: 185, 28, 28)
├─ Icon: 🚫
├─ Status: Permanently Blocked
├─ Action: Block
├─ Description:
│  - Domain in blocked list
│  - Known harmful website
│  - Cannot be accessed
├─ Categories:
│  ├─ Adult content sites
│  ├─ Gambling sites
│  ├─ Violence/gore sites
│  └─ Malware/phishing sites
└─ Recommendation:
   └─ Access permanently denied
```

### 6.2 Classification Decision Matrix

```
┌─────────────────────────────────────────────────────────────┐
│           CLASSIFICATION DECISION MATRIX                     │
└─────────────────────────────────────────────────────────────┘

┌─────────┬──────────┬────────────┬──────────┬───────────────┐
│  Score  │  Normal  │   Parent   │  Result  │    Action     │
│  Range  │   Mode   │    Mode    │          │               │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│  0-10   │ Xavfsiz  │  Xavfsiz   │ Safe     │ Allow         │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│ 11-19   │ Xavfsiz  │  Xavfsiz   │ Safe     │ Allow         │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│ 20-29   │ Shubhali │  Shubhali  │Suspicious│ Monitor       │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│ 30-49   │ Shubhali │  Shubhali  │Suspicious│ Monitor       │
│         │          │ (Stricter) │          │ (Closer)      │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│ 50-69   │ Zararli  │  Zararli   │ Harmful  │ Block & Alert │
├─────────┼──────────┼────────────┼──────────┼───────────────┤
│ 70-100  │ Zararli  │  Zararli   │ Harmful  │ Block & Alert │
│         │          │ (Critical) │          │ (Immediate)   │
└─────────┴──────────┴────────────┴──────────┴───────────────┘

PARENT MODE EFFECT:
- Multiplies score by 1.5
- Lowers tolerance threshold
- Makes borderline cases more strict
- Unknown websites → Suspicious (instead of Safe)

Example Transitions:
  Base Score 15 → Normal: Xavfsiz, Parent: Xavfsiz (15×1.5=22→Shubhali)
  Base Score 35 → Normal: Shubhali, Parent: Shubhali (35×1.5=52→Zararli)
```

---

## 7. Parent Mode Ta'siri

### 7.1 Parent Mode Comparison

```
┌──────────────────────────────────────────────────────────────┐
│              PARENT MODE vs NORMAL MODE                       │
└──────────────────────────────────────────────────────────────┘

TEXT ANALYSIS:

┌──────────────────────────────┬────────────────────────────────┐
│       NORMAL MODE            │        PARENT MODE             │
├──────────────────────────────┼────────────────────────────────┤
│ Score multiplier: ×1         │ Score multiplier: ×1.5         │
│ Threshold: 20/50             │ Threshold: 13/33 (effective)   │
│ Tolerance: Standard          │ Tolerance: Strict              │
│                              │                                │
│ Example:                     │ Example:                       │
│ 2 LOW keywords (15 pts)      │ 2 LOW keywords (15 pts)        │
│ → Score: 15                  │ → Score: 15 × 1.5 = 22        │
│ → Result: XAVFSIZ            │ → Result: SHUBHALI             │
│                              │                                │
│ 1 MEDIUM keyword (30 pts)    │ 1 MEDIUM keyword (30 pts)      │
│ → Score: 30                  │ → Score: 30 × 1.5 = 45        │
│ → Result: SHUBHALI           │ → Result: SHUBHALI (closer     │
│                              │    to ZARARLI)                 │
└──────────────────────────────┴────────────────────────────────┘

WEBSITE FILTERING:

┌──────────────────────────────┬────────────────────────────────┐
│       NORMAL MODE            │        PARENT MODE             │
├──────────────────────────────┼────────────────────────────────┤
│ Unknown domains: XAVFSIZ     │ Unknown domains: SHUBHALI      │
│ Only blocks known bad sites  │ Blocks unknown + bad sites     │
│ Whitelist approach           │ Blacklist approach             │
│                              │                                │
│ Example:                     │ Example:                       │
│ newwebsite.com (unknown)     │ newwebsite.com (unknown)       │
│ → Result: XAVFSIZ            │ → Result: SHUBHALI             │
│ → Reason: "No info"          │ → Reason: "Unknown, be         │
│                              │    cautious"                   │
│                              │                                │
│ Safe domains list:           │ Safe domains list:             │
│ edu.uz, gov.uz, wikipedia    │ Same, but stricter checking    │
│ → Result: XAVFSIZ            │ → Result: XAVFSIZ              │
└──────────────────────────────┴────────────────────────────────┘
```

### 7.2 Parent Mode Flow Diagram

```
                PARENT MODE ACTIVATED
                        │
                        ▼
            ┌───────────────────────┐
            │  TEXT ANALYSIS PATH   │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Calculate base score  │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Multiply score × 1.5  │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Floor result          │
            │ min(result, 100)      │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ More likely to be     │
            │ classified as:        │
            │ - Shubhali (if 13-33) │
            │ - Zararli (if > 33)   │
            └───────────────────────┘

                PARENT MODE ACTIVATED
                        │
                        ▼
            ┌───────────────────────┐
            │  WEBSITE CHECK PATH   │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Check blocked domains │
            │ (same as normal)      │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Check safe domains    │
            │ (same as normal)      │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ IF UNKNOWN DOMAIN:    │
            │ → Return SHUBHALI     │
            │   (instead of Xavfsiz)│
            └───────────────────────┘
```

---

## 8. AI Integration Flow

### 8.1 AI Explanation Process

```
                    TEXT ANALYZED
                    (with result)
                         │
                         ▼
              ┌──────────────────────┐
              │ Need AI Explanation? │
              └──────────┬───────────┘
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
          [YES - Always]    [NO - Skip]
                │                 │
                │                 └──→ Use fallback
                ▼
      ┌──────────────────────┐
      │ Check OpenAI API Key │
      └──────────┬───────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    [EXISTS]         [NOT EXISTS]
        │                 │
        │                 └──→ Fallback explanation
        ▼
┌──────────────────────┐
│ Prepare AI Prompt    │
├──────────────────────┤
│ System Message:      │
│ "You are a child     │
│ safety expert"       │
│                      │
│ User Message:        │
│ - Text content       │
│ - Analysis result    │
│ - Detected keywords  │
│ - Parent context     │
│                      │
│ Request:             │
│ "Explain in Uzbek    │
│ why this content is  │
│ [result] and give    │
│ recommendations"     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Call OpenAI API      │
│ Model: GPT-3.5-Turbo │
│ Timeout: 10 seconds  │
│ Max tokens: 500      │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
[SUCCESS]     [ERROR/TIMEOUT]
    │             │
    │             └──→ Fallback explanation
    ▼
┌──────────────────────┐
│ Extract AI Response  │
│ - Parse JSON         │
│ - Get message content│
│ - Validate output    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Format Explanation   │
│ - Add context        │
│ - Add recommendations│
│ - Ensure clarity     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Return to Controller │
│ Include in response  │
└──────────────────────┘
           │
           ▼
        END
```

### 8.2 AI Prompt Template

```
SYSTEM PROMPT:
─────────────
Siz bolalar uchun internet xavfsizligi bo'yicha mutaxassis
sun'iy intellektsiz. Vazifangiz - ota-onalarga bolalarining
internet faoliyatini tushunishda yordam berish va maslahatlar berish.

Javoblaringiz quyidagi talablarga javob berishi kerak:
1. O'zbek tilida sodda va tushunarli
2. Ota-onalar uchun mo'ljallangan
3. Aniq va amaliy maslahatlar
4. Ijobiy yondashuv (qo'rqitmasdan tushuntirish)
5. Harakatga undovchi tavsiyalar

USER PROMPT TEMPLATE:
────────────────────
Quyidagi matn tahlil qilindi:

MATN: "{text}"

TAHLIL NATIJASI: "{result}"
(Xavfsiz / Shubhali / Zararli)

TOPILGAN KALIT SO'ZLAR:
{detectedKeywords.map(k => `- ${k.word} (${k.severity}, ${k.points} ball)`)}

JAMI BALL: {score}/100

OTA-ONA NAZORATI REJIMI: {parentMode ? "Yoqilgan" : "O'chirilgan"}

VAZIFA:
1. Ushbu natijani ota-onalar uchun oddiy tilda tushuntiring
2. Nima uchun bu matn "{result}" deb belgilanganini ayting
3. Ota-onalar qanday harakat qilishi kerakligi haqida 3-5 ta
   aniq tavsiya bering
4. Bolalar bilan qanday suhbatlashish kerakligi haqida maslahat bering

Javobingiz qisqa va aniq bo'lsin (maksimum 500 so'z).

RESPONSE FORMAT:
───────────────
**Tahlil:**
[Natijani tushuntirish]

**Nima uchun {result}?**
[Sabablari]

**Tavsiyalar:**
1. [Birinchi tavsiya]
2. [Ikkinchi tavsiya]
3. [Uchinchi tavsiya]
...

**Bolalar bilan suhbat:**
[Suhbat bo'yicha maslahat]
```

### 8.3 Fallback Explanation System

```
┌──────────────────────────────────────────────────────────────┐
│               FALLBACK EXPLANATION LOGIC                      │
└──────────────────────────────────────────────────────────────┘

IF result === "Xavfsiz":
  ├─ Base message:
  │  "Ushbu matn xavfsiz deb topildi. Hech qanday zararli
  │   kontent aniqlanmadi."
  │
  ├─ IF score === 0:
  │  └─ Add: "Matn to'liq toza va bolalar uchun mos."
  │
  ├─ IF score > 0 but < 20:
  │  └─ Add: "Matnda {score} ball to'plandi, lekin bu xavfsiz
  │     chegarada. Ba'zi bir so'zlar shubhali bo'lishi mumkin,
  │     lekin umumiy kontent xavfsiz."
  │
  └─ Recommendations:
     ├─ "Davom eting - kontent xavfsiz"
     ├─ "Muntazam monitoring amalga oshiring"
     └─ "Bolangiz bilan ochiq muloqotni davom ettiring"

IF result === "Shubhali":
  ├─ Base message:
  │  "Ushbu matnda {detectedKeywords.length} ta shubhali kalit
  │   so'z topildi. Jami ball: {score}/100"
  │
  ├─ List detected keywords:
  │  └─ For each keyword: "- {word} ({severity})"
  │
  ├─ Context:
  │  └─ "Bu kontent bolalar uchun to'liq mos bo'lmasligi mumkin."
  │
  └─ Recommendations:
     ├─ "Bolangiz bilan suhbatlashib, qanday kontentlar bilan
     │   uchrashayotganini bilib oling"
     ├─ "Kontentni batafsil ko'rib chiqing"
     ├─ "Kerak bo'lsa, Ota-ona nazorati rejimini yoqing"
     ├─ "Bolaga xavfsiz alternativalarni ko'rsating"
     └─ "Internetdan foydalanish qoidalarini birga tuzing"

IF result === "Zararli":
  ├─ Base message:
  │  "⚠️ DIQQAT: Ushbu matnda {detectedKeywords.length} ta
  │   zararli kalit so'z topildi. Jami ball: {score}/100"
  │
  ├─ Severity breakdown:
  │  ├─ HIGH keywords: {highCount} ta
  │  ├─ MEDIUM keywords: {mediumCount} ta
  │  └─ LOW keywords: {lowCount} ta
  │
  ├─ Warning:
  │  └─ "Bu kontent bolalar uchun mutlaqo mos emas va zararlidir."
  │
  └─ URGENT Recommendations:
     ├─ "🚨 Darhol bolangiz faoliyatini nazorat qiling"
     ├─ "Ushbu kontent manbasini aniqlang va bloklang"
     ├─ "Bola bilan jiddiy suhbat o'tkazing"
     ├─ "Internetdan foydalanishni vaqtinchalik cheklang"
     ├─ "Barcha qurilmalarda xavfsizlik sozlamalarini tekshiring"
     ├─ "Kerak bo'lsa, mutaxassis yordamiga murojaat qiling"
     └─ "Kelajakda shunday holatlar takrorlanmasligi uchun
         choralar ko'ring"
```

---

## Xulosa

SafeNet Kids tizimining kontent tahlili va tasniflash jarayoni quyidagi asosiy komponentlardan iborat:

### Asosiy Xususiyatlar:

1. **Ikki Yo'nalish**: Matn tahlili va Website tekshirish
2. **Uch Darajali Tasniflash**: Xavfsiz, Shubhali, Zararli
3. **500+ Keyword Database**: 3 ta severity darajalari bilan
4. **Scoring System**: 0-100 ball oralig'ida
5. **Parent Mode**: 1.5x qattiqroq filtrlash
6. **AI Enhancement**: OpenAI GPT-3.5 integratsiyasi
7. **Fallback System**: AI mavjud bo'lmasa ham ishlaydi

### Texnik Xususiyatlar:

- ✅ Real-time tahlil
- ✅ Multi-language support (English, Uzbek)
- ✅ Contextual understanding
- ✅ Detailed reporting
- ✅ Actionable recommendations
- ✅ Database logging
- ✅ API-based architecture

### Natija:

Tizim bolalarni internetdagi zararli kontentlardan himoya qilish uchun zamonaviy texnologiyalar va sun'iy intellektdan foydalangan holda ishonchli va aniq tahlil va tasniflash imkoniyatlarini taqdim etadi.

---

**© 2026 SafeNet Kids - Kontent Tahlili va Tasniflash Tizimi**
