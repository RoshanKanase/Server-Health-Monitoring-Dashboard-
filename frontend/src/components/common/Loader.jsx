import React from 'react';

const Loader = ({ message = 'Loading metrics…' }) => (
  <div className="loader-overlay">
    <div className="loader-spinner" />
    <p className="loader-text">{message}</p>
  </div>
);

export default Loader;
