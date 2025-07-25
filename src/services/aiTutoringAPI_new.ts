// AI Tutoring API Service for EkaAI Platform
// This service handles all AI tutoring interactions including chat, explanations,
// and follow-up suggestions

import { authAPI } from './authAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ChatMessage {
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

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  subject?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'resolved' | 'archived';
}

export interface FollowUpSuggestion {
  id: string;
  text: string;
  type: 'clarification' | 'example' | 'practice' | 'related-topic';
  priority: number;
}

export interface AIResponse {
  message: string;
  followUpSuggestions: FollowUpSuggestion[];
  relatedTopics: string[];
  confidence: number;
  processingTime: number;
}

export interface TutoringContext {
  subject?: string;
  topic?: string;
  studentLevel?: string;
  learningStyle?: string;
  previousQuestions?: string[];
}

// Real AI Tutoring API implementation
class AITutoringService {
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

  // Chat Session Management
  async createChatSession(initialQuestion?: string): Promise<ChatSession> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/sessions`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ initialQuestion }),
      });

      return this.handleResponse<ChatSession>(response);
    } catch (error) {
      console.error('Create chat session failed:', error);
      throw error;
    }
  }

  async getChatSession(sessionId: string): Promise<ChatSession> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/sessions/${sessionId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<ChatSession>(response);
    } catch (error) {
      console.error('Get chat session failed:', error);
      throw error;
    }
  }

  async getUserChatSessions(limit: number = 20): Promise<ChatSession[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/sessions?limit=${limit}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<ChatSession[]>(response);
    } catch (error) {
      console.error('Get user chat sessions failed:', error);
      throw error;
    }
  }

  async askQuestion(
    sessionId: string, 
    question: string, 
    context?: TutoringContext
  ): Promise<{
    messageId: string;
    aiResponse: AIResponse;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ question, context }),
      });

      return this.handleResponse<{
        messageId: string;
        aiResponse: AIResponse;
      }>(response);
    } catch (error) {
      console.error('Ask question failed:', error);
      throw error;
    }
  }

  async getFollowUpSuggestions(messageId: string): Promise<FollowUpSuggestion[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat/messages/${messageId}/suggestions`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<FollowUpSuggestion[]>(response);
    } catch (error) {
      console.error('Get follow-up suggestions failed:', error);
      throw error;
    }
  }

  async explainConcept(
    concept: string,
    context?: TutoringContext
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/explain`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ concept, context }),
      });

      return this.handleResponse<AIResponse>(response);
    } catch (error) {
      console.error('Explain concept failed:', error);
      throw error;
    }
  }

  async analyzeStudentWork(
    workContent: string,
    subject: string,
    expectedAnswer?: string
  ): Promise<{
    feedback: string;
    mistakes: string[];
    suggestions: string[];
    score: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/analyze-work`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ workContent, subject, expectedAnswer }),
      });

      return this.handleResponse<{
        feedback: string;
        mistakes: string[];
        suggestions: string[];
        score: number;
      }>(response);
    } catch (error) {
      console.error('Analyze student work failed:', error);
      throw error;
    }
  }

  // Utility methods
  private generateSessionTitle(question: string): string {
    const words = question.split(' ').slice(0, 5);
    return words.join(' ') + (question.split(' ').length > 5 ? '...' : '');
  }
}

export const aiTutoringAPI = new AITutoringService();
