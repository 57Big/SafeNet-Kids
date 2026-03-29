import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import WebsiteFilter from './pages/WebsiteFilter';
import About from './pages/About';
import Admin from './pages/Admin';
import './assets/styles/App.css';

/**
 * Main App component
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/website-filter" element={<WebsiteFilter />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          marginTop: '4rem',
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)'
        }}>
          <p>
            🛡️ SafeNet Kids - Bolalar uchun Internet Xavfsizligi Tizimi
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            BMI Bitirruv Ishi | 2026
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
