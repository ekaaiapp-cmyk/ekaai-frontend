-- ====================================================================
-- EkaAI Supabase Database Schema Setup
-- Run this script in your Supabase SQL Editor
-- ====================================================================

-- Drop existing table if it exists (for development only)
-- DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table for EkaAI user management
CREATE TABLE IF NOT EXISTS profiles (
  -- Primary key: matches Supabase auth.users.id
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- Basic user information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Learning preferences
  preferred_language TEXT NOT NULL 
    CHECK (preferred_language IN ('english', 'hindi', 'other')),
  current_grade TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  
  -- Exam preparation
  is_preparing_for_exam BOOLEAN NOT NULL DEFAULT false,
  exam_name TEXT,
  
  -- Learning goals and preferences
  learning_goals TEXT[] NOT NULL DEFAULT '{}',
  daily_study_time TEXT NOT NULL 
    CHECK (daily_study_time IN ('less-than-1', '1-2', 'more-than-2')),
  preferred_explanation_style TEXT NOT NULL 
    CHECK (preferred_explanation_style IN ('step-by-step', 'quick-summaries', 'real-life-examples', 'interactive-questions')),
  learning_challenge TEXT NOT NULL,
  
  -- Optional fields
  starting_topic TEXT,
  youtube_link TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  CONSTRAINT non_empty_name CHECK (LENGTH(TRIM(full_name)) > 0),
  CONSTRAINT non_empty_grade CHECK (LENGTH(TRIM(current_grade)) > 0),
  CONSTRAINT non_empty_challenge CHECK (LENGTH(TRIM(learning_challenge)) > 0),
  CONSTRAINT valid_youtube_url CHECK (
    youtube_link IS NULL OR 
    youtube_link ~* '^https?://(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[a-zA-Z0-9_-]+.*$'
  )
);

-- ====================================================================
-- Create indexes for better performance
-- ====================================================================

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Index for learning preferences (for analytics/recommendations)
CREATE INDEX IF NOT EXISTS idx_profiles_subjects ON profiles USING GIN(subjects);
CREATE INDEX IF NOT EXISTS idx_profiles_goals ON profiles USING GIN(learning_goals);
CREATE INDEX IF NOT EXISTS idx_profiles_language ON profiles(preferred_language);
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON profiles(current_grade);

-- ====================================================================
-- Create trigger for automatic updated_at timestamp
-- ====================================================================

-- Function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at column
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- ====================================================================
-- Row Level Security (RLS) Setup
-- ====================================================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE 
  USING (auth.uid() = id);

-- ====================================================================
-- Create helper functions (optional)
-- ====================================================================

-- Function to get user profile by email (for admin use)
CREATE OR REPLACE FUNCTION get_profile_by_email(user_email TEXT)
RETURNS TABLE(
  id UUID,
  full_name TEXT,
  email TEXT,
  preferred_language TEXT,
  current_grade TEXT,
  subjects TEXT[],
  is_preparing_for_exam BOOLEAN,
  exam_name TEXT,
  learning_goals TEXT[],
  daily_study_time TEXT,
  preferred_explanation_style TEXT,
  learning_challenge TEXT,
  starting_topic TEXT,
  youtube_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM profiles WHERE profiles.email = user_email;
$$;

-- Function to get user statistics (for analytics)
CREATE OR REPLACE FUNCTION get_user_stats()
RETURNS TABLE(
  total_users BIGINT,
  users_by_language JSON,
  popular_subjects JSON,
  exam_preparation_percentage NUMERIC
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  WITH stats AS (
    SELECT 
      COUNT(*) as total_users,
      ROUND((COUNT(*) FILTER (WHERE is_preparing_for_exam = true)::NUMERIC / COUNT(*)) * 100, 2) as exam_prep_pct
    FROM profiles
  ),
  language_stats AS (
    SELECT JSON_OBJECT_AGG(preferred_language, lang_count) as lang_data
    FROM (
      SELECT 
        preferred_language,
        COUNT(*) as lang_count
      FROM profiles 
      GROUP BY preferred_language
    ) ls
  ),
  subject_stats AS (
    SELECT JSON_OBJECT_AGG(subject, subject_count) as subject_data
    FROM (
      SELECT 
        subject,
        COUNT(*) as subject_count
      FROM (
        SELECT UNNEST(subjects) as subject
        FROM profiles 
        WHERE subjects IS NOT NULL
      ) s
      GROUP BY subject
      ORDER BY subject_count DESC
      LIMIT 10
    ) ss
  )
  SELECT 
    stats.total_users,
    language_stats.lang_data as users_by_language,
    subject_stats.subject_data as popular_subjects,
    stats.exam_prep_pct as exam_preparation_percentage
  FROM stats
  CROSS JOIN language_stats
  CROSS JOIN subject_stats;
$$;

-- ====================================================================
-- Insert sample data (for testing - remove in production)
-- ====================================================================

-- Uncomment the following lines for testing with sample data
/*
INSERT INTO profiles (
  id, 
  full_name, 
  email, 
  preferred_language, 
  current_grade, 
  subjects, 
  is_preparing_for_exam, 
  exam_name, 
  learning_goals, 
  daily_study_time, 
  preferred_explanation_style, 
  learning_challenge,
  starting_topic
) VALUES (
  gen_random_uuid(), -- This would normally be the auth user's UUID
  'Test Student',
  'test@example.com',
  'english',
  '10th Grade',
  ARRAY['Mathematics', 'Physics', 'Chemistry'],
  true,
  'JEE',
  ARRAY['Improve grades', 'Prepare for specific exam'],
  '1-2',
  'step-by-step',
  'I find it hard to focus',
  'Quadratic Equations'
) ON CONFLICT (id) DO NOTHING;
*/

-- ====================================================================
-- Verification queries
-- ====================================================================

-- Verify table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- Verify RLS policies
SELECT 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Verify indexes
SELECT 
  indexname, 
  indexdef
FROM pg_indexes 
WHERE tablename = 'profiles';

-- ====================================================================
-- Success message
-- ====================================================================

DO $$
BEGIN
  RAISE NOTICE 'EkaAI database schema setup completed successfully!';
  RAISE NOTICE 'Table: profiles created with RLS enabled';
  RAISE NOTICE 'Indexes: created for performance optimization';
  RAISE NOTICE 'Triggers: automatic timestamp updates configured';
  RAISE NOTICE 'Functions: helper functions available';
END $$;
