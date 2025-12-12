import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      
      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] dark:from-black dark:to-gray-900 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#32284a] dark:text-white mb-4">Check Your Email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If an account with that email exists, we've sent a password reset link. 
            Please check your inbox and spam folder.
          </p>
          <Link
            to="/login"
            className="inline-block bg-[#775fab] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#32284a] transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] dark:from-black dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#775fab]/10 dark:bg-[#775fab]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-key text-[#775fab] text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-[#32284a] dark:text-white mb-2">Forgot Password?</h1>
          <p className="text-gray-600 dark:text-gray-400">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#443049] dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#775fab] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#775fab] text-white py-3 rounded-lg font-semibold hover:bg-[#32284a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-[#775fab] hover:text-[#32284a] dark:hover:text-[#9d7fd3] font-medium"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
