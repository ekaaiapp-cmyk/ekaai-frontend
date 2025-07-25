import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  MessageCircle, 
  BarChart3, 
  CreditCard, 
  FileText, 
  Play, 
  TrendingUp, 
  Clock, 
  Target,
  Sparkles,
  ChevronRight,
  Calendar,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../hooks/useLoading';
import { DashboardLayout } from './common/Layout';
import { Card, Button, LoadingSpinner } from './ui';
import { studentAPI, type LearningSession, type ProgressAnalytics } from '../services/studentAPI';
import { aiTutoringAPI } from '../services/aiTutoringAPI';

const StudentDashboard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { executeAsync, isLoading: isSigningOut } = useLoading();
  
  const [recommendedSessions, setRecommendedSessions] = useState<LearningSession[]>([]);
  const [analytics, setAnalytics] = useState<ProgressAnalytics | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [sessions, analyticsData] = await Promise.all([
        studentAPI.getRecommendedSessions(),
        studentAPI.getAnalytics('7d')
      ]);
      
      setRecommendedSessions(sessions.slice(0, 3)); // Show top 3
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await executeAsync(async () => {
      console.log('🔓 Dashboard: Starting sign out process...');
      await signOut();
      console.log('✅ Dashboard: Sign out successful, redirecting to home...');
      navigate('/', { replace: true });
    });
  };

  const handleStartDoubtClearing = async () => {
    try {
      const chatSession = await aiTutoringAPI.createChatSession();
      navigate(`/doubt-clearing/${chatSession.id}`);
    } catch (error) {
      console.error('Failed to start doubt clearing:', error);
      navigate('/doubt-clearing');
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-primary-text mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-text">
                Welcome back, {profile.fullName?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-gray-400 mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
                size="sm"
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                disabled={isSigningOut}
                size="sm"
              >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickActionCard
            icon={<Play className="w-6 h-6" />}
            title="Start Learning"
            description="Begin a new AI-guided lesson"
            color="blue"
            onClick={() => {
              if (recommendedSessions.length > 0) {
                navigate(`/learning-session/${recommendedSessions[0].id}`);
              } else {
                navigate('/learning-session');
              }
            }}
          />
          
          <QuickActionCard
            icon={<MessageCircle className="w-6 h-6" />}
            title="Ask AI Tutor"
            description="Get instant help with any question"
            color="green"
            onClick={handleStartDoubtClearing}
          />
          
          <QuickActionCard
            icon={<CreditCard className="w-6 h-6" />}
            title="Flashcards"
            description="Review and practice concepts"
            color="purple"
            onClick={() => navigate('/flashcards')}
          />
          
          <QuickActionCard
            icon={<FileText className="w-6 h-6" />}
            title="My Content"
            description="Access your notes and materials"
            color="yellow"
            onClick={() => navigate('/content-library')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            {analytics && !isLoadingData && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary-text">Your Progress This Week</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/progress')}
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-primary-text">
                      {analytics.overallAccuracy.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-400">Accuracy</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-primary-text">
                      {analytics.questionsAttempted}
                    </div>
                    <div className="text-sm text-gray-400">Questions</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-primary-text">
                      {analytics.questionsMastered}
                    </div>
                    <div className="text-sm text-gray-400">Mastered</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Recommended Learning Sessions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary-text">Recommended for You</h2>
                <Sparkles className="w-5 h-5 text-primary-accent" />
              </div>
              
              {isLoadingData ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-800 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : recommendedSessions.length > 0 ? (
                <div className="space-y-4">
                  {recommendedSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No recommendations available yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete your onboarding to get personalized suggestions.
                  </p>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <Button
                  variant="outline"
                  onClick={() => navigate('/learning-sessions')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Browse All Sessions
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            {analytics?.achievements && analytics.achievements.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary-accent" />
                  <h3 className="font-bold text-primary-text">Recent Achievements</h3>
                </div>
                
                <div className="space-y-3">
                  {analytics.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-primary-accent/10 border border-primary-accent/20 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary-text text-sm">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Study Streak */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-primary-text">Study Streak</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-text mb-2">7</div>
                <div className="text-sm text-gray-400">days in a row</div>
                <div className="mt-4 text-xs text-gray-500">
                  Keep it up! You're doing great! 🔥
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-bold text-primary-text mb-4">Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Today's Practice</span>
                  <span className="text-primary-text font-medium">45 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">This Week</span>
                  <span className="text-primary-text font-medium">5.2 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Favorite Subject</span>
                  <span className="text-primary-text font-medium">
                    {profile.subjects?.[0] || 'Mathematics'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  description,
  color,
  onClick
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/20 hover:bg-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/20 hover:bg-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/20 hover:bg-purple-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/30'
  };

  return (
    <div 
      className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 border rounded-lg ${colorClasses[color]}`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-current/20 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-bold text-primary-text mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

interface SessionCardProps {
  session: LearningSession;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors cursor-pointer"
      onClick={() => navigate(`/learning-session/${session.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-primary-text mb-1">{session.title}</h4>
          <p className="text-sm text-gray-400 mb-2">{session.subject} • {session.topic}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {session.estimatedDuration} min
            </div>
            <span className="px-2 py-1 bg-gray-800 rounded-full capitalize">
              {session.difficulty}
            </span>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default StudentDashboard;
