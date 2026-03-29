import React, { useState } from 'react';
import { analyzeText } from '../services/api';
import Loading from '../components/Loading';
import ResultDisplay from '../components/ResultDisplay';

/**
 * Analysis page component
 */
const Analyze = () => {
  const [text, setText] = useState('');
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
    if (!text.trim()) {
      setError('Iltimos, matn kiriting');
      return;
    }

    if (text.length > 10000) {
      setError('Matn juda uzun (maksimal 10000 belgi)');
      return;
    }

    // Clear previous results and errors
    setError('');
    setResult(null);
    setLoading(true);

    try {
      // Call API
      const response = await analyzeText(text, parentMode);

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Tahlil qilishda xatolik');
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
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Matn Tahlili</h1>
        <p className="hero-subtitle">
          Matnni kiriting va xavfsizlik tahlilini boshlang
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Tahlil qilinadigan matn
            </label>
            <textarea
              className="form-textarea"
              rows="8"
              placeholder="Bu yerga matnni kiriting..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
            <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              {text.length}/10000 belgi
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
                  Qattiqroq filtrlash - past ballli matnlar ham zararli deb hisoblanadi
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
              disabled={loading || !text.trim()}
            >
              {loading ? 'Tahlil qilinmoqda...' : '🔍 Tahlil qilish'}
            </button>

            {text && (
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
          <Loading message="Matn tahlil qilinmoqda. Iltimos kuting..." />
        )}
      </div>

      {result && <ResultDisplay result={result} />}

      {/* Example texts */}
      {!result && !loading && (
        <div className="card" style={{ background: 'var(--light-color)' }}>
          <h3 style={{ marginBottom: '1rem' }}>💡 Misol matnlar</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Quyidagi misollardan birini bosib sinab ko'ring:
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setText('Salom, men bugun kitob o\'qidim va juda yoqdi. Sport bilan shug\'ullanish ham foydali.')}
              style={{ textAlign: 'left', background: 'white' }}
            >
              ✅ Xavfsiz matn misoli
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setText('Men ota-onalarimdan yashirincha internet orqali noma\'lum odamlar bilan gaplashdim va ular meni yolg\'iz uchrashishga chaqirdi.')}
              style={{ textAlign: 'left', background: 'white' }}
            >
              ⚠️ Shubhali matn misoli
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setText('Siz ahmoqsiz, men sizni kaltaklayman va o\'ldirishni xohlayman. Bu yomon ish.')}
              style={{ textAlign: 'left', background: 'white' }}
            >
              🚫 Zararli matn misoli
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;
