import { Link } from 'react-router-dom';

const FinalCTA: React.FC = () => {
  return (
    <section id="waitlist" className="py-20 px-6 bg-gradient-to-b from-gray-900/30 to-primary-bg">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary-text-bright mb-6">
            Ready to Experience the{' '}
            <span className="text-primary-accent">Future of Learning?</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-text mb-12 max-w-3xl mx-auto">
            Be the first to get access to EkaAI. Join the waitlist today and get ready to transform your educational journey.
          </p>

          <div className="max-w-md mx-auto">
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center w-full bg-primary-accent text-primary-bg px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105"
            >
              Join the Waitlist
            </Link>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Choose your role and get personalized access to EkaAI
            </p>
          </div>

          {/* Additional benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Early Access</h3>
              <p className="text-primary-text text-sm">Be among the first to experience EkaAI</p>
            </div>

            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Special Pricing</h3>
              <p className="text-primary-text text-sm">Exclusive early bird discounts</p>
            </div>

            <div className="p-6 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586l-4.828-4.828A2 2 0 012 9.172V6a2 2 0 012-2h4l4 4h5a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Direct Feedback</h3>
              <p className="text-primary-text text-sm">Help shape the future of EkaAI</p>
            </div>
          </div>

          {/* Trust indicators */}
          {/* <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-4">Trusted by educators and students worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Early Signups</div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">Educators</div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm">Universities</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
