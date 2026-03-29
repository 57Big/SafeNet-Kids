import React from 'react';

/**
 * About page component - Loyiha haqida ma'lumot
 */
const About = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">
          📚 Loyiha Haqida
        </h1>
        <p className="hero-subtitle">
          Bolalar uchun xavfsiz internet muhitini yaratish maqsadida ishlab chiqilgan zamonaviy filtrlash tizimi
        </p>
      </div>

      {/* Main Info */}
      <div className="card fade-in-left">
        <h2 className="card-title">🎯 Loyihaning Maqsadi</h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Zamonaviy raqamli dunyoda bolalar internet orqali turli xil ma'lumotlarga ega bo'lmoqdalar.
          Afsuski, bu ma'lumotlar ichida bolalar uchun zararli va nomaqbul kontentlar ham mavjud.
          Ushbu loyiha ota-onalar va o'qituvchilarga bolalarni internetdagi xavflardan himoya qilishda
          yordam berish uchun yaratilgan.
        </p>
        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '1rem', color: 'white' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>💡 Asosiy Vazifalar:</h3>
          <ul style={{ lineHeight: '2', fontSize: '1.05rem', paddingLeft: '1.5rem' }}>
            <li>Zararli va noqulay matnlarni avtomatik aniqlash</li>
            <li>Xavfli veb-saytlarni bloklash va ogohlantirish</li>
            <li>Ota-onalar uchun nazorat vositalarini taqdim etish</li>
            <li>AI asosida chuqur tahlil va tushuntirish</li>
            <li>Bolalar uchun xavfsiz internet muhitini ta'minlash</li>
          </ul>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card fade-in-right" style={{ animationDelay: '0.2s' }}>
        <h2 className="card-title">⚙️ Texnologiyalar</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>

          {/* Frontend */}
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: '1rem', color: 'white' }}>
            <h3 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.3rem' }}>🎨 Frontend</h3>
            <ul style={{ listStyle: 'none', lineHeight: '2' }}>
              <li>⚛️ React.js 18</li>
              <li>🎭 React Router v6</li>
              <li>🎨 Modern CSS3</li>
              <li>📱 Responsive Design</li>
              <li>✨ Smooth Animations</li>
            </ul>
          </div>

          {/* Backend */}
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '1rem', color: 'white' }}>
            <h3 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.3rem' }}>🔧 Backend</h3>
            <ul style={{ listStyle: 'none', lineHeight: '2' }}>
              <li>🟢 Node.js</li>
              <li>🚀 Express.js</li>
              <li>🍃 MongoDB Atlas</li>
              <li>🔐 Helmet.js (Security)</li>
              <li>⏱️ Rate Limiting</li>
            </ul>
          </div>

          {/* AI & Algorithms */}
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '1rem', color: 'white' }}>
            <h3 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.3rem' }}>🤖 AI va Algoritmlar</h3>
            <ul style={{ listStyle: 'none', lineHeight: '2' }}>
              <li>🧠 OpenAI GPT-3.5</li>
              <li>🔍 Kalit so'zlar tahlili</li>
              <li>📊 Scoring System</li>
              <li>🌐 URL Pattern Matching</li>
              <li>🎯 Hybrid Filtering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card scale-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="card-title">✨ Funksiyalar</h2>
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>

          {/* Feature 1 */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>📝</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Matn Tahlili</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Har qanday matnni (SMS, xabar, comment, post) real vaqt rejimida tahlil qiling.
                Tizim 500+ zararli kalit so'zlar bazasiga ega va ularni avtomatik aniqlaydi.
                Natija: Xavfsiz, Shubhali yoki Zararli.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>🌐</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Sayt Filtri</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Veb-saytlarni real vaqtda tekshiring. Bloklangan domenlar bazasi, xavfli kategoriyalar
                (kattalar uchun kontent, qimor o'yinlari, zo'ravonlik, zararli dasturlar) aniqlash.
                URL pattern matching texnologiyasi.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>👪</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Ota-ona Nazorati</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Maxsus "Parent Mode" rejimi - qattiqroq filtrlash. Ball hisoblash 1.5x ko'paytiriladi,
                shubhali kontentlar uchun past chegaralar (threshold) qo'llaniladi. Bolalar uchun
                maksimal himoya.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>🤖</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>AI Tushuntirish</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                OpenAI GPT-3.5 turbo modeli orqali batafsil tushuntirish. Nima uchun bu matn xavfli?
                Qanday xavflar mavjud? Ota-onalarga qanday maslahatlar? - hammasiga javob beriladi.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>📊</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Admin Panel va Statistika</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Barcha tahlillar tarixi saqlanadi. Real-time statistika: jami tekshiruvlar,
                xavfsiz/shubhali/zararli nisbati. Filtrlar: faqat matn, faqat sayt yoki hammasi birga.
                Monitoring va kuzatuv imkoniyati.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* How It Works */}
      <div className="card fade-in-left" style={{ animationDelay: '0.6s', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h2 style={{ marginBottom: '2rem', color: 'white', fontSize: '1.8rem' }}>🔄 Qanday Ishlaydi?</h2>

        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>1</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Foydalanuvchi ma'lumot kiritadi</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Matn yoki URL kiritiladi. Ixtiyoriy "Ota-ona nazorati" rejimi yoqilishi mumkin.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>2</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Backend tahlil qiladi</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Kalit so'zlar bazasi bilan solishtirish, URL pattern matching, ball hisoblash (scoring).
                Agar parent mode yoqilgan bo'lsa - qattiqroq filtrlash.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>3</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>AI chuqur tahlil</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.8' }}>
                OpenAI GPT-3.5 modeliga so'rov yuboriladi. AI matnni kontekstni hisobga olgan holda
                tahlil qiladi va batafsil tushuntirish beradi (Uzbek tilida).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>4</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Natija ko'rsatiladi</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Xavfsiz (yashil), Shubhali (sariq) yoki Zararli (qizil) natijasi foydalanuvchiga
                ko'rsatiladi. Ball, topilgan so'zlar, AI tushuntirishlari birga taqdim etiladi.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>5</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Ma'lumotlar saqlanadi</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Har bir tahlil MongoDB bazasiga saqlanadi. Admin panelda monitoring va
                statistikani ko'rish mumkin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="card fade-in-right" style={{ animationDelay: '0.8s' }}>
        <h2 className="card-title">📋 Loyiha Ma'lumotlari</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>👨‍🎓 Muallif</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Normamatova Iroda Shuhrat qizi</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>🏛️ Universitet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Toshkent Axborot Texnologiyalari Universiteti</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>📅 Yil</h3>
            <p style={{ color: 'var(--text-secondary)' }}>2022-2026</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>📝 Turi</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Bitiruv Malakaviy Ishi</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>🎯 Yo'nalish</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Kompyuter Injiniringi (“AT-Servis”)</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>📊 Status</h3>
            <p style={{ color: 'var(--success-color)', fontWeight: '600' }}>✅ Production Ready</p>
          </div>

        </div>
      </div>

      {/* Advantages */}
      <div className="card scale-in" style={{ animationDelay: '1s', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.8rem' }}>🌟 Afzalliklar</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Tez va Samarali</h3>
            <p style={{ opacity: 0.9 }}>Real-time tahlil, bir necha soniyada natija</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Yuqori Aniqlik</h3>
            <p style={{ opacity: 0.9 }}>Hybrid filtering: kalit so'zlar + AI</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇺🇿</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>O'zbek Tilida</h3>
            <p style={{ opacity: 0.9 }}>To'liq lokalizatsiya va o'zbek kontenti</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔒</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Xavfsiz</h3>
            <p style={{ opacity: 0.9 }}>Helmet.js, rate limiting, CORS</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📱</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Responsive</h3>
            <p style={{ opacity: 0.9 }}>Har qanday qurilmada ishlaydi</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💾</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Cloud Database</h3>
            <p style={{ opacity: 0.9 }}>MongoDB Atlas - global accessibility</p>
          </div>

        </div>
      </div>

      {/* Future Plans */}
      <div className="card fade-in-left" style={{ animationDelay: '1.2s' }}>
        <h2 className="card-title">🚀 Kelajak Rejalari</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔌</span>
            <span style={{ color: 'var(--text-secondary)' }}>Brauzer kengaytmasi (Chrome/Firefox extension)</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📱</span>
            <span style={{ color: 'var(--text-secondary)' }}>Mobil ilova (iOS va Android)</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔐</span>
            <span style={{ color: 'var(--text-secondary)' }}>Foydalanuvchi autentifikatsiyasi (Login/Register)</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📧</span>
            <span style={{ color: 'var(--text-secondary)' }}>Email bildirishnomalar (xavfli kontent topilganda)</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
            <span style={{ color: 'var(--text-secondary)' }}>Kengaytirilgan analytics va grafiklar</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌍</span>
            <span style={{ color: 'var(--text-secondary)' }}>Ko'p tillilik (Rus, Ingliz, O'zbek)</span>
          </div>
          <div style={{ padding: '1rem', background: 'var(--light-color)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🤝</span>
            <span style={{ color: 'var(--text-secondary)' }}>Maktablar va ta'lim muassasalari bilan integratsiya</span>
          </div>
        </div>
      </div>

      {/* Contact/Conclusion */}
      <div className="card scale-in" style={{
        animationDelay: '1.4s',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>💬 Fikr-Mulohaza</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.95, lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          Ushbu loyiha bolalar uchun xavfsiz internet muhitini yaratish yo'lida qo'yilgan kichik bir qadam.
          Sizning fikr va takliflaringiz loyihani yanada yaxshilashga yordam beradi.
        </p>
        <div style={{ marginTop: '2rem', fontSize: '2.5rem' }}>
          🛡️ 👨‍👩‍👧‍👦 💻
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>
          Bolalarning xavfsizligi - bizning ustuvor vazifamiz!
        </p>
      </div>

    </div>
  );
};

export default About;
