import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { 
  Button, 
  Input, 
  Select, 
  CheckboxGroup, 
  RadioGroup, 
  Textarea,
  Card,
  PageHeader,
  LoadingSpinner 
} from './ui';
import {
  SUBJECT_OPTIONS,
  LEARNING_GOAL_OPTIONS,
  CHALLENGE_OPTIONS,
  DAILY_STUDY_TIME_OPTIONS,
  EXPLANATION_STYLE_OPTIONS,
  LANGUAGE_OPTIONS,
  GRADE_OPTIONS
} from '../constants';
import type { OnboardingFormData } from '../types/auth';
import type { FormField } from '../utils/formValidation';

const OnboardingForm: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  const initialFormData: OnboardingFormData = {
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
  };

  const formFields: FormField[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true
    },
    {
      name: 'currentGrade',
      label: 'Current Grade/Year',
      type: 'select',
      required: true,
      options: GRADE_OPTIONS.map(grade => ({ value: grade, label: grade }))
    },
    {
      name: 'subjects',
      label: 'Subjects',
      type: 'checkbox',
      required: true,
      validation: (value: string[]) => 
        value.length === 0 ? 'Please select at least one subject' : undefined
    },
    {
      name: 'learningGoals',
      label: 'Learning Goals',
      type: 'checkbox',
      required: true,
      validation: (value: string[]) => 
        value.length === 0 ? 'Please select at least one learning goal' : undefined
    },
    {
      name: 'learningChallenge',
      label: 'Learning Challenge',
      type: 'text',
      required: true
    }
  ];

  const handleFormSubmit = async (data: OnboardingFormData) => {
    await updateProfile({
      fullName: data.fullName,
      email: user?.email || '',
      preferredLanguage: data.preferredLanguage,
      currentGrade: data.currentGrade,
      subjects: data.subjects,
      isPreparingForExam: data.isPreparingForExam,
      examName: data.examName || undefined,
      learningGoals: data.learningGoals,
      dailyStudyTime: data.dailyStudyTime,
      preferredExplanationStyle: data.preferredExplanationStyle,
      learningChallenge: data.learningChallenge,
      startingTopic: data.startingTopic || undefined,
      youtubeLink: data.youtubeLink || undefined
    });

    navigate('/dashboard');
  };

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData
  } = useForm({
    initialData: initialFormData,
    fields: formFields,
    onSubmit: handleFormSubmit
  });

  const handleSubjectsChange = (subjects: string[]) => {
    setFormData(prev => ({ ...prev, subjects }));
  };

  const handleLearningGoalsChange = (learningGoals: string[]) => {
    setFormData(prev => ({ ...prev, learningGoals }));
  };

  const handleExamPreparationChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      isPreparingForExam: value === 'yes',
      examName: value === 'no' ? '' : prev.examName
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-primary-text mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title="Complete Your Profile"
          subtitle="Help us personalize your learning experience with EkaAI"
        />

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
                Basic Information
              </h3>
              
              <Input
                name="fullName"
                label="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="Enter your full name"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  name="preferredLanguage"
                  label="Preferred Language"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  options={LANGUAGE_OPTIONS}
                />

                <Select
                  name="currentGrade"
                  label="Current Grade/Year *"
                  value={formData.currentGrade}
                  onChange={handleChange}
                  error={errors.currentGrade}
                  options={[
                    { value: '', label: 'Select your grade/year' },
                    ...GRADE_OPTIONS.map(grade => ({ value: grade, label: grade }))
                  ]}
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
                Academic Information
              </h3>

              <CheckboxGroup
                label="Subjects you are currently studying or need help with *"
                options={SUBJECT_OPTIONS}
                value={formData.subjects}
                onChange={handleSubjectsChange}
                error={errors.subjects}
                columns={3}
              />

              <RadioGroup
                label="Are you preparing for a competitive exam? *"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                value={formData.isPreparingForExam ? 'yes' : 'no'}
                onChange={handleExamPreparationChange}
              />

              {formData.isPreparingForExam && (
                <Input
                  name="examName"
                  label="Exam Name"
                  value={formData.examName || ''}
                  onChange={handleChange}
                  error={errors.examName}
                  placeholder="e.g., JEE Main, NEET, SAT, etc."
                />
              )}
            </div>

            {/* Learning Preferences */}
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
                Learning Preferences
              </h3>

              <CheckboxGroup
                label="What are your learning goals? *"
                options={LEARNING_GOAL_OPTIONS}
                value={formData.learningGoals}
                onChange={handleLearningGoalsChange}
                error={errors.learningGoals}
                columns={2}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  name="dailyStudyTime"
                  label="Daily Study Time"
                  value={formData.dailyStudyTime}
                  onChange={handleChange}
                  options={DAILY_STUDY_TIME_OPTIONS}
                />

                <Select
                  name="preferredExplanationStyle"
                  label="Preferred Explanation Style"
                  value={formData.preferredExplanationStyle}
                  onChange={handleChange}
                  options={EXPLANATION_STYLE_OPTIONS}
                />
              </div>

              <Select
                name="learningChallenge"
                label="What's your biggest learning challenge? *"
                value={formData.learningChallenge}
                onChange={handleChange}
                error={errors.learningChallenge}
                options={[
                  { value: '', label: 'Select a challenge' },
                  ...CHALLENGE_OPTIONS.map(challenge => ({ value: challenge, label: challenge }))
                ]}
              />
            </div>

            {/* Optional Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
                Optional Information
              </h3>
              <p className="text-sm text-gray-400">
                This helps us provide better personalized content
              </p>

              <Input
                name="startingTopic"
                label="What topic would you like to start learning about?"
                value={formData.startingTopic || ''}
                onChange={handleChange}
                placeholder="e.g., Calculus, Organic Chemistry, World History"
              />

              <Textarea
                name="youtubeLink"
                label="Share a YouTube video you found helpful for learning"
                value={formData.youtubeLink || ''}
                onChange={handleChange}
                placeholder="Paste a YouTube URL that helped you understand a concept"
                rows={3}
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                loading={isSubmitting}
                fullWidth
                size="lg"
              >
                {isSubmitting ? 'Saving Profile...' : 'Start Learning!'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;
