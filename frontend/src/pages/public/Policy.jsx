import React from 'react';
import { Link } from 'react-router-dom';

function Policy() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#32284a] mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: December 12, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                At Trackify, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fitness tracking platform. Please read this policy carefully.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and profile picture.</li>
                <li><strong>Account Information:</strong> Username, password, and account preferences.</li>
                <li><strong>Health & Fitness Data:</strong> Weight, height, fitness goals, workout history, and progress data.</li>
                <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely by third-party providers).</li>
                <li><strong>Communications:</strong> Messages you send to trainers or our support team.</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Connect you with appropriate fitness trainers.</li>
                <li>Track your fitness progress and provide personalized recommendations.</li>
                <li>Process transactions and send related information.</li>
                <li>Send you technical notices, updates, and support messages.</li>
                <li>Respond to your comments and questions.</li>
                <li>Analyze usage patterns to improve user experience.</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>With Trainers:</strong> Your fitness data is shared with trainers you connect with to provide personalized training.</li>
                <li><strong>Service Providers:</strong> We share data with third-party vendors who help us operate our platform.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">6. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain information as required by law or for legitimate business purposes, such as resolving disputes and enforcing our agreements.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">7. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and receive a copy of your personal data.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Request deletion of your personal data.</li>
                <li>Object to or restrict certain processing of your data.</li>
                <li>Data portability (receive your data in a structured format).</li>
                <li>Withdraw consent at any time where processing is based on consent.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our service.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-[#32284a] mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
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

export default Policy;
