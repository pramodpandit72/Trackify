import React, { useState } from 'react';

export default function Faq() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What makes virtual training different from workout videos?',
      answer: 'Virtual training combines form correction, real-time feedback, personalized programming, and 1-on-1 support. Unlike videos, workouts adapt to your progress.'
    },
    {
      id: 2,
      question: 'How are trainers matched with clients?',
      answer: 'We match you based on fitness goals, trainer specialization, availability, gender preference, and other preferences to ensure a great fit.'
    },
    {
      id: 3,
      question: 'Do I need special equipment?',
      answer: 'No. Trainers can design programs for no equipment, minimal equipment, or a full home gym depending on what you have.'
    },
    {
      id: 4,
      question: 'Can I schedule live video calls?',
      answer: 'Yes. You can schedule live video calls, send video messages, and chat with your trainer through the app.'
    },
    {
      id: 5,
      question: 'How does motion tracking work?',
      answer: 'The app can integrate with wearables (Apple Watch or Android WearOS) to capture movement and performance metrics for better personalization.'
    },
    {
      id: 6,
      question: 'What about physical limitations or injuries?',
      answer: 'Your trainer will adapt workouts around any injuries or limitations and progress you safely over time.'
    },
    {
      id: 7,
      question: 'How often are workouts updated?',
      answer: 'Trainers continuously evaluate your data and typically update programs weekly or as needed based on progress.'
    },
    {
      id: 8,
      question: 'How does pricing work?',
      answer: 'Choose from transparent daily or monthly plans with no long-term contracts. You can cancel anytime.'
    }
  ];

  const toggleExpanded = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="pt-25 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#32284a] to-[#443049] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg opacity-90">
            Find answers to common questions about Trackify
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#443049] text-left">
                  {faq.question}
                </h3>
                <span className={`text-2xl text-[#775fab] transition-transform ${
                  expanded === faq.id ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>

              {expanded === faq.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 bg-purple-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[#443049] mb-4">Still have questions?</h2>
          <p className="text-gray-700 mb-6">
            Our support team is here to help you get started.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#775fab] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5d3d89] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
