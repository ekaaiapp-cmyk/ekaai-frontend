import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Search, 
  Play,
  Star,
  Users,
  ArrowLeft
} from 'lucide-react';
import { DashboardLayout } from './common/Layout';
import { Card, Button, Input, LoadingSpinner } from './ui';
import { studentAPI, type LearningSession } from '../services/studentAPI';

const LearningSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<LearningSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [sessions, searchQuery, selectedSubject, selectedDifficulty]);

  const loadSessions = async () => {
    try {
      // Get all available sessions (this would be a new API endpoint)
      const allSessions = await studentAPI.getAllSessions();
      setSessions(allSessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      // Fallback to recommended sessions if getAllSessions doesn't exist
      try {
        const recommendedSessions = await studentAPI.getRecommendedSessions('user-123');
        setSessions(recommendedSessions);
      } catch (fallbackError) {
        console.error('Failed to load recommended sessions:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filterSessions = () => {
    let filtered = sessions;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(session => session.subject === selectedSubject);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(session => session.difficulty === selectedDifficulty);
    }

    setFilteredSessions(filtered);
  };

  const getUniqueSubjects = () => {
    const subjects = [...new Set(sessions.map(session => session.subject))];
    return subjects.sort();
  };

  const handleStartSession = (sessionId: string) => {
    navigate(`/learning-session/${sessionId}`);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4">Loading learning sessions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-text mb-2">
                Learning Sessions
              </h1>
              <p className="text-gray-400">
                Explore our comprehensive collection of AI-guided learning sessions
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <div className="text-sm text-gray-400">
                {filteredSessions.length} of {sessions.length} sessions
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Subject Filter */}
              <div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent"
                >
                  <option value="all">All Subjects</option>
                  {getUniqueSubjects().map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary-text mb-2">No sessions found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSelectedDifficulty('all');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onStart={() => handleStartSession(session.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

interface SessionCardProps {
  session: LearningSession;
  onStart: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="p-6 hover:border-gray-600 transition-colors group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-primary-text mb-1 group-hover:text-primary-accent transition-colors">
                {session.title}
              </h3>
              <p className="text-sm text-gray-400">
                {session.subject} • {session.topic}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 line-clamp-2">
            Learn about {session.topic} in {session.subject} through interactive content and questions.
          </p>
        </div>

        {/* Content Preview */}
        {session.content && session.content.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-400 mb-2">What you'll learn:</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              {session.content.slice(0, 2).map((content, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Target className="w-3 h-3 text-primary-accent mt-0.5 flex-shrink-0" />
                  {content.title}
                </li>
              ))}
              {session.content.length > 2 && (
                <li className="text-gray-400">
                  +{session.content.length - 2} more topics
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {session.estimatedDuration} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {Math.floor(Math.random() * 1000) + 100} enrolled
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            {(4.2 + Math.random() * 0.8).toFixed(1)}
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getDifficultyColor(session.difficulty)}`}>
            {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Session
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LearningSessionsPage;
