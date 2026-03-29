import React from 'react';

/**
 * Loading spinner component
 * @param {string} message - Loading message to display
 */
const Loading = ({ message = 'Yuklanmoqda...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
