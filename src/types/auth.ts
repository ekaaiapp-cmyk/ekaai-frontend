// Types for authentication and user management
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  preferredLanguage: 'english' | 'hindi' | 'other';
  currentGrade: string;
  subjects: string[];
  isPreparingForExam: boolean;
  examName?: string;
  learningGoals: string[];
  dailyStudyTime: 'less-than-1' | '1-2' | 'more-than-2';
  preferredExplanationStyle: 'step-by-step' | 'quick-summaries' | 'real-life-examples' | 'interactive-questions';
  learningChallenge: string;
  startingTopic?: string;
  youtubeLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export interface OnboardingFormData {
  fullName: string;
  preferredLanguage: 'english' | 'hindi' | 'other';
  currentGrade: string;
  subjects: string[];
  isPreparingForExam: boolean;
  examName?: string;
  learningGoals: string[];
  dailyStudyTime: 'less-than-1' | '1-2' | 'more-than-2';
  preferredExplanationStyle: 'step-by-step' | 'quick-summaries' | 'real-life-examples' | 'interactive-questions';
  learningChallenge: string;
  startingTopic?: string;
  youtubeLink?: string;
}
