import React, { memo } from 'react';

const difficultyStyles = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700'
};

function ExerciseCard({ exercise }) {
  if (!exercise) return null;

  const {
    name,
    image,
    category,
    description,
    muscleGroups = [],
    difficulty
  } = exercise;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="h-40 bg-linear-to-br from-[#775fab] to-[#32284a] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="text-5xl">💪</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#443049] mb-2">
          {name}
        </h3>

        {/* Category */}
        {category && (
          <p className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded w-fit mb-2">
            {category}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-3 flex-1">
            {description}
          </p>
        )}

        {/* Muscle Groups */}
        {muscleGroups.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Targets:
            </p>
            <div className="flex flex-wrap gap-1">
              {muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        {difficulty && (
          <div className="pt-3 border-t border-gray-200">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                difficultyStyles[difficulty] ?? 'bg-gray-100 text-gray-700'
              }`}
            >
              {difficulty}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ExerciseCard);
