import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeV1 from './pages/HomeV1';
import Home from './pages/Home';
import Experts from './pages/Experts';
import LabRoutes from './pages/LabRoutes';
import SciencePage from './pages/SciencePage';
import ProgrammePage from './pages/ProgrammePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RegistrationModal from './components/layout/RegistrationModal';
import CookieBanner from './components/layout/CookieBanner';
import ScrollToTop from './components/layout/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<HomeV1 />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/lab-routes" element={<LabRoutes />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/programme" element={<ProgrammePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <RegistrationModal />
      <CookieBanner />
    </Router>
  );
}

export default App;
