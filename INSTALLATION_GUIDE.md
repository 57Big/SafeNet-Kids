# O'rnatish va Ishga Tushirish Yo'riqnomasi

Bu yo'riqnoma sizga loyihani noldan ishga tushirishda yordam beradi.

## 📋 Boshlash oldin tayyorgarlik

### 1. Node.js o'rnatish

**macOS:**
```bash
# Homebrew orqali
brew install node

# Yoki https://nodejs.org dan yuklab olish
```

**Windows:**
- https://nodejs.org saytiga kiring
- LTS versiyasini yuklab oling
- O'rnatuvchini ishga tushiring

**Tekshirish:**
```bash
node --version  # v16 yoki yuqori
npm --version   # 8 yoki yuqori
```

### 2. MongoDB o'rnatish

**macOS:**
```bash
# Homebrew orqali
brew tap mongodb/brew
brew install mongodb-community

# Ishga tushirish
brew services start mongodb-community
```

**Windows:**
- https://www.mongodb.com/try/download/community ga kiring
- Windows versiyasini yuklab oling
- O'rnatuvchini ishga tushiring
- MongoDB Compass ham o'rnatiladi (GUI dastur)

**Tekshirish:**
```bash
mongod --version  # v5 yoki yuqori
```

### 3. Git o'rnatish (opsional)

```bash
# macOS
brew install git

# Windows - https://git-scm.com/download/win
```

## 🚀 Qadamma-qadam o'rnatish

### Qadam 1: Loyiha papkasiga o'tish

```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web
```

### Qadam 2: Backend sozlash

```bash
# Backend papkasiga o'tish
cd backend

# Node paketlarini o'rnatish (3-5 daqiqa)
npm install

# Muvaffaqiyatli bo'lsa, node_modules papkasi paydo bo'ladi
```

### Qadam 3: Backend .env fayli

```bash
# .env faylini yaratish
cp .env.example .env

# Faylni tahrirlash (nano, vim yoki text editor)
nano .env
```

**.env fayli ichiga quyidagilarni kiriting:**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/bmi-filter
OPENAI_API_KEY=sk-your-key-here
NODE_ENV=development
```

**OpenAI API kalit olish (opsional):**
1. https://platform.openai.com ga kiring
2. Sign up qiling
3. API Keys bo'limidan yangi kalit yarating
4. Kalitni .env fayliga joylashtiring

> **Eslatma:** OpenAI API kaliti bo'lmasa ham ishlaydi, lekin oddiy tushuntirishlar beradi.

### Qadam 4: Frontend sozlash

```bash
# Frontend papkasiga o'tish
cd ../frontend

# Node paketlarini o'rnatish (3-5 daqiqa)
npm install
```

### Qadam 5: Frontend .env fayli

```bash
# .env faylini yaratish
cp .env.example .env

# Faylni tahrirlash
nano .env
```

**.env fayli:**
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Qadam 6: MongoDB tekshirish

```bash
# MongoDB ishlab tuganini tekshirish
mongosh

# Yoki
mongo

# MongoDB shell ochilsa, ishlayapti
# Chiqish uchun: exit
```

Agar ishlamasa:
```bash
# macOS
brew services start mongodb-community

# Windows - MongoDB Compass ni oching
```

## ▶️ Ilovani ishga tushirish

### Usul 1: Ikki alohida terminal

**Terminal 1 - Backend:**
```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web/backend
npm run dev
```

Muvaffaqiyatli bo'lsa ko'rasiz:
```
🚀 Server 5001-portda ishga tushdi
📝 Muhit: development
🔗 URL: http://localhost:5001
💾 MongoDB: mongodb://localhost:27017/bmi-filter
```

**Terminal 2 - Frontend:**
```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web/frontend
npm start
```

Brauzer avtomatik ochiladi: http://localhost:3000

### Usul 2: Bitta terminalda (tmux yoki screen)

```bash
# tmux o'rnatish (macOS)
brew install tmux

# tmux sessiya boshlash
tmux

# Backend ishga tushirish
cd backend && npm run dev

# Ctrl+B, keyin C - yangi oyna
cd ../frontend && npm start
```

## ✅ Tekshirish

### 1. Backend tekshirish

Brauzarda: http://localhost:5001/health

Ko'rishingiz kerak:
```json
{
  "success": true,
  "message": "Server ishlayapti",
  "timestamp": "..."
}
```

### 2. Frontend tekshirish

Brauzer: http://localhost:3000

- Bosh sahifa ko'rinishi kerak
- Navbar ishlashi kerak
- "Tahlil qilish" sahifasiga o'tish mumkin

### 3. To'liq test

1. "Tahlil qilish" sahifasiga kiring
2. Misol matnni bosing: "Xavfsiz matn misoli"
3. "Tahlil qilish" tugmasini bosing
4. Natija ko'rinishi kerak (3-5 soniya)

## 🐛 Muammolarni hal qilish

### Muammo: `npm install` ishlamayapti

**Yechim:**
```bash
# Cache tozalash
npm cache clean --force

# Qayta urinish
npm install

# Yoki yarn ishlatish
npm install -g yarn
yarn install
```

### Muammo: MongoDB ulanmayapti

**Yechim:**
```bash
# MongoDB statusini tekshirish (macOS)
brew services list

# Agar running bo'lmasa
brew services start mongodb-community

# Windows - Services dasturida MongoDB ni tekshiring
```

### Muammo: Port band

**Port band bo'lsa:**

.env faylida boshqa port tanlang:
```env
PORT=5002  # Boshqa port
```

Frontend .env da:
```env
REACT_APP_API_URL=http://localhost:5002/api
```

### Muammo: CORS xatoligi

**Yechim:**

backend/src/server.js da CORS sozlamalarini tekshiring:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Muammo: OpenAI API ishlamayapti

**Yechim:**
1. API kalit to'g'ri ekanini tekshiring
2. Hisob balansini tekshiring (platform.openai.com)
3. Kalit bo'lmasa, fallback rejimda ishlaydi (oddiy tushuntirishlar)

## 📦 Production uchun build qilish

### Backend

```bash
cd backend
# Production muhit uchun .env
NODE_ENV=production

# PM2 bilan ishga tushirish
npm install -g pm2
pm2 start src/server.js --name bmi-backend
```

### Frontend

```bash
cd frontend

# Build qilish
npm run build

# build/ papkasi paydo bo'ladi

# Serve bilan test qilish
npm install -g serve
serve -s build -l 3000
```

## 🔄 Yangilash

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 📞 Yordam

Muammo yuzaga kelsa:

1. Terminal output'ni tekshiring
2. Browser console'ni oching (F12)
3. Network tab'ni tekshiring
4. MongoDB logs'ni ko'ring

---

**Omad tilaymiz! 🚀**
