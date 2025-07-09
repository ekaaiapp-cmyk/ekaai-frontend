import { useState } from 'react';

interface InstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  institution: string;
  department: string;
  teachingExperience: string;
  subjects: string[];
  currentTools: string[];
  studentCount: string;
  aiExperience: string;
  teachingChallenges: string;
  ekaaiInterest: string;
  referralSource: string;
}

const InstructorForm: React.FC = () => {
  const [formData, setFormData] = useState<InstructorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    institution: '',
    department: '',
    teachingExperience: '',
    subjects: [],
    currentTools: [],
    studentCount: '',
    aiExperience: '',
    teachingChallenges: '',
    ekaaiInterest: '',
    referralSource: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<InstructorFormData>>({});

  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Arts',
    'Music', 'Business', 'Engineering', 'Medicine', 'Law', 'Other'
  ];

  const toolOptions = [
    'Google Classroom', 'Canvas', 'Blackboard', 'Moodle', 'Zoom',
    'Microsoft Teams', 'Kahoot', 'Quizlet', 'Mentimeter', 'Padlet',
    'EdPuzzle', 'Flipgrid', 'Other', 'None'
  ];

  const titleOptions = [
    'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer',
    'Instructor', 'Teaching Assistant', 'Adjunct Faculty', 'Department Head',
    'Dean', 'Principal', 'Teacher', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof InstructorFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMultiSelect = (value: string, field: 'subjects' | 'currentTools') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<InstructorFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
    if (!formData.teachingExperience) newErrors.teachingExperience = 'Teaching experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call when backend is ready
      console.log('Instructor registration data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
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
          Welcome to the EkaAI Educator Community!
        </h2>
        <p className="text-primary-text mb-6">
          Thank you for your interest, {formData.title} {formData.firstName}. We're excited to have you join our community of innovative educators.
        </p>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <p className="text-green-400 font-medium">What's Next?</p>
          <ul className="text-primary-text text-sm mt-2 space-y-1">
            <li>• You'll receive a detailed information packet</li>
            <li>• Access to our educator community beta program</li>
            <li>• Priority early access to course creation tools</li>
            <li>• Invitation to exclusive educator webinars</li>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

      {/* Professional Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Professional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-primary-text mb-2">
              Title/Position *
            </label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.title ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
            >
              <option value="">Select your title</option>
              {titleOptions.map(title => (
                <option key={title} value={title} className="bg-gray-900">
                  {title}
                </option>
              ))}
            </select>
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="teachingExperience" className="block text-sm font-medium text-primary-text mb-2">
              Teaching Experience *
            </label>
            <select
              id="teachingExperience"
              name="teachingExperience"
              value={formData.teachingExperience}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.teachingExperience ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
            >
              <option value="">Select experience level</option>
              <option value="less-than-1" className="bg-gray-900">Less than 1 year</option>
              <option value="1-3" className="bg-gray-900">1-3 years</option>
              <option value="3-5" className="bg-gray-900">3-5 years</option>
              <option value="5-10" className="bg-gray-900">5-10 years</option>
              <option value="10-20" className="bg-gray-900">10-20 years</option>
              <option value="more-than-20" className="bg-gray-900">More than 20 years</option>
            </select>
            {errors.teachingExperience && <p className="text-red-400 text-sm mt-1">{errors.teachingExperience}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-primary-text mb-2">
              Institution *
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.institution ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter your institution name"
            />
            {errors.institution && <p className="text-red-400 text-sm mt-1">{errors.institution}</p>}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-primary-text mb-2">
              Department/Faculty
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="Enter your department"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-primary-text mb-2">
            Subjects You Teach
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {subjectOptions.map(subject => (
              <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject)}
                  onChange={() => handleMultiSelect(subject, 'subjects')}
                  className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                />
                <span className="text-sm text-primary-text">{subject}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Teaching Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Teaching Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="studentCount" className="block text-sm font-medium text-primary-text mb-2">
              Average Students Per Semester/Year
            </label>
            <select
              id="studentCount"
              name="studentCount"
              value={formData.studentCount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select student count</option>
              <option value="1-25" className="bg-gray-900">1-25 students</option>
              <option value="26-50" className="bg-gray-900">26-50 students</option>
              <option value="51-100" className="bg-gray-900">51-100 students</option>
              <option value="101-200" className="bg-gray-900">101-200 students</option>
              <option value="200+" className="bg-gray-900">More than 200 students</option>
            </select>
          </div>

          <div>
            <label htmlFor="aiExperience" className="block text-sm font-medium text-primary-text mb-2">
              AI in Education Experience
            </label>
            <select
              id="aiExperience"
              name="aiExperience"
              value={formData.aiExperience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select your experience</option>
              <option value="none" className="bg-gray-900">No experience</option>
              <option value="basic" className="bg-gray-900">Basic knowledge</option>
              <option value="intermediate" className="bg-gray-900">Some practical experience</option>
              <option value="advanced" className="bg-gray-900">Extensive experience</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-primary-text mb-2">
            Current Teaching Tools/Platforms
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {toolOptions.map(tool => (
              <label key={tool} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.currentTools.includes(tool)}
                  onChange={() => handleMultiSelect(tool, 'currentTools')}
                  className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                />
                <span className="text-sm text-primary-text">{tool}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Additional Information
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="teachingChallenges" className="block text-sm font-medium text-primary-text mb-2">
              Current Teaching Challenges
            </label>
            <textarea
              id="teachingChallenges"
              name="teachingChallenges"
              value={formData.teachingChallenges}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="What challenges do you face in teaching that AI could help address?"
            />
          </div>

          <div>
            <label htmlFor="ekaaiInterest" className="block text-sm font-medium text-primary-text mb-2">
              Interest in EkaAI
            </label>
            <textarea
              id="ekaaiInterest"
              name="ekaaiInterest"
              value={formData.ekaaiInterest}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="How do you envision using EkaAI in your teaching?"
            />
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
              <option value="conference" className="bg-gray-900">Educational Conference</option>
              <option value="colleague" className="bg-gray-900">Colleague</option>
              <option value="social-media" className="bg-gray-900">Social Media</option>
              <option value="newsletter" className="bg-gray-900">Educational Newsletter</option>
              <option value="search" className="bg-gray-900">Search Engine</option>
              <option value="institution" className="bg-gray-900">Institution</option>
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
            'Join Instructor Waitlist'
          )}
        </button>
      </div>
    </form>
  );
};

export default InstructorForm;
