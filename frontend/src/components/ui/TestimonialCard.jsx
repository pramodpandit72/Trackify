import React from 'react';

function TestimonialCard({ review }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Quote icon */}
      <div className="text-5xl text-[#775fab]/20 mb-4">"</div>
      
      {/* Review Text */}
      <p className="text-gray-700 text-base leading-relaxed mb-6 flex-1">
        {review.text || review.comment}
      </p>

      {/* Author Info */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-[#1a1a1a] text-lg">{review.clientName || review.author}</p>
          {/* Stars */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < (review.rating || 5) ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"}>
                ⭐
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500">
          With trainer <span className="font-semibold text-[#775fab]">{review.trainerName || 'Our Trainer'}</span>
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
