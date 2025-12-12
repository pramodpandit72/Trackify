import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1">
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-2">{job.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {job.department && (
                <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                  <span>🏢</span>
                  {job.department}
                </span>
              )}
              {job.location && (
                <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                  <span>📍</span>
                  {job.location}
                </span>
              )}
              {job.type && (
                <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
                  <span>⏰</span>
                  {job.type}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{job.description}</p>

        {job.salary && (
          <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Salary Range</p>
            <p className="text-lg font-bold text-[#1a1a1a] dark:text-white">{job.salary}</p>
          </div>
        )}

        <div className="flex gap-4">
          <Link
            to={`/jobs/${job._id}/apply`}
            className="flex-1 text-center bg-[#775fab] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5d3d89] transition-all shadow-md hover:shadow-lg"
          >
            Apply Now
          </Link>
          <Link
            to={`/jobs/${job._id}`}
            className="text-center border-2 border-[#775fab] text-[#775fab] px-6 py-3 rounded-xl font-semibold hover:bg-[#775fab] hover:text-white transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
