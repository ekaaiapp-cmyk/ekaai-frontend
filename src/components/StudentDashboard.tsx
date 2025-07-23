import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      console.log('🔓 Dashboard: Starting sign out process...');
      await signOut();
      console.log('✅ Dashboard: Sign out successful, redirecting to home...');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('❌ Dashboard: Error signing out:', error);
      // Even if there's an error, try to navigate away
      navigate('/', { replace: true });
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-headline font-bold text-primary-text-bright">
              EkaAI
            </h1>
            <div className="w-px h-6 bg-gray-600"></div>
            <h2 className="text-lg font-medium text-primary-text">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-primary-text">
              Welcome, {profile.fullName}
            </span>
            <Link
              to="/settings"
              className="w-8 h-8 bg-primary-accent/20 rounded-full flex items-center justify-center text-primary-accent hover:bg-primary-accent/30 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h3 className="text-3xl font-headline font-bold text-primary-text-bright mb-2">
            Welcome back, {profile.fullName.split(' ')[0]}! 👋
          </h3>
          <p className="text-primary-text text-lg">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-primary-text">Study Streak</h4>
              <div className="w-8 h-8 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary-text-bright">3 days</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-primary-text">Questions Solved</h4>
              <div className="w-8 h-8 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary-text-bright">127</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-primary-text">Study Time</h4>
              <div className="w-8 h-8 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary-text-bright">8.5h</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-primary-text">Progress</h4>
              <div className="w-8 h-8 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary-text-bright">78%</div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ask a Doubt */}
          <Link
            to="/doubt-clearing"
            className="group bg-gradient-to-br from-primary-accent/20 to-primary-accent/5 border border-primary-accent/30 rounded-xl p-8 hover:from-primary-accent/30 hover:to-primary-accent/10 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-accent/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold text-primary-text-bright group-hover:text-primary-accent transition-colors duration-300">
                  Ask a Doubt
                </h3>
                <p className="text-primary-text text-sm">Get instant help from your AI tutor</p>
              </div>
            </div>
            <div className="flex items-center text-primary-accent group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm font-medium">Start asking questions</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Study Plan */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-primary-accent/50 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
                  Today's Study Plan
                </h3>
                <p className="text-primary-text text-sm">Personalized for your goals</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-primary-text text-sm">Mathematics - Quadratic Equations</span>
                <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">30 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-primary-text text-sm">Physics - Motion in a Plane</span>
                <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">45 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-accent/50 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-center text-sm font-medium text-primary-text-bright mb-1">My Flashcards</h4>
            <p className="text-center text-xs text-primary-text">Review & memorize</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-accent/50 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-center text-sm font-medium text-primary-text-bright mb-1">Content Library</h4>
            <p className="text-center text-xs text-primary-text">My notes & materials</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-accent/50 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-center text-sm font-medium text-primary-text-bright mb-1">My Progress</h4>
            <p className="text-center text-xs text-primary-text">Analytics & insights</p>
          </div>

          <Link
            to="/settings"
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary-accent/50 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-center text-sm font-medium text-primary-text-bright mb-1">Settings</h4>
            <p className="text-center text-xs text-primary-text">Manage profile</p>
          </Link>
        </div>

        {/* Quick Sign Out */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-sm text-gray-400 hover:text-primary-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningOut ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Signing out...
              </span>
            ) : (
              'Sign Out'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
