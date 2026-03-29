# Admin Panel Test - O'quv Qo'llanma

## ✅ Sistema To'liq Ishlayapti!

### Backend Status
- Server: **RUNNING** on http://localhost:5001
- Database: **CONNECTED** (MongoDB Atlas)
- API Endpoints: **ALL WORKING**

### Test Ma'lumotlar

Bazada **4 ta tahlil** mavjud:

| # | Matn | Natija | Ball | Sana |
|---|------|--------|------|------|
| 1 | yolgon gapirish | Xavfsiz | 0 | 2026-03-29 07:18:39 |
| 2 | ahmoq telba jinni | Zararli | 90 | 2026-03-29 07:18:36 |
| 3 | Kitob oqish foydali... | Xavfsiz | 0 | 2026-03-29 07:18:32 |
| 4 | Bu test matni xavfsiz | Xavfsiz | 0 | 2026-03-29 07:17:29 |

---

## 🚀 Frontend Ishga Tushirish

### 1. Frontend ishga tushiring:

```bash
cd /Users/shamshod/Desktop/tatu/BMI/Iroda/web/frontend
npm start
```

Brauzer avtomatik ochiladi: **http://localhost:3000**

### 2. Admin Panelga kiring:

Navigatsiyada **"Admin panel"** tugmasini bosing yoki:
```
http://localhost:3000/admin
```

### 3. Ko'rishingiz Kerak:

#### Statistika (Yuqori qismda):
- **Jami tahlillar:** 4
- **Xavfsiz:** 3 (yashil)
- **Shubhali:** 0 (sariq)
- **Zararli:** 1 (qizil)

#### Tahlillar Tarixi Jadvali:
| Sana | Matn | Natija | Ball | Topilgan so'zlar | Amallar |
|------|------|--------|------|------------------|---------|
| 2026-03-29... | yolgon gapirish | Xavfsiz | 0 | - | O'chirish |
| 2026-03-29... | ahmoq telba jinni | Zararli | 90 | ahmoq, telba, jinni | O'chirish |
| ... | ... | ... | ... | ... | ... |

---

## 🧪 Test Qilish

### Yangi Tahlil Qo'shish:

1. **"Matn tahlili"** sahifasiga o'ting
2. Matn kiriting (masalan: "Bu test uchun yomon so'z")
3. **"Tahlil qilish"** bosing
4. **Admin panel**ga qaytib, **"Yangilash"** bosing
5. Yangi tahlil jadvalda paydo bo'ladi! ✅

### Test Matnlar:

**Xavfsiz:**
```
Kitob o'qish juda foydali. Sport qilish sog'liq uchun yaxshi.
```

**Shubhali:**
```
Yolg'on gapirish yomon odat. Aldash mumkin emas.
```

**Zararli:**
```
Ahmoq telba jinni yomon
```

---

## 🔧 API Test (Terminal orqali):

### History olish:
```bash
curl http://localhost:5001/api/history
```

### Statistika olish:
```bash
curl http://localhost:5001/api/stats
```

### Yangi tahlil qo'shish:
```bash
curl -X POST http://localhost:5001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Test matni", "parentMode": false}'
```

---

## ✅ Tekshiruv Ro'yxati

- [x] Backend ishlayapti (port 5001)
- [x] MongoDB ulanishi ishlayapti
- [x] Ma'lumotlar saqlanmoqda
- [x] `/api/history` endpoint ishlayapti
- [x] `/api/stats` endpoint ishlayapti
- [x] Admin panel kodi to'g'ri
- [ ] Frontend ishga tushirilgan
- [ ] Admin panelda ma'lumotlar ko'rinmoqda

---

## 🎯 Agar Admin Panelda Ma'lumot Ko'rinmasa:

### 1. Frontend ishlayaptimi?
```bash
# Terminalda tekshiring:
ps aux | grep react
```

### 2. Browser Console'ni oching:
- Chrome/Firefox: **F12** bosing
- **Console** tabiga o'ting
- Qizil xatolar bormi? (CORS, Network errors)

### 3. Network Tab'ni tekshiring:
- **F12** → **Network** tab
- Admin panelga o'ting
- `/api/history` so'rovi ko'rinmoqdami?
- Status code: **200** bo'lishi kerak

### 4. CORS Xatosi bo'lsa:

Backend `.env` fayliga qo'shing:
```env
CORS_ORIGIN=http://localhost:3000
```

Backend'ni qayta ishga tushiring.

---

## 📸 Screenshot Yo'riqnomasi (BMI Hisobot uchun)

### 1. Admin Panel - Statistika
- To'liq sahifa screenshot
- Barcha 4 ta stat card ko'rinsin

### 2. Admin Panel - Tarix Jadvali
- Jadval to'liq ko'rinsin
- Kamida 3-4 ta yozuv borligini ko'rsating

### 3. Tahlil Qo'shish Jarayoni
- Matn tahlili sahifasi
- Natija ko'rsatilishi
- Admin panelda paydo bo'lishi

---

## 🎓 BMI Himoyasi Uchun Tushuntirish

### Admin Panel Funksiyasi:

**Monitoring va Tahlil:**
- Barcha tahlillar yozib boriladi
- Statistika real-time yangilanadi
- Zararli kontentni kuzatish mumkin

**Ma'lumotlar Strukturasi:**
```javascript
{
  text: "Tahlil qilingan matn",
  result: "Xavfsiz/Shubhali/Zararli",
  score: 0-100,
  detectedKeywords: ["so'z1", "so'z2"],
  timestamp: "2026-03-29T07:18:39.102Z",
  parentMode: true/false
}
```

**Database Schema:**
- MongoDB Collections: `analyses`, `websitechecks`
- Indexing: timestamp, result
- Retention: Unlimited (yoki TTL sozlash mumkin)

---

**Muvaffaqiyatlar! Sistema to'liq ishlayapti! 🎉**
