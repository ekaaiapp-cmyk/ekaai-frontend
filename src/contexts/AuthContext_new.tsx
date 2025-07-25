import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, type User } from '../services/authAPI';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: (credential: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Check if user has a stored token
        if (authAPI.isAuthenticated()) {
          const storedUser = authAPI.getStoredUser();
          if (storedUser) {
            setUser(storedUser);
            // Optionally fetch fresh profile data
            try {
              const profileResult = await authAPI.getUserProfile();
              if (profileResult.success && profileResult.data) {
                setUser(profileResult.data);
              }
            } catch (error) {
              console.warn('Failed to fetch fresh profile, using stored data:', error);
            }
          } else {
            // Token exists but no user data, try to fetch profile
            try {
              const profileResult = await authAPI.getUserProfile();
              if (profileResult.success && profileResult.data) {
                setUser(profileResult.data);
              }
            } catch (error) {
              console.error('Failed to fetch user profile:', error);
              // Clear invalid token
              await authAPI.signOut();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signInWithGoogle = async (credential: string): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authAPI.signInWithGoogle(credential);
      
      if (result.success && result.data) {
        setUser(result.data.user);
        return true;
      } else {
        console.error('Google sign-in failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await authAPI.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear user state even if API call fails
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      const result = await authAPI.updateUserProfile(updates);
      
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated: !!user && authAPI.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export for backward compatibility
export { AuthContext };
