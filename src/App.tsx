import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StudentSection from './components/StudentSection';
import EducatorSection from './components/EducatorSection';
import FinalCTA from './components/FinalCTA';
import WaitlistPage from './components/WaitlistPage';
import DoubtClearingPage from './components/DoubtClearingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-bg text-primary-text font-body">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HeroSection />
                <StudentSection />
                <EducatorSection />
                <FinalCTA />
              </main>
            </>
          } />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/doubt-clearing" element={<DoubtClearingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
