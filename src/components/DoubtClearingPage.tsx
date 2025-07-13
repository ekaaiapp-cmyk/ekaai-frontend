import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doubtClearingAPI } from '../services/doubtClearingAPI';
import type { ChatMessage } from '../services/doubtClearingAPI';

const DoubtClearingPage: React.FC = () => {
  // State declarations
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hi! I'm your AI tutor. I'm here to help you with any academic questions you have. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

  // Refs
  const hideTimeoutRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Header visibility effect
  useEffect(() => {
    const showHeader = () => {
      setHeaderVisible(true);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = window.setTimeout(() => setHeaderVisible(false), 2000);
    };
    window.addEventListener('mousemove', showHeader);
    window.addEventListener('touchstart', showHeader);
    window.addEventListener('scroll', showHeader);
    hideTimeoutRef.current = window.setTimeout(() => setHeaderVisible(false), 2000);
    return () => {
      window.removeEventListener('mousemove', showHeader);
      window.removeEventListener('touchstart', showHeader);
      window.removeEventListener('scroll', showHeader);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await doubtClearingAPI.getChatHistory();
        if (history.length > 0) {
          setMessages(history);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    // Update messages optimistically
    const optimisticUpdate = [...messages, userMessage];
    setMessages(optimisticUpdate);

    try {
      const response = await doubtClearingAPI.sendMessage(currentMessage, {
        previousMessages: messages,
        subject: 'General',
        gradeLevel: 'High School'
      });

      if (response.success && response.data) {
        const aiResponse: ChatMessage = {
          content: response.data.response,
          sender: 'ai',
          timestamp: new Date(),
          followUpQuestions: response.data.followUpQuestions,
          relatedTopics: response.data.relatedTopics
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setFollowUpQuestions(response.data.followUpQuestions || []);

        // Save the chat after each AI response
        await doubtClearingAPI.saveChat([...optimisticUpdate, aiResponse]);
      } else {
        const errorResponse: ChatMessage = {
          content: "I apologize, but I'm having trouble processing your question right now. Please try again.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorResponse]);
        setFollowUpQuestions([]); // Clear follow-up questions on error
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: ChatMessage = {
        content: "Sorry, I encountered an error. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setFollowUpQuestions([]); // Clear follow-up questions on error
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClearChat = async () => {
    try {
      // Clear the stored chat history
      await doubtClearingAPI.saveChat([messages[0]]);
      // Reset UI state
      setMessages([messages[0]]);
      setFollowUpQuestions([]);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text font-body flex flex-col relative">
      {/* Fixed, auto-hide Header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-transform duration-300 ease-in-out ${
          headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } bg-primary-bg/90 backdrop-blur-sm border-b border-gray-800 px-6 py-4`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-primary-text hover:text-primary-accent transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="w-px h-6 bg-gray-600"></div>
            <h1 className="text-xl font-headline font-semibold text-primary-text-bright">
              Instant Doubt Clearing
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-primary-text">AI Tutor Online</span>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
        {/* Messages Container with padding for fixed elements */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 pb-[240px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-primary-text">Loading chat history...</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.timestamp.toString()}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-accent text-primary-bg ml-4'
                        : 'bg-gray-900/70 text-primary-text mr-4 border border-gray-800'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary-accent/20 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-primary-accent">EkaAI Tutor</span>
                      </div>
                    )}
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <div className="mt-2 text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs p-4 rounded-2xl bg-gray-900/70 border border-gray-800 mr-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-primary-accent/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-primary-accent">EkaAI Tutor</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-primary-bg/95 backdrop-blur-sm z-20">
          <div className="max-w-4xl mx-auto px-6 py-3">
            {/* Quick Action Buttons */}
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5 items-center">
                {followUpQuestions.length > 0 ? (
                  followUpQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-primary-text rounded-full border border-gray-700/50 transition-colors duration-200 text-xs leading-none"
                    >
                      {question}
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      onClick={() => setInputMessage("Can you explain [concept/topic] in simpler terms?")}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-primary-text rounded-full border border-gray-700/50 transition-colors duration-200 text-xs leading-none"
                    >
                      Can you explain [concept/topic] in simpler terms?
                    </button>
                    <button
                      onClick={() => setInputMessage("Can you provide an example of [concept] in action?")}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-primary-text rounded-full border border-gray-700/50 transition-colors duration-200 text-xs leading-none"
                    >
                      Can you provide an example of [concept] in action?
                    </button>
                    <button
                      onClick={() => setInputMessage("Where can I find more resources on [topic]?")}
                      className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-primary-text rounded-full border border-gray-700/50 transition-colors duration-200 text-xs leading-none"
                    >
                      Where can I find more resources on [topic]?
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="relative mb-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="w-full bg-gray-900/50 text-primary-text placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent resize-none"
                disabled={isTyping || isLoading}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="w-7 h-7 bg-primary-accent text-primary-bg rounded-md flex items-center justify-center hover:bg-yellow-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span>Press Enter to send</span>
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>AI Ready</span>
                </div>
              </div>
              <button
                onClick={handleClearChat}
                className="text-xs text-gray-400 hover:text-primary-accent transition-colors duration-200"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtClearingPage;
