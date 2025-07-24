# EkaAI Backend API Specification

This document outlines the exact API endpoints and data structures that the EkaAI frontend expects. The backend should implement these APIs to ensure seamless integration.

## Base URL Configuration

- **Development**: `http://localhost:8000`
- **Environment Variable**: `VITE_API_BASE_URL`
- **Content-Type**: `application/json` for all requests
- **Authentication**: Bearer token in Authorization header (when applicable)

## Authentication APIs

### Google OAuth Sign-in
```
POST /auth/google
```

**Request Body:**
```json
{
  "credential": "google_jwt_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "picture": "string"
    },
    "token": "jwt_access_token",
    "refreshToken": "refresh_token"
  }
}
```

### Get User Profile
```
GET /auth/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "picture": "string",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update User Profile
```
PUT /auth/profile
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "string",
  "picture": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "picture": "string",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Student Profile APIs

### Get Student Profile
```
GET /student/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "grade": "string",
    "subjects": ["Mathematics", "Physics", "Chemistry"],
    "learningGoals": ["Improve problem-solving", "Prepare for exams"],
    "studyTimePreference": "1-2 hours",
    "explanationStyle": "visual",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Update Student Profile
```
PUT /student/profile
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "string",
  "grade": "string",
  "subjects": ["string"],
  "learningGoals": ["string"],
  "studyTimePreference": "string",
  "explanationStyle": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "grade": "string",
    "subjects": ["string"],
    "learningGoals": ["string"],
    "studyTimePreference": "string",
    "explanationStyle": "string",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Learning Session APIs

### Get Recommended Sessions
```
GET /student/sessions/recommended
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "session-1",
      "title": "Quadratic Equations Fundamentals",
      "subject": "Mathematics",
      "topic": "Algebra",
      "difficulty": "intermediate",
      "estimatedDuration": 45,
      "content": [
        {
          "id": "content-1",
          "type": "text",
          "title": "Introduction to Quadratic Equations",
          "content": "A quadratic equation is a polynomial equation of degree 2...",
          "order": 1
        }
      ],
      "questions": [
        {
          "id": "q1",
          "type": "multiple-choice",
          "question": "What is the standard form of a quadratic equation?",
          "options": ["ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + cx + d = 0"],
          "correctAnswer": "ax² + bx + c = 0",
          "explanation": "The standard form shows the degree 2 polynomial structure.",
          "difficulty": "easy"
        }
      ],
      "progress": {
        "sessionId": "session-1",
        "currentSection": 0,
        "totalSections": 3,
        "completedQuestions": 0,
        "totalQuestions": 5,
        "accuracy": 0,
        "timeSpent": 0,
        "status": "not-started"
      }
    }
  ]
}
```

### Get All Available Sessions
```
GET /student/sessions/all
Authorization: Bearer {token}
```

**Response:** Same structure as recommended sessions but includes all available sessions.

### Get Specific Session
```
GET /student/sessions/{sessionId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "session-1",
    "title": "Quadratic Equations Fundamentals",
    "subject": "Mathematics",
    "topic": "Algebra",
    "difficulty": "intermediate",
    "estimatedDuration": 45,
    "content": [
      {
        "id": "content-1",
        "type": "text",
        "title": "Introduction to Quadratic Equations",
        "content": "A quadratic equation is a polynomial equation of degree 2...",
        "order": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "question": "What is the standard form of a quadratic equation?",
        "options": ["ax² + bx + c = 0", "ax + b = 0", "ax³ + bx² + cx + d = 0"],
        "correctAnswer": "ax² + bx + c = 0",
        "explanation": "The standard form shows the degree 2 polynomial structure.",
        "difficulty": "easy"
      }
    ],
    "progress": {
      "sessionId": "session-1",
      "currentSection": 0,
      "totalSections": 2,
      "completedQuestions": 0,
      "totalQuestions": 1,
      "accuracy": 0,
      "timeSpent": 0,
      "status": "not-started"
    }
  }
}
```

### Update Session Progress
```
PUT /student/sessions/{sessionId}/progress
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentSection": 1,
  "completedQuestions": 2,
  "accuracy": 85.5,
  "timeSpent": 1200,
  "status": "in-progress"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-1",
    "currentSection": 1,
    "totalSections": 2,
    "completedQuestions": 2,
    "totalQuestions": 1,
    "accuracy": 85.5,
    "timeSpent": 1200,
    "status": "in-progress"
  }
}
```

