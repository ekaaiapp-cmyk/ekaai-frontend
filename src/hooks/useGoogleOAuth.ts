// Google OAuth Hook for EkaAI Platform
// This hook handles Google Sign-In integration with the backend API

import { useState, useCallback } from 'react';
import { authAPI } from '../services/authAPI';

// Extend the window object to include Google Sign-In types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleSignInConfig) => void;
          renderButton: (element: Element, config: GoogleButtonConfig) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInConfig {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfig {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: string;
  locale?: string;
}

interface CredentialResponse {
  credential: string;
  select_by?: string;
}

interface UseGoogleOAuthReturn {
  isLoading: boolean;
  error: string | null;
  initializeGoogleSignIn: (containerId: string) => void;
  signInWithGoogle: (credential: string) => Promise<void>;
}

export const useGoogleOAuth = (): UseGoogleOAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = useCallback(async (credential: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔐 GoogleOAuth: Attempting sign-in with credential');
      
      const result = await authAPI.signInWithGoogle(credential);
      
      if (result.success && result.data) {
        console.log('✅ GoogleOAuth: Sign-in successful', result.data.user.email);
        
        // The authAPI already handles token storage
        // Trigger a page reload or navigation to dashboard
        window.location.href = '/dashboard';
      } else {
        const errorMessage = result.error?.message || 'Google sign-in failed';
        console.error('❌ GoogleOAuth: Sign-in failed:', errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('❌ GoogleOAuth: Exception during sign-in:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCredentialResponse = useCallback((response: CredentialResponse) => {
    console.log('🔐 GoogleOAuth: Received credential response');
    console.log('🔐 GoogleOAuth: Credential length:', response.credential?.length || 0);
    console.log('🔐 GoogleOAuth: Response select_by:', response.select_by);
    signInWithGoogle(response.credential);
  }, [signInWithGoogle]);

  const initializeGoogleSignIn = useCallback((containerId: string) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID_HERE.googleusercontent.com' || clientId === 'YOUR_ACTUAL_GOOGLE_CLIENT_ID_FROM_CONSOLE.apps.googleusercontent.com') {
      const errorMsg = 'Google Client ID not configured properly. Please:\n1. Go to Google Cloud Console\n2. Create OAuth 2.0 credentials\n3. Set VITE_GOOGLE_CLIENT_ID in your .env.local file';
      setError(errorMsg);
      console.error('❌ GoogleOAuth: ' + errorMsg);
      return;
    }

    if (!window.google) {
      setError('Google Sign-In SDK not loaded. Please check your internet connection.');
      return;
    }

    try {
      console.log('🔐 GoogleOAuth: Initializing with client ID:', clientId.substring(0, 20) + '...');
      
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const container = document.getElementById(containerId);
      if (container) {
        window.google.accounts.id.renderButton(container, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '100%',
        });
      } else {
        console.warn('🔐 GoogleOAuth: Container element not found:', containerId);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Google Sign-In';
      console.error('❌ GoogleOAuth: Initialization error:', err);
      setError(errorMessage);
    }
  }, [handleCredentialResponse]);

  return {
    isLoading,
    error,
    initializeGoogleSignIn,
    signInWithGoogle,
  };
};

export default useGoogleOAuth;
