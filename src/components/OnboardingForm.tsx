import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { OnboardingFormData } from '../types/auth';

const OnboardingForm: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: user?.user_metadata?.full_name || '',
    preferredLanguage: 'english',
    currentGrade: '',
    subjects: [],
    isPreparingForExam: false,
    examName: '',
    learningGoals: [],
    dailyStudyTime: '1-2',
    preferredExplanationStyle: 'step-by-step',
    learningChallenge: '',
    startingTopic: '',
    youtubeLink: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science',
    'Economics',
    'Other'
  ];

  const learningGoalOptions = [
    'Improve grades',
    'Prepare for specific exam',
    'Understand difficult concepts better',
    'Get instant help with doubts',
    'Build confidence in learning',
    'Other'
  ];

  const challengeOptions = [
    'I find it hard to focus',
    'I hesitate to ask questions',
    'I forget concepts easily',
    'Topics feel boring',
    'I struggle with time management',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'subjects') {
        setFormData(prev => ({
          ...prev,
          subjects: checkbox.checked
            ? [...prev.subjects, value]
            : prev.subjects.filter(subject => subject !== value)
        }));
      } else if (name === 'learningGoals') {
        setFormData(prev => ({
          ...prev,
          learningGoals: checkbox.checked
            ? [...prev.learningGoals, value]
            : prev.learningGoals.filter(goal => goal !== value)
        }));
      }
    } else if (type === 'radio') {
      if (name === 'isPreparingForExam') {
        setFormData(prev => ({
          ...prev,
          isPreparingForExam: value === 'yes'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.currentGrade.trim()) {
      newErrors.currentGrade = 'Current grade/year is required';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Please select at least one subject';
    }

    if (formData.learningGoals.length === 0) {
      newErrors.learningGoals = 'Please select at least one learning goal';
    }

    if (!formData.learningChallenge.trim()) {
      newErrors.learningChallenge = 'Please describe a learning challenge';
    }

    if (formData.isPreparingForExam && !formData.examName?.trim()) {
      newErrors.examName = 'Please specify the exam name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Update profile in Supabase
      await updateProfile({
        fullName: formData.fullName,
        email: user?.email || '',
        preferredLanguage: formData.preferredLanguage,
        currentGrade: formData.currentGrade,
        subjects: formData.subjects,
        isPreparingForExam: formData.isPreparingForExam,
        examName: formData.examName || undefined,
        learningGoals: formData.learningGoals,
        dailyStudyTime: formData.dailyStudyTime,
        preferredExplanationStyle: formData.preferredExplanationStyle,
        learningChallenge: formData.learningChallenge,
        startingTopic: formData.startingTopic || undefined,
        youtubeLink: formData.youtubeLink || undefined
      });

      // TODO: Send data to AI backend for personalization
      console.log('Onboarding data for AI:', formData);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-headline font-bold text-primary-text-bright mb-2">
            Welcome to EkaAI!
          </h1>
          <p className="text-primary-text">
            Just a few more details to personalize your learning experience...
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-headline font-semibold text-primary-text-bright mb-6">
              Let's personalize your learning!
            </h2>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-primary-text mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Preferred Language */}
            <div>
              <label htmlFor="preferredLanguage" className="block text-sm font-medium text-primary-text mb-2">
                Preferred Learning Language *
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent"
              >
                <option value="english" className="bg-gray-900">English</option>
                <option value="hindi" className="bg-gray-900">Hindi</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>

            {/* Current Grade */}
            <div>
              <label htmlFor="currentGrade" className="block text-sm font-medium text-primary-text mb-2">
                Current Grade / Year Level *
              </label>
              <input
                type="text"
                id="currentGrade"
                name="currentGrade"
                value={formData.currentGrade}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                  errors.currentGrade ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
                }`}
                placeholder="e.g., 10th Grade, Freshman"
              />
              {errors.currentGrade && <p className="text-red-400 text-sm mt-1">{errors.currentGrade}</p>}
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Subjects you are currently studying or need help with *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {subjectOptions.map(subject => (
                  <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="subjects"
                      value={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                    />
                    <span className="text-sm text-primary-text">{subject}</span>
                  </label>
                ))}
              </div>
              {errors.subjects && <p className="text-red-400 text-sm mt-1">{errors.subjects}</p>}
            </div>

            {/* Competitive Exam */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Are you preparing for a competitive exam? *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPreparingForExam"
                    value="yes"
                    checked={formData.isPreparingForExam}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 focus:ring-primary-accent/20"
                  />
                  <span className="text-sm text-primary-text">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPreparingForExam"
                    value="no"
                    checked={!formData.isPreparingForExam}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 focus:ring-primary-accent/20"
                  />
                  <span className="text-sm text-primary-text">No</span>
                </label>
              </div>
            </div>

            {/* Exam Name (conditional) */}
            {formData.isPreparingForExam && (
              <div>
                <label htmlFor="examName" className="block text-sm font-medium text-primary-text mb-2">
                  Specify Exam *
                </label>
                <input
                  type="text"
                  id="examName"
                  name="examName"
                  value={formData.examName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                    errors.examName ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
                  }`}
                  placeholder="e.g., JEE, NEET"
                />
                {errors.examName && <p className="text-red-400 text-sm mt-1">{errors.examName}</p>}
              </div>
            )}

            {/* Learning Goals */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Your main goals with EkaAI right now? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {learningGoalOptions.map(goal => (
                  <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="learningGoals"
                      value={goal}
                      checked={formData.learningGoals.includes(goal)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                    />
                    <span className="text-sm text-primary-text">{goal}</span>
                  </label>
                ))}
              </div>
              {errors.learningGoals && <p className="text-red-400 text-sm mt-1">{errors.learningGoals}</p>}
            </div>

            {/* Daily Study Time */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                How much time can you commit to studying per day? *
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { value: 'less-than-1', label: 'Less than 1 hour' },
                  { value: '1-2', label: '1-2 hours' },
                  { value: 'more-than-2', label: 'More than 2 hours' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dailyStudyTime"
                      value={option.value}
                      checked={formData.dailyStudyTime === option.value}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 focus:ring-primary-accent/20"
                    />
                    <span className="text-sm text-primary-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Explanation Style */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                How do you prefer the AI to explain things? *
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { value: 'step-by-step', label: 'Step-by-step detailed' },
                  { value: 'quick-summaries', label: 'Quick summaries' },
                  { value: 'real-life-examples', label: 'Using real-life examples' },
                  { value: 'interactive-questions', label: 'With interactive questions' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredExplanationStyle"
                      value={option.value}
                      checked={formData.preferredExplanationStyle === option.value}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 focus:ring-primary-accent/20"
                    />
                    <span className="text-sm text-primary-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Challenge */}
            <div>
              <label htmlFor="learningChallenge" className="block text-sm font-medium text-primary-text mb-2">
                What's one challenge you face in learning? *
              </label>
              <select
                id="learningChallenge"
                name="learningChallenge"
                value={formData.learningChallenge}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                  errors.learningChallenge ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
                }`}
              >
                <option value="">Select a challenge</option>
                {challengeOptions.map(challenge => (
                  <option key={challenge} value={challenge} className="bg-gray-900">
                    {challenge}
                  </option>
                ))}
              </select>
              {errors.learningChallenge && <p className="text-red-400 text-sm mt-1">{errors.learningChallenge}</p>}
            </div>

            {/* Starting Topic (Optional) */}
            <div>
              <label htmlFor="startingTopic" className="block text-sm font-medium text-primary-text mb-2">
                Which chapter or topic would you like to start with first? (Optional)
              </label>
              <input
                type="text"
                id="startingTopic"
                name="startingTopic"
                value={formData.startingTopic}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent"
                placeholder="e.g., Quadratic Equations, Photosynthesis"
              />
            </div>

            {/* YouTube Link (Optional) */}
            <div>
              <label htmlFor="youtubeLink" className="block text-sm font-medium text-primary-text mb-2">
                Paste a YouTube video link you want notes from (Optional)
              </label>
              <input
                type="url"
                id="youtubeLink"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-red-400 text-sm text-center">{errors.submit}</div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-primary-accent text-primary-bg px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary-bg border-t-transparent rounded-full animate-spin mr-3"></div>
                    Saving Profile...
                  </div>
                ) : (
                  'Start Learning!'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
