import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react';
import { Button, Card, LoadingSpinner } from './ui';
import { studentAPI, type LearningSession, type Question, type SessionProgress } from '../services/studentAPI';
import { aiTutoringAPI } from '../services/aiTutoringAPI';
import { useLoading } from '../hooks/useLoading';

interface LearningSessionPageProps {
  sessionId?: string;
}

const LearningSessionPage: React.FC<LearningSessionPageProps> = ({ sessionId: propSessionId }) => {
  const { sessionId: routeSessionId } = useParams<{ sessionId: string }>();
  const sessionId = propSessionId || routeSessionId;
  const navigate = useNavigate();
  
  const [session, setSession] = useState<LearningSession | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showQuestions, setShowQuestions] = useState(false);
  // const [showDoubtClearing, setShowDoubtClearing] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const { isLoading, executeAsync } = useLoading();

  useEffect(() => {
    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

  const loadSession = async () => {
    if (!sessionId) return;
    
    try {
      const sessionData = await executeAsync(() => studentAPI.getSession(sessionId));
      if (sessionData) {
        setSession(sessionData);
        setCurrentSection(sessionData.progress.currentSection);
        setShowQuestions(sessionData.progress.currentSection >= sessionData.content.length);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  };

  const handleNextSection = () => {
    if (!session) return;
    
    if (currentSection < session.content.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      updateProgress({ currentSection: nextSection });
    } else {
      // Move to questions
      setShowQuestions(true);
      updateProgress({ currentSection: session.content.length });
    }
  };

  const handleAnswerSubmit = async (questionId: string, answer: string) => {
    if (!session) return;
    
    try {
      await executeAsync(() => 
        studentAPI.submitAnswer(session.id, questionId, answer)
      );
      
      // Track the answer (could be used for review later)
      console.log('Answer submitted:', { questionId, answer });
      
      // Move to next question or complete session
      if (currentQuestion < session.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setSessionComplete(true);
        updateProgress({ 
          status: 'completed',
          completedQuestions: session.questions.length
        });
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const updateProgress = async (updates: Partial<SessionProgress>) => {
    if (!session) return;
    
    try {
      await studentAPI.updateSessionProgress(session.id, updates);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleOpenDoubtClearing = async () => {
    try {
      const chatSession = await aiTutoringAPI.createChatSession(
        'user-123', // This would come from auth context
        'I need help with this lesson'
      );
      // Navigate to doubt clearing with context
      navigate(`/doubt-clearing/${chatSession.id}`, {
        state: {
          context: {
            subject: session?.subject,
            topic: session?.topic,
            lessonId: session?.id
          }
        }
      });
    } catch (error) {
      console.error('Failed to open doubt clearing:', error);
    }
  };

  if (isLoading || !session) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-primary-bg p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-primary-text mb-4">
              Session Complete! 🎉
            </h1>
            <p className="text-gray-400 mb-6">
              Great job completing "{session.title}". You've made excellent progress!
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate('/progress')}>
                View Progress
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary-bg/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-600" />
            <div>
              <h1 className="font-semibold text-primary-text">{session.title}</h1>
              <p className="text-sm text-gray-400">{session.subject} • {session.topic}</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenDoubtClearing}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Ask a Doubt
          </Button>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {session.estimatedDuration} min
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Target className="w-4 h-4" />
            {session.difficulty}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-text">
              {showQuestions ? 'Questions' : 'Lesson Content'}
            </span>
            <span className="text-sm text-gray-400">
              {showQuestions 
                ? `${currentQuestion + 1}/${session.questions.length}`
                : `${currentSection + 1}/${session.content.length}`
              }
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-primary-accent h-2 rounded-full transition-all duration-300"
              style={{ 
                width: showQuestions 
                  ? `${((currentQuestion + 1) / session.questions.length) * 100}%`
                  : `${((currentSection + 1) / session.content.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
        {!showQuestions ? (
          <LessonContentView 
            content={session.content[currentSection]}
            onNext={handleNextSection}
            isLastSection={currentSection === session.content.length - 1}
          />
        ) : (
          <QuestionView
            question={session.questions[currentQuestion]}
            onSubmit={handleAnswerSubmit}
          />
        )}
      </main>
    </div>
  );
};

interface LessonContentViewProps {
  content: LearningSession['content'][0];
  onNext: () => void;
  isLastSection: boolean;
}

const LessonContentView: React.FC<LessonContentViewProps> = ({ 
  content, 
  onNext, 
  isLastSection 
}) => {
  return (
    <Card className="p-8">
      <h2 className="text-xl font-bold text-primary-text mb-6">
        {content.title}
      </h2>
      
      <div className="prose prose-invert max-w-none mb-8">
        {content.type === 'text' && (
          <div 
            className="text-gray-300 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}
        
        {content.type === 'image' && (
          <div className="text-center">
            <img 
              src={content.content} 
              alt={content.title}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
        
        {content.type === 'video' && (
          <div className="aspect-video">
            <iframe
              src={content.content}
              title={content.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onNext} className="flex items-center gap-2">
          {isLastSection ? 'Start Questions' : 'Next Section'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

interface QuestionViewProps {
  question: Question;
  onSubmit: (questionId: string, answer: string) => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [shortAnswer, setShortAnswer] = useState<string>('');

  const handleSubmit = () => {
    const answer = question.type === 'multiple-choice' || question.type === 'true-false' 
      ? selectedAnswer 
      : shortAnswer;
    
    if (answer.trim()) {
      onSubmit(question.id, answer);
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-primary-accent/20 text-primary-accent text-sm rounded-full mb-4">
          {question.difficulty}
        </div>
        <h2 className="text-xl font-bold text-primary-text mb-4">
          {question.question}
        </h2>
      </div>

      <div className="mb-8">
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label 
                key={index}
                className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-accent"
                />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <label 
                key={option}
                className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-accent"
                />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {(question.type === 'short-answer' || question.type === 'essay') && (
          <textarea
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:border-primary-accent focus:outline-none"
            rows={question.type === 'essay' ? 6 : 3}
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!selectedAnswer && !shortAnswer.trim()}
          className="px-8"
        >
          Submit Answer
        </Button>
      </div>
    </Card>
  );
};

export default LearningSessionPage;
