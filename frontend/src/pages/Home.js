import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Enhanced Home page component
 */
const Home = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="float-animation" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          🛡️
        </div>
        <h1 className="hero-title">
          SafeNet Kids - Bolalar uchun Internet Xavfsizligi
        </h1>
        <p className="hero-subtitle">
          Sun'iy intellekt va zamonaviy texnologiyalar yordamida bolalaringizni
          internetdagi xavflardan himoya qiling. Matnlar va veb-saytlarni real vaqtda
          tahlil qiluvchi professional tizim.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/analyze" className="btn btn-primary btn-large">
            🔍 Tahlilni Boshlash
          </Link>
          <Link to="/about" className="btn btn-secondary btn-large">
            📚 Batafsil Ma'lumot
          </Link>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="stats-grid">
        <div className="card fade-in-left" style={{ animationDelay: '0.1s' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>Matn Tahlili</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            Har qanday matnni (SMS, xabar, comment, post) kiritib, zararli so'zlar va
            kontentni aniqlang. 500+ kalit so'zlar bazasi va AI tahlili.
          </p>
          <Link to="/analyze" className="btn btn-primary" style={{ width: '100%' }}>
            Tahlil qilish →
          </Link>
        </div>

        <div className="card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>Sayt Filtri</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            Veb-saytlarni xavfsizlik darajasiga qarab tekshiring. Bloklangan domenlar,
            xavfli kategoriyalar va URL pattern matching.
          </p>
          <Link to="/website-filter" className="btn btn-primary" style={{ width: '100%' }}>
            Saytni tekshirish →
          </Link>
        </div>

        <div className="card fade-in-right" style={{ animationDelay: '0.3s' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.3rem' }}>AI Tushuntirish</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            OpenAI GPT-3.5 turbo modelidan foydalangan holda chuqur tahlil va
            batafsil tushuntirish. Ota-onalar uchun maslahatlar.
          </p>
          <div className="badge" style={{ display: 'inline-block', background: 'var(--gradient-1)', color: 'white', padding: '0.5rem 1rem' }}>
            OpenAI GPT-3.5
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="card scale-in" style={{ animationDelay: '0.4s' }}>
        <div className="card-header">
          <h2 className="card-title">🔄 Qanday Ishlaydi?</h2>
          <p className="card-subtitle">
            Uch bosqichda avtomatik tahlil va natija
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)', borderRadius: '1rem' }}>
            <div style={{
              fontSize: '2.5rem',
              background: 'var(--gradient-1)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'white',
              fontWeight: 'bold'
            }}>1</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Ma'lumot Kiritish</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Tahlil qilmoqchi bo'lgan matn yoki URL kiritasiz. Agar kerak bo'lsa,
                "Ota-ona nazorati" rejimini faollashtiring - bu qattiqroq filtrlash
                uchun (scoring x1.5, past threshold).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', borderRadius: '1rem' }}>
            <div style={{
              fontSize: '2.5rem',
              background: 'var(--gradient-4)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'white',
              fontWeight: 'bold'
            }}>2</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--success-color)' }}>Avtomatik Tahlil</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Tizim kalit so'zlar bazasi bilan solishtiradi, ball hisoblab chiqadi (scoring system),
                va OpenAI API orqali AI tahlil qiladi. Barcha jarayon bir necha soniyada amalga oshadi.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), transparent)', borderRadius: '1rem' }}>
            <div style={{
              fontSize: '2.5rem',
              background: 'var(--gradient-3)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'white',
              fontWeight: 'bold'
            }}>3</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>Natija va Tushuntirish</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Xavfsiz (yashil), Shubhali (sariq) yoki Zararli (qizil) natijasi ko'rsatiladi.
                AI tomonidan batafsil tushuntirish, topilgan kalit so'zlar, ball va
                ota-onalar uchun maslahatlar beriladi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics/Features Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

        <div className="stat-card scale-in" style={{ animationDelay: '0.5s', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
          <div className="stat-label">Tahlil Tezligi</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>2-3s</div>
        </div>

        <div className="stat-card scale-in" style={{ animationDelay: '0.6s', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <div className="stat-label">Kalit So'zlar Bazasi</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>500+</div>
        </div>

        <div className="stat-card scale-in" style={{ animationDelay: '0.7s', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
          <div className="stat-label">Aniqlik Darajasi</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>95%+</div>
        </div>

        <div className="stat-card scale-in" style={{ animationDelay: '0.8s', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇺🇿</div>
          <div className="stat-label">Til Qo'llab-quvvatlash</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>O'zbek</div>
        </div>

      </div>

      {/* Key Features */}
      <div className="card fade-in-left" style={{ animationDelay: '0.9s', background: 'var(--gradient-1)', color: 'white' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.8rem' }}>
          ⚡ Asosiy Xususiyatlar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Kalit so'zlar asosida tez filtrlash</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>AI asosida chuqur tahlil (GPT-3.5)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>O'zbek tilida to'liq qo'llab-quvvatlash</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Tahlillar tarixini saqlash</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Admin panel va statistika</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Ota-ona nazorati rejimi</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Veb-saytlarni bloklash</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span>
            <span>Responsive dizayn (mobil/desktop)</span>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="card fade-in-right" style={{ animationDelay: '1s' }}>
        <h2 className="card-title">🔒 Xavfsizlik va Maxfiylik</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>

          <div style={{ padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem', border: '2px solid var(--success-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛡️</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--success-color)' }}>Helmet.js Security</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              HTTP headerlarni himoya qilish, XSS va boshqa web hujumlardan muhofaza
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem', border: '2px solid var(--warning-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⏱️</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--warning-color)' }}>Rate Limiting</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              15 daqiqada 100 ta so'rov cheklovi. DDoS va spam hujumlardan himoya
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--light-color)', borderRadius: '1rem', border: '2px solid var(--primary-color)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔐</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>CORS va Encryption</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Cross-Origin resurslarni boshqarish va ma'lumotlarni shifrlash
            </p>
          </div>

        </div>
      </div>

      {/* Parent Mode Info */}
      <div className="card scale-in" style={{ animationDelay: '1.1s', background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)', color: 'white' }}>
        <h2 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.8rem' }}>
          👪 Ota-ona Nazorati Rejimi
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', opacity: 0.95 }}>
          Maxsus ishlab chiqilgan "Parent Mode" rejimi bolalar uchun qattiqroq filtrlash
          ta'minlaydi. Ushbu rejim faollashtirilganda:
        </p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔢</span>
            <div>
              <strong>Scoring x1.5:</strong> Zararli so'zlar uchun ball 1.5 marta oshiriladi
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📉</span>
            <div>
              <strong>Threshold 20:</strong> Shubhali deb topish uchun past chegara (oddiy: 30)
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <div>
              <strong>Maksimal Himoya:</strong> Eng kichik shubhali kontent ham aniqlanadi
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card fade-in-up" style={{
        animationDelay: '1.2s',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '3rem 2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }} className="bounce-animation">
          🚀
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
          Hoziroq Boshlang!
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.95, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Bolalaringizni internetdagi xavflardan himoya qilish uchun bizning
          bepul va professional tizimimizdan foydalaning.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/analyze" className="btn" style={{
            background: 'white',
            color: 'var(--primary-color)',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            📝 Matn Tahlilini Boshlash
          </Link>
          <Link to="/website-filter" className="btn" style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            🌐 Sayt Tekshirish
          </Link>
        </div>
      </div>

      {/* Admin Panel Link */}
      <div className="card fade-in-left" style={{ animationDelay: '1.3s', textAlign: 'center', background: 'var(--light-color)' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          📊 Administratormisiz?
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Barcha tahlillar tarixi va statistikani ko'rish uchun admin panelga kiring
        </p>
        <Link to="/admin" className="btn btn-secondary">
          Admin Panel →
        </Link>
      </div>

    </div>
  );
};

export default Home;
