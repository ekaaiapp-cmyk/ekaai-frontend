import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Button, Card, LoadingSpinner } from './ui';
import { studentAPI, type ProgressAnalytics } from '../services/studentAPI';
import { useLoading } from '../hooks/useLoading';

const ProgressAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<ProgressAnalytics | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  const { isLoading, executeAsync } = useLoading();

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      const analyticsData = await executeAsync(() => 
        studentAPI.getAnalytics(timeRange)
      );
      if (analyticsData) {
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const timeRangeLabels = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 3 Months',
    'all': 'All Time'
  };

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
            <h1 className="text-xl font-bold text-primary-text">My Progress & Analytics</h1>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-primary-accent focus:outline-none"
          >
            {Object.entries(timeRangeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Overall Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-text">
                  {analytics.overallAccuracy.toFixed(1)}%
                </p>
                <p className="text-gray-400 text-sm">Overall Accuracy</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-text">
                  {analytics.questionsMastered}
                </p>
                <p className="text-gray-400 text-sm">Questions Mastered</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-text">
                  {analytics.questionsAttempted}
                </p>
                <p className="text-gray-400 text-sm">Questions Attempted</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Performance */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-primary-text mb-6">Performance by Subject</h2>
            <div className="space-y-4">
              {analytics.subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary-text">{subject.subject}</span>
                    <span className="text-sm text-gray-400">{subject.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-primary-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.accuracy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{subject.questionsAttempted} questions</span>
                    <span>{Math.round(subject.timeSpent / 60)} hours spent</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Historical Trends */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-primary-text mb-6">Performance Trends</h2>
            <div className="space-y-4">
              {analytics.historicalTrends.slice(-7).map((trend) => (
                <div key={trend.date} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-accent rounded-full" />
                    <span className="text-sm text-gray-400">
                      {new Date(trend.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-primary-text font-medium">
                      {trend.accuracy.toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {trend.questionsAttempted} questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Weak Areas & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-primary-text mb-6">Areas for Improvement</h2>
            <div className="space-y-3">
              {analytics.weakAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                  <span className="text-red-300 text-sm">{area}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-primary-text mb-6">Recommended Actions</h2>
            <div className="space-y-3">
              {analytics.recommendations.map((rec) => (
                <div 
                  key={rec.id} 
                  className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={() => navigate(rec.actionUrl)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-text mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{rec.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.estimatedTime} min
                        </span>
                        <span className={`px-2 py-1 rounded-full ${{
                          low: 'bg-gray-700 text-gray-300',
                          medium: 'bg-yellow-500/20 text-yellow-300',
                          high: 'bg-red-500/20 text-red-300'
                        }[rec.priority]}`}>
                          {rec.priority}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements */}
        {analytics.achievements.length > 0 && (
          <Card className="p-6 mt-8">
            <h2 className="text-lg font-bold text-primary-text mb-6">Recent Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="p-4 bg-primary-accent/10 border border-primary-accent/20 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-medium text-primary-text">{achievement.title}</h3>
                      <p className="text-xs text-gray-400">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{achievement.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ProgressAnalyticsPage;
