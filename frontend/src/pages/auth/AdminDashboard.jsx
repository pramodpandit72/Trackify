import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrainers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalExercises: 0,
    totalReviews: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    const userObj = JSON.parse(storedUser);
    if (userObj.role !== 'admin') {
      navigate('/dashboard'); // Redirect non-admin to user dashboard
      return;
    }

    // Fetch admin data
    const fetchAdminData = async () => {
      try {
        const [profileRes, jobsRes, exercisesRes, trainersRes, reviewsRes, applicationsRes] = await Promise.all([
          axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/jobs'),
          axios.get('/api/exercises'),
          axios.get('/api/trainers'),
          axios.get('/api/reviews'),
          axios.get('/api/jobs/applications/all', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUser(profileRes.data.user);
        
        setStats({
          totalUsers: 0, // We don't have a users endpoint yet
          totalTrainers: trainersRes.data.total || trainersRes.data.items?.length || 0,
          totalJobs: jobsRes.data.total || jobsRes.data.items?.length || 0,
          totalApplications: applicationsRes.data.total || applicationsRes.data.items?.length || 0,
          totalExercises: exercisesRes.data.total || exercisesRes.data.items?.length || 0,
          totalReviews: reviewsRes.data.total || reviewsRes.data.items?.length || 0
        });

        // Get recent applications
        if (applicationsRes.data.items) {
          setRecentApplications(applicationsRes.data.items.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#775fab] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#775fab] to-[#5d3d89] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                <i className="fa-solid fa-shield-halved mr-2"></i>
                Admin Dashboard
              </h1>
              <p className="text-purple-100 mt-1">Welcome back, {user.firstName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-[#775fab] rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalJobs}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                <i className="fa-solid fa-briefcase text-3xl text-blue-600 dark:text-blue-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Applications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalApplications}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <i className="fa-solid fa-file-alt text-3xl text-green-600 dark:text-green-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Trainers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalTrainers}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
                <i className="fa-solid fa-user-tie text-3xl text-purple-600 dark:text-purple-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Exercises</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalExercises}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full">
                <i className="fa-solid fa-dumbbell text-3xl text-yellow-600 dark:text-yellow-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Reviews</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalReviews}</p>
              </div>
              <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full">
                <i className="fa-solid fa-star text-3xl text-pink-600 dark:text-pink-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase">Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalUsers || 'N/A'}</p>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full">
                <i className="fa-solid fa-users text-3xl text-indigo-600 dark:text-indigo-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            <i className="fa-solid fa-bolt mr-2 text-[#775fab]"></i>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <button
              onClick={() => navigate('/jobs')}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#775fab] hover:bg-purple-50 dark:hover:bg-[#775fab]/10 transition text-center"
            >
              <i className="fa-solid fa-plus-circle text-3xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">Create Job</p>
            </button>

            <button
              onClick={() => navigate('/admin/applications')}
              className="p-4 border-2 border-blue-200 dark:border-blue-700 rounded-lg hover:border-[#775fab] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-center bg-blue-50 dark:bg-blue-900/30"
            >
              <i className="fa-solid fa-file-alt text-3xl text-blue-600 dark:text-blue-400 mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">All Applications</p>
            </button>

            <button
              onClick={() => navigate('/trainers')}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#775fab] hover:bg-purple-50 dark:hover:bg-[#775fab]/10 transition text-center"
            >
              <i className="fa-solid fa-user-plus text-3xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">Add Trainer</p>
            </button>

            <button
              onClick={() => navigate('/exercise')}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#775fab] hover:bg-purple-50 dark:hover:bg-[#775fab]/10 transition text-center"
            >
              <i className="fa-solid fa-dumbbell text-3xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">Manage Exercises</p>
            </button>

            <button
              onClick={() => navigate('/reviews')}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#775fab] hover:bg-purple-50 dark:hover:bg-[#775fab]/10 transition text-center"
            >
              <i className="fa-solid fa-star text-3xl text-[#775fab] mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">View Reviews</p>
            </button>
          </div>
        </div>

        {/* Recent Applications */}
        {recentApplications.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fa-solid fa-file-alt mr-2 text-[#775fab]"></i>
              Recent Job Applications
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-[#252542]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{app.jobId?.title || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{app.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {app.resumeLink && (
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#775fab] hover:text-[#5d3d89] dark:hover:text-[#9d7fd3] font-medium"
                          >
                            View Resume
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/admin/applications')}
                className="text-[#775fab] hover:text-[#5d3d89] dark:hover:text-[#9d7fd3] font-medium"
              >
                View All Applications →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
