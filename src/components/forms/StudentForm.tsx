import { useState } from 'react';
import { waitlistAPI } from '../../services/waitlistAPI';

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: string;
  school: string;
  subjects: string[];
  learningGoals: string;
  previousAIExperience: string;
  referralSource: string;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
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
    referralSource: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Arts',
    'Music', 'Physical Education', 'Foreign Languages', 'Other'
  ];

  const gradeOptions = [
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade', 'Undergraduate', 'Graduate', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof StudentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.grade) newErrors.grade = 'Grade level is required';
    if (!formData.school.trim()) newErrors.school = 'School name is required';
    if (formData.subjects.length === 0) newErrors.subjects = ['At least one subject is required'];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await waitlistAPI.registerStudent(formData);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Registration failed:', result.message);
        // Handle error (show error message)
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-headline font-bold text-green-400 mb-4">
          Welcome to the EkaAI Community!
        </h2>
        <p className="text-primary-text mb-6">
          Thank you for joining our waitlist, {formData.firstName}. We'll send you updates about early access and personalized learning opportunities.
        </p>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <p className="text-green-400 font-medium">What's Next?</p>
          <ul className="text-primary-text text-sm mt-2 space-y-1">
            <li>• You'll receive a confirmation email shortly</li>
            <li>• We'll notify you when early access is available</li>
            <li>• Get ready for personalized AI-powered learning!</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-primary-text mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.firstName ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-primary-text mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.lastName ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.email ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary-text mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Academic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-primary-text mb-2">
              Grade Level *
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.grade ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
            >
              <option value="">Select your grade level</option>
              {gradeOptions.map(grade => (
                <option key={grade} value={grade} className="bg-gray-900">
                  {grade}
                </option>
              ))}
            </select>
            {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade}</p>}
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium text-primary-text mb-2">
              School/Institution *
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.school ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter your school name"
            />
            {errors.school && <p className="text-red-400 text-sm mt-1">{errors.school}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-primary-text mb-2">
            Subjects of Interest *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {subjectOptions.map(subject => (
              <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                  className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                />
                <span className="text-sm text-primary-text">{subject}</span>
              </label>
            ))}
          </div>
          {errors.subjects && <p className="text-red-400 text-sm mt-1">{errors.subjects[0]}</p>}
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Additional Information
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="learningGoals" className="block text-sm font-medium text-primary-text mb-2">
              Learning Goals
            </label>
            <textarea
              id="learningGoals"
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="What do you hope to achieve with EkaAI?"
            />
          </div>

          <div>
            <label htmlFor="previousAIExperience" className="block text-sm font-medium text-primary-text mb-2">
              Previous AI Learning Experience
            </label>
            <select
              id="previousAIExperience"
              name="previousAIExperience"
              value={formData.previousAIExperience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select your experience level</option>
              <option value="none" className="bg-gray-900">No previous experience</option>
              <option value="basic" className="bg-gray-900">Basic exposure</option>
              <option value="intermediate" className="bg-gray-900">Some experience</option>
              <option value="advanced" className="bg-gray-900">Extensive experience</option>
            </select>
          </div>

          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium text-primary-text mb-2">
              How did you hear about EkaAI?
            </label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select an option</option>
              <option value="social-media" className="bg-gray-900">Social Media</option>
              <option value="friend" className="bg-gray-900">Friend/Family</option>
              <option value="teacher" className="bg-gray-900">Teacher/Instructor</option>
              <option value="school" className="bg-gray-900">School</option>
              <option value="search" className="bg-gray-900">Search Engine</option>
              <option value="other" className="bg-gray-900">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-accent text-primary-bg px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Joining Waitlist...
            </div>
          ) : (
            'Join Student Waitlist'
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
