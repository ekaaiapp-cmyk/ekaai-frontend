import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../hooks/useLoading';
import { DashboardLayout, PageLayout } from './common/Layout';
import { Card, Button, LoadingSpinner, FeatureCard } from './ui';

const StudentDashboardRefactored: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { executeAsync, isLoading: isSigningOut } = useLoading();

  const handleSignOut = async () => {
    await executeAsync(async () => {
      console.log('🔓 Dashboard: Starting sign out process...');
      await signOut();
      console.log('✅ Dashboard: Sign out successful, redirecting to home...');
      navigate('/', { replace: true });
    });
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-primary-text mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Ask AI Tutor',
      description: 'Get instant help with any academic question',
      link: { to: '/doubt-clearing', text: 'Start Learning' }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: 'Practice Tests',
      description: 'Take adaptive tests based on your learning level',
      link: { to: '#', text: 'Coming Soon' }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'My Flashcards',
      description: 'Review and memorize key concepts',
      link: { to: '#', text: 'Coming Soon' }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Content Library',
      description: 'Access personalized learning materials',
      link: { to: '#', text: 'Coming Soon' }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'My Progress',
      description: 'Track your learning journey and achievements',
      link: { to: '#', text: 'Coming Soon' }
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Settings',
      description: 'Manage your profile and preferences',
      link: { to: '/settings', text: 'Manage Profile' }
    }
  ];

  return (
    <DashboardLayout
      user={profile}
      onSignOut={handleSignOut}
      isSigningOut={isSigningOut}
    >
      <PageLayout>
        {/* Welcome Section */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold text-primary-text-bright mb-2">
                Welcome back, {profile.fullName?.split(' ')[0] || 'Student'}! 👋
              </h2>
              <p className="text-primary-text">
                Ready to continue your learning journey? Let's make today productive!
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-primary-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-headline font-semibold text-primary-text-bright mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            ))}
          </div>
        </div>

        {/* Learning Stats */}
        <Card>
          <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
            Your Learning Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-primary-accent mb-1">0</div>
              <div className="text-sm text-primary-text">Questions Asked</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-primary-accent mb-1">0</div>
              <div className="text-sm text-primary-text">Topics Mastered</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-primary-accent mb-1">0</div>
              <div className="text-sm text-primary-text">Study Streak</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-primary-text mb-4">
              Start using EkaAI to see your progress here!
            </p>
            <Link to="/doubt-clearing">
              <Button variant="primary">
                Ask Your First Question
              </Button>
            </Link>
          </div>
        </Card>
      </PageLayout>
    </DashboardLayout>
  );
};

export default StudentDashboardRefactored;
