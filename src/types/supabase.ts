// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          preferred_language: 'english' | 'hindi' | 'other';
          current_grade: string;
          subjects: string[];
          is_preparing_for_exam: boolean;
          exam_name?: string;
          learning_goals: string[];
          daily_study_time: 'less-than-1' | '1-2' | 'more-than-2';
          preferred_explanation_style: 'step-by-step' | 'quick-summaries' | 'real-life-examples' | 'interactive-questions';
          learning_challenge: string;
          starting_topic?: string;
          youtube_link?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          preferred_language: 'english' | 'hindi' | 'other';
          current_grade: string;
          subjects: string[];
          is_preparing_for_exam?: boolean;
          exam_name?: string;
          learning_goals: string[];
          daily_study_time: 'less-than-1' | '1-2' | 'more-than-2';
          preferred_explanation_style: 'step-by-step' | 'quick-summaries' | 'real-life-examples' | 'interactive-questions';
          learning_challenge: string;
          starting_topic?: string;
          youtube_link?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          preferred_language?: 'english' | 'hindi' | 'other';
          current_grade?: string;
          subjects?: string[];
          is_preparing_for_exam?: boolean;
          exam_name?: string;
          learning_goals?: string[];
          daily_study_time?: 'less-than-1' | '1-2' | 'more-than-2';
          preferred_explanation_style?: 'step-by-step' | 'quick-summaries' | 'real-life-examples' | 'interactive-questions';
          learning_challenge?: string;
          starting_topic?: string;
          youtube_link?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
