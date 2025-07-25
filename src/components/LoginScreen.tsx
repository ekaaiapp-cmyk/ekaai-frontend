import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGoogleOAuth } from '../hooks/useGoogleOAuth';

const LoginScreen: React.FC = () => {
  const { loading } = useAuth();
  const { error: googleError, initializeGoogleSignIn } = useGoogleOAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Sign-In when component mounts and SDK is loaded
    const timer = setTimeout(() => {
      if (googleButtonRef.current) {
        initializeGoogleSignIn('google-signin-button');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [initializeGoogleSignIn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-4xl font-headline font-bold text-primary-text-bright">
              EkaAI
            </h1>
          </Link>
          <div className="w-16 h-1 bg-primary-accent mx-auto rounded-full mb-6"></div>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          {/* Login Prompt */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-headline font-semibold text-primary-text-bright mb-3">
              Sign in to EkaAI
            </h2>
            <p className="text-primary-text">
              Continue with Google to personalize your learning journey.
            </p>
          </div>

          {/* Error Display */}
          {googleError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{googleError}</p>
            </div>
          )}

          {/* Google Sign-in Button Container */}
          <div className="w-full">
            {/* Custom Google Button (fallback) */}
            <div 
              ref={googleButtonRef}
              id="google-signin-button"
              className="w-full min-h-[50px] flex items-center justify-center"
            >
              {/* Loading state while Google SDK initializes */}
              <div className="w-full bg-white text-gray-900 px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 shadow-lg">
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Initializing Google Sign-In...</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary-accent hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-accent hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-primary-text hover:text-primary-accent transition-colors duration-200 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
