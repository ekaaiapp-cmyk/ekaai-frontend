import { useState } from 'react';
import { waitlistAPI } from '../../services/waitlistAPI';

interface UniversityFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  universityName: string;
  department: string;
  universityType: string;
  studentPopulation: string;
  location: string;
  website: string;
  currentLMS: string[];
  techInfrastructure: string;
  aiInitiatives: string;
  implementationGoals: string;
  budget: string;
  timeline: string;
  decisionMakers: string;
  challenges: string;
  expectations: string;
  referralSource: string;
}

const UniversityForm: React.FC = () => {
  const [formData, setFormData] = useState<UniversityFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    universityName: '',
    department: '',
    universityType: '',
    studentPopulation: '',
    location: '',
    website: '',
    currentLMS: [],
    techInfrastructure: '',
    aiInitiatives: '',
    implementationGoals: '',
    budget: '',
    timeline: '',
    decisionMakers: '',
    challenges: '',
    expectations: '',
    referralSource: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UniversityFormData>>({});

  const titleOptions = [
    'President', 'Vice President', 'Provost', 'Vice Provost', 'Dean',
    'Associate Dean', 'Department Head', 'Director', 'CTO', 'CIO',
    'IT Director', 'Academic Technology Director', 'Principal',
    'Vice Principal', 'Administrator', 'Other'
  ];

  const universityTypeOptions = [
    'Public University', 'Private University', 'Community College',
    'Technical College', 'Liberal Arts College', 'Research University',
    'Online University', 'K-12 School District', 'Private School',
    'Charter School', 'International School', 'Other'
  ];

  const lmsOptions = [
    'Canvas', 'Blackboard', 'Moodle', 'D2L Brightspace', 'Google Classroom',
    'Schoology', 'Edmodo', 'Microsoft Teams for Education', 'Sakai',
    'Custom Solution', 'Other', 'None'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof UniversityFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLMSChange = (lms: string) => {
    setFormData(prev => ({
      ...prev,
      currentLMS: prev.currentLMS.includes(lms)
        ? prev.currentLMS.filter(item => item !== lms)
        : [...prev.currentLMS, lms]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UniversityFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.universityName.trim()) newErrors.universityName = 'University name is required';
    if (!formData.universityType) newErrors.universityType = 'University type is required';
    if (!formData.studentPopulation) newErrors.studentPopulation = 'Student population is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await waitlistAPI.registerUniversity(formData);
      
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
          Welcome to the EkaAI University Partnership Program!
        </h2>
        <p className="text-primary-text mb-6">
          Thank you for {formData.universityName}'s interest in EkaAI. We're excited to explore how we can transform education at your institution.
        </p>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <p className="text-green-400 font-medium">What's Next?</p>
          <ul className="text-primary-text text-sm mt-2 space-y-1">
            <li>• A dedicated partnership representative will contact you within 48 hours</li>
            <li>• You'll receive a comprehensive university partnership package</li>
            <li>• Schedule a personalized demo for your leadership team</li>
            <li>• Access to our institutional pilot program</li>
            <li>• Custom implementation planning session</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Person Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Contact Person Information
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            <label htmlFor="department" className="block text-sm font-medium text-primary-text mb-2">
              Department
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
      </div>

      {/* Institution Information */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Institution Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="universityName" className="block text-sm font-medium text-primary-text mb-2">
              University/Institution Name *
            </label>
            <input
              type="text"
              id="universityName"
              name="universityName"
              value={formData.universityName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.universityName ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
              placeholder="Enter institution name"
            />
            {errors.universityName && <p className="text-red-400 text-sm mt-1">{errors.universityName}</p>}
          </div>

          <div>
            <label htmlFor="universityType" className="block text-sm font-medium text-primary-text mb-2">
              Institution Type *
            </label>
            <select
              id="universityType"
              name="universityType"
              value={formData.universityType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.universityType ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
            >
              <option value="">Select institution type</option>
              {universityTypeOptions.map(type => (
                <option key={type} value={type} className="bg-gray-900">
                  {type}
                </option>
              ))}
            </select>
            {errors.universityType && <p className="text-red-400 text-sm mt-1">{errors.universityType}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="studentPopulation" className="block text-sm font-medium text-primary-text mb-2">
              Student Population *
            </label>
            <select
              id="studentPopulation"
              name="studentPopulation"
              value={formData.studentPopulation}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 ${
                errors.studentPopulation ? 'border-red-500' : 'border-gray-700 focus:border-primary-accent'
              }`}
            >
              <option value="">Select student population</option>
              <option value="under-500" className="bg-gray-900">Under 500</option>
              <option value="500-1000" className="bg-gray-900">500-1,000</option>
              <option value="1000-5000" className="bg-gray-900">1,000-5,000</option>
              <option value="5000-10000" className="bg-gray-900">5,000-10,000</option>
              <option value="10000-25000" className="bg-gray-900">10,000-25,000</option>
              <option value="25000-50000" className="bg-gray-900">25,000-50,000</option>
              <option value="over-50000" className="bg-gray-900">Over 50,000</option>
            </select>
            {errors.studentPopulation && <p className="text-red-400 text-sm mt-1">{errors.studentPopulation}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-primary-text mb-2">
              Location (City, State/Country)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="Enter location"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="website" className="block text-sm font-medium text-primary-text mb-2">
            Institution Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            placeholder="https://www.youruniversity.edu"
          />
        </div>
      </div>

      {/* Technology Infrastructure */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Technology Infrastructure
        </h3>
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Current Learning Management Systems
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {lmsOptions.map(lms => (
              <label key={lms} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.currentLMS.includes(lms)}
                  onChange={() => handleLMSChange(lms)}
                  className="w-4 h-4 text-primary-accent bg-gray-900 border-gray-600 rounded focus:ring-primary-accent/20"
                />
                <span className="text-sm text-primary-text">{lms}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="techInfrastructure" className="block text-sm font-medium text-primary-text mb-2">
            Technology Infrastructure Readiness
          </label>
          <select
            id="techInfrastructure"
            name="techInfrastructure"
            value={formData.techInfrastructure}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
          >
            <option value="">Select readiness level</option>
            <option value="basic" className="bg-gray-900">Basic - Limited digital infrastructure</option>
            <option value="intermediate" className="bg-gray-900">Intermediate - Some digital systems in place</option>
            <option value="advanced" className="bg-gray-900">Advanced - Comprehensive digital infrastructure</option>
            <option value="cutting-edge" className="bg-gray-900">Cutting-edge - Latest technology implementations</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="aiInitiatives" className="block text-sm font-medium text-primary-text mb-2">
            Current AI/Technology Initiatives
          </label>
          <textarea
            id="aiInitiatives"
            name="aiInitiatives"
            value={formData.aiInitiatives}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            placeholder="Describe any current AI or technology initiatives at your institution"
          />
        </div>
      </div>

      {/* Implementation Details */}
      <div>
        <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
          Implementation Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-primary-text mb-2">
              Implementation Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select timeline</option>
              <option value="immediate" className="bg-gray-900">Immediate (1-3 months)</option>
              <option value="short-term" className="bg-gray-900">Short-term (3-6 months)</option>
              <option value="medium-term" className="bg-gray-900">Medium-term (6-12 months)</option>
              <option value="long-term" className="bg-gray-900">Long-term (1+ years)</option>
              <option value="exploring" className="bg-gray-900">Currently exploring options</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-primary-text mb-2">
              Budget Range (Annual)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
            >
              <option value="">Select budget range</option>
              <option value="under-10k" className="bg-gray-900">Under $10,000</option>
              <option value="10k-50k" className="bg-gray-900">$10,000 - $50,000</option>
              <option value="50k-100k" className="bg-gray-900">$50,000 - $100,000</option>
              <option value="100k-500k" className="bg-gray-900">$100,000 - $500,000</option>
              <option value="500k-1m" className="bg-gray-900">$500,000 - $1,000,000</option>
              <option value="over-1m" className="bg-gray-900">Over $1,000,000</option>
              <option value="tbd" className="bg-gray-900">To be determined</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="implementationGoals" className="block text-sm font-medium text-primary-text mb-2">
              Implementation Goals and Objectives
            </label>
            <textarea
              id="implementationGoals"
              name="implementationGoals"
              value={formData.implementationGoals}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="What do you hope to achieve with EkaAI at your institution?"
            />
          </div>

          <div>
            <label htmlFor="decisionMakers" className="block text-sm font-medium text-primary-text mb-2">
              Key Decision Makers Involved
            </label>
            <textarea
              id="decisionMakers"
              name="decisionMakers"
              value={formData.decisionMakers}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="Who else should be involved in the decision-making process?"
            />
          </div>

          <div>
            <label htmlFor="challenges" className="block text-sm font-medium text-primary-text mb-2">
              Current Educational Challenges
            </label>
            <textarea
              id="challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="What are the main educational challenges your institution faces?"
            />
          </div>

          <div>
            <label htmlFor="expectations" className="block text-sm font-medium text-primary-text mb-2">
              Expectations from EkaAI Partnership
            </label>
            <textarea
              id="expectations"
              name="expectations"
              value={formData.expectations}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20"
              placeholder="What are your expectations from a partnership with EkaAI?"
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
              <option value="partner" className="bg-gray-900">Partner Organization</option>
              <option value="colleague" className="bg-gray-900">Colleague/Peer Institution</option>
              <option value="vendor" className="bg-gray-900">Technology Vendor</option>
              <option value="media" className="bg-gray-900">Media/Press</option>
              <option value="search" className="bg-gray-900">Search Engine</option>
              <option value="social-media" className="bg-gray-900">Social Media</option>
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
              Submitting Request...
            </div>
          ) : (
            'Submit University Partnership Request'
          )}
        </button>
      </div>
    </form>
  );
};

export default UniversityForm;
