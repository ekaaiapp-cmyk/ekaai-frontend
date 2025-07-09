import { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentForm from './forms/StudentForm';
import InstructorForm from './forms/InstructorForm';
import UniversityForm from './forms/UniversityForm';

type UserType = 'student' | 'instructor' | 'university';

const WaitlistPage: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

  const userTypes = [
    {
      type: 'student' as UserType,
      title: 'Student',
      description: 'Join as a student to access personalized AI learning experiences',
      icon: (
        <svg className="w-12 h-12 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      type: 'instructor' as UserType,
      title: 'Instructor',
      description: 'Join as an instructor to create and manage AI-powered courses',
      icon: (
        <svg className="w-12 h-12 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      type: 'university' as UserType,
      title: 'University',
      description: 'Join as a university to integrate EkaAI into your institution',
      icon: (
        <svg className="w-12 h-12 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const handleBack = () => {
    setSelectedUserType(null);
  };

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text font-body">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-headline font-bold text-primary-text-bright">
            EkaAI
          </Link>
          <Link
            to="/"
            className="text-primary-text hover:text-primary-accent transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {!selectedUserType ? (
            <>
              {/* Page Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-text-bright mb-6">
                  Join the <span className="text-primary-accent">EkaAI</span> Waitlist
                </h1>
                <p className="text-xl md:text-2xl text-primary-text max-w-3xl mx-auto">
                  Choose your role to get started with a personalized registration experience
                </p>
              </div>

              {/* User Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {userTypes.map((userType) => (
                  <button
                    key={userType.type}
                    onClick={() => setSelectedUserType(userType.type)}
                    className="group p-8 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-primary-accent hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-105 text-left"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                        {userType.icon}
                      </div>
                      <h3 className="text-2xl font-headline font-semibold text-primary-text-bright mb-4">
                        {userType.title}
                      </h3>
                      <p className="text-primary-text leading-relaxed">
                        {userType.description}
                      </p>
                      <div className="mt-6 inline-flex items-center text-primary-accent group-hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-2">Get Started</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-20 pt-8 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-400 mb-6">Join thousands of early adopters</p>
                <div className="flex justify-center items-center space-x-8 opacity-60">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-primary-accent">500+</div>
                    <div className="text-sm">Students</div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-primary-accent">50+</div>
                    <div className="text-sm">Instructors</div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-primary-accent">10+</div>
                    <div className="text-sm">Universities</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Form Header */}
              <div className="flex items-center mb-8">
                <button
                  onClick={handleBack}
                  className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-primary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary-text-bright">
                    {selectedUserType === 'student' && 'Student Registration'}
                    {selectedUserType === 'instructor' && 'Instructor Registration'}
                    {selectedUserType === 'university' && 'University Registration'}
                  </h1>
                  <p className="text-primary-text mt-2">
                    Fill out the form below to join the EkaAI waitlist
                  </p>
                </div>
              </div>

              {/* Form Component */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
                {selectedUserType === 'student' && <StudentForm />}
                {selectedUserType === 'instructor' && <InstructorForm />}
                {selectedUserType === 'university' && <UniversityForm />}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WaitlistPage;
