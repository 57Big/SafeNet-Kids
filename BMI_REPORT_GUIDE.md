# BMI Hisobot uchun Yo'riqnoma

Bu fayl BMI hisobotini tayyorlashda yordam beradi.

## 📊 Loyiha Ma'lumotlari

### Loyiha nomi
**O'zbek tilida:** Bolalar uchun internet xavfsizligini ta'minlashga mo'ljallangan filtrlash axborot tizimi

**Ingliz tilida:** Internet Safety Filtering Information System for Children

### Maqsad
Bolalarni internetdagi zararli kontent, toxic so'zlar va noqulay materiallardan himoya qiluvchi avtomatlashtirilgan filtrlash tizimini yaratish.

### Vazifalar
1. Matnlarni avtomatik tahlil qilish
2. Zararli so'zlar va kontentni aniqlash
3. AI yordamida chuqur tahlil
4. Natijalarni saqlash va statistikani ko'rsatish
5. Foydalanuvchi qulay interfeys yaratish

## 🏗 Tizim Arxitekturasi

### 3-qatlamli arxitektura

```
┌─────────────────────────────────────┐
│     Presentation Layer (Frontend)   │
│         React.js + CSS3             │
└─────────────┬───────────────────────┘
              │ HTTP/REST API
              ▼
┌─────────────────────────────────────┐
│   Application Layer (Backend)       │
│      Node.js + Express.js           │
│                                      │
│  ┌──────────────────────────────┐  │
│  │  Controllers                  │  │
│  │  ├─ analysisController        │  │
│  │  └─ Error Handler             │  │
│  └──────────────────────────────┘  │
│                                      │
│  ┌──────────────────────────────┐  │
│  │  Services                     │  │
│  │  ├─ AI Service (OpenAI)       │  │
│  │  └─ Filter Engine             │  │
│  └──────────────────────────────┘  │
└─────────────┬───────────────────────┘
              │ Mongoose ODM
              ▼
┌─────────────────────────────────────┐
│      Data Layer (MongoDB)           │
│   Collections: analyses             │
└─────────────────────────────────────┘
```

## 🔧 Texnik Xususiyatlar

### Backend Texnologiyalar

| Texnologiya | Versiya | Maqsadi |
|-------------|---------|---------|
| Node.js | 18+ | Server runtime |
| Express.js | 4.18+ | Web framework |
| MongoDB | 5+ | NoSQL ma'lumotlar bazasi |
| Mongoose | 8+ | ODM (Object Data Modeling) |
| Axios | 1.6+ | HTTP client |
| Helmet | 7+ | Xavfsizlik middleware |
| CORS | 2.8+ | Cross-origin requests |
| Morgan | 1.10+ | HTTP logger |
| dotenv | 16+ | Environment variables |

### Frontend Texnologiyalar

| Texnologiya | Versiya | Maqsadi |
|-------------|---------|---------|
| React | 18.2+ | UI library |
| React Router | 6.20+ | Client-side routing |
| Axios | 1.6+ | API calls |
| CSS3 | - | Styling |

## 📸 Screenshots Tavsiflari (Hisobot uchun)

### 1. Bosh sahifa (Home Page)
**Fayl nomi:** `1_home_page.png`

**Tavsif:**
```
Tizimning asosiy sahifasi. Ushbu sahifada:
- Loyiha nomi va logosi
- Navigatsiya paneli (Bosh sahifa, Tahlil qilish, Admin panel)
- Tizim haqida qisqacha ma'lumot
- Asosiy xususiyatlar (3 ta card)
- "Qanday ishlaydi?" bo'limi (3 qadam)
- Asosiy xususiyatlar ro'yxati
```

### 2. Tahlil sahifasi - Bo'sh holat
**Fayl nomi:** `2_analyze_empty.png`

**Tavsif:**
```
Matn tahlili sahifasi. Ko'rinadi:
- Sarlavha "Matn Tahlili"
- Katta textarea matn kiritish uchun
- Belgilar hisoblagich (0/10000)
- "Tahlil qilish" tugmasi (disabled)
- Misol matnlar bo'limi (3 ta tugma)
```

### 3. Xavfsiz matn natijasi
**Fayl nomi:** `3_result_safe.png`

