import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MetricsProvider } from './context/MetricsContext';
import Dashboard from './pages/Dashboard';
import './styles/index.css';
import './styles/components.css';

function App() {
  return (
    <MetricsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
    </MetricsProvider>
  );
}

export default App;
