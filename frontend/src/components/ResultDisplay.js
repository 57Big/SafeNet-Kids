import React from 'react';

/**
 * Display analysis result with explanation
 * @param {object} result - Analysis result data
 */
const ResultDisplay = ({ result }) => {
  if (!result) return null;

  // Determine result type for styling
  const resultType = result.result === 'Xavfsiz'
    ? 'safe'
    : result.result === 'Shubhali'
    ? 'suspicious'
    : 'harmful';

  // Get appropriate icon
  const getIcon = () => {
    if (result.result === 'Xavfsiz') return '✅';
    if (result.result === 'Shubhali') return '⚠️';
    return '🚫';
  };

  return (
    <div className={`result-box ${resultType} fade-in`}>
      <div className="result-icon">{getIcon()}</div>

      <h2 className="result-title">{result.result}</h2>

      <p className="result-score">
        Xavflilik darajasi: {result.score}/100
      </p>

      {result.detectedKeywords && result.detectedKeywords.length > 0 && (
        <div className="result-keywords">
          <strong>Topilgan so'zlar:</strong>
          {result.detectedKeywords.map((keyword, index) => (
            <span key={index} className="keyword-badge">
              {keyword}
            </span>
          ))}
        </div>
      )}

      {result.explanation && (
        <div className="result-explanation">
          <h3 style={{ marginBottom: '1rem' }}>📝 Tushuntirish:</h3>
          <p>{result.explanation}</p>
        </div>
      )}

      {result.details && (
        <div style={{ marginTop: '1rem', opacity: 0.8 }}>
          <small>{result.details}</small>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
