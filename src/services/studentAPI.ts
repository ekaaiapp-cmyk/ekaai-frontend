// Student API Service for EkaAI Platform
// This service handles all student-related API calls including learning sessions,
// progress tracking, flashcards, and content management

import { authAPI } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  grade: string;
  subjects: string[];
  learningGoals: string[];
  studyTimePreference: string;
  explanationStyle: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningSession {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  content: LessonContent[];
  questions: Question[];
  progress: SessionProgress;
}

export interface LessonContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive';
  title: string;
  content: string;
  order: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SessionProgress {
  sessionId: string;
  currentSection: number;
  totalSections: number;
  completedQuestions: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number; // in minutes
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface ProgressAnalytics {
  overallAccuracy: number;
  questionsAttempted: number;
  questionsMastered: number;
  subjectPerformance: SubjectPerformance[];
  historicalTrends: PerformanceTrend[];
  weakAreas: string[];
  recommendations: Recommendation[];
  achievements: Achievement[];
}

export interface SubjectPerformance {
  subject: string;
  accuracy: number;
  questionsAttempted: number;
  timeSpent: number;
  lastPracticed: string;
}

export interface PerformanceTrend {
  date: string;
  accuracy: number;
  questionsAttempted: number;
}

export interface Recommendation {
  id: string;
  type: 'practice' | 'review' | 'new-topic';
  title: string;
  description: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number;
  actionUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'streak' | 'accuracy' | 'completion' | 'improvement';
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  subject: string;
  cardCount: number;
  createdBy: 'user' | 'ai';
  lastReviewed?: string;
  masteryLevel: number; // 0-100
  cards: Flashcard[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: string;
  reviewCount: number;
  successRate: number;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'note' | 'upload' | 'generated';
  subject: string;
  content: string;
  fileUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  processingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
}

// Real API implementation for production
class StudentAPIService {
  private getAuthHeaders(): HeadersInit {
    const token = authAPI.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
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

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error?.message || 'API request failed');
    }

    return result.data;
  }

  // Student Profile Management
  async getProfile(): Promise<StudentProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<StudentProfile>(response);
    } catch (error) {
      console.error('Get student profile failed:', error);
      throw error;
    }
  }

  async updateProfile(updates: Partial<StudentProfile>): Promise<StudentProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });

      return this.handleResponse<StudentProfile>(response);
    } catch (error) {
      console.error('Update student profile failed:', error);
      throw error;
    }
  }

  // Learning Sessions
  async getRecommendedSessions(): Promise<LearningSession[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/sessions/recommended`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<LearningSession[]>(response);
    } catch (error) {
      console.error('Get recommended sessions failed:', error);
      throw error;
    }
  }

  async getAllSessions(): Promise<LearningSession[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/sessions/all`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<LearningSession[]>(response);
    } catch (error) {
      console.error('Get all sessions failed:', error);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<LearningSession> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/sessions/${sessionId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<LearningSession>(response);
    } catch (error) {
      console.error('Get session failed:', error);
      throw error;
    }
  }

  async updateSessionProgress(sessionId: string, progress: Partial<SessionProgress>): Promise<SessionProgress> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/sessions/${sessionId}/progress`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(progress),
      });

      return this.handleResponse<SessionProgress>(response);
    } catch (error) {
      console.error('Update session progress failed:', error);
      throw error;
    }
  }

  async submitAnswer(sessionId: string, questionId: string, answer: string): Promise<{
    correct: boolean;
    explanation: string;
    nextQuestionId?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/sessions/${sessionId}/answers`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ questionId, answer }),
      });

      return this.handleResponse<{
        correct: boolean;
        explanation: string;
        nextQuestionId?: string;
      }>(response);
    } catch (error) {
      console.error('Submit answer failed:', error);
      throw error;
    }
  }

  // Progress Analytics
  async getAnalytics(timeRange: '7d' | '30d' | '90d' | 'all' = '30d'): Promise<ProgressAnalytics> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/analytics?timeRange=${timeRange}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<ProgressAnalytics>(response);
    } catch (error) {
      console.error('Get analytics failed:', error);
      throw error;
    }
  }
  // Flashcards
  async getFlashcardDecks(): Promise<FlashcardDeck[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/flashcards/decks`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<FlashcardDeck[]>(response);
    } catch (error) {
      console.error('Get flashcard decks failed:', error);
      throw error;
    }
  }

  async getDeckCards(deckId: string): Promise<Flashcard[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/flashcards/decks/${deckId}/cards`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<Flashcard[]>(response);
    } catch (error) {
      console.error('Get deck cards failed:', error);
      throw error;
    }
  }

  async reviewCard(cardId: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Flashcard> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/flashcards/cards/${cardId}/review`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ difficulty }),
      });

      return this.handleResponse<Flashcard>(response);
    } catch (error) {
      console.error('Review card failed:', error);
      throw error;
    }
  }

  // Content Library
  async getContentLibrary(): Promise<ContentItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/content`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<ContentItem[]>(response);
    } catch (error) {
      console.error('Get content library failed:', error);
      throw error;
    }
  }

  async uploadContent(file: File, subject: string): Promise<ContentItem> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', subject);

      const response = await fetch(`${API_BASE_URL}/student/content/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authAPI.getToken()}`,
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData,
      });

      return this.handleResponse<ContentItem>(response);
    } catch (error) {
      console.error('Upload content failed:', error);
      throw error;
    }
  }

  async createNote(title: string, content: string, subject: string, tags: string[]): Promise<ContentItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/content/notes`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ title, content, subject, tags }),
      });

      return this.handleResponse<ContentItem>(response);
    } catch (error) {
      console.error('Create note failed:', error);
      throw error;
    }
  }
}

export const studentAPI = new StudentAPIService();
