import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StudentSection from './components/StudentSection';
import EducatorSection from './components/EducatorSection';
import FinalCTA from './components/FinalCTA';
import WaitlistPage from './components/WaitlistPage';
import DoubtClearingPage from './components/DoubtClearingPage';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import OnboardingForm from './components/OnboardingForm';
import StudentDashboard from './components/StudentDashboard';
import SettingsPage from './components/SettingsPage';
import LearningSessionPage from './components/LearningSessionPage';
import ProgressAnalyticsPage from './components/ProgressAnalyticsPage';
import FlashcardsPage from './components/FlashcardsPage';
import ContentLibraryPage from './components/ContentLibraryPage';
import LearningSessionsPage from './components/LearningSessionsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary-bg text-primary-text font-body">
          <Routes>
            {/* Public Routes */}
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
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            
            {/* Protected Routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingForm />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute requireProfile={true}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute requireProfile={true}>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/learning-session/:id" element={
              <ProtectedRoute requireProfile={true}>
                <LearningSessionPage />
              </ProtectedRoute>
            } />
            <Route path="/learning-session" element={
              <ProtectedRoute requireProfile={true}>
                <LearningSessionPage />
              </ProtectedRoute>
            } />
            <Route path="/learning-sessions" element={
              <ProtectedRoute requireProfile={true}>
                <LearningSessionsPage />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute requireProfile={true}>
                <ProgressAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/flashcards" element={
              <ProtectedRoute requireProfile={true}>
                <FlashcardsPage />
              </ProtectedRoute>
            } />
            <Route path="/content-library" element={
              <ProtectedRoute requireProfile={true}>
                <ContentLibraryPage />
              </ProtectedRoute>
            } />
            <Route path="/doubt-clearing/:sessionId" element={
              <ProtectedRoute requireProfile={true}>
                <DoubtClearingPage />
              </ProtectedRoute>
            } />
            
            {/* Redirect old routes */}
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
