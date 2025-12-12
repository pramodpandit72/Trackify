import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminApplications() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByJob, setFilterByJob] = useState('all');
  const [jobs, setJobs] = useState([]);
  
  // Sorting
  const [sortBy, setSortBy] = useState('date-newest');
  
  // Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check admin access
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    const userObj = JSON.parse(storedUser);
    if (userObj.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    // Fetch data
    const fetchData = async () => {
      try {
        // Fetch all applications
        const appRes = await axios.get('/api/jobs/applications/all?limit=1000', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(appRes.data.items || []);
        setFilteredApplications(appRes.data.items || []);

        // Fetch jobs for filter dropdown
        const jobRes = await axios.get('/api/jobs?limit=1000');
        setJobs(jobRes.data.items || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Filter and search logic
  useEffect(() => {
    let results = [...applications];

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      results = results.filter(app =>
        app.name.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search) ||
        app.phone?.includes(search)
      );
    }

    // Filter by job
    if (filterByJob !== 'all') {
      results = results.filter(app => app.jobId?._id === filterByJob);
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date-newest':
          return new Date(b.appliedAt) - new Date(a.appliedAt);
        case 'date-oldest':
          return new Date(a.appliedAt) - new Date(b.appliedAt);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredApplications(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterByJob, sortBy, applications]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // Delete application
  const handleDelete = async (appId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/jobs/applications/${appId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setApplications(applications.filter(app => app._id !== appId));
      setShowModal(false);
    } catch (error) {
      console.error('Failed to delete application:', error);
      alert('Failed to delete application');
    }
  };

  // View application details
  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredApplications.length === 0) {
      alert('No applications to export');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Job Title', 'Applied Date', 'Resume'];
    const rows = filteredApplications.map(app => [
      app.name,
      app.email,
      app.phone || 'N/A',
      app.jobId?.title || 'N/A',
      new Date(app.appliedAt).toLocaleDateString(),
      app.resumeLink || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#775fab] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <i className="fa-solid fa-file-alt mr-3 text-[#775fab]"></i>
                Job Applications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and review all job applications</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white transition"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{applications.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Showing</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentItems.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">With Resume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {applications.filter(app => app.resumeLink).length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Unique Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(applications.map(app => app.jobId?._id)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            <i className="fa-solid fa-filter mr-2 text-[#775fab]"></i>
            Filters & Search
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#775fab] focus:border-[#775fab] outline-none"
              />
            </div>

            {/* Filter by Job */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Job</label>
              <select
                value={filterByJob}
                onChange={(e) => setFilterByJob(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#775fab] focus:border-[#775fab] outline-none"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job._id} value={job._id}>{job.title}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#775fab] focus:border-[#775fab] outline-none"
              >
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>

            {/* Export */}
            <div className="flex items-end">
              <button
                onClick={handleExportCSV}
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition flex items-center justify-center"
              >
                <i className="fa-solid fa-download mr-2"></i>
                Export CSV
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filterByJob !== 'all') && (
            <div className="flex gap-2 flex-wrap">
              {searchTerm && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-blue-600"
                  >
                    ✕
                  </button>
                </span>
              )}
              {filterByJob !== 'all' && (
                <span className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Job: {jobs.find(j => j._id === filterByJob)?.title}
                  <button
                    onClick={() => setFilterByJob('all')}
                    className="ml-2 hover:text-purple-600"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {currentItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <i className="fa-solid fa-inbox text-4xl mb-4 text-gray-300"></i>
              <p className="text-lg font-semibold">No applications found</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Applied For</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Resume</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900">{app.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${app.email}`}
                            className="text-[#775fab] hover:underline text-sm"
                          >
                            {app.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {app.phone || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {app.jobId?.title || 'Deleted Job'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(app.appliedAt).toLocaleDateString()} {new Date(app.appliedAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {app.resumeLink ? (
                            <a
                              href={app.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
                            >
                              <i className="fa-solid fa-file-pdf mr-2"></i>
                              View
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">Not provided</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetails(app)}
                              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredApplications.length)} of {filteredApplications.length} applications
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 font-medium"
                    >
                      ← Previous
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg font-medium ${
                            currentPage === page
                              ? 'bg-[#775fab] text-white'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 font-medium"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#775fab] to-[#5d3d89] text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Application Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl hover:opacity-80"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Applicant Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-user mr-2 text-[#775fab]"></i>
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Full Name</p>
                    <p className="text-gray-900 font-semibold">{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <a href={`mailto:${selectedApp.email}`} className="text-[#775fab] hover:underline font-semibold">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Phone</p>
                    <p className="text-gray-900 font-semibold">{selectedApp.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Applied On</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(selectedApp.appliedAt).toLocaleDateString()} at {new Date(selectedApp.appliedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-briefcase mr-2 text-[#775fab]"></i>
                  Job Position
                </h3>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-900 font-semibold">{selectedApp.jobId?.title || 'Job Deleted'}</p>
                  {selectedApp.jobId?.description && (
                    <p className="text-blue-700 text-sm mt-2 line-clamp-2">{selectedApp.jobId.description}</p>
                  )}
                </div>
              </div>

              {/* Cover Letter / Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-comment mr-2 text-[#775fab]"></i>
                  Message / Cover Letter
                </h3>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  {selectedApp.message ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedApp.message}</p>
                  ) : (
                    <p className="text-gray-500 italic">No message provided</p>
                  )}
                </div>
              </div>

              {/* Resume */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-file-pdf mr-2 text-[#775fab]"></i>
                  Resume
                </h3>
                {selectedApp.resumeLink ? (
                  <a
                    href={selectedApp.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                  >
                    <i className="fa-solid fa-download mr-2"></i>
                    Open / Download Resume
                  </a>
                ) : (
                  <p className="text-gray-500 italic">No resume provided</p>
                )}
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-lightning mr-2 text-[#775fab]"></i>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`mailto:${selectedApp.email}?subject=Job Application Status`}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-center transition"
                  >
                    <i className="fa-solid fa-envelope mr-2"></i>
                    Send Email
                  </a>
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className={`px-4 py-2 rounded-lg font-semibold text-center transition ${
                      selectedApp.phone
                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <i className="fa-solid fa-phone mr-2"></i>
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this application? This cannot be undone.')) {
                    handleDelete(selectedApp._id);
                  }
                }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                <i className="fa-solid fa-trash mr-2"></i>
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminApplications;
