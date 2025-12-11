import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      // Check if the logged in user is actually an admin
      if (response.data.user.role !== 'admin') {
        setError('Access denied. This login is for administrators only.');
        setLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="w-full max-w-md mx-4">
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#775fab] to-[#32284a] rounded-full mb-4 shadow-lg">
            <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Restricted access for authorized administrators only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
            <i className="fa-solid fa-triangle-exclamation text-yellow-500 mt-0.5"></i>
            <div>
              <p className="text-yellow-500 font-medium text-sm">Security Notice</p>
              <p className="text-yellow-500/80 text-xs">This area is monitored. Unauthorized access attempts will be logged.</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@trackify.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#775fab] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#775fab] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-600 bg-white/5 text-[#775fab] focus:ring-[#775fab]" />
                Remember this device
              </label>
              <Link to="/forgot-password" className="text-[#775fab] hover:text-[#9b7fd1] transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#775fab] to-[#32284a] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Back to User Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Not an admin?{' '}
              <Link to="/login" className="text-[#775fab] hover:text-[#9b7fd1] transition-colors font-medium">
                User Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Trackify. Protected by advanced security.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
