/**
 * Comprehensive Exercise Library
 * Organized by categories including strength, cardio, and fitness
 * Consolidated to remove duplicate/similar exercises
 */

export const exercisesLibrary = [
  // Strength - Chest
  { id: 'ex-001', name: 'Flat Barbell Bench Press', category: 'Strength', muscleGroups: ['Chest', 'Triceps'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Classic compound chest movement', instructions: 'Press barbell from chest', image: null, videoUrl: null, targetArea: 'Mid Chest', variants: [] },
  { id: 'ex-002', name: 'Incline Barbell Bench Press', category: 'Strength', muscleGroups: ['Chest', 'Shoulders'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Upper chest development', instructions: 'Press on incline bench', image: null, videoUrl: null, targetArea: 'Upper Chest', variants: [] },
  { id: 'ex-003', name: 'Decline Bench Press', category: 'Strength', muscleGroups: ['Chest', 'Triceps'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Lower chest focus', instructions: 'Press on decline bench', image: null, videoUrl: null, targetArea: 'Lower Chest', variants: [] },
  { id: 'ex-004', name: 'Dumbbell Chest Press', category: 'Strength', muscleGroups: ['Chest', 'Triceps'], difficulty: 'Intermediate', equipment: 'Dumbbells', description: 'Chest mass building press', instructions: 'Progressive overload with dumbbells', image: null, videoUrl: null, targetArea: 'Chest', variants: [] },
  { id: 'ex-005', name: 'Cable Flyes', category: 'Strength', muscleGroups: ['Chest'], difficulty: 'Intermediate', equipment: 'Cable', description: 'Cable chest isolation', instructions: 'Pull cables together', image: null, videoUrl: null, targetArea: 'Chest', variants: [] },
  { id: 'ex-006', name: 'Chest Dips', category: 'Strength', muscleGroups: ['Chest', 'Triceps'], difficulty: 'Advanced', equipment: 'Dip Bar', description: 'Bodyweight chest compound', instructions: 'Lean forward and dip', image: null, videoUrl: null, targetArea: 'Lower Chest', variants: [] },
  { id: 'ex-007', name: 'Push-ups', category: 'Strength', muscleGroups: ['Chest', 'Triceps'], difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Basic push-up', instructions: 'Lower and push body up', image: null, videoUrl: null, targetArea: 'Chest', variants: [] },
  // Strength - Legs
  { id: 'ex-008', name: 'Barbell Back Squat', category: 'Strength', muscleGroups: ['Quadriceps', 'Glutes'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Classic compound leg movement', instructions: 'Squat with barbell', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  { id: 'ex-009', name: 'Front Squat', category: 'Strength', muscleGroups: ['Quadriceps'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Quad-focused squat', instructions: 'Squat bar in front', image: null, videoUrl: null, targetArea: 'Quads', variants: [] },
  { id: 'ex-010', name: 'Leg Press', category: 'Strength', muscleGroups: ['Quadriceps', 'Glutes'], difficulty: 'Beginner', equipment: 'Machine', description: 'Machine leg compound', instructions: 'Press weight with legs', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  { id: 'ex-011', name: 'Bulgarian Split Squat', category: 'Strength', muscleGroups: ['Quadriceps', 'Glutes'], difficulty: 'Intermediate', equipment: 'Dumbbells', description: 'Single leg squat variation', instructions: 'Squat one leg elevated', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  { id: 'ex-012', name: 'Romanian Deadlift', category: 'Strength', muscleGroups: ['Hamstrings', 'Glutes'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Posterior chain hinge', instructions: 'Hinge at hips', image: null, videoUrl: null, targetArea: 'Hamstrings', variants: [] },
  { id: 'ex-013', name: 'Leg Curls', category: 'Strength', muscleGroups: ['Hamstrings'], difficulty: 'Beginner', equipment: 'Machine', description: 'Hamstring isolation', instructions: 'Curl legs on machine', image: null, videoUrl: null, targetArea: 'Hamstrings', variants: [] },
  { id: 'ex-014', name: 'Hip Thrusts', category: 'Strength', muscleGroups: ['Glutes'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Glute-focused hip drive', instructions: 'Thrust hips up', image: null, videoUrl: null, targetArea: 'Glutes', variants: [] },
  { id: 'ex-015', name: 'Calf Raises', category: 'Strength', muscleGroups: ['Calves'], difficulty: 'Beginner', equipment: 'Machine', description: 'Calf isolation', instructions: 'Raise heels up', image: null, videoUrl: null, targetArea: 'Calves', variants: [] },
  // Strength - Back
  { id: 'ex-016', name: 'Pull-ups', category: 'Strength', muscleGroups: ['Lats', 'Biceps'], difficulty: 'Intermediate', equipment: 'Bodyweight', description: 'Upper body compound', instructions: 'Pull body up', image: null, videoUrl: null, targetArea: 'Lats', variants: [] },
  { id: 'ex-017', name: 'Barbell Rows', category: 'Strength', muscleGroups: ['Lats', 'Rhomboids'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Back mass building row', instructions: 'Row barbell to chest', image: null, videoUrl: null, targetArea: 'Back', variants: [] },
  { id: 'ex-018', name: 'Lat Pulldown', category: 'Strength', muscleGroups: ['Lats'], difficulty: 'Beginner', equipment: 'Machine', description: 'Lat isolation machine', instructions: 'Pull bar down', image: null, videoUrl: null, targetArea: 'Lats', variants: [] },
  { id: 'ex-019', name: 'Deadlifts', category: 'Strength', muscleGroups: ['Back', 'Hamstrings', 'Glutes'], difficulty: 'Advanced', equipment: 'Barbell', description: 'Ultimate compound lift', instructions: 'Lift from ground', image: null, videoUrl: null, targetArea: 'Full Back', variants: [] },
  { id: 'ex-020', name: 'Dumbbell Rows', category: 'Strength', muscleGroups: ['Lats'], difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Single arm rowing', instructions: 'Row dumbbell', image: null, videoUrl: null, targetArea: 'Lats', variants: [] },
  { id: 'ex-021', name: 'Face Pulls', category: 'Strength', muscleGroups: ['Rear Delts', 'Rhomboids'], difficulty: 'Beginner', equipment: 'Cable', description: 'Rear shoulder and upper back', instructions: 'Pull to face', image: null, videoUrl: null, targetArea: 'Upper Back', variants: [] },
  // Strength - Shoulders & Arms
  { id: 'ex-022', name: 'Overhead Press', category: 'Strength', muscleGroups: ['Shoulders', 'Triceps'], difficulty: 'Intermediate', equipment: 'Barbell', description: 'Standing shoulder press', instructions: 'Press barbell overhead', image: null, videoUrl: null, targetArea: 'Shoulders', variants: [] },
  { id: 'ex-023', name: 'Lateral Raises', category: 'Strength', muscleGroups: ['Side Delts'], difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Shoulder isolation', instructions: 'Raise dumbbells to sides', image: null, videoUrl: null, targetArea: 'Side Delts', variants: [] },
  { id: 'ex-024', name: 'Barbell Curls', category: 'Strength', muscleGroups: ['Biceps'], difficulty: 'Beginner', equipment: 'Barbell', description: 'Bicep mass builder', instructions: 'Curl barbell upward', image: null, videoUrl: null, targetArea: 'Biceps', variants: [] },
  { id: 'ex-025', name: 'Tricep Dips', category: 'Strength', muscleGroups: ['Triceps'], difficulty: 'Intermediate', equipment: 'Dip Bar', description: 'Tricep compound', instructions: 'Lower and push up', image: null, videoUrl: null, targetArea: 'Triceps', variants: [] },
  { id: 'ex-026', name: 'Shrugs', category: 'Strength', muscleGroups: ['Traps'], difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Trap isolation', instructions: 'Lift shoulders up', image: null, videoUrl: null, targetArea: 'Traps', variants: [] },
  // Cardio
  { id: 'ex-027', name: 'Running', category: 'Cardio', muscleGroups: ['Full Body'], difficulty: 'Beginner', equipment: 'None', description: 'Steady state cardio', instructions: 'Run at steady pace', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-028', name: 'Sprints', category: 'Cardio', muscleGroups: ['Full Body'], difficulty: 'Advanced', equipment: 'None', description: 'High intensity running', instructions: 'Run at max speed bursts', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-029', name: 'Cycling', category: 'Cardio', muscleGroups: ['Quadriceps', 'Hamstrings'], difficulty: 'Beginner', equipment: 'Bicycle', description: 'Cycling endurance', instructions: 'Pedal at steady pace', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  { id: 'ex-030', name: 'Jump Rope', category: 'Cardio', muscleGroups: ['Calves', 'Full Body'], difficulty: 'Intermediate', equipment: 'Jump Rope', description: 'Agility cardio', instructions: 'Jump continuously', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-031', name: 'Rowing Machine', category: 'Cardio', muscleGroups: ['Back', 'Legs', 'Core'], difficulty: 'Intermediate', equipment: 'Rowing Machine', description: 'Full body cardio', instructions: 'Row with proper form', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-032', name: 'Swimming', category: 'Cardio', muscleGroups: ['Full Body'], difficulty: 'Intermediate', equipment: 'Pool', description: 'Low impact full body', instructions: 'Swim laps', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-033', name: 'Burpees', category: 'Cardio', muscleGroups: ['Full Body'], difficulty: 'Advanced', equipment: 'Bodyweight', description: 'Explosive cardio', instructions: 'Squat, plank, jump', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-034', name: 'HIIT', category: 'Cardio', muscleGroups: ['Full Body'], difficulty: 'Advanced', equipment: 'None', description: 'High intensity intervals', instructions: 'Alternate max effort and rest', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  // Flexibility & Recovery
  { id: 'ex-035', name: 'Yoga Flow', category: 'Flexibility', muscleGroups: ['Full Body'], difficulty: 'Beginner', equipment: 'Mat', description: 'Complete yoga sequence', instructions: 'Follow yoga flow sequence', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-036', name: 'Static Stretching', category: 'Flexibility', muscleGroups: ['Full Body'], difficulty: 'Beginner', equipment: 'None', description: 'Flexibility work', instructions: 'Hold stretches 30+ seconds', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-037', name: 'Foam Rolling', category: 'Flexibility', muscleGroups: ['Full Body'], difficulty: 'Beginner', equipment: 'Foam Roller', description: 'Self-myofascial release', instructions: 'Roll muscles slowly', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-038', name: 'Pilates', category: 'Flexibility', muscleGroups: ['Core', 'Full Body'], difficulty: 'Intermediate', equipment: 'Mat', description: 'Core and flexibility', instructions: 'Complete pilates routine', image: null, videoUrl: null, targetArea: 'Core', variants: [] },
  // Functional Fitness
  { id: 'ex-039', name: 'Kettlebell Swings', category: 'Functional', muscleGroups: ['Hamstrings', 'Glutes', 'Core'], difficulty: 'Intermediate', equipment: 'Kettlebell', description: 'Explosive hip power', instructions: 'Swing with hip thrust', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-040', name: 'Medicine Ball Slams', category: 'Functional', muscleGroups: ['Core', 'Shoulders'], difficulty: 'Intermediate', equipment: 'Medicine Ball', description: 'Explosive power training', instructions: 'Slam ball to ground', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-041', name: 'Farmer Carries', category: 'Functional', muscleGroups: ['Traps', 'Core'], difficulty: 'Beginner', equipment: 'Dumbbells', description: 'Grip and core strength', instructions: 'Walk carrying weights', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-042', name: 'Sled Push', category: 'Functional', muscleGroups: ['Quadriceps', 'Core'], difficulty: 'Intermediate', equipment: 'Sled', description: 'Lower body power', instructions: 'Push sled forward', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  { id: 'ex-043', name: 'Battle Ropes', category: 'Functional', muscleGroups: ['Shoulders', 'Core'], difficulty: 'Advanced', equipment: 'Battle Ropes', description: 'Full body conditioning', instructions: 'Whip ropes alternately', image: null, videoUrl: null, targetArea: 'Full Body', variants: [] },
  { id: 'ex-044', name: 'Box Jumps', category: 'Functional', muscleGroups: ['Quadriceps', 'Glutes'], difficulty: 'Advanced', equipment: 'Box', description: 'Lower body explosiveness', instructions: 'Jump onto box', image: null, videoUrl: null, targetArea: 'Legs', variants: [] },
  // Core & Stability
  { id: 'ex-045', name: 'Plank Hold', category: 'Core', muscleGroups: ['Core', 'Shoulders'], difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Isometric core', instructions: 'Hold plank position', image: null, videoUrl: null, targetArea: 'Core', variants: [] },
  { id: 'ex-046', name: 'Side Plank', category: 'Core', muscleGroups: ['Obliques', 'Core'], difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Side core stability', instructions: 'Hold side plank', image: null, videoUrl: null, targetArea: 'Obliques', variants: [] },
  { id: 'ex-047', name: 'Ab Crunches', category: 'Core', muscleGroups: ['Abs'], difficulty: 'Beginner', equipment: 'Bodyweight', description: 'Abdominal flexion', instructions: 'Crunch torso upward', image: null, videoUrl: null, targetArea: 'Abs', variants: [] },
  { id: 'ex-048', name: 'Hanging Leg Raises', category: 'Core', muscleGroups: ['Abs'], difficulty: 'Advanced', equipment: 'Pull-up Bar', description: 'Lower ab strength', instructions: 'Raise legs while hanging', image: null, videoUrl: null, targetArea: 'Abs', variants: [] },
  { id: 'ex-049', name: 'Russian Twists', category: 'Core', muscleGroups: ['Obliques'], difficulty: 'Beginner', equipment: 'Weight Plate', description: 'Rotational core', instructions: 'Twist side to side', image: null, videoUrl: null, targetArea: 'Obliques', variants: [] },
  { id: 'ex-050', name: 'Pallof Press', category: 'Core', muscleGroups: ['Core', 'Obliques'], difficulty: 'Intermediate', equipment: 'Cable', description: 'Anti-rotation core', instructions: 'Press cable away', image: null, videoUrl: null, targetArea: 'Core', variants: [] }
];

export const muscleGroups = [
  'Chest',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Adductors',
  'Abductors',
  'Back',
  'Lats',
  'Rhomboids',
  'Biceps',
  'Triceps',
  'Shoulders',
  'Front Delts',
  'Side Delts',
  'Rear Delts',
  'Abs',
  'Obliques',
  'Core',
  'Traps',
  'Forearms',
  'Lower Back',
  'Full Body'
];

export const exerciseCategories = [
  'Strength',
  'Cardio',
  'Flexibility',
  'Functional',
  'Core'
];

export const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