### Submit Answer
```
POST /student/sessions/{sessionId}/answers
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "questionId": "q1",
  "answer": "ax² + bx + c = 0"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "correct": true,
    "explanation": "Correct! The standard form ax² + bx + c = 0 is the most common way to represent quadratic equations.",
    "nextQuestionId": "q2"
  }
}
```

## Progress Analytics APIs

### Get Progress Analytics
```
GET /student/analytics?timeRange={7d|30d|90d|all}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overallAccuracy": 85.5,
    "questionsAttempted": 247,
    "questionsMastered": 211,
    "subjectPerformance": [
      {
        "subject": "Mathematics",
        "accuracy": 88.2,
        "questionsAttempted": 145,
        "timeSpent": 320,
        "lastPracticed": "2024-01-15T10:30:00Z"
      }
    ],
    "historicalTrends": [
      {
        "date": "2024-01-08",
        "accuracy": 82.0,
        "questionsAttempted": 15
      }
    ],
    "weakAreas": ["Trigonometric Identities", "Complex Numbers"],
    "recommendations": [
      {
        "id": "rec-1",
        "type": "practice",
        "title": "Practice Trigonometric Identities",
        "description": "Focus on sine, cosine, and tangent identities",
        "subject": "Mathematics",
        "priority": "high",
        "estimatedTime": 30,
        "actionUrl": "/sessions/trig-identities"
      }
    ],
    "achievements": [
      {
        "id": "ach-1",
        "title": "7-Day Streak",
        "description": "Practiced for 7 consecutive days",
        "icon": "🔥",
        "earnedAt": "2024-01-15T09:00:00Z",
        "category": "streak"
      }
    ]
  }
}
```

## Flashcard APIs

### Get Flashcard Decks
```
GET /student/flashcards/decks
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "deck-1",
      "name": "Quadratic Equations",
      "subject": "Mathematics",
      "cardCount": 25,
      "lastReviewed": "2024-01-15T10:30:00Z",
      "dueCount": 5,
      "masteredCount": 18,
      "description": "Essential concepts and formulas for quadratic equations"
    }
  ]
}
```

### Get Deck Cards
```
GET /student/flashcards/decks/{deckId}/cards
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "card-1",
      "front": "What is the quadratic formula?",
      "back": "x = (-b ± √(b² - 4ac)) / 2a",
      "deckId": "deck-1",
      "difficulty": "medium",
      "nextReview": "2024-01-16T10:30:00Z",
      "reviewCount": 3,
      "successRate": 0.75
    }
  ]
}
```

### Review Card
```
POST /student/flashcards/cards/{cardId}/review
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "difficulty": "easy"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "card-1",
    "front": "What is the quadratic formula?",
    "back": "x = (-b ± √(b² - 4ac)) / 2a",
    "deckId": "deck-1",
    "difficulty": "easy",
    "nextReview": "2024-01-17T10:30:00Z",
    "reviewCount": 4,
    "successRate": 0.82
  }
}
```

## Content Library APIs

### Get Content Library
```
GET /student/content
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "content-1",
      "title": "My Physics Notes - Chapter 1",
      "type": "note",
      "subject": "Physics",
      "content": "Newton's laws of motion explain the relationship between forces and motion...",
      "tags": ["mechanics", "newton", "forces"],
      "createdAt": "2024-01-10T14:20:00Z",
      "updatedAt": "2024-01-12T09:15:00Z"
    },
    {
      "id": "content-2",
      "title": "Uploaded Math Worksheet",
      "type": "upload",
      "subject": "Mathematics",
      "content": "AI-generated summary: This worksheet covers quadratic equations...",
      "fileUrl": "/uploads/math-worksheet.pdf",
      "tags": ["quadratic", "algebra", "practice"],
      "createdAt": "2024-01-14T11:30:00Z",
      "updatedAt": "2024-01-14T11:35:00Z",
      "processingStatus": "completed"
    }
  ]
}
```

