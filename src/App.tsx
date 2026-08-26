import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeV1 from './pages/HomeV1';
import HomeV2 from './pages/HomeV2';
import HomeV3 from './pages/HomeV3';
import RegistrationModal from './components/layout/RegistrationModal';
import ScrollToTop from './components/layout/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/v1" replace />} />
        <Route path="/v1" element={<HomeV1 />} />
        <Route path="/v2" element={<HomeV2 />} />
        <Route path="/v3" element={<HomeV3 />} />
      </Routes>
      <RegistrationModal />
    </Router>
  );
}

export default App;
