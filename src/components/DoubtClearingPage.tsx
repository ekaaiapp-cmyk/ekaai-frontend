import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Mic, 
  MicOff, 
  MessageCircle, 
  ArrowLeft, 
  ThumbsUp, 
  Copy,
  MoreHorizontal,
  Brain,
  Lightbulb
} from 'lucide-react';
import { DashboardLayout } from './common/Layout';
import { Card, Button, LoadingSpinner } from './ui';
import { aiTutoringAPI, type ChatSession, type ChatMessage } from '../services/aiTutoringAPI';

const DoubtClearingPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    initializeSession();
    loadChatHistory();
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      let currentSession: ChatSession;
      
      if (sessionId) {
        // Load existing session
        currentSession = await aiTutoringAPI.getChatSession(sessionId);
        setMessages(currentSession.messages);
      } else {
        // Create new session
        currentSession = await aiTutoringAPI.createChatSession('user-123');
        navigate(`/doubt-clearing/${currentSession.id}`, { replace: true });
      }
      
      setSession(currentSession);
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setError('Failed to start tutoring session');
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      const userSessions = await aiTutoringAPI.getUserChatSessions('user-123');
      setChatHistory(userSessions);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text || !session || isLoading) return;

    try {
      setIsLoading(true);
      setInputMessage('');
      
      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message and get AI response
      const response = await aiTutoringAPI.askQuestion(session.id, text);
      
      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: response.messageId,
        type: 'ai',
        content: response.aiResponse.message,
        timestamp: new Date().toISOString(),
        metadata: {
          followUpSuggestions: response.aiResponse.followUpSuggestions.map(s => s.text)
        }
      };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleFollowUpClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary-text mb-2">Session Error</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-4 h-[calc(100vh-120px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary-text flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary-accent" />
                AI Tutor
              </h1>
              <p className="text-gray-400 text-sm">
                Ask any question and get instant, personalized help
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat History
            </Button>
            {session && (
              <div className="text-sm text-gray-400">
                Session: {session.id.slice(0, 8)}
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Chat History Sidebar */}
            {showHistory && (
              <div className="w-80 border-r border-gray-800 pr-4 mr-4">
                <ChatHistorySidebar
                  chatHistory={chatHistory}
                  currentSessionId={session?.id}
                  onSelectSession={(sessionId) => {
                    navigate(`/doubt-clearing/${sessionId}`);
                    setShowHistory(false);
                  }}
                />
              </div>
            )}
            
            {/* Main Chat Area */}
            <div className="flex-1 h-full overflow-y-auto px-2">
            {isLoading && messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner size="lg" />
              </div>
            ) : messages.length === 0 ? (
              <WelcomeMessage onQuestionClick={handleFollowUpClick} />
            ) : (
              <div className="space-y-6 pb-6">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onCopy={handleCopyMessage}
                    onFollowUpClick={handleFollowUpClick}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-lg p-4 max-w-xs">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-primary-text placeholder-gray-400 resize-none focus:outline-none focus:border-primary-accent transition-colors"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceToggle}
                className={isRecording ? 'text-red-400' : 'text-gray-400'}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  onCopy: (content: string) => void;
  onFollowUpClick: (suggestion: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onCopy, 
  onFollowUpClick 
}) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg p-4 ${
            isUser
              ? 'bg-primary-accent text-black'
              : 'bg-gray-800 text-primary-text border border-gray-700'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          
          {!isUser && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy(message.content)}
                  className="text-gray-400 hover:text-primary-text"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-primary-text"
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-primary-text"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {!isUser && message.metadata?.followUpSuggestions && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-400">Follow-up questions:</p>
            {message.metadata.followUpSuggestions.map((suggestion: string, index: number) => (
              <button
                key={index}
                onClick={() => onFollowUpClick(suggestion)}
                className="block w-full text-left text-sm p-2 bg-gray-800/50 border border-gray-700 rounded-md hover:bg-gray-700/50 transition-colors text-gray-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const WelcomeMessage: React.FC<{ onQuestionClick: (question: string) => void }> = ({ 
  onQuestionClick 
}) => {
  const sampleQuestions = [
    "Can you explain photosynthesis in simple terms?",
    "Help me solve this quadratic equation: x² + 5x + 6 = 0",
    "What's the difference between mitosis and meiosis?",
    "Can you help me understand Newton's laws of motion?"
  ];

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Brain className="w-8 h-8 text-primary-accent" />
      </div>
      
      <h2 className="text-2xl font-bold text-primary-text mb-4">
        Hi! I'm your AI Tutor 👋
      </h2>
      
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        I'm here to help you understand any concept, solve problems, and clarify your doubts. 
        Ask me anything about your studies!
      </p>
      
      <div className="space-y-3 max-w-lg mx-auto">
        <p className="text-sm text-gray-500 mb-4">Try asking:</p>
        {sampleQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="block w-full text-left p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 text-sm"
          >
            <Lightbulb className="w-4 h-4 inline mr-2 text-primary-accent" />
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoubtClearingPage;

interface ChatHistorySidebarProps {
  chatHistory: ChatSession[];
  currentSessionId?: string;
  onSelectSession: (sessionId: string) => void;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  chatHistory,
  currentSessionId,
  onSelectSession
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold text-primary-text mb-2">Recent Conversations</h3>
        <p className="text-xs text-gray-400">
          Click on any conversation to continue
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No previous conversations</p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectSession(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                currentSessionId === chat.id
                  ? 'bg-primary-accent/10 border-primary-accent/30'
                  : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-primary-text text-sm truncate">
                  {chat.title}
                </h4>
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              {chat.messages.length > 0 && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {chat.messages[chat.messages.length - 1]?.content || 'No messages'}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {chat.messages.length} messages
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  chat.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {chat.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};