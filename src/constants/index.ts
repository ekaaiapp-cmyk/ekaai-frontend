// Application-wide constants and data

// Academic options
export const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics', 
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Computer Science',
  'Economics',
  'Other'
] as const;

export const GRADE_OPTIONS = [
  '6th Grade',
  '7th Grade', 
  '8th Grade',
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
  'Undergraduate',
  'Graduate',
  'Other'
] as const;

// Learning preferences
export const LEARNING_GOAL_OPTIONS = [
  'Improve grades',
  'Prepare for specific exam',
  'Understand difficult concepts better',
  'Get instant help with doubts',
  'Build confidence in learning',
  'Other'
] as const;

export const CHALLENGE_OPTIONS = [
  'I find it hard to focus',
  'I hesitate to ask questions',
  'I forget concepts easily',
  'Topics feel boring',
  'I struggle with time management',
  'Other'
] as const;

export const DAILY_STUDY_TIME_OPTIONS = [
  { value: 'less-than-1', label: 'Less than 1 hour' },
  { value: '1-2', label: '1-2 hours' },
  { value: 'more-than-2', label: 'More than 2 hours' }
] as const;

export const EXPLANATION_STYLE_OPTIONS = [
  { value: 'step-by-step', label: 'Step-by-step explanations' },
  { value: 'quick-summaries', label: 'Quick summaries' },
  { value: 'real-life-examples', label: 'Real-life examples' },
  { value: 'interactive-questions', label: 'Interactive questions' }
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'other', label: 'Other' }
] as const;

// Professional options for instructors
export const TEACHING_EXPERIENCE_OPTIONS = [
  '0-2 years',
  '3-5 years',
  '6-10 years',
  '11-15 years',
  '16+ years'
] as const;

export const INSTRUCTOR_TITLE_OPTIONS = [
  'Teacher',
  'Professor',
  'Assistant Professor',
  'Associate Professor',
  'Lecturer',
  'Teaching Assistant',
  'Tutor',
  'Other'
] as const;

export const AI_EXPERIENCE_OPTIONS = [
  'No previous experience',
  'Basic exposure',
  'Some experience',
  'Extensive experience'
] as const;

// University options
export const UNIVERSITY_TYPE_OPTIONS = [
  'Public University',
  'Private University',
  'Community College',
  'Technical Institute',
  'Online University',
  'Other'
] as const;

export const STUDENT_POPULATION_OPTIONS = [
  'Under 1,000',
  '1,000-5,000',
  '5,000-10,000',
  '10,000-20,000',
  '20,000-50,000',
  'Over 50,000'
] as const;

export const LMS_OPTIONS = [
  'Canvas',
  'Blackboard',
  'Moodle',
  'Google Classroom',
  'Brightspace',
  'Schoology',
  'None',
  'Other'
] as const;

export const TECH_INFRASTRUCTURE_OPTIONS = [
  { value: 'basic', label: 'Basic - Limited digital infrastructure' },
  { value: 'intermediate', label: 'Intermediate - Some digital systems in place' },
  { value: 'advanced', label: 'Advanced - Comprehensive digital infrastructure' },
  { value: 'cutting-edge', label: 'Cutting-edge - Latest technology implementations' }
] as const;

export const BUDGET_RANGE_OPTIONS = [
  'Under $10,000',
  '$10,000-$50,000',
  '$50,000-$100,000',
  '$100,000-$500,000',
  'Over $500,000',
  'To be determined'
] as const;

export const IMPLEMENTATION_TIMELINE_OPTIONS = [
  'Immediate (1-3 months)',
  'Short-term (3-6 months)',
  'Medium-term (6-12 months)',
  'Long-term (12+ months)',
  'Flexible'
] as const;

// Referral sources
export const REFERRAL_SOURCE_OPTIONS = [
  'Search Engine (Google, Bing, etc.)',
  'Social Media',
  'Friend/Colleague Recommendation',
  'Educational Conference',
  'Online Advertisement',
  'University/School',
  'Other'
] as const;

// UI constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
} as const;

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

// Theme constants
export const THEME_COLORS = {
  PRIMARY_BG: '#1A1A1A',
  PRIMARY_ACCENT: '#FFD700',
  PRIMARY_TEXT: '#F5F5F5',
  PRIMARY_TEXT_BRIGHT: '#FFFFFF',
  GRAY_900: '#111827',
  GRAY_800: '#1F2937',
  GRAY_700: '#374151',
  GRAY_600: '#4B5563'
} as const;
