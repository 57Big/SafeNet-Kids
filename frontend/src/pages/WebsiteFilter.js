import React, { useState } from 'react';
import { checkWebsite } from '../services/api';
import Loading from '../components/Loading';

/**
 * Website Filter page component
 */
const WebsiteFilter = () => {
  const [url, setUrl] = useState('');
  const [parentMode, setParentMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!url.trim()) {
      setError('Iltimos, URL kiriting');
      return;
    }

    // Clear previous results
    setError('');
    setResult(null);
    setLoading(true);

    try {
      // Call API
      const response = await checkWebsite(url, parentMode);

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'URL tekshirishda xatolik');
      }
    } catch (err) {
      setError(err.message || 'Serverga ulanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear form
   */
  const handleClear = () => {
    setUrl('');
    setResult(null);
    setError('');
  };

  /**
   * Get result styling
   */
  const getResultStyle = () => {
    if (!result) return '';
    if (result.result === 'Xavfsiz') return 'safe';
    if (result.result === 'Shubhali') return 'suspicious';
    return 'harmful';
  };

  /**
   * Get result icon
   */
  const getIcon = () => {
    if (!result) return '';
    if (result.result === 'Xavfsiz') return '✅';
    if (result.result === 'Shubhali') return '⚠️';
    return '🚫';
  };

  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Sayt Xavfsizlik Tekshiruvi</h1>
        <p className="hero-subtitle">
          Website URL manzilini kiriting va bolalar uchun xavfsizligini tekshiring
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Website URL manzili
            </label>
            <input
              type="text"
              className="form-textarea"
              style={{ minHeight: '50px' }}
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              To'liq URL kiriting (masalan: https://google.com)
            </small>
          </div>

          {/* Parent Mode Toggle */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={parentMode}
                onChange={(e) => setParentMode(e.target.checked)}
                disabled={loading}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <strong>Ota-ona nazorati rejimi</strong>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Qattiqroq filtrlash - noma'lum saytlarni ham bloklaydi
                </div>
              </div>
            </label>
          </div>

          {error && (
            <div
              style={{
                background: '#FEE2E2',
                color: '#991B1B',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading || !url.trim()}
            >
              {loading ? 'Tekshirilmoqda...' : '🔍 Tekshirish'}
            </button>

            {url && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
                disabled={loading}
              >
                Tozalash
              </button>
            )}
          </div>
        </form>

        {loading && (
          <Loading message="Website tekshirilmoqda. Iltimos kuting..." />
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className={`result-box ${getResultStyle()} fade-in`}>
          <div className="result-icon">{getIcon()}</div>

          <h2 className="result-title">{result.result}</h2>

          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            <strong>Domen:</strong> {result.domain}
          </p>

          {result.categoryName && (
            <p className="badge badge-harmful" style={{ fontSize: '1rem', padding: '0.5rem 1rem', display: 'inline-block' }}>
              Kategoriya: {result.categoryName}
            </p>
          )}

          <div className="result-explanation">
            <h3 style={{ marginBottom: '1rem' }}>📝 Tushuntirish:</h3>
            <p>{result.reason}</p>
          </div>

          {result.parentMode && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#FEF3C7', borderRadius: '0.5rem' }}>
              <strong>🛡️ Ota-ona nazorati rejimi faol</strong>
            </div>
          )}
        </div>
      )}

      {/* Example URLs */}
      {!result && !loading && (
        <div className="card" style={{ background: 'var(--light-color)' }}>
          <h3 style={{ marginBottom: '1rem' }}>💡 Misol URLlar</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Quyidagi misollardan birini bosib sinab ko'ring:
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setUrl('https://wikipedia.org')}
              style={{ textAlign: 'left', background: 'white', justifyContent: 'flex-start' }}
            >
              ✅ https://wikipedia.org (Xavfsiz sayt)
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setUrl('https://unknown-random-site.com')}
              style={{ textAlign: 'left', background: 'white', justifyContent: 'flex-start' }}
            >
              ⚠️ https://unknown-random-site.com (Noma'lum sayt)
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setUrl('https://casino-example.com')}
              style={{ textAlign: 'left', background: 'white', justifyContent: 'flex-start' }}
            >
              🚫 https://casino-example.com (Zararli kontent)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteFilter;
