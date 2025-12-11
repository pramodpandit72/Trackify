import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/api/auth/verify-reset-token/${token}`);
        if (response.data.valid) {
          setTokenValid(true);
        }
      } catch (err) {
        setTokenValid(false);
        setError('This reset link is invalid or has expired.');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, { password });
      
      if (response.data.success) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while verifying token
  if (verifying) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-[#775fab] mb-4"></i>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </section>
    );
  }

  // Invalid token
  if (!tokenValid) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-xmark text-red-500 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#32284a] mb-4">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block bg-[#775fab] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#32284a] transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </section>
    );
  }

  // Success state
  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#32284a] mb-4">Password Reset!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. Redirecting you to login...
          </p>
          <Link
            to="/login"
            className="inline-block bg-[#775fab] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#32284a] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  // Reset password form
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#32284a] to-[#775fab] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#775fab]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-lock text-[#775fab] text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-[#32284a] mb-2">Reset Password</h1>
          <p className="text-gray-600">
            Enter your new password below.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#443049] mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab] focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#443049] mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#775fab] focus:border-transparent"
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
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-[#775fab] hover:text-[#32284a] font-medium"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
