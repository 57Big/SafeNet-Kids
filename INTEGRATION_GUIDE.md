# Tizimni Brauzer va Tarmoqlarga Integratsiya Qilish Yo'riqnomasi

## 📚 BMI Hisobot Uchun - Integratsiya Tushuntirishlari

### Umumiy Ko'rinish

Ushbu "Bolalar uchun Internet Xavfsizligi" tizimini turli platformalarga integratsiya qilish mumkin:

1. **Brauzer Kengaytmasi (Browser Extension)**
2. **Tarmoq Proksi-Serveri (Network Proxy)**
3. **Router-Darajasidagi Filtrlash**
4. **ISP (Internet Service Provider) Darajasida**
5. **Mobile Ilovalar**

---

## 1. Brauzer Kengaytmasi (Chrome/Firefox Extension)

### Texnik Arxitektura

```
┌─────────────────────────────────────┐
│  Brauzer Kengaytmasi (Extension)   │
│                                      │
│  ┌────────────────────────────────┐│
│  │  Content Script                ││
│  │  - Sahifa kontentini ushlash   ││
│  │  - Input fieldlarni kuzatish   ││
│  └────────────┬───────────────────┘│
│               │                     │
│  ┌────────────▼───────────────────┐│
│  │  Background Service Worker     ││
│  │  - API ga so'rov yuborish      ││
│  │  - URL tekshirish              ││
│  └────────────┬───────────────────┘│
│               │                     │
└───────────────┼─────────────────────┘
                │ HTTP API
                ▼
        ┌───────────────────┐
        │  Backend Server   │
        │  (Node.js + API)  │
        └───────────────────┘
```

### Ishlash Prinsipi

1. **Sahifa yuklanishi**:
   - Extension sahifa URL'ini backend'ga yuboradi
   - Backend URL'ni tekshiradi
   - Agar xavfli bo'lsa, sahifa bloklanadi

2. **Matn kiritish**:
   - Foydalanuvchi textarea, input ga matn kiritganda
   - Content script matnni real-time kuzatadi
   - Yuborish tugmasi bosilganda, avval tahlil qilinadi
   - Agar zararli bo'lsa, yuborish oldini oladi

3. **Vizual Indikator**:
   - Sayt yonida xavfsizlik belgisi ko'rsatiladi
   - ✅ Xavfsiz, ⚠️ Shubhali, 🚫 Bloklangan

### Kod Misoli (Extension)

