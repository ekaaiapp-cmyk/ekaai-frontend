import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import type { AuthUser, UserProfile } from '../types/auth';

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('👤 AuthContext: Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('👤 AuthContext: Profile fetch result:', { data: !!data, error: error?.message, code: error?.code });

      if (error && error.code !== 'PGRST116') {
        console.error('❌ AuthContext: Profile fetch error:', error);
        throw error;
      }

      if (data) {
        console.log('✅ AuthContext: Profile found, setting profile');
        setProfile({
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          preferredLanguage: data.preferred_language,
          currentGrade: data.current_grade,
          subjects: data.subjects,
          isPreparingForExam: data.is_preparing_for_exam,
          examName: data.exam_name,
          learningGoals: data.learning_goals,
          dailyStudyTime: data.daily_study_time,
          preferredExplanationStyle: data.preferred_explanation_style,
          learningChallenge: data.learning_challenge,
          startingTopic: data.starting_topic,
          youtubeLink: data.youtube_link,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        });
      } else {
        console.log('👤 AuthContext: No profile data found, setting profile to null');
        setProfile(null);
      }
    } catch (error) {
      console.error('❌ AuthContext: Error fetching user profile:', error);
      setProfile(null);
    }
  };

  useEffect(() => {
    console.log('🔄 AuthContext: Initializing authentication...');
    
    // Emergency timeout to prevent infinite loading
    const emergencyTimeout = setTimeout(() => {
      console.log('🚨 AuthContext: Emergency timeout - forcing loading to false');
      setLoading(false);
    }, 1000); // 1 second emergency timeout - much shorter for testing
    
    const getInitialSession = async () => {
      try {
        console.log('📞 AuthContext: Calling supabase.auth.getSession()...');
        console.log('🔧 AuthContext: Supabase client exists:', !!supabase);
        
        // Add a race condition with timeout to prevent hanging
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session request timeout')), 8000) // Increased to 8 seconds
        );
        
        console.log('📍 AuthContext: Starting session request with timeout...');
        const result = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]);
        
        // Handle timeout case explicitly
        if (!result) {
          throw new Error('Session request returned null');
        }
        
        const { data: { session }, error } = result as any;
        
        console.log('📍 AuthContext: Session request completed');
        
        console.log('📊 AuthContext: Session result:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          error: error?.message
        });
        
        if (error) {
          console.error('❌ AuthContext: Session error:', error);
          setUser(null);
          setProfile(null);
          return;
        }
        
        if (session?.user) {
          console.log('✅ AuthContext: User found:', session.user.email);
          setUser(session.user as AuthUser);
          try {
            await fetchUserProfile(session.user.id);
          } catch (profileError) {
            console.error('❌ AuthContext: Profile fetch error:', profileError);
          }
        } else {
          console.log('👤 AuthContext: No user session found');
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('❌ AuthContext: Error getting initial session:', error);
        // If it's a timeout or connection error, continue without auth
        setUser(null);
        setProfile(null);
      } finally {
        console.log('✅ AuthContext: Initialization complete, setting loading to false');
        clearTimeout(emergencyTimeout);
        setLoading(false);
        setAuthInitialized(true);
      }
    };

    getInitialSession();

    // Fallback timeout to ensure loading doesn't get stuck
    const timeoutId = setTimeout(() => {
      console.log('⏰ AuthContext: Timeout fallback - forcing loading to false');
      setLoading(false);
    }, 10000); // 10 second timeout

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 AuthContext: Auth state change:', { 
          event, 
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          authInitialized 
        });
        
        // Skip auth state changes until initial session is loaded
        if (!authInitialized) {
          console.log('🔄 AuthContext: Skipping auth state change - not initialized yet');
          return;
        }
        
        clearTimeout(timeoutId); // Clear timeout if auth change occurs
        
        // Prevent clearing user if we already have one and this is just a token refresh
        if (event === 'TOKEN_REFRESHED' && user && session?.user) {
          console.log('🔄 AuthContext: Token refreshed, keeping existing user');
          return;
        }
        
        if (session?.user) {
          console.log('✅ AuthContext: Setting user from auth state change');
          setUser(session.user as AuthUser);
          try {
            await fetchUserProfile(session.user.id);
          } catch (profileError) {
            console.error('❌ AuthContext: Profile fetch error:', profileError);
            // Don't clear the user just because profile fetch failed
          }
        } else if (event === 'SIGNED_OUT' || !session) {
          console.log('👤 AuthContext: User signed out or no session');
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
      clearTimeout(emergencyTimeout);
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('❌ AuthContext: Google sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      setLoading(true);
      
      const dbUpdates = {
        full_name: updates.fullName,
        email: updates.email,
        preferred_language: updates.preferredLanguage,
        current_grade: updates.currentGrade,
        subjects: updates.subjects,
        is_preparing_for_exam: updates.isPreparingForExam,
        exam_name: updates.examName,
        learning_goals: updates.learningGoals,
        daily_study_time: updates.dailyStudyTime,
        preferred_explanation_style: updates.preferredExplanationStyle,
        learning_challenge: updates.learningChallenge,
        starting_topic: updates.startingTopic,
        youtube_link: updates.youtubeLink,
        updated_at: new Date().toISOString()
      };

      Object.keys(dbUpdates).forEach(key => {
        if (dbUpdates[key as keyof typeof dbUpdates] === undefined) {
          delete dbUpdates[key as keyof typeof dbUpdates];
        }
      });

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      if (profile) {
        setProfile({
          ...profile,
          ...updates,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signInWithGoogle,
    signOut,
    updateProfile
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