**Tavsif:**
```
Xavfsiz matn tahlil natijasi:
- Yashil rangdagi natija bloki
- ✅ belgisi (checkmark icon)
- "Xavfsiz" sarlavha
- Xavflilik darajasi: 0/100
- AI tushuntirishlari (oq fonda)
- "Bu matn bolalar uchun xavfsiz..." degan matn
```

### 4. Shubhali matn natijasi
**Fayl nomi:** `4_result_suspicious.png`

**Tavsif:**
```
Shubhali matn tahlil natijasi:
- Sariq rangdagi natija bloki
- ⚠️ belgisi (warning icon)
- "Shubhali" sarlavha
- Xavflilik darajasi: 15-29/100
- Topilgan so'zlar badge'lari
- AI tushuntirishlari
```

### 5. Zararli matn natijasi
**Fayl nomi:** `5_result_harmful.png`

**Tavsif:**
```
Zararli matn tahlil natijasi:
- Qizil rangdagi natija bloki
- 🚫 belgisi (prohibited icon)
- "Zararli" sarlavha
- Xavflilik darajasi: 30-100/100
- Topilgan zararli so'zlar ro'yxati
- Batafsil AI tushuntirishlari
- Ota-onalarga tavsiyalar
```

### 6. Loading holati
**Fayl nomi:** `6_loading_state.png`

**Tavsif:**
```
Matn tahlil qilinayotgan paytdagi loading animatsiya:
- Aylanuvchi spinner (spinning loader)
- "Matn tahlil qilinmoqda. Iltimos kuting..." matni
```

### 7. Admin panel - Statistika
**Fayl nomi:** `7_admin_stats.png`

**Tavsif:**
```
Admin panel asosiy ko'rinishi:
- 4 ta statistika card'i (grid layout):
  * Jami tahlillar (umumiy)
  * Xavfsiz (yashil border)
  * Shubhali (sariq border)
  * Zararli (qizil border)
- Har birida katta raqamlar
- "Ko'p uchraydigan zararli so'zlar" bo'limi
```

### 8. Admin panel - Tarix jadvali
**Fayl nomi:** `8_admin_history.png`

**Tavsif:**
```
Tahlillar tarixi jadvali:
- Ustunlar: Sana, Matn, Natija, Ball, Topilgan so'zlar, Amallar
- Har bir qator uchun ma'lumotlar
- Rangli badge'lar (Xavfsiz/Shubhali/Zararli)
- "O'chirish" tugmalari
- Pagination (sahifalash) elementlari
- "Yangilash" tugmasi
```

## 💻 Kod Tushuntirishlari

### 1. Filter Engine (Kalit so'zlar tahlili)

**Fayl:** `backend/src/utils/filterEngine.js`

**Ishlash prinsipi:**
```javascript
1. Matnni kichik harflarga o'girish (normalize)
2. Har bir toxic so'zni qidirish
3. Topilgan so'zlar uchun ball berish:
   - High severity: 30 ball
   - Medium severity: 15 ball
   - Low severity: 5 ball
   - Inappropriate topics: 25 ball
4. Umumiy ballni hisoblash (max 100)
5. Natijani aniqlash:
   - 0 ball = Xavfsiz
   - 1-29 ball = Shubhali
   - 30+ ball = Zararli
```

### 2. AI Service (Sun'iy intellekt tahlili)

**Fayl:** `backend/src/services/aiService.js`

**Ishlash prinsipi:**
```javascript
1. OpenAI API ga so'rov yuborish
2. GPT-3.5-turbo modeli ishlatish
3. Prompt tuzish (matn + topilgan so'zlar)
4. Uzbek tilida javob olish
5. Xatolik bo'lsa fallback javob qaytarish
```

### 3. MongoDB Schema

**Fayl:** `backend/src/models/Analysis.js`

**Ma'lumot strukturasi:**
```javascript
{
  text: String,              // Tahlil qilingan matn
  result: String,            // Xavfsiz|Shubhali|Zararli
  score: Number,             // 0-100
  detectedKeywords: [String], // Topilgan so'zlar
  aiExplanation: String,     // AI tushuntirishlari
  analysisType: String,      // keyword|ai|hybrid
  ipAddress: String,         // Foydalanuvchi IP
  timestamp: Date            // Vaqt
}
```

