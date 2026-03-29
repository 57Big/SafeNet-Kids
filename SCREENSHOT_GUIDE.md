# 📸 Screenshot Olish Bo'yicha Qo'llanma

**BMI Himoyasi uchun - SafeNet Kids**

Bu qo'llanma BMI himoyasida ko'rsatish uchun kerakli screenshotlarni olish bo'yicha batafsil yo'riqnoma beradi.

---

## 📋 Kerakli Screenshotlar Ro'yxati

Jami **7 ta asosiy screenshot** olish kerak:

1. ✅ Bosh sahifa
2. ✅ Matn tahlili - Matn kiritish
3. ✅ Matn tahlili - Xavfsiz natija
4. ✅ Matn tahlili - Zararli natija
5. ✅ Sayt tekshirish
6. ✅ Admin panel - Umumiy ko'rinish
7. ✅ Admin panel - Filtrlash

---

## 🚀 Tayyorgarlik

### 1. Loyihani ishga tushiring

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 2. Brauzerda ochish

- Frontend URL: http://localhost:3000
- Brauzer: **Google Chrome** yoki **Firefox** (eng yaxshi ko'rinish uchun)
- Brauzer o'lchamini to'liq ekranga kengaytiring (F11)

### 3. Screenshotlarni saqlash joyi

Loyiha papkasida `screenshots` papkasini yarating:

```bash
mkdir screenshots
```

---

## 📸 Screenshot #1: Bosh Sahifa

### Maqsad
Loyihaning bosh sahifasini va barcha asosiy xususiyatlarini ko'rsatish.

### Qadamlar

1. http://localhost:3000 ga o'ting
2. Sahifani to'liq yuqoriga scroll qiling
3. Brauzerning address bar va toolbarlari ko'rinsin
4. Full page screenshot oling

### Screenshot Format
- **Fayl nomi:** `1-home.png`
- **Joylashuv:** `/screenshots/1-home.png`
- **Ko'rinishi:** To'liq sahifa (yuqoridan pastgacha)

### Nima ko'rinishi kerak:
- ✅ Navbar: "SafeNet Kids" logotipi
- ✅ Hero section: Asosiy sarlavha va tavsif
- ✅ Asosiy xususiyatlar: Matn tahlili, Sayt filtri, AI tushuntirish
- ✅ "Qanday ishlaydi?" bo'limi
- ✅ Statistika kartochkalari (2-3s tezlik, 500+ kalit so'zlar, 95%+ aniqlik)
- ✅ Asosiy xususiyatlar ro'yxati
- ✅ Xavfsizlik bo'limi
- ✅ Ota-ona nazorati rejimi haqida ma'lumot
- ✅ Footer

### Maslahat
- Full page screenshot uchun browser extension ishlatish: "Full Page Screen Capture"
- Yoki macOS uchun: `Cmd + Shift + 4` va keyin `Space` bosing

---

## 📸 Screenshot #2: Matn Tahlili - Matn Kiritish

### Maqsad
Foydalanuvchi matn kiritayotgan jarayonni ko'rsatish.

### Qadamlar

1. "Matn tahlili" sahifasiga o'ting
2. Quyidagi xavfsiz matnni kiriting:
   ```
   Bugun maktabda matematika darsim bo'ldi. O'qituvchi biz uchun yangi vazifalar berdi.
   Men uyga qaytib, vazifalarni bajarishim kerak. Kechqurun sportga boraman.
   ```
3. "Ota-ona nazorati" checkbox ni **yoqMANG**
4. Hali "Tahlil qilish" tugmasini **bosmang**
5. Screenshot oling

### Screenshot Format
- **Fayl nomi:** `2-text-input.png`
- **Joylashuv:** `/screenshots/2-text-input.png`

### Nima ko'rinishi kerak:
- ✅ Navbar
- ✅ Sahifa sarlavhasi: "Matn Tahlili"
- ✅ Textarea ichida matn
- ✅ "Ota-ona nazorati" checkbox (o'chiq holda)
- ✅ "Tahlil qilish" tugmasi
- ✅ Misol matnlar bo'limi

---

## 📸 Screenshot #3: Matn Tahlili - Xavfsiz Natija

### Maqsad
Matn xavfsiz deb topilgan natijani ko'rsatish (yashil rang).

### Qadamlar

1. Agar avvalgi screenshot olgan bo'lsangiz, "Tahlil qilish" tugmasini bosing
2. Yoki qaytadan xavfsiz matnni kiriting va tahlil qiling
3. Natija chiqquncha kuting (2-3 soniya)
4. Natija to'liq ko'ringuncha scroll qiling
5. Screenshot oling

### Screenshot Format
- **Fayl nomi:** `3-safe-result.png`
- **Joylashuv:** `/screenshots/3-safe-result.png`

### Nima ko'rinishi kerak:
- ✅ Navbar
- ✅ Kiritilgan matn (yuqorida)
- ✅ Natija kartochkasi (yashil rangli)
- ✅ "Xavfsiz" belgisi (yashil rang bilan)
- ✅ Ball: 0
- ✅ AI tushuntirishlari
- ✅ Ota-onalar uchun maslahatlar
- ✅ "Yangi tahlil" tugmasi

---

## 📸 Screenshot #4: Matn Tahlili - Zararli Natija

### Maqsad
Matn zararli deb topilgan natijani ko'rsatish (qizil rang).

### Qadamlar

1. "Yangi tahlil" tugmasini bosing (yoki sahifani yangilang)
2. Quyidagi zararli matnni kiriting:
   ```
   Sen ahmoqsan, men seni kaltaklayman. O'ldirish haqida o'ylayman.
   Qochib keting, aks holda zarar etkazaman.
   ```
3. "Tahlil qilish" tugmasini bosing
4. Natija chiqquncha kuting
5. Screenshot oling

### Screenshot Format
- **Fayl nomi:** `4-harmful-result.png`
- **Joylashuv:** `/screenshots/4-harmful-result.png`

### Nima ko'rinishi kerak:
- ✅ Navbar
- ✅ Kiritilgan matn
- ✅ Natija kartochkasi (qizil rangli)
- ✅ "Zararli" belgisi (qizil rang bilan)
- ✅ Ball: 60-100 oralig'ida
- ✅ Topilgan kalit so'zlar ro'yxati
- ✅ AI tushuntirishlari (xavf haqida ogohlantirish)
- ✅ Ota-onalar uchun maslahatlar

---

## 📸 Screenshot #5: Sayt Tekshirish

### Maqsad
Veb-saytni tekshirish funksiyasini ko'rsatish.

### Qadamlar

1. "Sayt filtri" sahifasiga o'ting
2. Quyidagi URL ni kiriting:
   ```
   https://wikipedia.org
   ```
3. "Tekshirish" tugmasini bosing
4. Natija chiqquncha kuting
5. Screenshot oling

**Qo'shimcha variant** (ixtiyoriy):
- Bloklangan saytni ham tekshiring: `https://casino.com`
- Ikkala screenshotni ham oling: xavfsiz va bloklangan

### Screenshot Format
- **Fayl nomi:** `5-website-check.png`
- **Joylashuv:** `/screenshots/5-website-check.png`

### Nima ko'rinishi kerak:
- ✅ Navbar
- ✅ Sahifa sarlavhasi: "Sayt Tekshirish"
- ✅ URL input maydoni
- ✅ Natija kartochkasi
- ✅ Sayt holati (xavfsiz/bloklangan)
- ✅ Kategoriya
- ✅ Tushuntirish
- ✅ "Yangi tekshirish" tugmasi

---

## 📸 Screenshot #6: Admin Panel - Umumiy Ko'rinish

### Maqsad
Admin panelning asosiy ko'rinishini va statistikasini ko'rsatish.

### Tayyorgarlik
Admin panelda ma'lumot ko'rinishi uchun avval bir nechta tekshiruvlar bajaring:
- 2-3 ta matn tahlil qiling (xavfsiz va zararli)
- 2-3 ta sayt tekshiring

### Qadamlar

1. "Admin panel" sahifasiga o'ting
2. Sahifani yuqoridan pastga scroll qiling
3. Full page screenshot oling

### Screenshot Format
- **Fayl nomi:** `6-admin-panel.png`
- **Joylashuv:** `/screenshots/6-admin-panel.png`

### Nima ko'rinishi kerak:
- ✅ Navbar
- ✅ Admin Panel sarlavhasi
- ✅ Statistika kartochkalari:
  - Jami tekshiruvlar
  - Xavfsiz
  - Shubhali
  - Zararli / Bloklangan
- ✅ Batafsil statistika (Matn tahlili va Sayt tekshiruvi)
- ✅ Filter tugmalari (Hammasi, Faqat matn, Faqat sayt)
- ✅ Tekshiruvlar tarixi jadvali:
  - Turi
  - Sana
  - Kiritilgan ma'lumot
  - Natija
  - Tafsilot
  - Amallar (O'chirish tugmasi)

---

## 📸 Screenshot #7: Admin Panel - Filtrlash

### Maqsad
Admin panelda filtrlash funksiyasini ko'rsatish.

### Qadamlar

1. Admin panelda bo'ling
2. "Faqat matn" yoki "Faqat sayt" filtriga bosing
3. Jadval filtr bo'yicha o'zgardi
4. Screenshot oling

### Screenshot Format
- **Fayl nomi:** `7-admin-filter.png`
- **Joylashuv:** `/screenshots/7-admin-filter.png`

### Nima ko'rinishi kerak:
- ✅ Filter tugmalari (biri faol holatda - ko'k rangli)
- ✅ Filtrlangan jadval
- ✅ Jadval yuqorisida: "Faqat matn tahlillari (X)" yoki "Faqat sayt tekshiruvlari (X)"

---

## 🎨 Screenshotlar Uchun Qo'shimcha Maslahatlar

### Screenshot Olish Usullari

#### macOS:
1. **To'liq ekran:** `Cmd + Shift + 3`
2. **Tanlangan qism:** `Cmd + Shift + 4`
3. **Brauzer oynasi:** `Cmd + Shift + 4`, keyin `Space`, keyin oynani tanlang

#### Windows:
1. **To'liq ekran:** `PrtScn`
2. **Tanlangan qism:** `Win + Shift + S`
3. **Snipping Tool** yoki **Snip & Sketch** ishlatish

#### Linux:
1. **Screenshot tool** (Gnome Screenshot, Spectacle, va boshqalar)
2. **Tanlangan qism:** `Shift + PrtScn`

### Browser Extensions (tavsiya etiladi)

**Full Page Screenshot uchun:**
- **Awesome Screenshot** (Chrome/Firefox)
- **Full Page Screen Capture** (Chrome)
- **Nimbus Screenshot** (Chrome/Firefox)

### Sifat Talablari

- **Format:** PNG (siqilmagan)
- **O'lcham:** Minimal 1280x720 piksel
- **Aniqlik:** Yuqori sifatli (matn o'qilishi kerak)
- **Rang:** To'liq rangli (RGB)

---

## 📁 Screenshotlarni Saqlash

### Papka tuzilishi:

```
web/
├── screenshots/
│   ├── 1-home.png                  # Bosh sahifa
│   ├── 2-text-input.png            # Matn kiritish
│   ├── 3-safe-result.png           # Xavfsiz natija
│   ├── 4-harmful-result.png        # Zararli natija
│   ├── 5-website-check.png         # Sayt tekshirish
│   ├── 6-admin-panel.png           # Admin panel
│   └── 7-admin-filter.png          # Admin filtrlash
```

---

## ✅ Tekshirish Checklist

Screenshot olishdan keyin quyidagilarni tekshiring:

### Texnik Tekshiruv
- [ ] Barcha 7 ta screenshot mavjud
- [ ] Fayl nomlari to'g'ri (1-home.png, 2-text-input.png, ...)
- [ ] Format: PNG
- [ ] Sifat: Yuqori (matn o'qiladi)
- [ ] O'lcham: Kamida 1280x720

### Kontent Tekshiruvi
- [ ] Navbar barcha screenshotlarda ko'rinadi
- [ ] "SafeNet Kids" branding ko'rinadi
- [ ] Matnlar o'qiladi (blur yo'q)
- [ ] Ranglar to'g'ri ko'rinadi
- [ ] Loading indicator yo'q (natijalar to'liq yuklangan)

### Prezentatsiya Uchun
- [ ] Har bir screenshot uchun tavsif tayyorlang
- [ ] Screenshotlarni PowerPoint yoki PDF ga joylashtiring
- [ ] Har bir screenshot ostiga izoh qo'shing (o'zbek tilida)

---

## 🎤 Himoya Paytida Tushuntirish

Har bir screenshot uchun qisqa tushuntirish:

### 1. Bosh sahifa
> "Bu SafeNet Kids loyihasining bosh sahifasi. Bu yerda loyihaning asosiy maqsadi, imkoniyatlari va ishlash mexanizmi tushuntirilgan. Matn tahlili, sayt filtri, AI tushuntirish kabi xususiyatlar bor."

### 2. Matn kiritish
> "Foydalanuvchi tahlil qilmoqchi bo'lgan matnni kiritadi. Masalan, SMS, xabar, komment yoki postni tekshirish mumkin. Ota-ona nazorati rejimini yoqish ham mumkin."

### 3. Xavfsiz natija
> "Tizim matnni tahlil qilib, xavfsiz deb topdi. Yashil rang xavfsiz ekanligini bildiradi. Ball 0, chunki hech qanday zararli so'z topilmadi. AI tushuntirishlari va maslahatlar ham berilgan."

### 4. Zararli natija
> "Bu matnda zararli so'zlar topildi. Qizil rang xavfli ekanligini bildiradi. Ball yuqori (60+), chunki zo'ravonlik va tahdid so'zlari aniqlandi. Ota-onalarga ogohlantirish berilgan."

### 5. Sayt tekshirish
> "Veb-saytlarni ham tekshirish mumkin. Masalan, Wikipedia xavfsiz ta'lim sayti sifatida tanildi. Agar casino.com kabi saytni tekshirsak, bloklangan deb chiqadi."

### 6. Admin panel
> "Admin panelda barcha tekshiruvlar tarixi va statistika ko'rinadi. Jami nechta tekshirish qilingan, qanchasi xavfsiz, qanchasi zararli - hammasi ko'rsatilgan. Matn va sayt tekshiruvlari alohida statistika bilan."

### 7. Admin filtrlash
> "Admin panelda filtrlash imkoniyati bor. 'Faqat matn' yoki 'Faqat sayt' deb filtr qo'yish mumkin. Bu tarixni tezda ko'rib chiqishni osonlashtiradi."

---

## 📊 Qo'shimcha Screenshot Variantlari (Ixtiyoriy)

Agar vaqt bo'lsa, quyidagi qo'shimcha screenshotlarni ham olishingiz mumkin:

### 8. Ota-ona nazorati rejimi
- Ota-ona nazorati yoqilgan holda matn tahlil qilish
- Farqni ko'rsatish uchun bir xil matnni oddiy va parent mode da tahlil qiling

### 9. Shubhali natija
- O'rtacha xavfli matn (ball 20-50)
- Sariq rang bilan "Shubhali" natija

### 10. Mobile view
- Brauzer o'lchamini kichiklashtiring (375x667 - iPhone o'lchami)
- Responsive dizaynni ko'rsating

### 11. About sahifasi
- Loyiha haqida batafsil ma'lumot
- Texnologiyalar va mualliflar

---

## 📝 Hisobot Uchun Tayyorlash

### Screenshotlarni BMI hisobotiga qo'yish:

1. **Word/Google Docs uchun:**
   - Insert > Picture > Image from file
   - Har bir screenshot ostiga caption qo'shing
   - Format: "Rasm 1. SafeNet Kids bosh sahifasi"

2. **PowerPoint uchun:**
   - Har bir screenshot uchun alohida slide
   - Screenshot yuqorida, tushuntirish pastda
   - Animatsiya qo'shing (ixtiyoriy)

3. **PDF uchun:**
   - Word yoki PowerPoint dan PDF export qiling
   - Sifatni yuqori qilib qo'ying (High Quality Print)

---

## 🎯 Xulosa

Ushbu qo'llanma orqali siz BMI himoyasi uchun professional va to'liq screenshotlar to'plamini tayyorlaysiz. Barcha screenshotlar:

- ✅ Loyihaning barcha asosiy xususiyatlarini ko'rsatadi
- ✅ Professional va aniq
- ✅ O'zbek tilida
- ✅ BMI talablariga mos
- ✅ Himoya paytida tushuntirish uchun qulay

---

**Omad tilaymiz BMI himoyasida! 🎓**

**© 2026 SafeNet Kids**
