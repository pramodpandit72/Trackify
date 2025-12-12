import React from 'react';
import { Link } from 'react-router-dom';

function TrainerCard({ trainer }) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-black/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      {/* Profile Picture */}
      <div className="relative h-64 bg-linear-to-br from-[#775fab] to-[#32284a] overflow-hidden">
        {trainer.profilePicture ? (
          <img 
            src={trainer.profilePicture} 
            alt={trainer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-8xl text-white/80">👤</div>
          </div>
        )}
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="font-bold text-sm">{trainer.rating?.toFixed(1) || 'N/A'}</span>
          <span className="text-xs text-gray-500">({trainer.reviewsCount || 0})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-1">{trainer.name}</h3>
          <p className="text-[#775fab] font-semibold">{trainer.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {trainer.experienceYears} years experience
          </p>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trainer.specialties?.slice(0, 3).map((specialty, i) => (
            <span key={i} className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
              {specialty}
            </span>
          ))}
          {trainer.specialties?.length > 3 && (
            <span className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
              +{trainer.specialties.length - 3} more
            </span>
          )}
        </div>

        {/* Bio excerpt */}
        {trainer.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {trainer.bio}
          </p>
        )}

        {/* Price and Button */}
        <div className="mt-auto">
          {trainer.pricePerSession && (
            <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-2xl font-bold text-[#1a1a1a] dark:text-white">${trainer.pricePerSession}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">/session</span>
            </div>
          )}
          <Link 
            to={`/trainers/${trainer._id}`}
            className="block w-full bg-[#775fab] text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-[#5d3d89] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrainerCard;
