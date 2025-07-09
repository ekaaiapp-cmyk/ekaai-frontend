const EducatorSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Real-Time Progress Tracking",
      description: "Get a bird's-eye view of your entire class's performance and track individual student journeys at a glance."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Personalized Student Reports",
      description: "Instantly identify which students need help and pinpoint the exact topics they're struggling with, allowing for targeted intervention."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Custom Tests & Assignments",
      description: "Easily create and assign custom quizzes or problem sets tailored to your curriculum."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Evaluations",
      description: "Save countless hours with automated, instant grading and actionable feedback for your students."
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary-text-bright mb-6">
            Empower Your Classroom,{' '}
            <span className="text-primary-accent">Elevate Your Impact</span>
          </h2>
          <p className="text-xl text-primary-text max-w-3xl mx-auto">
            For educators who want to make their teaching more efficient and impactful with AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-primary-accent/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary-accent/20 rounded-lg flex items-center justify-center text-primary-accent group-hover:bg-primary-accent/30 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-primary-text leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits highlight */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary-accent/10 to-transparent rounded-xl border border-primary-accent/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-accent mb-2">75%</div>
              <div className="text-primary-text">Time Saved on Grading</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-accent mb-2">90%</div>
              <div className="text-primary-text">Improved Student Engagement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-accent mb-2">100%</div>
              <div className="text-primary-text">Actionable Insights</div>
            </div>
          </div>
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-16">
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-accent text-primary-bg px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
          >
            Transform Your Teaching Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default EducatorSection;
