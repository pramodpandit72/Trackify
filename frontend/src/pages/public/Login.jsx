import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // If admin tries to login here, redirect them to admin login
      if (response.data.user.role === 'admin') {
        setError('Please use the Admin Login page for administrator access.');
        setLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to user dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#32284a]/90 via-[#775fab]/80 to-[#32284a]/90 z-10"></div>
        <img
          src="/images/login.jpg"
          alt="Fitness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-6">Start Your Fitness Journey</h2>
            <p className="text-lg text-white/90 mb-8">
              Connect with expert trainers, track your progress, and achieve your fitness goals with personalized guidance.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-white/80">Expert Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/logo1.png" alt="Trackify" className="h-12 mx-auto mb-4" />
            </Link>
            <h1 className="text-3xl font-bold text-[#32284a] mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your fitness journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg flex items-center gap-3">
              <i className="fa-solid fa-circle-exclamation text-red-500"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#32284a] mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#775fab] focus:ring-2 focus:ring-[#775fab]/20 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#32284a] mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#775fab] focus:ring-2 focus:ring-[#775fab]/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#775fab] transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 rounded border-gray-300 text-[#775fab] focus:ring-[#775fab]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#775fab] hover:text-[#32284a] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#775fab] to-[#32284a] text-white font-semibold rounded-xl shadow-lg shadow-[#775fab]/30 hover:shadow-xl hover:shadow-[#775fab]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/knowus"
                className="font-semibold text-[#775fab] hover:text-[#32284a] transition-colors"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              Are you an admin?{' '}
              <Link
                to="/admin/login"
                className="font-medium text-[#775fab] hover:text-[#32284a] transition-colors"
              >
                Admin Login →
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-[#775fab] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/policy" className="text-[#775fab] hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;