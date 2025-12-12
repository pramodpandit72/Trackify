import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#32284a] mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: December 12, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Trackify. By accessing or using our fitness tracking platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">2. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By creating an account or using Trackify, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">3. User Accounts</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You must provide accurate and complete information when creating an account.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must be at least 18 years old to use our services.</li>
                <li>One person may not maintain more than one account.</li>
              </ul>
            </section>

            {/* Use of Services */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">4. Use of Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree to use Trackify only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use the service in any way that violates applicable laws or regulations.</li>
                <li>Attempt to gain unauthorized access to any part of the service.</li>
                <li>Interfere with or disrupt the integrity of the service.</li>
                <li>Upload or transmit any harmful or malicious content.</li>
              </ul>
            </section>

            {/* Trainer Services */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">5. Trainer Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Trackify connects users with fitness trainers. While we verify trainer credentials, we do not guarantee the quality, safety, or effectiveness of any training programs. Users should consult with healthcare professionals before starting any fitness program.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content, features, and functionality of Trackify are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Trackify and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount you paid us in the past twelve months.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">8. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <Link to="/contact" className="text-[#775fab] hover:underline">
                  our contact page
                </Link>.
              </p>
            </section>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-[#775fab] hover:text-[#32284a] font-semibold transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Login
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Terms;
