import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../ui';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonProps?: {
    to: string;
    label?: string;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backButtonProps
}) => {
  return (
    <div className="min-h-screen bg-primary-bg py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title={title}
          subtitle={subtitle}
          backButton={showBackButton && backButtonProps ? {
            onClick: () => window.history.back(),
            label: backButtonProps.label
          } : undefined}
        />
        {children}
      </div>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    fullName?: string;
    email?: string;
  } | null;
  onSignOut?: () => void;
  isSigningOut?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  onSignOut,
  isSigningOut = false
}) => {
  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-2xl font-headline font-bold text-primary-text-bright hover:text-primary-accent transition-colors duration-200"
            >
              EkaAI
            </Link>
            <div className="w-px h-6 bg-gray-600"></div>
            <h2 className="text-lg font-medium text-primary-text">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-primary-text">
                Welcome, {user.fullName?.split(' ')[0] || 'Student'}!
              </span>
            )}
            <Link
              to="/settings"
              className="text-sm text-primary-text hover:text-primary-accent transition-colors duration-200"
            >
              Settings
            </Link>
            {onSignOut && (
              <button
                onClick={onSignOut}
                disabled={isSigningOut}
                className="text-sm text-gray-400 hover:text-primary-accent transition-colors duration-200 disabled:opacity-50"
              >
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = true
}) => {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const containerClasses = [
    maxWidthClasses[maxWidth],
    'mx-auto',
    padding ? 'px-6 py-8' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};
