import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import type { AuthContextType, AuthUser, UserProfile } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session with timeout
    const getInitialSession = async () => {
      console.log('🔄 AuthContext: Initializing authentication...');
      try {
        console.log('📞 AuthContext: Calling supabase.auth.getSession()...');
        
        // Create a promise with timeout
        const sessionPromise = Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Session timeout')), 5000)
          )
        ]);
        
        const { data: { session }, error } = await sessionPromise as any;
        console.log('📊 AuthContext: Session response received:', { 
          hasSession: !!session, 
          hasUser: !!session?.user,
          error: error?.message 
        });
        
        if (error) {
          console.error('❌ AuthContext: Session error:', error);
          // Don't throw here, just continue without session
        }
        
        if (session?.user) {
          console.log('✅ AuthContext: User found in session:', session.user.email);
          setUser(session.user as AuthUser);
          console.log('👤 AuthContext: About to fetch user profile...');
          await fetchUserProfile(session.user.id);
        } else {
          console.log('👤 AuthContext: No user session found');
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('❌ AuthContext: Error getting initial session:', error);
        // Ensure we clear any stale state
        setUser(null);
        setProfile(null);
      } finally {
        console.log('✅ AuthContext: Initialization complete, setting loading to false');
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 AuthContext: Auth state change:', { event, hasSession: !!session, hasUser: !!session?.user });
        
        if (session?.user) {
          console.log('✅ AuthContext: User signed in via auth change:', session.user.email);
          setUser(session.user as AuthUser);
          await fetchUserProfile(session.user.id);
        } else {
          console.log('👤 AuthContext: User signed out via auth change');
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
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
        setProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfile(null);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('🔓 AuthContext: Starting sign out process...');
      setLoading(true);
      
      // Clear local state first
      setUser(null);
      setProfile(null);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ AuthContext: Sign out error:', error);
        throw error;
      }
      
      console.log('✅ AuthContext: Sign out successful');
    } catch (error) {
      console.error('❌ AuthContext: Error signing out:', error);
      // Even if Supabase fails, clear local state
      setUser(null);
      setProfile(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();
      
      const updateData = {
        id: user.id,
        full_name: profileData.fullName,
        email: profileData.email,
        preferred_language: profileData.preferredLanguage,
        current_grade: profileData.currentGrade,
        subjects: profileData.subjects,
        is_preparing_for_exam: profileData.isPreparingForExam,
        exam_name: profileData.examName,
        learning_goals: profileData.learningGoals,
        daily_study_time: profileData.dailyStudyTime,
        preferred_explanation_style: profileData.preferredExplanationStyle,
        learning_challenge: profileData.learningChallenge,
        starting_topic: profileData.startingTopic,
        youtube_link: profileData.youtubeLink,
        updated_at: now
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData];
        }
      });

      // 1. Update Supabase profile (fast, for UI updates)
      const { error } = await supabase
        .from('profiles')
        .upsert(updateData);

      if (error) {
        throw error;
      }

      // 2. Send to AI backend for personalization (async, non-blocking)
      try {
        const aiBackendUrl = import.meta.env.VITE_API_BASE_URL;
        if (aiBackendUrl) {
          // Send profile data to AI backend for processing
          await fetch(`${aiBackendUrl}/api/user/onboarding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}` // or proper JWT token
            },
            body: JSON.stringify({
              userId: user.id,
              profileData: profileData,
              timestamp: now
            })
          });
        }
      } catch (aiError) {
        // Don't fail the profile update if AI backend is down
        console.warn('AI backend update failed:', aiError);
      }

      // 3. Refetch profile to update local state
      await fetchUserProfile(user.id);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      setLoading(true);
      
      // First delete the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Then delete the auth user (requires admin privileges or RLS policies)
      // Note: In production, this should be done via a backend function
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (authError) {
        console.warn('Could not delete auth user:', authError);
        // Still proceed with sign out
      }

      // Sign out
      await signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signInWithGoogle,
    signOut,
    updateProfile,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
