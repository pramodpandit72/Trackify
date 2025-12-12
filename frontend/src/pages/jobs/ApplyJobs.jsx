import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplyJobs() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    message: "",
    certifications: "",
    experience: ""
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[\d\s\-\+\(\)]{10,}$/.test(form.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submitForm = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(`/api/jobs/${jobId}/apply`, form);

      setSubmitted(true);
      setTimeout(() => {
        navigate("/jobs");
      }, 3000);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Failed to submit application. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 border border-gray-100 dark:border-gray-700">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-4">Application Submitted!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Thank you for applying! We've received your application and will review it shortly. You'll receive an email confirmation at <span className="font-semibold">{form.email}</span>.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Redirecting to jobs page in a few seconds...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">
            Apply to Join Trackify
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your information and let's see if you're a great fit for our team
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <form onSubmit={submitForm} className="p-8 lg:p-12">
            {/* Submit Error */}
            {errors.submit && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-700 dark:text-red-400 font-medium flex items-center gap-2">
                  <span>⚠️</span> {errors.submit}
                </p>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Personal Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Help us get to know you</p>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
                      errors.name
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
                      errors.email
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.email && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
                      errors.phone
                        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.phone && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-10 pb-10 border-t border-gray-100 dark:border-gray-700 pt-10">
              <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Professional Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Tell us about your qualifications</p>

              <div className="space-y-6">
                {/* Certifications */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Certifications & Credentials
                  </label>
                  <textarea
                    name="certifications"
                    value={form.certifications}
                    onChange={handleChange}
                    placeholder="e.g., NASM CPT, ACE Certification, CSCS, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-xl focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all resize-none"
                    rows="3"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">List all relevant fitness certifications and credentials</p>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Years of Training Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g., 5 years"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-xl focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all"
                  />
                </div>

                {/* Resume Link */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] dark:text-white mb-2">
                    Resume/CV Link
                  </label>
                  <input
                    type="url"
                    name="resumeLink"
                    value={form.resumeLink}
                    onChange={handleChange}
                    placeholder="https://link-to-your-resume.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-xl focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can use Google Drive, Dropbox, or any cloud storage link</p>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="mb-10 pb-10 border-t border-gray-100 dark:border-gray-700 pt-10">
              <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Tell Us More</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Why do you want to join Trackify?</p>

              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share your passion for fitness training and why you'd be a great fit for our team..."
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-xl focus:outline-none focus:border-[#775fab] focus:bg-white dark:focus:bg-gray-800 transition-all resize-none"
                  rows="5"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">This helps us understand your motivation and personality</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-linear-to-r from-[#775fab] to-[#5d3d89] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <>
                <span>✈️</span> Submit Application
              </>
              </button>
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Banner */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-[#1a1a1a] dark:text-white mb-2">Quick Review</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">We review all applications within 2-3 business days</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold text-[#1a1a1a] dark:text-white mb-2">Follow-up</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">We'll contact you by phone or email to discuss next steps</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-[#1a1a1a] dark:text-white mb-2">Your Success</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Join a community dedicated to transforming lives</p>
          </div>
        </div>
      </div>
    </div>
  );
}
