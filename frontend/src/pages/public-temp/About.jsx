import React from 'react';
import CTASection from '../../components/sections/CTASection';

function About() {
  return (
    <div className="pt-25 min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-linear-to-r from-[#32284a] to-[#443049] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Trackify</h1>
          <p className="text-lg opacity-90">
            Revolutionizing fitness with personalized virtual training
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#443049] dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            At Trackify, our mission is to help as many people as possible achieve their fitness goals with personalized guidance from certified trainers. Fitness should fit into your life, not the other way around.
          </p>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#443049] dark:text-white mb-6">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Personal Connection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe in building genuine relationships between trainers and clients.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Personalization</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Every workout is customized based on your goals, fitness level, and needs.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Gamification</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Stay motivated with progress tracking and exciting challenges.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Education</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Learn proper form and fitness principles from your expert trainer.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Accountability</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Regular check-ins keep you accountable and motivated.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#775fab] mb-3">Enjoyment</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Fitness should be enjoyable and sustainable long-term.
              </p>
            </div>
          </div>
        </section>

        {/* Why Virtual Training */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#443049] dark:text-white mb-6">Why Virtual Training?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Virtual training combines customized workouts, 1-on-1 support, real-time feedback, and advanced progress tracking.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-[#775fab] font-bold">✓</span>
                <span>Customized workouts designed specifically for you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#775fab] font-bold">✓</span>
                <span>1-on-1 support from certified professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#775fab] font-bold">✓</span>
                <span>Real-time feedback and progress tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#775fab] font-bold">✓</span>
                <span>Flexibility to work out anytime, anywhere</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Trainers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#443049] dark:text-white mb-6">Our Trainers</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            We hire only the best trainers. All our trainers are certified, experienced, and specialized in various fitness areas.
          </p>
        </section>
      </div>

      <CTASection
        title="Ready to Start Your Transformation?"
        description="Join thousands of people who have achieved real results with personalized virtual training."
        buttonText="Find Your Trainer"
        buttonLink="/trainers"
      />
    </div>
  );
}

export default About;
