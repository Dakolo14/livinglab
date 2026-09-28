import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import HomeV1 from './pages/HomeV1';
import Home from './pages/Home';
import About from './pages/About';
import Experts from './pages/Experts';
import LabRoutes from './pages/LabRoutes';
import ProductsPage from './pages/ProductsPage';
import SciencePage from './pages/SciencePage';
import ProgrammePage from './pages/ProgrammePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminScanner } from './pages/admin/AdminScanner';
import AdminBroadcasts from './pages/admin/AdminBroadcasts';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import NotFound from './pages/NotFound';
import RegistrationModal from './components/layout/RegistrationModal';
import CookieBanner from './components/layout/CookieBanner';
import OfflineNotification from './components/layout/OfflineNotification';
import ScrollToTop from './components/layout/ScrollToTop';
import usePageTracking from './hooks/usePageTracking';
import { Toaster } from 'sonner';
import './App.css';

const PageTracker = () => {
  usePageTracking();
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
        <ScrollToTop />
        <PageTracker />
        <OfflineNotification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<HomeV1 />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/lab-routes" element={<LabRoutes />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/scanner" element={<ProtectedRoute><AdminScanner /></ProtectedRoute>} />
          <Route path="/admin/broadcasts" element={<ProtectedRoute><AdminBroadcasts /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <RegistrationModal />
        <CookieBanner />
        <Toaster position="top-right" richColors />
      </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
