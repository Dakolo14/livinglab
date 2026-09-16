import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomeV1 from './pages/HomeV1';
import Home from './pages/Home';
import Experts from './pages/Experts';
import LabRoutes from './pages/LabRoutes';
import SciencePage from './pages/SciencePage';
import ProgrammePage from './pages/ProgrammePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import RegistrationModal from './components/layout/RegistrationModal';
import CookieBanner from './components/layout/CookieBanner';
import OfflineNotification from './components/layout/OfflineNotification';
import ScrollToTop from './components/layout/ScrollToTop';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <OfflineNotification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<HomeV1 />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/lab-routes" element={<LabRoutes />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RegistrationModal />
        <CookieBanner />
      </Router>
    </HelmetProvider>
  );
}

export default App;
