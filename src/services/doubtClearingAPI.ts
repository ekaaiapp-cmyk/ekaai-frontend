// API service for handling doubt clearing chat functionality

export interface ChatMessage {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  followUpQuestions?: string[];
  relatedTopics?: string[];
  summary?: string;
}

export interface APIResponse {
  success: boolean;
  data?: {
    response: string;
    followUpQuestions?: string[];
    relatedTopics?: string[];
    summary?: string;
  };
}

export interface ChatContext {
  previousMessages?: ChatMessage[];
  subject?: string;
  gradeLevel?: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data?: {
    response: string;
    followUpQuestions?: string[];
    relatedTopics?: string[];
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const doubtClearingAPI = {
  async sendMessage(message: string, context?: ChatContext): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doubt-clearing/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          userId: localStorage.getItem('userId') // Add user authentication later
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      return {
        success: false,
        message: 'Failed to get response. Please try again.'
      };
    }
  },

  async saveChat(messages: ChatMessage[]): Promise<{ success: boolean; message: string }> {
    try {
      const userId = localStorage.getItem('userId'); // Add user authentication later
      const response = await fetch(`${API_BASE_URL}/api/doubt-clearing/save-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to save chat:', error);
      return {
        success: false,
        message: 'Failed to save chat history'
      };
    }
  },

  async getChatHistory(): Promise<ChatMessage[]> {
    try {
      const userId = localStorage.getItem('userId'); // Add user authentication later
      if (!userId) {
        return [];
      }

      const response = await fetch(`${API_BASE_URL}/api/doubt-clearing/chat-history/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Failed to get chat history:', error);
      return [];
    }
  }
};
