import React, { useState, useEffect } from 'react';
import { getUnifiedStats, getUnifiedHistory, deleteAnalysis } from '../services/api';
import Loading from '../components/Loading';

/**
 * Admin panel component - Unified view for text analysis and website checks
 */
const Admin = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all'); // 'all', 'text', 'website'

  /**
   * Fetch stats and history on component mount and when filter changes
   */
  useEffect(() => {
    fetchData();
  }, [currentPage, filterType]);

  /**
   * Fetch unified stats and history data
   */
  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch unified stats and history in parallel
      const [statsResponse, historyResponse] = await Promise.all([
        getUnifiedStats(),
        getUnifiedHistory(20, currentPage, filterType)
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      if (historyResponse.success) {
        setHistory(historyResponse.data.records);
        setTotalPages(historyResponse.data.pagination.pages);
      }
    } catch (err) {
      setError(err.message || 'Ma\'lumotlarni olishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle delete analysis
   */
  const handleDelete = async (id) => {
    if (!window.confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      return;
    }

    try {
      await deleteAnalysis(id);
      // Refresh data
      fetchData();
    } catch (err) {
      alert('O\'chirishda xatolik: ' + err.message);
    }
  };

  /**
   * Format date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Truncate text
   */
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading && !stats) {
    return (
      <div className="container">
        <Loading message="Ma'lumotlar yuklanmoqda..." />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="container">
        <div className="card" style={{ background: '#FEE2E2', color: '#991B1B' }}>
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Admin Panel</h1>
        <p className="hero-subtitle">
          Statistika va tahlillar tarixi
        </p>
      </div>

      {/* Statistics */}
      {stats && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Jami tekshiruvlar</div>
              <div className="stat-value">{stats.total}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>
                Matn: {stats.byType.text} | Sayt: {stats.byType.website}
              </div>
            </div>

            <div className="stat-card safe">
              <div className="stat-label">Xavfsiz</div>
              <div className="stat-value" style={{ color: 'var(--success-color)' }}>
                {stats.byResult.safe}
              </div>
            </div>

            <div className="stat-card suspicious">
              <div className="stat-label">Shubhali</div>
              <div className="stat-value" style={{ color: 'var(--warning-color)' }}>
                {stats.byResult.suspicious}
              </div>
            </div>

            <div className="stat-card harmful">
              <div className="stat-label">Zararli / Bloklangan</div>
              <div className="stat-value" style={{ color: 'var(--danger-color)' }}>
                {stats.byResult.harmful}
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="card">
            <h2 className="card-title">📊 Batafsil statistika</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              {/* Text Analysis Stats */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  📝 Matn tahlili
                </h3>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  <div>Jami: <strong>{stats.details.text.total}</strong></div>
                  <div style={{ color: 'var(--success-color)' }}>Xavfsiz: <strong>{stats.details.text.safe}</strong></div>
                  <div style={{ color: 'var(--warning-color)' }}>Shubhali: <strong>{stats.details.text.suspicious}</strong></div>
                  <div style={{ color: 'var(--danger-color)' }}>Zararli: <strong>{stats.details.text.harmful}</strong></div>
                </div>
              </div>

              {/* Website Check Stats */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                  🌐 Sayt tekshiruvi
                </h3>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  <div>Jami: <strong>{stats.details.website.total}</strong></div>
                  <div style={{ color: 'var(--success-color)' }}>Xavfsiz: <strong>{stats.details.website.safe}</strong></div>
                  <div style={{ color: 'var(--warning-color)' }}>Shubhali: <strong>{stats.details.website.suspicious}</strong></div>
                  <div style={{ color: 'var(--danger-color)' }}>Bloklangan: <strong>{stats.details.website.blocked}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* History Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📜 Tekshiruvlar tarixi</h2>
          <p className="card-subtitle">
            {filterType === 'all' && `Barcha tekshiruvlar (${history.length})`}
            {filterType === 'text' && `Faqat matn tahlillari (${history.length})`}
            {filterType === 'website' && `Faqat sayt tekshiruvlari (${history.length})`}
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setFilterType('all'); setCurrentPage(1); }}
            style={{ flex: '1', minWidth: '150px' }}
          >
            📊 Hammasi
          </button>
          <button
            className={`btn ${filterType === 'text' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setFilterType('text'); setCurrentPage(1); }}
            style={{ flex: '1', minWidth: '150px' }}
          >
            📝 Faqat matn
          </button>
          <button
            className={`btn ${filterType === 'website' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setFilterType('website'); setCurrentPage(1); }}
            style={{ flex: '1', minWidth: '150px' }}
          >
            🌐 Faqat sayt
          </button>
        </div>

        {history.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            {filterType === 'all' && 'Hozircha tekshiruvlar yo\'q'}
            {filterType === 'text' && 'Hozircha matn tahlillari yo\'q'}
            {filterType === 'website' && 'Hozircha sayt tekshiruvlari yo\'q'}
          </p>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Turi</th>
                    <th>Sana</th>
                    <th>Kiritilgan ma'lumot</th>
                    <th>Natija</th>
                    <th>Tafsilot</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <span
                          className={`badge ${item.type === 'text' ? 'badge-info' : 'badge-secondary'}`}
                          style={{
                            whiteSpace: 'nowrap',
                            background: item.type === 'text' ? '#3B82F6' : '#8B5CF6',
                            color: 'white'
                          }}
                        >
                          {item.type === 'text' ? '📝 Matn' : '🌐 Sayt'}
                        </span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {formatDate(item.timestamp)}
                      </td>
                      <td>
                        <div style={{ maxWidth: '300px' }}>
                          {item.type === 'text'
                            ? truncateText(item.input)
                            : <a href={item.input} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>
                                {truncateText(item.domain || item.input, 50)}
                              </a>
                          }
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-${
                            item.result === 'Xavfsiz'
                              ? 'safe'
                              : item.result === 'Shubhali'
                              ? 'suspicious'
                              : 'harmful'
                          }`}
                        >
                          {item.result}
                        </span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '200px', fontSize: '0.85rem' }}>
                          {item.type === 'text' ? (
                            <>
                              {item.score !== undefined && <div>Ball: {item.score}</div>}
                              {item.detectedKeywords && item.detectedKeywords.length > 0 && (
                                <div>So'zlar: {item.detectedKeywords.slice(0, 2).join(', ')}</div>
                              )}
                            </>
                          ) : (
                            <>
                              {item.categoryName && <div>Turkum: {item.categoryName}</div>}
                              {item.explanation && <div style={{ color: 'var(--text-secondary)' }}>{truncateText(item.explanation, 50)}</div>}
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => handleDelete(item._id)}
                        >
                          O'chirish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Oldingi
                </button>

                <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                  {currentPage} / {totalPages}
                </span>

                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Keyingi →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Refresh Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className="btn btn-primary"
          onClick={fetchData}
          disabled={loading}
        >
          🔄 Yangilash
        </button>
      </div>
    </div>
  );
};

export default Admin;
