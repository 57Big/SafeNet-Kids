# Tez Boshlash (Quick Start)

Loyihani tezda ishga tushirish uchun qisqa yo'riqnoma.

## ⚡ Eng Tez Usul

### Bitta buyruq bilan ishga tushirish:

```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web
./start.sh
```

Bu script avtomatik ravishda:
- ✅ MongoDB ni tekshiradi va ishga tushiradi
- ✅ .env fayllarini yaratadi (agar yo'q bo'lsa)
- ✅ Dependencies o'rnatadi (agar yo'q bo'lsa)
- ✅ Backend va Frontend'ni birga ishga tushiradi

## 📋 Boshlash oldin bir marta qilish kerak:

### 1. Dependencies o'rnatish

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. .env fayllarini sozlash

**Backend `.env`:**
```bash
cd backend
cp .env.example .env
```

Keyin `.env` ni oching va quyidagilarni sozlang:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/bmi-filter
OPENAI_API_KEY=sk-your-key-here  # Opsional
NODE_ENV=development
```

**Frontend `.env`:**
```bash
cd frontend
cp .env.example .env
```

`.env` faylida:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### 3. MongoDB ishga tushirish

```bash
# macOS
brew services start mongodb-community

# Yoki
mongod
```

## 🚀 Qo'lda ishga tushirish

Agar `start.sh` ishlamasa, qo'lda ishga tushiring:

**Terminal 1 - Backend:**
```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web/frontend
npm start
```

## ✅ Tekshirish

1. **Backend:** http://localhost:5001/health
   - Ko'rinishi kerak: `{"success": true, "message": "Server ishlayapti"}`

2. **Frontend:** http://localhost:3000
   - Bosh sahifa ochilishi kerak

3. **Test qilish:**
   - "Tahlil qilish" sahifasiga o'ting
   - Misol matnni kiriting
   - "Tahlil qilish" bosing
   - Natija 3-5 soniyada ko'rinadi

## 🐛 Muammolar

### MongoDB ishlamayapti?
```bash
brew services start mongodb-community
```

### Port band?
`.env` faylida PORT ni o'zgartiring:
```env
PORT=5001
```

### Dependencies xatolik?
```bash
# Cache tozalash
npm cache clean --force
rm -rf node_modules
npm install
```

## 📞 Yordam kerakmi?

1. `README.md` - To'liq yo'riqnoma
2. `INSTALLATION_GUIDE.md` - Batafsil o'rnatish
3. `BMI_REPORT_GUIDE.md` - Hisobot uchun ma'lumotlar

---

**Muvaffaqiyatlar! 🎉**