**manifest.json**:
```json
{
  "manifest_version": 3,
  "name": "Bolalar Xavfsizligi",
  "version": "1.0.0",
  "permissions": [
    "webRequest",
    "tabs",
    "storage"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

**background.js**:
```javascript
// URL tekshirish
chrome.webRequest.onBeforeRequest.addListener(
  async function(details) {
    const response = await fetch('http://localhost:5001/api/check-website', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: details.url, parentMode: true })
    });

    const data = await response.json();

    if (data.data.result === 'Bloklangan') {
      return { cancel: true }; // URL'ni bloklash
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
```

---

## 2. Tarmoq Proksi-Serveri (Network Proxy)

### Arxitektura

```
[Foydalanuvchi] → [Proksi Server] → [Internet]
                       ↓
                  [Filter API]
                  [MongoDB]
```

### Ishlash Jarayoni

1. Barcha HTTP/HTTPS trafik proksi orqali o'tadi
2. Proksi har bir so'rovni Filter API ga yuboradi
3. API URL va kontentni tekshiradi
4. Xavfli bo'lsa, bloklash sahifasini qaytaradi

### Texnologiyalar

- **Squid Proxy** + Custom ACL (Access Control List)
- **NGINX** + Lua module
- **Node.js Proxy Server**

### Kod Misoli (Node.js Proxy)

```javascript
const http = require('http');
const httpProxy = require('http-proxy');
const axios = require('axios');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(async (req, res) => {
  try {
    // URL tekshirish
    const checkResult = await axios.post('http://localhost:5001/api/check-website', {
      url: req.url,
      parentMode: true
    });

    if (checkResult.data.data.result === 'Bloklangan') {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>🚫 Bu sayt bloklangan!</h1><p>Sabab: ' + checkResult.data.data.reason + '</p>');
      return;
    }

    // Agar xavfsiz bo'lsa, o'tkazamiz
    proxy.web(req, res, { target: req.url });

  } catch (error) {
    res.writeHead(500);
    res.end('Server xatosi');
  }
});

server.listen(8080);
```

---

## 3. Router-Darajasidagi Filtrlash

### Konsepsiya

Uy yoki maktab routerida DNS va URL filtrlash sozlash.

### Ishlash Mexanizmi

1. **DNS Filtrlash**:
   - Zararli domenlar uchun DNS so'rovlarni bloklash
   - Custom DNS server ishlatish (Pi-hole, AdGuard Home)

2. **Deep Packet Inspection (DPI)**:
   - Paketlar ichidagi kontentni tekshirish
   - HTTP header va body tahlili

### Qo'llanma (Raspberry Pi + Pi-hole)

```bash
# Pi-hole o'rnatish
curl -sSL https://install.pi-hole.net | bash

# Custom blocklist qo'shish
# /etc/pihole/custom.list fayliga domenlar qo'shish
```

**Custom Filter Script**:
```python
import requests

# Backend API ga ulanish
def check_domain(domain):
    response = requests.post('http://localhost:5001/api/check-website',
                           json={'url': f'https://{domain}', 'parentMode': True})
    data = response.json()
    return data['data']['result'] == 'Bloklangan'

# DNS so'rovlarni filter qilish
def filter_dns_request(domain):
    if check_domain(domain):
        return '0.0.0.0'  # Bloklangan sahifa IP
    return None  # Normal DNS resolution
```

---

## 4. ISP Darajasida Filtrlash

### Arxitektura

```
[Foydalanuvchi] → [ISP Gateway] → [Filter Server] → [Internet]
                                         ↓
                                   [Milliy Baza]
```

### Imkoniyatlar

1. **Markazlashtirilgan filtrlash**:
   - Barcha ISP foydalanuvchilari uchun
   - Davlat standartlariga muvofiq

2. **DPI (Deep Packet Inspection)**:
   - Barcha trafik tahlili
   - Real-time bloklash

3. **Statistika yig'ish**:
   - Milliy darajada monitoring
   - Tahdidlarni aniqlash

### O'zbekiston Uchun Misol

```javascript
// ISP Gateway Integration
const express = require('express');
const app = express();

// Middleware: Har bir HTTP so'rovni tekshirish
app.use(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;

  const checkResult = await checkWithNationalDatabase(url);

  if (checkResult.blocked) {
    return res.status(403).send(`
      <html>
        <body style="text-align:center; font-family:Arial;">
          <h1>🚫 Ushbu sahifa bloklangan</h1>
          <p>O'zbekiston Respublikasi qonunchiligiga muvofiq</p>
        </body>
      </html>
    `);
  }

  next();
});
```

---

## 5. Mobile Ilovalarga Integratsiya

### iOS va Android

**Konsepsiya**: Parental Control ilovasi

```
┌─────────────────────────────────┐
│   Mobile Ilova (Parent Phone)  │
│   - Sozlamalar                  │
│   - Monitoring                  │
└──────────────┬──────────────────┘
               │ Cloud Sync
               ▼
┌─────────────────────────────────┐
│   Backend + Database            │
└──────────────┬──────────────────┘
               │ Real-time Push
               ▼
┌─────────────────────────────────┐
│   Mobile Ilova (Child Phone)    │
│   - Brauzer filter              │
│   - SMS/Chat monitoring         │
│   - App blocker                 │
└─────────────────────────────────┘
```

### Android Kod Misoli

```kotlin
// Brauzer aktiv ityni kuzatish
class WebViewMonitor : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.packageName == "com.android.chrome") {
            val url = event.text.toString()

