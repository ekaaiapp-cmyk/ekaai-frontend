import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useNotifications } from '../../hooks/useNotifications';
import { waitlistAPI } from '../../services/waitlistAPI';
import {
  Button,
  Input,
  Select,
  Textarea,
  CheckboxGroup,
  Card,
  Notification
} from '../ui';
import {
  SUBJECT_OPTIONS,
  GRADE_OPTIONS,
  AI_EXPERIENCE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS
} from '../../constants';
import type { FormField } from '../../utils/formValidation';
import type { StudentRegistration } from '../../services/waitlistAPI';

const StudentFormRefactored: React.FC = () => {
  const { notifications, addNotification, removeNotification } = useNotifications();

  const initialFormData: StudentRegistration = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    grade: '',
    school: '',
    subjects: [],
    learningGoals: '',
    previousAIExperience: '',
    referralSource: ''
  };

  const formFields: FormField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'grade',
      label: 'Grade',
      type: 'select',
      required: true
    },
    {
      name: 'school',
      label: 'School',
      type: 'text',
      required: true
    },
    {
      name: 'subjects',
      label: 'Subjects',
      type: 'checkbox',
      required: true,
      validation: (value: string[]) => 
        value.length === 0 ? 'Please select at least one subject' : undefined
    }
  ];

  const handleFormSubmit = async (data: StudentRegistration) => {
    try {
      await waitlistAPI.registerStudent(data);
      addNotification({
        type: 'success',
        title: 'Registration Successful!',
        message: 'Welcome to the EkaAI waitlist! We\'ll notify you when we launch.'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: 'Something went wrong. Please try again.'
      });
      throw error;
    }
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

  if (notifications.some(n => n.type === 'success')) {
    return (
      <Card className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-headline font-bold text-primary-text-bright mb-4">
          Welcome to EkaAI!
        </h3>
        <p className="text-primary-text mb-6">
          You're on the waitlist! We'll send you an email when we launch.
        </p>
        <p className="text-sm text-gray-400">
          Get ready for a personalized learning experience like never before.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="firstName"
                label="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="Enter your first name"
              />

              <Input
                name="lastName"
                label="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Enter your last name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="email"
                type="email"
                label="Email Address *"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter your email address"
              />

              <Input
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone || ''}
                onChange={handleChange}
                error={errors.phone}
                placeholder="Enter your phone number"
              />
            </div>

            <Input
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
              error={errors.dateOfBirth}
            />
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
              Academic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="grade"
                label="Current Grade *"
                value={formData.grade}
                onChange={handleChange}
                error={errors.grade}
                options={[
                  { value: '', label: 'Select your grade' },
                  ...GRADE_OPTIONS.map(grade => ({ value: grade, label: grade }))
                ]}
              />

              <Input
                name="school"
                label="School/Institution *"
                value={formData.school}
                onChange={handleChange}
                error={errors.school}
                placeholder="Enter your school name"
              />
            </div>

            <CheckboxGroup
              label="Subjects you're interested in *"
              options={SUBJECT_OPTIONS}
              value={formData.subjects}
              onChange={handleSubjectsChange}
              error={errors.subjects}
              columns={3}
            />
          </div>

          {/* Learning Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold text-primary-text-bright">
              Learning Preferences
            </h3>

            <Textarea
              name="learningGoals"
              label="What are your learning goals?"
              value={formData.learningGoals || ''}
              onChange={handleChange}
              placeholder="Tell us what you hope to achieve with EkaAI..."
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="previousAIExperience"
                label="Previous AI Learning Experience"
                value={formData.previousAIExperience || ''}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select your experience level' },
                  ...AI_EXPERIENCE_OPTIONS.map(exp => ({ value: exp, label: exp }))
                ]}
              />

              <Select
                name="referralSource"
                label="How did you hear about EkaAI?"
                value={formData.referralSource || ''}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select a source' },
                  ...REFERRAL_SOURCE_OPTIONS.map(source => ({ value: source, label: source }))
                ]}
              />
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StudentFormRefactored;
