import { Link } from 'react-router-dom';

const StudentSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Deeply Personalized Content",
      description: "Learn with examples that match your real-life background and interests, making concepts easier to grasp."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Adaptive Learning Pace",
      description: "EkaAI speeds up when you're soaring and provides extra support when you're stuck, ensuring you're always in the optimal learning zone."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Instant Doubt Clearing",
      description: "Never wait for an answer again. Get your questions solved the moment they arise, anytime.",
      link: "/doubt-clearing",
      linkText: "Try it now"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Smart, Customizable Study Plans",
      description: "Tell EkaAI your schedule, and it will build a custom plan that predicts your progress and helps you reach your goals."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Interactive & Adaptive Question Bank",
      description: "Engage with questions that intelligently adjust in difficulty based on your performance, keeping you challenged and motivated."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary-text-bright mb-6">
            Learning That Truly{' '}
            <span className="text-primary-accent">Understands You</span>
          </h2>
          <p className="text-xl text-primary-text max-w-3xl mx-auto">
            For students who want to feel seen, understood, and empowered in their learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-primary-bg/50 rounded-xl border border-gray-800 hover:border-primary-accent/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-6 text-primary-accent">
                {feature.icon}
              </div>
              <h3 className="text-xl font-headline font-semibold text-primary-text-bright mb-4">
                {feature.title}
              </h3>
              <p className="text-primary-text leading-relaxed mb-4">
                {feature.description}
              </p>
              {feature.link && (
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-primary-accent hover:text-yellow-500 transition-colors duration-200 font-medium"
                >
                  {feature.linkText}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-16">
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-accent text-primary-bg px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
          >
            Start Your Personalized Learning Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentSection;