            // Backend API ga tekshirish
            checkUrl(url) { result ->
                if (result == "Bloklangan") {
                    // Sahifani bloklash
                    blockCurrentPage()
                }
            }
        }
    }

    fun checkUrl(url: String, callback: (String) -> Unit) {
        val request = Request.Builder()
            .url("http://api.xavfsizlik.uz/check-website")
            .post(JSONObject().put("url", url).toString().toRequestBody())
            .build()

        OkHttpClient().newCall(request).enqueue(object : Callback {
            override fun onResponse(call: Call, response: Response) {
                val data = JSONObject(response.body?.string())
                callback(data.getString("result"))
            }
        })
    }
}
```

---

## 6. Korporativ Tarmoqlarda (Maktablar, Tashkilotlar)

### Infratuzilma

```
┌────────────────────────────────────────────┐
│           Maktab Tarmog'i                  │
│                                            │
│  ┌──────────────┐    ┌──────────────┐    │
│  │   Student PC │    │  Teacher PC  │    │
│  └──────┬───────┘    └──────┬───────┘    │
│         │                    │            │
│         └────────┬───────────┘            │
│                  │                        │
│         ┌────────▼──────────┐            │
│         │  Local Filter     │            │
│         │  Server           │            │
│         └────────┬──────────┘            │
│                  │                        │
│         ┌────────▼──────────┐            │
│         │  Firewall/Router  │            │
│         └────────┬──────────┘            │
└──────────────────┼────────────────────────┘
                   │
              [Internet]
```

### Xususiyatlar

1. **Avtorizatsiya**:
   - O'qituvchi va o'quvchi rollari
   - Turli xil filtrlash darajalari

2. **Vaqt boshqaruvi**:
   - Dars vaqtida qattiqroq filtrlash
   - Tanaffusda yumshoqroq

3. **Hisobot**:
   - Har bir o'quvchining faoliyati
   - Ota-onalarga email hisobot

---

## 7. Texnik Talablar va Samaradorlik

### Tizim Talablari

**Minimal**:
- CPU: 2 cores
- RAM: 4GB
- Disk: 20GB
- Network: 100 Mbps

**Tavsiya etilgan (1000 foydalanuvchi)**:
- CPU: 8 cores
- RAM: 16GB
- Disk: 100GB SSD
- Network: 1 Gbps

### Samaradorlik Metrics

- **URL tekshirish**: < 100ms
- **Matn tahlili**: < 3 sekund
- **Concurrent requests**: 1000/sekund
- **Database queries**: < 50ms

---

## 8. Xavfsizlik va Maxfiylik

### Ma'lumotlar Himoyasi

1. **Shifrlash**:
   - HTTPS (TLS 1.3)
   - Ma'lumotlar bazasida encryption at rest

2. **Anonymization**:
   - IP manzillarni hash qilish
   - Shaxsiy ma'lumotlarni saqlamaslik

3. **GDPR/O'zbekiston Qonunlariga Muvofiqlik**:
   - Ma'lumotlarni mahalliy serverda saqlash
   - Foydalanuvchi roziligini olish

---

## 9. Kelajakdagi Rivojlanish

1. **Machine Learning**:
   - Yangi zararli patternlarni avtomatik o'rganish
   - False positive/negative kamaytirish

2. **Real-time Collaboration**:
   - ISP va maktablar o'rtasida ma'lumot almashish
   - Milliy zararli saytlar bazasi

3. **IoT Integration**:
   - Smart TV filtrlash
   - Smart Home qurilmalar nazorati

4. **Blockchain**:
   - O'zgarmas audit log
   - Decentralized content rating

---

## 📞 Qo'shimcha Resurslar

- **Texnik Hujjatlar**: `/docs/technical`
- **API Reference**: `/docs/api`
- **Video Qo'llanmalar**: YouTube channel

---

**Eslatma**: Ushbu yo'riqnoma BMI himoyasi uchun nazariy va amaliy ma'lumotlarni o'z ichiga oladi.
