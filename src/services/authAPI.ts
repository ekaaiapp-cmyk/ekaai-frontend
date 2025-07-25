// Authentication API Service for EkaAI Platform
// This service handles all authentication-related API calls

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
  };
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface ProfileUpdateData {
  name?: string;
  picture?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class AuthAPI {
  private token: string | null = null;

  constructor() {
    // Initialize token from localStorage
    this.token = localStorage.getItem('ekaai_token');
  }

  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        success: false, 
        error: { 
          code: 'NETWORK_ERROR', 
          message: `HTTP ${response.status}: ${response.statusText}` 
        } 
      }));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async signInWithGoogle(credential: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      const result = await this.handleResponse<AuthResponse>(response);

      if (result.success && result.data) {
        this.token = result.data.token;
        localStorage.setItem('ekaai_token', result.data.token);
        localStorage.setItem('ekaai_refresh_token', result.data.refreshToken);
        localStorage.setItem('ekaai_user', JSON.stringify(result.data.user));
      }

      return result;
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: error instanceof Error ? error.message : 'Authentication failed'
        }
      };
    }
  }

  async getUserProfile(): Promise<{ success: boolean; data?: User; error?: any }> {
    try {
      if (!this.token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await this.handleResponse<{ success: boolean; data: User }>(response);
      return result;
    } catch (error) {
      console.error('Get user profile failed:', error);
      return {
        success: false,
        error: {
          code: 'PROFILE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch profile'
        }
      };
    }
  }

  async updateUserProfile(updates: ProfileUpdateData): Promise<{ success: boolean; data?: User; error?: any }> {
    try {
      if (!this.token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });

      const result = await this.handleResponse<{ success: boolean; data: User }>(response);

      if (result.success && result.data) {
        // Update stored user data
        localStorage.setItem('ekaai_user', JSON.stringify(result.data));
      }

      return result;
    } catch (error) {
      console.error('Update user profile failed:', error);
      return {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to update profile'
        }
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      // Clear local storage
      this.token = null;
      localStorage.removeItem('ekaai_token');
      localStorage.removeItem('ekaai_refresh_token');
      localStorage.removeItem('ekaai_user');

      // Optional: Call backend logout endpoint if available
      // await fetch(`${API_BASE_URL}/auth/logout`, {
      //   method: 'POST',
      //   headers: this.getAuthHeaders(),
      // });
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear local data even if backend call fails
      this.token = null;
      localStorage.removeItem('ekaai_token');
      localStorage.removeItem('ekaai_refresh_token');
      localStorage.removeItem('ekaai_user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('ekaai_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return this.token;
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('ekaai_refresh_token');
      if (!refreshToken) {
        return false;
      }

      // Note: Implement refresh token endpoint when available
      // const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken }),
      // });

      // const result = await this.handleResponse<AuthResponse>(response);
      // if (result.success && result.data) {
      //   this.token = result.data.token;
      //   localStorage.setItem('ekaai_token', result.data.token);
      //   return true;
      // }

      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  /**
   * Console method to sign out user with feedback
   * Usage in browser console: EkaAI.signOut()
   * 
   * This method handles both Supabase and custom auth systems
   */
  async consoleSignOut(): Promise<void> {
    try {
      console.log('🔓 EkaAI: Starting comprehensive sign out process...');
      
      const wasAuthenticated = this.isAuthenticated();
      const storedUser = this.getStoredUser();
      
      if (!wasAuthenticated && !localStorage.getItem('ekaai_token')) {
        console.log('ℹ️ EkaAI: No user appears to be signed in');
        // Still attempt to clear everything just in case
      } else {
        console.log(`👤 EkaAI: Signing out user: ${storedUser?.email || 'Unknown'}`);
      }
      
      console.log('🧹 EkaAI: Step 1 - Clearing custom auth tokens...');
      
      // Clear custom auth tokens
      await this.signOut();
      
      console.log('🧹 EkaAI: Step 2 - Clearing Supabase session...');
      
      // Also clear Supabase session if available
      try {
        // Import Supabase dynamically to avoid circular dependencies
        const { supabase } = await import('../services/supabase');
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.warn('⚠️ EkaAI: Supabase sign out warning:', error.message);
        } else {
          console.log('✅ EkaAI: Supabase session cleared');
        }
      } catch (supabaseError) {
        console.warn('⚠️ EkaAI: Could not access Supabase for sign out:', supabaseError);
      }
      
      console.log('🧹 EkaAI: Step 3 - Clearing all localStorage data...');
      
      // Clear all possible auth-related localStorage items
      const authKeys = [
        'ekaai_token',
        'ekaai_refresh_token', 
        'ekaai_user',
        'sb-localhost-auth-token', // Supabase local storage key pattern
        'supabase.auth.token'
      ];
      
      authKeys.forEach(key => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          console.log(`🗑️ EkaAI: Removed ${key}`);
        }
      });
      
      // Clear any Supabase keys that might exist
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') && key.includes('auth')) {
          localStorage.removeItem(key);
          console.log(`🗑️ EkaAI: Removed Supabase key: ${key}`);
        }
      });
      
      console.log('✅ EkaAI: Complete sign out successful!');
      console.log('🔄 EkaAI: Refreshing page to ensure clean state...');
      
      // Force a complete page reload to ensure all state is cleared
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (error) {
      console.error('❌ EkaAI: Sign out failed:', error);
      console.log('🔧 EkaAI: Attempting emergency cleanup...');
      
      // Force clear everything as emergency fallback
      this.token = null;
      localStorage.clear(); // Clear all localStorage as last resort
      
      console.log('� EkaAI: Emergency cleanup completed - cleared all localStorage');
      console.log('🔄 EkaAI: Refreshing page...');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  }
}

export const authAPI = new AuthAPI();

// Make authAPI globally accessible for console debugging
if (typeof window !== 'undefined') {
  (window as any).EkaAI = {
    signOut: () => authAPI.consoleSignOut(),
    getUser: () => authAPI.getStoredUser(),
    isAuthenticated: () => authAPI.isAuthenticated(),
    getToken: () => authAPI.getToken(),
    // Add other useful console methods
    clearStorage: () => {
      localStorage.removeItem('ekaai_token');
      localStorage.removeItem('ekaai_refresh_token');
      localStorage.removeItem('ekaai_user');
      console.log('✅ EkaAI: All authentication data cleared from localStorage');
      console.log('🔄 EkaAI: Please refresh the page');
    }
  };
  
  console.log('🎯 EkaAI: Console debugging tools loaded! Use EkaAI.signOut() to sign out from console');
}
