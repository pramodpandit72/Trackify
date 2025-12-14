import React, { memo } from 'react';

const difficultyStyles = {
  Beginner: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Intermediate: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  Advanced: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
};

// Get exercise icon based on muscle groups and category
const getExerciseIcon = (muscleGroups = [], category = '', name = '') => {
  const muscles = muscleGroups.map(m => m.toLowerCase()).join(' ');
  const nameLower = name.toLowerCase();
  const categoryLower = category.toLowerCase();

  // Check specific exercise names first
  if (nameLower.includes('push-up') || nameLower.includes('pushup')) return '🫸';
  if (nameLower.includes('pull-up') || nameLower.includes('pullup') || nameLower.includes('chin-up')) return '🧗';
  if (nameLower.includes('squat')) return '🦵';
  if (nameLower.includes('deadlift')) return '🏋️';
  if (nameLower.includes('bench press')) return '🛋️';
  if (nameLower.includes('plank')) return '🧘';
  if (nameLower.includes('curl')) return '💪';
  if (nameLower.includes('run') || nameLower.includes('sprint') || nameLower.includes('jog')) return '🏃';
  if (nameLower.includes('jump') || nameLower.includes('box')) return '⬆️';
  if (nameLower.includes('row')) return '🚣';
  if (nameLower.includes('press')) return '🏋️‍♂️';
  if (nameLower.includes('fly') || nameLower.includes('flye')) return '🦅';
  if (nameLower.includes('crunch') || nameLower.includes('sit-up')) return '🔄';
  if (nameLower.includes('lunge')) return '🚶';
  if (nameLower.includes('dip')) return '⬇️';
  if (nameLower.includes('extension')) return '📏';
  if (nameLower.includes('raise')) return '🙆';
  if (nameLower.includes('shrug')) return '🤷';
  if (nameLower.includes('twist') || nameLower.includes('rotation')) return '🔁';
  if (nameLower.includes('cable')) return '🔗';
  if (nameLower.includes('machine')) return '⚙️';
  if (nameLower.includes('dumbbell')) return '🏋️';
  if (nameLower.includes('barbell')) return '🏋️‍♀️';
  if (nameLower.includes('stretch')) return '🤸';
  if (nameLower.includes('burpee')) return '💥';
  if (nameLower.includes('mountain climber')) return '⛰️';

  // Check by muscle groups
  if (muscles.includes('chest')) return '🫁';
  if (muscles.includes('back') || muscles.includes('lat')) return '🔙';
  if (muscles.includes('shoulder') || muscles.includes('delt')) return '🎯';
  if (muscles.includes('bicep')) return '💪';
  if (muscles.includes('tricep')) return '🦾';
  if (muscles.includes('arm')) return '💪';
  if (muscles.includes('leg') || muscles.includes('quad') || muscles.includes('hamstring')) return '🦵';
  if (muscles.includes('glute') || muscles.includes('hip')) return '🍑';
  if (muscles.includes('calf') || muscles.includes('calves')) return '🦶';
  if (muscles.includes('core') || muscles.includes('ab')) return '🎯';
  if (muscles.includes('oblique')) return '↔️';
  if (muscles.includes('forearm') || muscles.includes('grip')) return '✊';
  if (muscles.includes('trap')) return '🔺';
  if (muscles.includes('neck')) return '🦒';

  // Check by category
  if (categoryLower.includes('cardio')) return '❤️';
  if (categoryLower.includes('strength')) return '🏋️';
  if (categoryLower.includes('flexibility') || categoryLower.includes('mobility')) return '🤸';
  if (categoryLower.includes('hiit')) return '⚡';
  if (categoryLower.includes('yoga')) return '🧘';
  if (categoryLower.includes('pilates')) return '🎗️';
  if (categoryLower.includes('full body')) return '🏃';
  if (categoryLower.includes('balance')) return '⚖️';
  if (categoryLower.includes('plyometric')) return '💨';

  // Default icon
  return '🏋️';
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


  // Prefer icon from data, else use smart function
  const exerciseIcon = exercise.icon || getExerciseIcon(muscleGroups, category, name);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-black/30 transition-shadow h-full flex flex-col">
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
          <div className="text-5xl">{exerciseIcon}</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#443049] dark:text-white mb-2">
          {name}
        </h3>

        {/* Category */}
        {category && (
          <p className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded w-fit mb-2">
            {category}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">
            {description}
          </p>
        )}

        {/* Muscle Groups */}
        {muscleGroups.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Targets:
            </p>
            <div className="flex flex-wrap gap-1">
              {muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        {difficulty && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                difficultyStyles[difficulty] ?? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
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
