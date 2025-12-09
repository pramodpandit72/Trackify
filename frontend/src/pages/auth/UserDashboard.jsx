import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedExercises: 0,
    reviewsPosted: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#775fab] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">Track your fitness journey</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Applied Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.appliedJobs}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <i className="fa-solid fa-briefcase text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Saved Exercises</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.savedExercises}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <i className="fa-solid fa-dumbbell text-2xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Reviews Posted</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.reviewsPosted}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <i className="fa-solid fa-star text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <i className="fa-solid fa-user mr-2 text-[#775fab]"></i>
              Personal Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{user.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium capitalize px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {user.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Fitness Profile */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <i className="fa-solid fa-heart-pulse mr-2 text-[#775fab]"></i>
              Fitness Profile
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{user.age || 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">{user.height ? `${user.height} cm` : 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{user.weight ? `${user.weight} kg` : 'Not set'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Fitness Level:</span>
                <span className="font-medium capitalize">{user.fitnessLevel || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Main Goal:</span>
                <span className="font-medium">{user.mainGoal || 'Not set'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        {user.goals && user.goals.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <i className="fa-solid fa-bullseye mr-2 text-[#775fab]"></i>
              Your Fitness Goals
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.goals.map((goal, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <i className="fa-solid fa-bolt mr-2 text-[#775fab]"></i>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/exercise')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#775fab] hover:bg-purple-50 transition text-left"
            >
              <i className="fa-solid fa-dumbbell text-2xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900">Browse Exercises</p>
              <p className="text-sm text-gray-600">Explore workout library</p>
            </button>

            <button
              onClick={() => navigate('/trainers')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#775fab] hover:bg-purple-50 transition text-left"
            >
              <i className="fa-solid fa-user-tie text-2xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900">Find a Trainer</p>
              <p className="text-sm text-gray-600">Get expert guidance</p>
            </button>

            <button
              onClick={() => navigate('/jobs')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#775fab] hover:bg-purple-50 transition text-left"
            >
              <i className="fa-solid fa-briefcase text-2xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900">View Jobs</p>
              <p className="text-sm text-gray-600">Explore opportunities</p>
            </button>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/profile/edit')}
            className="px-6 py-3 bg-[#775fab] text-white rounded-lg hover:bg-[#5d3d89] transition font-semibold"
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
