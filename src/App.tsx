import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeV1 from './pages/HomeV1';
import HomeV2 from './pages/HomeV2';
import HomeV3 from './pages/HomeV3';
import Experts from './pages/Experts';
import LabRoutes from './pages/LabRoutes';
import SciencePage from './pages/SciencePage';
import ProgrammePage from './pages/ProgrammePage';
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
        <Route path="/experts" element={<Experts />} />
        <Route path="/lab-routes" element={<LabRoutes />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/programme" element={<ProgrammePage />} />
      </Routes>
      <RegistrationModal />
    </Router>
  );
}

export default App;
