# Backend API Requirements for EkaAI Frontend

This document outlines all the backend APIs and endpoints required to connect the EkaAI frontend application. The frontend has been built with dummy APIs that simulate the expected backend responses.

## Table of Contents
1. [Authentication & User Management](#authentication--user-management)
2. [Student Learning APIs](#student-learning-apis)
3. [AI Tutoring APIs](#ai-tutoring-apis)
4. [Waitlist Management](#waitlist-management)
5. [Progress Analytics](#progress-analytics)
6. [Content Management](#content-management)
7. [Database Schema Requirements](#database-schema-requirements)

---

## Authentication & User Management

### Base URL: `/api/auth`

#### 1. User Registration/Login
```
POST /auth/signup
POST /auth/signin
POST /auth/signout
```

**Expected Response Structure:**
```typescript
interface AuthResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    last_sign_in_at: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}
```

#### 2. User Profile Management
```
GET    /auth/profile
PUT    /auth/profile
DELETE /auth/profile
```

**Profile Structure:**
```typescript
interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  date_of_birth: string;
  grade_level: string;
  school_name?: string;
  preferred_subjects: string[];
  learning_goals: string[];
  study_schedule: {
    days: string[];
    hours_per_day: number;
    preferred_time: string;
  };
  learning_style: string;
  created_at: string;
  updated_at: string;
}
```

---

## Student Learning APIs

### Base URL: `/api/student`

#### 1. Learning Sessions
```
GET    /student/sessions/recommended/:userId
GET    /student/sessions/:sessionId
POST   /student/sessions/:sessionId/start
POST   /student/sessions/:sessionId/submit-answer
PUT    /student/sessions/:sessionId/complete
```

**Learning Session Structure:**
```typescript
interface LearningSession {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // minutes
  description: string;
  objectives: string[];
  content: {
    sections: ContentSection[];
    questions: Question[];
  };
  progress: {
    currentStep: number;
    totalSteps: number;
    timeSpent: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
  isCompleted: boolean;
  createdAt: string;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: string;
  points: number;
}
```

#### 2. Progress Analytics
```
GET /student/analytics/:userId?period=7d|30d|90d
```

**Analytics Structure:**
```typescript
interface ProgressAnalytics {
  overallAccuracy: number;
  questionsAttempted: number;
  questionsMastered: number;
  timeSpent: number; // minutes
  subjectProgress: {
    [subject: string]: {
      accuracy: number;
      questionsAnswered: number;
      timeSpent: number;
      lastPracticed: string;
    };
  };
  weeklyProgress: {
    date: string;
    questionsAnswered: number;
    accuracy: number;
    timeSpent: number;
  }[];
  achievements: Achievement[];
  recommendations: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}
```

#### 3. Flashcards
```
GET    /student/flashcards/:userId
GET    /student/flashcards/deck/:deckId
POST   /student/flashcards/deck
PUT    /student/flashcards/deck/:deckId
DELETE /student/flashcards/deck/:deckId
POST   /student/flashcards/deck/:deckId/review
```

**Flashcard Structure:**
```typescript
interface FlashcardDeck {
  id: string;
  userId: string;
  title: string;
  subject: string;
  description: string;
  cards: Flashcard[];
  createdAt: string;
  lastReviewed: string;
  masteryLevel: number; // 0-100
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: number; // 1-5
  lastReviewed: string;
  reviewCount: number;
  correctCount: number;
  mastered: boolean;
}
```

#### 4. Content Library
```
GET    /student/content/:userId
POST   /student/content/upload
PUT    /student/content/:contentId
DELETE /student/content/:contentId
GET    /student/content/search?q=query&subject=subject&type=type
```

**Content Structure:**
```typescript
interface ContentItem {
  id: string;
  userId: string;
  title: string;
  type: 'note' | 'document' | 'image' | 'video' | 'link';
  subject: string;
  content: string;
  fileUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isAIGenerated: boolean;
}
```

---

## AI Tutoring APIs

### Base URL: `/api/ai`

#### 1. Chat Sessions
```
POST   /ai/chat/sessions
GET    /ai/chat/sessions/:sessionId
GET    /ai/chat/sessions/user/:userId
POST   /ai/chat/sessions/:sessionId/messages
```

**Chat Session Structure:**
```typescript
interface ChatSession {
  id: string;
  userId: string;
  title: string;
  subject?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'resolved' | 'archived';
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  metadata?: {
    subject?: string;
    topic?: string;
    difficulty?: string;
    followUpSuggestions?: string[];
  };
}
```

#### 2. AI Processing
```
POST /ai/question
POST /ai/explain
POST /ai/analyze-work
GET  /ai/follow-up/:messageId
```

**AI Response Structure:**
```typescript
interface AIResponse {
  message: string;
  followUpSuggestions: FollowUpSuggestion[];
  relatedTopics: string[];
  confidence: number;
  processingTime: number;
}

interface FollowUpSuggestion {
  id: string;
  text: string;
  type: 'clarification' | 'example' | 'practice' | 'related-topic';
  priority: number;
}
```

---

## Waitlist Management

### Base URL: `/api/waitlist`

#### Waitlist Registration
```
POST /waitlist/register
GET  /waitlist/status/:email
```

**Waitlist Structure:**
```typescript
interface WaitlistEntry {
  id: string;
  email: string;
  full_name: string;
  user_type: 'student' | 'instructor' | 'university';
  university_name?: string;
  department?: string;
  grade_level?: string;
  referral_source?: string;
  interests: string[];
  created_at: string;
  priority_score: number;
  status: 'pending' | 'invited' | 'registered';
}
```

---

## Database Schema Requirements

### Core Tables

#### 1. Authentication Tables (Supabase Auth)
- `auth.users` - Managed by Supabase
- `auth.sessions` - Managed by Supabase

#### 2. User Management
```sql
-- User profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  grade_level TEXT,
  school_name TEXT,
  preferred_subjects TEXT[],
  learning_goals TEXT[],
  study_schedule JSONB,
  learning_style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Learning Content
```sql
-- Learning sessions
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  estimated_duration INTEGER,
  description TEXT,
  objectives TEXT[],
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User session progress
CREATE TABLE user_session_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_id UUID REFERENCES learning_sessions(id),
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER,
  time_spent INTEGER DEFAULT 0,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);
```

#### 4. AI Tutoring
```sql
-- Chat sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  subject TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id),
  type TEXT NOT NULL, -- 'user' or 'ai'
  content TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. Content & Analytics
```sql
-- Flashcard decks
CREATE TABLE flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reviewed TIMESTAMP WITH TIME ZONE,
  mastery_level INTEGER DEFAULT 0
);

-- Flashcards
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES flashcard_decks(id),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  mastered BOOLEAN DEFAULT FALSE
);

-- User content
CREATE TABLE user_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  subject TEXT,
  content TEXT,
  file_url TEXT,
  tags TEXT[],
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  user_type TEXT NOT NULL,
  university_name TEXT,
  department TEXT,
  grade_level TEXT,
  referral_source TEXT,
  interests TEXT[],
  priority_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Additional Requirements

### 1. Security & Authentication
- JWT token-based authentication with Supabase
- Row Level Security (RLS) policies for all user data
- API rate limiting
- Input validation and sanitization

### 2. File Upload
- Support for document uploads (PDF, DOC, images)
- File size limits and type validation
- Cloud storage integration (Supabase Storage)

### 3. Real-time Features
- Real-time chat updates for AI tutoring
- Live progress updates during learning sessions
- Notification system for achievements

### 4. AI Integration
- Integration with AI services (OpenAI, Claude, etc.)
- Context-aware responses based on user history
- Content generation for flashcards and explanations

### 5. Analytics & Monitoring
- User engagement tracking
- Performance analytics
- Error logging and monitoring
- A/B testing capabilities

---

## Implementation Priority

### Phase 1 (MVP)
1. Authentication & User Management
2. Basic Learning Sessions
3. AI Tutoring Chat
4. Waitlist Management

### Phase 2
1. Progress Analytics
2. Flashcards System
3. Content Library
4. Advanced AI Features

### Phase 3
1. Real-time Features
2. Advanced Analytics
3. File Upload & Processing
4. Performance Optimization

---

## API Documentation
- All endpoints should return consistent JSON responses
- Include proper HTTP status codes
- Implement pagination for list endpoints
- Provide comprehensive error messages
- Include API versioning strategy

This document serves as the complete specification for backend development to support the EkaAI frontend application.
