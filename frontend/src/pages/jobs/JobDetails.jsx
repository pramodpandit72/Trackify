import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#775fab]"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4 dark:bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">Job Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "The job you're looking for doesn't exist."}</p>
          <Link to="/jobs" className="text-[#775fab] font-semibold hover:underline">
            ← Back to All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link to="/jobs" className="inline-flex items-center text-[#775fab] font-medium mb-8 hover:underline">
          ← Back to All Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 lg:p-12 mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {job.department && (
              <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                🏢 {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                📍 {job.location}
              </span>
            )}
            {job.type && (
              <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                ⏰ {job.type}
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] dark:text-white mb-4">{job.title}</h1>
          
          {job.salary && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Salary Range</p>
              <p className="text-xl font-bold text-[#775fab]">{job.salary}</p>
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 lg:p-12 mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-6">Requirements</h2>
            <ul className="space-y-4">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#775fab] mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply CTA */}
        <div className="bg-gradient-to-br from-[#775fab] to-[#5d3d89] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join our team and help people transform their lives through fitness
          </p>
          <Link
            to={`/jobs/${job._id}/apply`}
            className="inline-flex items-center justify-center bg-white text-[#775fab] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Apply for This Position
          </Link>
        </div>
      </div>
    </div>
  );
}
