import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* EkaAI Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary-text-bright mb-4">
            EkaAI
          </h1>
          <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full"></div>
        </div>

        {/* Tagline */}
        <h2 className="text-2xl md:text-4xl font-headline font-semibold text-primary-accent mb-6">
          Your Personalized AI Tutor for Mastery
        </h2>

        {/* Value Proposition */}
        <p className="text-lg md:text-xl text-primary-text mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience the future of learning with an AI tutor that understands your unique learning style, 
          helping you master any subject faster and more effectively than ever before.
        </p>

        {/* Primary CTA */}
        <div className="mb-16">
          <Link
            to="/login"
            className="inline-block bg-primary-accent text-primary-bg px-12 py-4 rounded-full text-xl font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-text-bright mb-2">AI-Powered</h3>
            <p className="text-primary-text text-sm">Advanced algorithms that adapt to your learning style</p>
          </div>

          <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Lightning Fast</h3>
            <p className="text-primary-text text-sm">Get instant answers and feedback whenever you need them</p>
          </div>

          <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-primary-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-text-bright mb-2">Personalized</h3>
            <p className="text-primary-text text-sm">Content tailored to your background and interests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
