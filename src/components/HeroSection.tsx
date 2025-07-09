const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-16 px-6 min-h-screen flex items-center">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary-text-bright mb-6 leading-tight">
            The Future of Learning is Here.{' '}
            <span className="text-primary-accent">Perfectly Personalized</span>{' '}
            with AI.
          </h1>
          <p className="text-xl md:text-2xl text-primary-text mb-8 max-w-3xl mx-auto leading-relaxed">
            EkaAI is an adaptive AI tutor that understands your unique learning style, 
            helping you master any subject faster and more effectively.
          </p>
          <button
            onClick={scrollToWaitlist}
            className="bg-primary-accent text-primary-bg px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Join the Waitlist
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-accent/10 to-transparent h-px"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">AI-Powered</h3>
              <p className="text-primary-text">Advanced algorithms that adapt to your learning style</p>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Lightning Fast</h3>
              <p className="text-primary-text">Get instant answers and feedback whenever you need them</p>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Personalized</h3>
              <p className="text-primary-text">Content tailored to your background and interests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