### Upload Content
```
POST /student/content/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
```
file: File
subject: string
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "content-123",
    "title": "uploaded-file.pdf",
    "type": "upload",
    "subject": "Mathematics",
    "content": "Processing...",
    "fileUrl": "/uploads/uploaded-file.pdf",
    "tags": [],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "processingStatus": "processing"
  }
}
```

### Create Note
```
POST /student/content/notes
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "My Study Notes",
  "content": "These are my notes on...",
  "subject": "Mathematics",
  "tags": ["quadratic", "algebra"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "note-123",
    "title": "My Study Notes",
    "type": "note",
    "subject": "Mathematics",
    "content": "These are my notes on...",
    "tags": ["quadratic", "algebra"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## AI Tutoring APIs

### Create Chat Session
```
POST /ai/chat/sessions
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "initialQuestion": "I'm having trouble understanding quadratic equations"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "session-123",
    "userId": "user-456",
    "title": "Quadratic Equations Help",
    "subject": "Mathematics",
    "messages": [
      {
        "id": "msg-1",
        "type": "user",
        "content": "I'm having trouble understanding quadratic equations",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "status": "active"
  }
}
```

### Get Chat Session
```
GET /ai/chat/sessions/{sessionId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "session-123",
    "userId": "user-456",
    "title": "Quadratic Equations Help",
    "subject": "Mathematics",
    "messages": [
      {
        "id": "msg-1",
        "type": "user",
        "content": "I'm having trouble understanding quadratic equations",
        "timestamp": "2024-01-15T10:00:00Z"
      },
      {
        "id": "msg-2",
        "type": "ai",
        "content": "I'd be happy to help you with quadratic equations! Let's start with the basics...",
        "timestamp": "2024-01-15T10:00:30Z",
        "metadata": {
          "subject": "Mathematics",
          "topic": "Quadratic Equations",
          "difficulty": "beginner",
          "followUpSuggestions": [
            "Show me how factoring works",
            "Explain the quadratic formula",
            "Give me a practice problem"
          ]
        }
      }
    ],
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:30Z",
    "status": "active"
  }
}
```

### Get User Chat Sessions
```
GET /ai/chat/sessions?limit=20
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "session-1",
      "userId": "user-456",
      "title": "Quadratic Equations Help",
      "subject": "Mathematics",
      "messages": [],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "status": "active"
    },
    {
      "id": "session-2",
      "userId": "user-456",
      "title": "Physics Motion Problems",
      "subject": "Physics",
      "messages": [],
      "createdAt": "2024-01-14T14:20:00Z",
      "updatedAt": "2024-01-14T15:45:00Z",
      "status": "resolved"
    }
  ]
}
```

### Ask Question
```
POST /ai/chat/sessions/{sessionId}/messages
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "question": "Can you explain the quadratic formula step by step?",
  "context": {
    "subject": "Mathematics",
    "topic": "Quadratic Equations",
    "studentLevel": "intermediate",
    "learningStyle": "visual"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messageId": "msg-789",
    "aiResponse": {
      "message": "Absolutely! The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a...",
      "followUpSuggestions": [
        {
          "id": "fs-1",
          "text": "Show me how to factor a quadratic",
          "type": "example",
          "priority": 1
        },
        {
          "id": "fs-2",
          "text": "Give me a practice problem",
          "type": "practice",
          "priority": 2
        }
      ],
      "relatedTopics": ["Polynomial Factoring", "Graphing Parabolas", "Discriminant Analysis"],
      "confidence": 0.95,
      "processingTime": 1200
    }
  }
}
```

### Get Follow-up Suggestions
```
GET /ai/chat/messages/{messageId}/suggestions
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "suggestion-1",
      "text": "Can you show me a step-by-step example?",
      "type": "example",
      "priority": 1
    },
    {
      "id": "suggestion-2",
      "text": "What if the equation can't be factored?",
      "type": "clarification",
      "priority": 2
    }
  ]
}
```

### Explain Concept
```
POST /ai/explain
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "concept": "quadratic formula",
  "context": {
    "subject": "Mathematics",
    "studentLevel": "intermediate",
    "learningStyle": "visual"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "The quadratic formula is a mathematical formula that provides the solution(s)...",
    "followUpSuggestions": [
      {
        "id": "fs-1",
        "text": "Show me an example",
        "type": "example",
        "priority": 1
      }
    ],
    "relatedTopics": ["Discriminant", "Factoring", "Completing the Square"],
    "confidence": 0.92,
    "processingTime": 1000
  }
}
```

### Analyze Student Work
```
POST /ai/analyze-work
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "workContent": "x = (-5 ± √(25 - 4(1)(6))) / 2(1) = (-5 ± √(1)) / 2 = (-5 ± 1) / 2",
  "subject": "Mathematics",
  "expectedAnswer": "x = (-5 ± √(25 - 24)) / 2 = (-5 ± 1) / 2"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "feedback": "Good attempt! You've correctly identified the quadratic formula, but there's a small error in the calculation.",
    "mistakes": [
      "Sign error when substituting b = -5",
      "Arithmetic error in the discriminant calculation"
    ],
    "suggestions": [
      "Double-check the signs when substituting values",
      "Calculate the discriminant step by step: b² - 4ac"
    ],
    "score": 75
  }
}
```

## Waitlist APIs

### Register Student
```
POST /api/waitlist/student
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "date_of_birth": "2006-01-15",
  "grade_level": "12",
  "school": "Example High School",
  "subjects": ["Mathematics", "Physics"],
  "goals": "Improve problem-solving skills",
  "ai_experience": "Beginner"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registration successful! We'll notify you when EkaAI is available."
}
```

### Register Instructor
```
POST /api/waitlist/instructor
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@school.edu",
  "title": "Mathematics Teacher",
  "institution": "Example High School",
  "department": "Mathematics",
  "teaching_years": 10,
  "student_count": 150,
  "current_tools": "Khan Academy, Google Classroom",
  "ai_experience": "Intermediate",
  "subjects_taught": ["Mathematics", "Statistics"],
  "platform_usage": "Daily lesson planning and student assessment"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Instructor registration successful! We'll be in touch soon to discuss how EkaAI can transform your teaching."
}
```

### Register University
```
POST /api/waitlist/university
```

**Request Body:**
```json
{
  "contact_name": "Dr. John Administrator",
  "contact_email": "admin@university.edu",
  "contact_phone": "+1234567890",
  "institution_type": "Public University",
  "institution_size": "10,000-25,000",
  "location": "California, USA",
  "website": "https://university.edu",
  "lms": "Canvas, Blackboard",
  "tech_readiness": "Advanced",
  "implementation_goals": "AI-powered tutoring for all students",
  "budget": "$100,000-$500,000",
  "timeline": "Fall 2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "University registration successful! Our enterprise team will contact you within 24 hours to schedule a demo."
}
```

## Error Response Format

All APIs should return errors in this consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Valid email address is required"
      }
    ]
  }
}
```

## Common HTTP Status Codes

- **200**: Success
- **201**: Created (for POST requests)
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **429**: Too Many Requests (rate limiting)
- **500**: Internal Server Error

## Authentication

- Use JWT tokens for authentication
- Include `Authorization: Bearer {token}` header for protected routes
- Token should contain user ID and role information
- Implement token refresh mechanism for long-lived sessions

## Rate Limiting

- Implement rate limiting for AI tutoring APIs (e.g., 60 requests per minute per user)
- Return HTTP 429 with retry-after header when limits exceeded

## File Upload Requirements

- Maximum file size: 10MB
- Supported formats: PDF, DOCX, TXT, JPG, PNG
- Files should be processed asynchronously for content extraction
- Return processing status in content item response

## Real-time Features (Future)

These APIs are designed for HTTP REST implementation. WebSocket support for real-time chat can be added later:

- `ws://localhost:8000/ai/chat/{sessionId}` for real-time AI responses
- Message format should match the ChatMessage interface

