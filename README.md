# 🛡️ SafeNet Kids

**Bolalar uchun Internet Xavfsizligi Tizimi**

SafeNet Kids - bu bolalarni internetdagi zararli kontent va xavfli saytlardan himoya qilish uchun mo'ljallangan zamonaviy veb-ilova. Tizim sun'iy intellekt (OpenAI GPT-3.5) va kalit so'zlar bazasi yordamida matnlar va veb-saytlarni real vaqtda tahlil qiladi.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

---

## 📋 Mundarija

- [Loyiha haqida](#-loyiha-haqida)
- [Asosiy imkoniyatlar](#-asosiy-imkoniyatlar)
- [Texnologiyalar](#-texnologiyalar)
- [Tizim arxitekturasi](#-tizim-arxitekturasi)
- [O'rnatish va sozlash](#-ornatish-va-sozlash)
- [Foydalanish](#-foydalanish)
- [API hujjatlari](#-api-hujjatlari)
- [Loyihaning tuzilishi](#-loyihaning-tuzilishi)
- [Screenshotlar](#-screenshotlar)
- [Muallif](#-muallif)
- [Litsenziya](#-litsenziya)

---

## 🎯 Loyiha haqida

SafeNet Kids loyihasi **BMI (Bitirruv malakaviy ishi)** doirasida ishlab chiqilgan. Loyihaning asosiy maqsadi - ota-onalarga bolalarining internetdagi faoliyatini nazorat qilish va ularni zararli kontentdan himoya qilishda yordam berish.

### Muammo

Zamonaviy dunyoda bolalar internetdan keng foydalanadilar, ammo ularga zararli kontent (zo'ravonlik, pornografiya, qimor o'yinlari va boshqalar) osonlik bilan yetib boradi. Ota-onalar doimo bolalarining onlayn faoliyatini nazorat qila olmaydilar.

### Yechim

SafeNet Kids tizimi quyidagilarni taqdim etadi:
- **Matn tahlili**: SMS, xabar, komment yoki postlardagi zararli so'zlarni aniqlash
- **Sayt filtri**: Veb-saytlarni xavfsizlik darajasiga qarab tekshirish va bloklash
- **AI tahlili**: OpenAI GPT-3.5 yordamida chuqur tahlil va tushuntirish
- **Ota-ona nazorati**: Qattiqroq filtrlash uchun maxsus rejim
- **Admin panel**: Barcha tekshiruvlar tarixi va statistikasi

---

## ✨ Asosiy imkoniyatlar

### 1. 📝 Matn Tahlili

- 500+ kalit so'zlar bazasi (o'zbek va ingliz tillarida)
- Uch darajali xavflilik baholash (yuqori, o'rta, past)
- Scoring tizimi (0-100 ball)
- AI bilan chuqur tahlil va tushuntirish
- Parent mode: 1.5x qattiqroq filtrlash

**Ishlash mexanizmi:**
1. Foydalanuvchi matnni kiritadi
2. Tizim kalit so'zlarni tekshiradi va ball hisoblaydi
3. OpenAI GPT-3.5 orqali AI tahlil qilinadi
4. Natija 3 toifada ko'rsatiladi: Xavfsiz (yashil), Shubhali (sariq), Zararli (qizil)

### 2. 🌐 Sayt Filtri

- Bloklangan domenlar bazasi
- Shubhali URL kalitlarini aniqlash
- 6 ta kategoriya: adult, gambling, violence, malware, safe, unknown
- Parent mode: noma'lum saytlarni ham bloklash

**Tekshiriladigan kategoriyalar:**
- ❌ Kattalar uchun kontent (adult content)
- ❌ Qimor o'yinlari (gambling)
- ❌ Zo'ravonlik (violence)
- ❌ Zararli dasturlar (malware)
- ✅ Xavfsiz va ta'lim saytlari

### 3. 🤖 AI Tushuntirish

- OpenAI GPT-3.5 Turbo modeli
- O'zbek tilida batafsil tushuntirish
- Ota-onalar uchun maslahatlar
- Fallback mexanizm (AI mavjud bo'lmasa)

### 4. 👪 Ota-ona Nazorati Rejimi

Parent Mode faollashtirilganda:
- Scoring x1.5 marta oshadi
- Threshold pastroq (20 o'rniga 30)
- Noma'lum saytlar "Shubhali" deb belgilanadi
- Maksimal himoya ta'minlanadi

### 5. 📊 Admin Panel

- Barcha tekshiruvlar tarixi
- Matn va sayt tekshiruvlarini filtrlash
- Batafsil statistika va grafiklar
- Jami, xavfsiz, shubhali, zararli tekshiruvlar soni
- Eng ko'p uchraydigan zararli kalit so'zlar

---

## 🛠 Texnologiyalar

### Frontend
- **React 18.2.0** - UI kutubxonasi
- **React Router 6** - Client-side routing
- **Axios** - HTTP so'rovlar uchun
- **CSS3** - Modern va responsive dizayn
- **Custom hooks** - Qayta foydalaniladigan mantiq

### Backend
- **Node.js 18+** - Server muhiti
- **Express.js** - Web framework
- **MongoDB** - NoSQL ma'lumotlar bazasi
- **Mongoose** - ODM kutubxonasi
- **OpenAI API** - GPT-3.5 Turbo integratsiyasi

### Xavfsizlik
- **Helmet.js** - HTTP headerlarni himoya qilish
- **CORS** - Cross-Origin resurslarni boshqarish
- **Express Rate Limit** - DDoS va spam hujumlardan himoya (15 daqiqada 100 so'rov)
- **dotenv** - Environment variables

### DevOps
- **Nodemon** - Development uchun auto-restart
- **Morgan** - HTTP logger
- **Git** - Version control

---

## 🏗 Tizim arxitekturasi

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
│   Port: 3000    │
└────────┬────────┘
         │
         │ HTTP REST API
         │
┌────────▼────────┐
│   Backend       │
│   (Express)     │
│   Port: 5001    │
└────────┬────────┘
         │
    ┌────┼────┐
    │         │
┌───▼──┐  ┌──▼─────┐
│ MongoDB│  │ OpenAI │
│        │  │  API   │
└────────┘  └────────┘
```

### Komponentlar

**Frontend:**
- `App.js` - Asosiy komponent va routing
- `Navbar.js` - Navigatsiya paneli
- `Home.js` - Bosh sahifa
- `Analyze.js` - Matn tahlili sahifasi
- `WebsiteFilter.js` - Sayt tekshirish sahifasi
- `Admin.js` - Admin panel
- `About.js` - Loyiha haqida

**Backend:**
- `server.js` - Server konfiguratsiyasi
- Controllers: `analysisController.js`, `websiteController.js`, `unifiedHistoryController.js`
- Models: `Analysis.js`, `WebsiteCheck.js`
- Services: `aiService.js`
- Utils: `filterEngine.js`, `urlFilter.js`, `toxicWords.js`
- Middleware: `errorHandler.js`

---

## 🚀 O'rnatish va sozlash

### Talablar

- Node.js 18+ versiyasi
- MongoDB 5.0+ (local yoki MongoDB Atlas)
- OpenAI API key (ixtiyoriy, lekin tavsiya etiladi)
- Git

### 1. Loyihani yuklab olish

```bash
git clone https://github.com/[sizning-username]/safenet-kids.git
cd safenet-kids
```

### 2. Backend sozlash

```bash
cd backend

# Paketlarni o'rnatish
npm install

# Environment variables yaratish
cp .env.example .env
```

`.env` faylini tahrirlang:

```env
# Server konfiguratsiyasi
PORT=5001
NODE_ENV=development

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/safenet-kids
# yoki MongoDB Atlas uchun:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/safenet-kids

# OpenAI API key (ixtiyoriy)
OPENAI_API_KEY=sk-...your-key-here...
```

### 3. Frontend sozlash

```bash
cd ../frontend

# Paketlarni o'rnatish
npm install
```

### 4. MongoDB ishga tushirish

**Local MongoDB uchun:**
```bash
# MongoDB service ni ishga tushirish
sudo systemctl start mongodb
# yoki macOS uchun:
brew services start mongodb-community
```

**MongoDB Atlas uchun:**
1. https://www.mongodb.com/cloud/atlas da ro'yxatdan o'ting
2. Yangi cluster yarating (bepul tier mavjud)
3. Database user yarating
4. IP whitelist qo'shing (0.0.0.0/0 development uchun)
5. Connection string ni `.env` fayliga qo'ying

### 5. OpenAI API Key (ixtiyoriy)

1. https://platform.openai.com da ro'yxatdan o'ting
2. API Keys bo'limidan yangi key yarating
3. Key ni `.env` fayliga qo'ying

**Eslatma:** OpenAI API key bo'lmasa ham tizim ishlaydi (fallback mexanizm mavjud)

### 6. Loyihani ishga tushirish

**Variant 1: Alohida terminallar (development)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

**Variant 2: Bir buyruq bilan (root papkadan)**

```bash
# start.sh scriptini ishlatish
chmod +x start.sh
./start.sh
```

### 7. Brauzerda ochish

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Health check: http://localhost:5001/health

---

## 📖 Foydalanish

### Matn tahlili

1. "Matn tahlili" sahifasiga o'ting
2. Tahlil qilmoqchi bo'lgan matnni kiriting
3. (Ixtiyoriy) "Ota-ona nazorati" rejimini yoqing
4. "Tahlil qilish" tugmasini bosing
5. Natijani ko'ring:
   - Xavflilik darajasi (yashil/sariq/qizil)
   - Ball (0-100)
   - Topilgan kalit so'zlar
   - AI tushuntirishlari

### Sayt tekshirish

1. "Sayt filtri" sahifasiga o'ting
2. Tekshirmoqchi bo'lgan URL kiriting (masalan: https://example.com)
3. (Ixtiyoriy) "Ota-ona nazorati" rejimini yoqing
4. "Tekshirish" tugmasini bosing
5. Natijani ko'ring:
   - Sayt holati (xavfsiz/shubhali/bloklangan)
   - Kategoriya
   - Tushuntirish

### Admin panel

1. "Admin panel" sahifasiga o'ting
2. Statistikani ko'ring:
   - Jami tekshiruvlar
   - Xavfsiz, shubhali, zararli tekshiruvlar soni
   - Matn va sayt tekshiruvlari alohida
3. Tekshiruvlar tarixini ko'ring
4. Filter qo'llang:
   - Hammasi
   - Faqat matn
   - Faqat sayt
5. Kerak bo'lsa, yozuvlarni o'chiring

---

## 🔌 API hujjatlari

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### 1. Matn tahlili

**POST** `/analyze`

Request body:
```json
{
  "text": "Tahlil qilinadigan matn",
  "parentMode": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "result": "Xavfsiz",
    "score": 0,
    "detectedKeywords": [],
    "explanation": "AI tushuntirishlari...",
    "details": "...",
    "parentMode": false,
    "timestamp": "2026-03-29T..."
  }
}
```

#### 2. Sayt tekshirish

**POST** `/check-website`

Request body:
```json
{
  "url": "https://example.com",
  "parentMode": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "url": "https://example.com",
    "domain": "example.com",
    "result": "Xavfsiz",
    "category": "safe",
    "categoryName": "Xavfsiz",
    "reason": "...",
    "parentMode": false,
    "timestamp": "2026-03-29T..."
  }
}
```

#### 3. Yagona statistika

**GET** `/unified-stats`

Response:
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
      "text": {...},
      "website": {...}
    }
  }
}
```

#### 4. Yagona tarix

**GET** `/unified-history?limit=20&page=1&type=all`

Query params:
- `limit`: Sahifadagi yozuvlar soni (default: 20)
- `page`: Sahifa raqami (default: 1)
- `type`: Turi (`all`, `text`, `website`) (default: all)

#### 5. Yozuvni o'chirish

**DELETE** `/analysis/:id`

---

## 📁 Loyihaning tuzilishi

```
safenet-kids/
│
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── analysisController.js       # Matn tahlili logikasi
│   │   │   ├── websiteController.js        # Sayt tekshirish logikasi
│   │   │   └── unifiedHistoryController.js # Yagona tarix va statistika
│   │   ├── models/
│   │   │   ├── Analysis.js       # Matn tahlili modeli
│   │   │   └── WebsiteCheck.js   # Sayt tekshirish modeli
│   │   ├── routes/
│   │   │   ├── analysisRoutes.js
│   │   │   ├── websiteRoutes.js
│   │   │   └── unifiedHistoryRoutes.js
│   │   ├── services/
│   │   │   └── aiService.js      # OpenAI integratsiyasi
│   │   ├── utils/
│   │   │   ├── filterEngine.js   # Matn filtrlash engine
│   │   │   ├── urlFilter.js      # URL filtrlash engine
│   │   │   └── toxicWords.js     # Kalit so'zlar bazasi
│   │   ├── middleware/
│   │   │   └── errorHandler.js   # Xatoliklarni boshqarish
│   │   └── server.js             # Server konfiguratsiyasi
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment shablon
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML shablon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigatsiya paneli
│   │   │   ├── Loading.js        # Loading indikatori
│   │   │   ├── ResultDisplay.js  # Natijani ko'rsatish
│   │   │   └── ScrollToTop.js    # Auto scroll yuqoriga
│   │   ├── pages/
│   │   │   ├── Home.js           # Bosh sahifa
│   │   │   ├── Analyze.js        # Matn tahlili sahifasi
│   │   │   ├── WebsiteFilter.js  # Sayt tekshirish sahifasi
│   │   │   ├── Admin.js          # Admin panel
│   │   │   └── About.js          # Loyiha haqida
│   │   ├── services/
│   │   │   └── api.js            # API service
│   │   ├── assets/
│   │   │   └── styles/
│   │   │       └── App.css       # Global styles
│   │   ├── App.js                # Asosiy komponent
│   │   └── index.js              # Entry point
│   ├── package.json
│   └── .gitignore
│
├── README.md                     # Loyiha hujjatlari
├── SCREENSHOT_GUIDE.md           # Screenshot olish bo'yicha qo'llanma
├── start.sh                      # Ishga tushirish scripti
└── .gitignore                    # Git ignore qoidalari
```

---

## 📸 Screenshotlar

> **Eslatma:** Screenshot olish bo'yicha batafsil qo'llanma uchun [SCREENSHOT_GUIDE.md](SCREENSHOT_GUIDE.md) faylini ko'ring.

### Bosh sahifa
![Bosh sahifa](screenshots/1-home.png)
*SafeNet Kids bosh sahifasi - loyiha haqida umumiy ma'lumot*

### Matn tahlili - Matn kiritish
![Matn kiritish](screenshots/2-text-input.png)
*Foydalanuvchi tahlil qilmoqchi bo'lgan matnni kiritadi*

### Matn tahlili - Xavfsiz natija
![Xavfsiz natija](screenshots/3-safe-result.png)
*Matn xavfsiz deb topilgan holat (yashil)*

### Matn tahlili - Zararli natija
![Zararli natija](screenshots/4-harmful-result.png)
*Matn zararli deb topilgan holat (qizil)*

### Sayt tekshirish
![Sayt tekshirish](screenshots/5-website-check.png)
*Veb-saytni tekshirish sahifasi*

### Admin panel - Umumiy ko'rinish
![Admin panel](screenshots/6-admin-panel.png)
*Admin panel - barcha tekshiruvlar tarixi va statistika*

### Admin panel - Filtrlash
![Filtrlash](screenshots/7-admin-filter.png)
*Admin panelda matn va sayt tekshiruvlarini filtrlash*

---

## 👨‍💻 Muallif

**Iroda**
- Universitet: TATU (Toshkent Axborot Texnologiyalari Universiteti)
- Fakultet: BMI (Biomeditsina Injiniringi)
- Yil: 2026
- Bitirruv malakaviy ishi (BMI)

---

## 📄 Litsenziya

Ushbu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

```
MIT License

Copyright (c) 2026 Iroda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 E'tiroflar

- OpenAI - GPT-3.5 Turbo API uchun
- MongoDB - Ma'lumotlar bazasi uchun
- React - Frontend framework uchun
- Node.js community - Backend kutubxonalari uchun

---

## 📞 Bog'lanish

Loyiha bo'yicha savol va takliflar uchun GitHub Issues dan foydalaning:
- GitHub Issues: [https://github.com/[username]/safenet-kids/issues](https://github.com/[username]/safenet-kids/issues)

---

## 🔮 Kelajak rejalari

- [ ] Mobile app (React Native)
- [ ] Chrome extension
- [ ] Real-time monitoring dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Machine Learning model training
- [ ] WhatsApp bot integration
- [ ] Telegram bot integration

---

## ⭐ Support

Agar loyiha sizga yoqqan bo'lsa, GitHub da yulduzcha (⭐) qo'yishni unutmang!

---

**© 2026 SafeNet Kids. Barcha huquqlar himoyalangan.**