### 4. REST API Endpoints

```
POST   /api/analyze           - Matnni tahlil qilish
GET    /api/history           - Tahlillar tarixini olish
GET    /api/stats             - Statistikani olish
DELETE /api/analysis/:id      - Tahlilni o'chirish
GET    /health                - Server holatini tekshirish
```

## 📈 Ishlash Diagrammasi

### Matn tahlil qilish jarayoni

```
┌──────────────┐
│ Foydalanuvchi│
│ matn kiritadi│
└───────┬──────┘
        │
        ▼
┌──────────────────┐
│  Frontend (React)│
│  POST /api/analyze│
└───────┬───────────┘
        │
        ▼
┌────────────────────────┐
│  Backend Controller    │
│  1. Input validatsiya  │
└───────┬────────────────┘
        │
        ▼
┌────────────────────────┐
│   Filter Engine        │
│   Kalit so'zlar tahlili│
│   Ball hisoblash       │
└───────┬────────────────┘
        │
        ▼
┌────────────────────────┐
│   AI Service           │
│   OpenAI API so'rovi   │
│   Tushuntirish olish   │
└───────┬────────────────┘
        │
        ▼
┌────────────────────────┐
│   MongoDB              │
│   Natijani saqlash     │
└───────┬────────────────┘
        │
        ▼
┌────────────────────────┐
│   Response             │
│   Natijani qaytarish   │
└───────┬────────────────┘
        │
        ▼
┌────────────────────────┐
│   Frontend             │
│   Natijani ko'rsatish  │
└────────────────────────┘
```

## 🎯 Afzalliklar va Xususiyatlar

### Afzalliklar

1. **Ikki bosqichli tahlil**
   - Kalit so'zlar (tez)
   - AI tahlili (chuqur)

2. **Uzbek tiliga moslashtirilgan**
   - To'liq Uzbek interfeysi
   - Uzbek toxic so'zlar bazasi
   - AI uzbek tilida tushuntiradi

3. **Real-time tahlil**
   - Tez natija (3-5 soniya)
   - Animatsiyali loading

4. **Statistika va tarix**
   - Barcha tahlillar saqlanadi
   - Grafikli statistika
   - Filtrlash va qidiruv

5. **Xavfsizlik**
   - Rate limiting
   - Helmet.js
   - Input validatsiya
   - CORS himoyasi

### Kamchiliklar va Yechimlar

1. **Faqat matn tahlili**
   - Kelajakda: Rasm, video tahlili qo'shish

2. **Internet talab qiladi**
   - Kelajakda: Offline rejim

3. **Faqat Uzbek tili**
   - Kelajakda: Ko'p tillilik

## 📝 Hisobotda Keltirilishi Kerak Bo'lgan Ma'lumotlar

### Kirish bo'limi
- Muammo bayoni (bolalar va internet xavfsizligi)
- Maqsad va vazifalar
- Loyihaning dolzarbligi

### Nazariy qism
- Internet xavfsizligi haqida
- Filtrlash texnologiyalari
- Machine Learning va NLP asoslari
- Mavjud yechimlar tahlili

### Amaliy qism
- Tizim arxitekturasi
- Ishlatiladigan texnologiyalar
- Ma'lumotlar bazasi strukturasi
- Algoritm tavsiflari
- Kod namunalari

### Natijalar
- Screenshots (8 ta)
- Test natijalari
- Performance ko'rsatkichlari
- Foydalanuvchi interfeysi tahlili

### Xulosa
- Erishilgan natijalar
- Loyihaning ahamiyati
- Kelajakdagi rivojlanish yo'nalishlari

## 🔢 Statistik Ma'lumotlar (Misol)

Test natijalari (100 ta matn tahlili):
- Xavfsiz: 65 ta (65%)
- Shubhali: 20 ta (20%)
- Zararli: 15 ta (15%)

O'rtacha tahlil vaqti:
- Kalit so'zlar: 50ms
- AI tahlili: 2-3 sekund
- Umumiy: 3-5 sekund

Tizim samaradorligi:
- Aniqlik (Accuracy): 92%
- False Positive: 5%
- False Negative: 3%

---

**Muvaffaqiyatlar tilaymiz! 🎓**