## Environment Variables

The frontend expects these environment variables to be configurable:

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_SUPABASE_URL`: Supabase URL (if using Supabase)
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key (if using Supabase)

## Data Types Reference

### Enums and Constants

**Difficulty Levels:**
- `"beginner"`, `"intermediate"`, `"advanced"`

**Question Types:**
- `"multiple-choice"`, `"short-answer"`, `"essay"`, `"true-false"`

**Content Types:**
- `"text"`, `"video"`, `"image"`, `"interactive"`

**Session Status:**
- `"not-started"`, `"in-progress"`, `"completed"`, `"paused"`

**Chat Status:**
- `"active"`, `"resolved"`, `"archived"`

**Processing Status:**
- `"processing"`, `"completed"`, `"failed"`

**Subject Options:**
```json
[
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Computer Science", "History", "Geography", "Literature",
  "Economics", "Psychology", "Philosophy", "Art",
  "Music", "Physical Education", "Foreign Languages"
]
```

**Grade Options:**
```json
[
  "6th Grade", "7th Grade", "8th Grade", "9th Grade",
  "10th Grade", "11th Grade", "12th Grade",
  "College Freshman", "College Sophomore",
  "College Junior", "College Senior", "Graduate"
]
```

This specification provides the complete API contract that the backend needs to implement for seamless frontend integration.
