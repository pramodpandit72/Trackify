import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">{job.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {job.department && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                  <span>🏢</span>
                  {job.department}
                </span>
              )}
              {job.location && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  <span>📍</span>
                  {job.location}
                </span>
              )}
              {job.type && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                  <span>⏰</span>
                  {job.type}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

        {job.salary && (
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500">Salary Range</p>
            <p className="text-lg font-bold text-[#1a1a1a]">{job.salary}</p>
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
