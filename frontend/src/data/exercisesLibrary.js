// Optimized exercise library with comprehensive gym exercises
// Uses helper function pattern for DRY code and smaller bundle size

const BASE_EXERCISE = { image: null, videoUrl: null, variants: [] };
const ex = (data) => ({ ...BASE_EXERCISE, ...data });

export const exercisesLibrary = [
  // ============ CHEST (10 exercises) ============
  ex({
    id: 'chest-001',
    name: 'Barbell Bench Press',
    category: 'Strength',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Bench'],
    description: 'The king of chest exercises for building overall chest mass and strength.',
    instructions: ['Lie flat on bench with feet planted', 'Grip bar slightly wider than shoulder width', 'Lower bar to mid-chest', 'Press up explosively to lockout'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-002',
    name: 'Incline Dumbbell Press',
    category: 'Strength',
    muscleGroups: ['Upper Chest', 'Shoulders', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: ['Dumbbells', 'Incline Bench'],
    description: 'Targets the upper chest for a fuller, more developed look.',
    instructions: ['Set bench to 30-45 degree incline', 'Press dumbbells up from shoulder level', 'Lower with control to stretch position', 'Keep elbows at 45-degree angle'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-003',
    name: 'Decline Bench Press',
    category: 'Strength',
    muscleGroups: ['Lower Chest', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Decline Bench'],
    description: 'Emphasizes the lower chest fibers for complete chest development.',
    instructions: ['Secure feet under pads on decline bench', 'Lower bar to lower chest', 'Press up while maintaining control', 'Keep shoulder blades retracted'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-004',
    name: 'Dumbbell Fly',
    category: 'Strength',
    muscleGroups: ['Chest'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells', 'Flat Bench'],
    description: 'Isolation exercise that stretches and contracts the chest muscles.',
    instructions: ['Lie flat holding dumbbells above chest', 'Lower arms in arc motion with slight elbow bend', 'Feel deep stretch in chest', 'Squeeze chest to bring weights back up'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-005',
    name: 'Cable Crossover',
    category: 'Strength',
    muscleGroups: ['Chest', 'Front Delts'],
    difficulty: 'Intermediate',
    equipment: ['Cable Machine'],
    description: 'Constant tension exercise for chest definition and shape.',
    instructions: ['Set pulleys to high position', 'Step forward with one foot', 'Bring handles together in front of chest', 'Squeeze and hold at peak contraction'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-006',
    name: 'Machine Chest Fly',
    category: 'Strength',
    muscleGroups: ['Chest'],
    difficulty: 'Beginner',
    equipment: ['Pec Deck Machine'],
    description: 'Beginner-friendly isolation movement for chest development.',
    instructions: ['Adjust seat so handles align with chest', 'Keep slight bend in elbows', 'Bring handles together smoothly', 'Control the negative portion'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-007',
    name: 'Push-Ups',
    category: 'Strength',
    muscleGroups: ['Chest', 'Triceps', 'Core'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Classic bodyweight exercise for chest and pushing strength.',
    instructions: ['Place hands shoulder-width apart', 'Keep body in straight line', 'Lower chest to floor', 'Push back up to start'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-008',
    name: 'Chest Dips',
    category: 'Strength',
    muscleGroups: ['Lower Chest', 'Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: ['Dip Bars'],
    description: 'Compound movement emphasizing lower chest when done with forward lean.',
    instructions: ['Grip bars and lift body', 'Lean torso forward slightly', 'Lower until shoulders below elbows', 'Press back up to lockout'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-009',
    name: 'Incline Cable Fly',
    category: 'Strength',
    muscleGroups: ['Upper Chest'],
    difficulty: 'Intermediate',
    equipment: ['Cable Machine', 'Incline Bench'],
    description: 'Constant tension fly variation for upper chest development.',
    instructions: ['Set pulleys to low position', 'Lie on incline bench between cables', 'Bring handles up and together', 'Squeeze at top, control descent'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'chest-010',
    name: 'Landmine Press',
    category: 'Strength',
    muscleGroups: ['Upper Chest', 'Shoulders', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Landmine Attachment'],
    description: 'Unique pressing angle that is shoulder-friendly while targeting upper chest.',
    instructions: ['Hold end of barbell at chest level', 'Press up and forward in arc', 'Control the bar back down', 'Keep core tight throughout'],
    targetArea: 'Upper Body'
  }),

  // ============ BACK (10 exercises) ============
  ex({
    id: 'back-001',
    name: 'Deadlift',
    category: 'Strength',
    muscleGroups: ['Lower Back', 'Glutes', 'Hamstrings', 'Traps'],
    difficulty: 'Advanced',
    equipment: ['Barbell'],
    description: 'The ultimate compound lift for overall back and posterior chain development.',
    instructions: ['Stand with feet hip-width apart', 'Grip bar just outside knees', 'Drive through heels, extend hips', 'Keep bar close to body throughout'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'back-002',
    name: 'Lat Pulldown',
    category: 'Strength',
    muscleGroups: ['Lats', 'Biceps', 'Rear Delts'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine', 'Lat Bar'],
    description: 'Primary lat builder, great for developing back width.',
    instructions: ['Grip bar wider than shoulder width', 'Pull bar to upper chest', 'Squeeze shoulder blades together', 'Control bar back up slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-003',
    name: 'Seated Cable Row',
    category: 'Strength',
    muscleGroups: ['Middle Back', 'Lats', 'Biceps'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine', 'V-Bar'],
    description: 'Excellent for building back thickness and improving posture.',
    instructions: ['Sit with knees slightly bent', 'Pull handle to lower chest', 'Squeeze shoulder blades at peak', 'Extend arms with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-004',
    name: 'One-Arm Dumbbell Row',
    category: 'Strength',
    muscleGroups: ['Lats', 'Rhomboids', 'Biceps'],
    difficulty: 'Intermediate',
    equipment: ['Dumbbell', 'Flat Bench'],
    description: 'Unilateral exercise for building lat thickness and correcting imbalances.',
    instructions: ['Place one knee and hand on bench', 'Row dumbbell to hip', 'Keep elbow close to body', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-005',
    name: 'Face Pull',
    category: 'Strength',
    muscleGroups: ['Rear Delts', 'Traps', 'Rotator Cuff'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine', 'Rope Attachment'],
    description: 'Essential for shoulder health and rear delt development.',
    instructions: ['Set cable to face height', 'Pull rope to face with elbows high', 'Externally rotate at end position', 'Control return to start'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-006',
    name: 'Pull-Ups',
    category: 'Strength',
    muscleGroups: ['Lats', 'Biceps', 'Core'],
    difficulty: 'Intermediate',
    equipment: ['Pull-Up Bar'],
    description: 'Classic bodyweight exercise for building a wide, V-shaped back.',
    instructions: ['Grip bar wider than shoulders', 'Pull chest toward bar', 'Squeeze lats at top', 'Lower with full control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-007',
    name: 'Barbell Row',
    category: 'Strength',
    muscleGroups: ['Middle Back', 'Lats', 'Biceps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    description: 'Heavy compound row for overall back mass.',
    instructions: ['Hinge at hips with flat back', 'Row bar to lower chest', 'Keep elbows at 45 degrees', 'Lower under control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-008',
    name: 'T-Bar Row',
    category: 'Strength',
    muscleGroups: ['Middle Back', 'Lats'],
    difficulty: 'Intermediate',
    equipment: ['T-Bar Machine'],
    description: 'Allows for heavy loading to build back thickness.',
    instructions: ['Straddle the bar', 'Row weight to chest', 'Keep chest up throughout', 'Control the negative'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-009',
    name: 'Straight-Arm Pulldown',
    category: 'Strength',
    muscleGroups: ['Lats'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine'],
    description: 'Isolation exercise for lat activation and mind-muscle connection.',
    instructions: ['Stand facing cable with slight lean', 'Keep arms straight throughout', 'Pull bar down to thighs', 'Squeeze lats hard at bottom'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'back-010',
    name: 'Rack Pull',
    category: 'Strength',
    muscleGroups: ['Upper Back', 'Traps', 'Lower Back'],
    difficulty: 'Advanced',
    equipment: ['Barbell', 'Power Rack'],
    description: 'Partial deadlift for overloading the upper back and traps.',
    instructions: ['Set pins at knee height', 'Grip bar and stand up', 'Squeeze traps at top', 'Lower to pins with control'],
    targetArea: 'Upper Body'
  }),

  // ============ LEGS (12 exercises) ============
  ex({
    id: 'legs-001',
    name: 'Barbell Back Squat',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Squat Rack'],
    description: 'The king of leg exercises for overall lower body development.',
    instructions: ['Bar on upper back, feet shoulder-width', 'Descend until thighs parallel', 'Drive through heels to stand', 'Keep chest up throughout'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-002',
    name: 'Leg Press',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: ['Leg Press Machine'],
    description: 'Machine exercise allowing heavy loading with back support.',
    instructions: ['Sit with back flat against pad', 'Lower weight with control', 'Press through heels', 'Do not lock out knees completely'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-003',
    name: 'Romanian Deadlift',
    category: 'Strength',
    muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    description: 'Hip hinge movement for hamstring and glute development.',
    instructions: ['Hold bar at hips', 'Push hips back with soft knees', 'Lower until hamstring stretch', 'Drive hips forward to stand'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-004',
    name: 'Leg Curl',
    category: 'Strength',
    muscleGroups: ['Hamstrings'],
    difficulty: 'Beginner',
    equipment: ['Leg Curl Machine'],
    description: 'Isolation exercise targeting the hamstrings.',
    instructions: ['Lie face down on machine', 'Curl heels toward glutes', 'Squeeze hamstrings at top', 'Lower with control'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-005',
    name: 'Leg Extension',
    category: 'Strength',
    muscleGroups: ['Quadriceps'],
    difficulty: 'Beginner',
    equipment: ['Leg Extension Machine'],
    description: 'Isolation exercise for quadriceps definition.',
    instructions: ['Sit with back against pad', 'Extend legs fully', 'Squeeze quads at top', 'Lower slowly'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-006',
    name: 'Calf Raises',
    category: 'Strength',
    muscleGroups: ['Calves'],
    difficulty: 'Beginner',
    equipment: ['Calf Raise Machine'],
    description: 'Essential exercise for calf development.',
    instructions: ['Stand on platform with heels hanging', 'Rise up on toes', 'Squeeze calves at top', 'Lower heels below platform level'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-007',
    name: 'Bulgarian Split Squat',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes'],
    difficulty: 'Intermediate',
    equipment: ['Dumbbells', 'Bench'],
    description: 'Unilateral exercise for leg strength and balance.',
    instructions: ['Rear foot elevated on bench', 'Lower until front thigh parallel', 'Drive through front heel', 'Keep torso upright'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-008',
    name: 'Front Squat',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Core', 'Upper Back'],
    difficulty: 'Advanced',
    equipment: ['Barbell', 'Squat Rack'],
    description: 'Quad-dominant squat variation requiring core strength.',
    instructions: ['Bar rests on front delts', 'Elbows high, core tight', 'Squat deep with upright torso', 'Drive up through heels'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-009',
    name: 'Hip Thrust',
    category: 'Strength',
    muscleGroups: ['Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: ['Barbell', 'Bench'],
    description: 'Primary glute builder for strength and size.',
    instructions: ['Upper back on bench, bar over hips', 'Drive hips up fully', 'Squeeze glutes at top', 'Lower under control'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-010',
    name: 'Walking Lunges',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Dynamic movement for leg development and coordination.',
    instructions: ['Step forward into lunge', 'Lower back knee toward ground', 'Push off front foot', 'Alternate legs while walking'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-011',
    name: 'Hack Squat',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes'],
    difficulty: 'Intermediate',
    equipment: ['Hack Squat Machine'],
    description: 'Machine squat for quad emphasis with back support.',
    instructions: ['Position shoulders under pads', 'Feet shoulder-width on platform', 'Lower until deep position', 'Press up through heels'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'legs-012',
    name: 'Sumo Deadlift',
    category: 'Strength',
    muscleGroups: ['Glutes', 'Inner Thighs', 'Hamstrings'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    description: 'Wide stance deadlift emphasizing glutes and inner thighs.',
    instructions: ['Wide stance, toes pointed out', 'Grip bar inside knees', 'Drive hips forward', 'Keep chest up throughout'],
    targetArea: 'Lower Body'
  }),

  // ============ SHOULDERS (10 exercises) ============
  ex({
    id: 'shoulders-001',
    name: 'Overhead Press',
    category: 'Strength',
    muscleGroups: ['Front Delts', 'Side Delts', 'Triceps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    description: 'Primary compound movement for overall shoulder development.',
    instructions: ['Bar at shoulder level', 'Press overhead to lockout', 'Keep core tight', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-002',
    name: 'Lateral Raises',
    category: 'Strength',
    muscleGroups: ['Side Delts'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Isolation exercise for shoulder width and capped delts.',
    instructions: ['Slight bend in elbows', 'Raise arms to shoulder height', 'Lead with elbows, not hands', 'Lower slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-003',
    name: 'Rear Delt Fly',
    category: 'Strength',
    muscleGroups: ['Rear Delts', 'Rhomboids'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Targets the often-neglected rear deltoids.',
    instructions: ['Bend at hips, back flat', 'Raise arms out to sides', 'Squeeze rear delts', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-004',
    name: 'Upright Row',
    category: 'Strength',
    muscleGroups: ['Side Delts', 'Traps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Cable Machine'],
    description: 'Compound movement for delts and upper traps.',
    instructions: ['Grip bar narrow or with rope', 'Pull up along body to chin', 'Lead with elbows', 'Control descent'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-005',
    name: 'Cable Lateral Raise',
    category: 'Strength',
    muscleGroups: ['Side Delts'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine'],
    description: 'Constant tension variation of lateral raises.',
    instructions: ['Stand sideways to cable', 'Raise arm to shoulder height', 'Keep slight elbow bend', 'Control return'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-006',
    name: 'Arnold Press',
    category: 'Strength',
    muscleGroups: ['Front Delts', 'Side Delts'],
    difficulty: 'Intermediate',
    equipment: ['Dumbbells'],
    description: 'Rotating press hitting all three delt heads.',
    instructions: ['Start with palms facing you', 'Rotate as you press up', 'Finish with palms forward', 'Reverse on the way down'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-007',
    name: 'Dumbbell Shoulder Press',
    category: 'Strength',
    muscleGroups: ['Front Delts', 'Triceps'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Seated or standing press for shoulder mass.',
    instructions: ['Dumbbells at shoulder level', 'Press up to full extension', 'Keep core engaged', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-008',
    name: 'Front Raise',
    category: 'Strength',
    muscleGroups: ['Front Delts'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells', 'Barbell'],
    description: 'Isolation exercise for the front deltoids.',
    instructions: ['Arms at sides holding weight', 'Raise forward to shoulder height', 'Keep arms straight', 'Lower slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-009',
    name: 'Machine Shoulder Press',
    category: 'Strength',
    muscleGroups: ['Front Delts', 'Side Delts', 'Triceps'],
    difficulty: 'Beginner',
    equipment: ['Shoulder Press Machine'],
    description: 'Machine version allowing safe heavy pressing.',
    instructions: ['Adjust seat appropriately', 'Grip handles at shoulder level', 'Press up without locking', 'Control descent'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'shoulders-010',
    name: 'Reverse Pec Deck',
    category: 'Strength',
    muscleGroups: ['Rear Delts'],
    difficulty: 'Beginner',
    equipment: ['Pec Deck Machine'],
    description: 'Machine isolation for rear delts.',
    instructions: ['Face the machine', 'Grip handles with arms extended', 'Pull handles back', 'Squeeze rear delts'],
    targetArea: 'Upper Body'
  }),

  // ============ TRICEPS (8 exercises) ============
  ex({
    id: 'triceps-001',
    name: 'Cable Pushdown',
    category: 'Strength',
    muscleGroups: ['Triceps'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine'],
    description: 'Primary triceps isolation exercise.',
    instructions: ['Grip bar or rope at chest level', 'Push down until arms straight', 'Squeeze triceps at bottom', 'Control return to start'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-002',
    name: 'Skull Crushers',
    category: 'Strength',
    muscleGroups: ['Triceps'],
    difficulty: 'Intermediate',
    equipment: ['EZ Bar', 'Flat Bench'],
    description: 'Lying triceps extension for mass building.',
    instructions: ['Lie on bench, bar overhead', 'Lower bar to forehead', 'Extend arms back up', 'Keep elbows stationary'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-003',
    name: 'Overhead Triceps Extension',
    category: 'Strength',
    muscleGroups: ['Triceps'],
    difficulty: 'Beginner',
    equipment: ['Dumbbell', 'Cable Machine'],
    description: 'Stretches and works the long head of triceps.',
    instructions: ['Hold weight overhead', 'Lower behind head', 'Extend arms back up', 'Keep elbows close to head'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-004',
    name: 'Triceps Dips',
    category: 'Strength',
    muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: ['Dip Bars'],
    description: 'Compound movement with upright torso emphasizing triceps.',
    instructions: ['Keep torso upright', 'Lower until arms at 90 degrees', 'Press back up', 'Do not lean forward'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-005',
    name: 'Close-Grip Bench Press',
    category: 'Strength',
    muscleGroups: ['Triceps', 'Chest'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Bench'],
    description: 'Compound press emphasizing triceps over chest.',
    instructions: ['Grip bar shoulder-width or narrower', 'Lower to lower chest', 'Press up keeping elbows close', 'Lockout at top'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-006',
    name: 'Diamond Push-Ups',
    category: 'Strength',
    muscleGroups: ['Triceps', 'Chest'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Bodyweight triceps exercise with hands together.',
    instructions: ['Hands together forming diamond', 'Lower chest to hands', 'Press back up', 'Keep elbows close to body'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-007',
    name: 'Triceps Kickback',
    category: 'Strength',
    muscleGroups: ['Triceps'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Isolation exercise focusing on triceps contraction.',
    instructions: ['Hinge at hips, arm at 90 degrees', 'Extend arm straight back', 'Squeeze at full extension', 'Return with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'triceps-008',
    name: 'Rope Pushdown',
    category: 'Strength',
    muscleGroups: ['Triceps'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine', 'Rope Attachment'],
    description: 'Cable pushdown variation allowing wrist rotation.',
    instructions: ['Grip rope at chest level', 'Push down and spread rope at bottom', 'Squeeze triceps hard', 'Control return'],
    targetArea: 'Upper Body'
  }),

  // ============ BICEPS (8 exercises) ============
  ex({
    id: 'biceps-001',
    name: 'Barbell Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Beginner',
    equipment: ['Barbell'],
    description: 'Classic mass builder for the biceps.',
    instructions: ['Stand with bar at thighs', 'Curl up to shoulder level', 'Squeeze biceps at top', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-002',
    name: 'Incline Dumbbell Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Intermediate',
    equipment: ['Dumbbells', 'Incline Bench'],
    description: 'Stretches the biceps for greater range of motion.',
    instructions: ['Lie back on incline bench', 'Let arms hang straight down', 'Curl up without moving upper arm', 'Lower slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-003',
    name: 'Hammer Curl',
    category: 'Strength',
    muscleGroups: ['Biceps', 'Brachialis', 'Forearms'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells'],
    description: 'Neutral grip curl targeting brachialis and biceps.',
    instructions: ['Palms face each other', 'Curl up keeping neutral grip', 'Squeeze at top', 'Lower under control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-004',
    name: 'Preacher Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Beginner',
    equipment: ['EZ Bar', 'Preacher Bench'],
    description: 'Isolation curl eliminating momentum.',
    instructions: ['Arms on preacher pad', 'Curl up to shoulder level', 'Squeeze at top', 'Lower with full control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-005',
    name: 'Cable Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine'],
    description: 'Constant tension curl using cables.',
    instructions: ['Stand facing low pulley', 'Curl handle to shoulders', 'Squeeze biceps', 'Return slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-006',
    name: 'Concentration Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Beginner',
    equipment: ['Dumbbell'],
    description: 'Seated isolation curl for peak contraction.',
    instructions: ['Sit with elbow on inner thigh', 'Curl dumbbell up', 'Squeeze hard at top', 'Lower slowly'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-007',
    name: 'EZ Bar Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Beginner',
    equipment: ['EZ Bar'],
    description: 'Wrist-friendly curl variation.',
    instructions: ['Grip EZ bar at angles', 'Curl to shoulder level', 'Keep elbows stationary', 'Lower with control'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'biceps-008',
    name: 'Spider Curl',
    category: 'Strength',
    muscleGroups: ['Biceps'],
    difficulty: 'Intermediate',
    equipment: ['EZ Bar', 'Incline Bench'],
    description: 'Chest-supported curl for strict form.',
    instructions: ['Lie face down on incline bench', 'Arms hanging straight', 'Curl without swinging', 'Squeeze at top'],
    targetArea: 'Upper Body'
  }),

  // ============ CORE (8 exercises) ============
  ex({
    id: 'core-001',
    name: 'Cable Crunch',
    category: 'Core',
    muscleGroups: ['Abs'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine', 'Rope Attachment'],
    description: 'Weighted ab exercise for building thick abs.',
    instructions: ['Kneel below high pulley', 'Hold rope at head level', 'Crunch down toward floor', 'Contract abs hard'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-002',
    name: 'Hanging Leg Raise',
    category: 'Core',
    muscleGroups: ['Lower Abs', 'Hip Flexors'],
    difficulty: 'Intermediate',
    equipment: ['Pull-Up Bar'],
    description: 'Advanced ab exercise targeting lower abs.',
    instructions: ['Hang from bar with straight arms', 'Raise legs to parallel or higher', 'Control the descent', 'Avoid swinging'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-003',
    name: 'Ab Wheel Rollout',
    category: 'Core',
    muscleGroups: ['Abs', 'Obliques', 'Lower Back'],
    difficulty: 'Advanced',
    equipment: ['Ab Wheel'],
    description: 'Challenging exercise for entire core stability.',
    instructions: ['Kneel holding ab wheel', 'Roll forward extending body', 'Keep core tight throughout', 'Roll back to start'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-004',
    name: 'Decline Sit-Up',
    category: 'Core',
    muscleGroups: ['Abs', 'Hip Flexors'],
    difficulty: 'Beginner',
    equipment: ['Decline Bench'],
    description: 'Gravity-resisted sit-up for ab development.',
    instructions: ['Secure feet on decline bench', 'Lower back down', 'Sit up using abs', 'Control the descent'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-005',
    name: 'Pallof Press',
    category: 'Core',
    muscleGroups: ['Obliques', 'Transverse Abdominis'],
    difficulty: 'Beginner',
    equipment: ['Cable Machine'],
    description: 'Anti-rotation exercise for core stability.',
    instructions: ['Stand sideways to cable', 'Hold handle at chest', 'Press out and hold', 'Resist rotation'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-006',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Abs', 'Obliques', 'Lower Back'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Isometric hold for core endurance.',
    instructions: ['Forearms and toes on ground', 'Body in straight line', 'Squeeze abs and glutes', 'Hold position'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-007',
    name: 'Russian Twist',
    category: 'Core',
    muscleGroups: ['Obliques'],
    difficulty: 'Beginner',
    equipment: ['Medicine Ball', 'Weight Plate'],
    description: 'Rotational exercise for oblique development.',
    instructions: ['Sit with knees bent, feet up', 'Lean back slightly', 'Rotate side to side with weight', 'Keep core engaged'],
    targetArea: 'Core'
  }),
  ex({
    id: 'core-008',
    name: 'Dead Bug',
    category: 'Core',
    muscleGroups: ['Abs', 'Core Stabilizers'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Safe core exercise for building stability.',
    instructions: ['Lie on back, arms up, knees at 90', 'Extend opposite arm and leg', 'Keep lower back pressed down', 'Alternate sides'],
    targetArea: 'Core'
  }),

  // ============ CARDIO (8 exercises) ============
  ex({
    id: 'cardio-001',
    name: 'Treadmill Running',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Cardiovascular System'],
    difficulty: 'Beginner',
    equipment: ['Treadmill'],
    description: 'Classic cardio for endurance and calorie burn.',
    instructions: ['Set appropriate speed', 'Maintain upright posture', 'Land midfoot', 'Swing arms naturally'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'cardio-002',
    name: 'Stationary Bike',
    category: 'Cardio',
    muscleGroups: ['Quadriceps', 'Cardiovascular System'],
    difficulty: 'Beginner',
    equipment: ['Stationary Bike'],
    description: 'Low-impact cardio option for all fitness levels.',
    instructions: ['Adjust seat height properly', 'Maintain steady cadence', 'Keep core engaged', 'Vary resistance for intensity'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'cardio-003',
    name: 'Rowing Machine',
    category: 'Cardio',
    muscleGroups: ['Back', 'Legs', 'Arms', 'Cardiovascular System'],
    difficulty: 'Beginner',
    equipment: ['Rowing Machine'],
    description: 'Full-body cardio engaging 86% of muscles.',
    instructions: ['Drive with legs first', 'Pull handle to lower chest', 'Reverse the motion', 'Maintain rhythm'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'cardio-004',
    name: 'Stair Climber',
    category: 'Cardio',
    muscleGroups: ['Glutes', 'Quadriceps', 'Cardiovascular System'],
    difficulty: 'Intermediate',
    equipment: ['Stair Climber Machine'],
    description: 'Intense lower body cardio mimicking stair climbing.',
    instructions: ['Stand upright, light grip', 'Step with full foot', 'Keep consistent pace', 'Avoid leaning on handles'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'cardio-005',
    name: 'Elliptical Trainer',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Arms', 'Cardiovascular System'],
    difficulty: 'Beginner',
    equipment: ['Elliptical Machine'],
    description: 'Zero-impact cardio suitable for joint issues.',
    instructions: ['Step onto pedals', 'Push and pull handles', 'Maintain smooth motion', 'Adjust resistance as needed'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'cardio-006',
    name: 'Jump Rope',
    category: 'Cardio',
    muscleGroups: ['Calves', 'Shoulders', 'Cardiovascular System'],
    difficulty: 'Intermediate',
    equipment: ['Jump Rope'],
    description: 'High-intensity cardio improving coordination.',
    instructions: ['Jump on balls of feet', 'Keep jumps small', 'Rotate wrists not arms', 'Land softly'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'cardio-007',
    name: 'Battle Ropes',
    category: 'Cardio',
    muscleGroups: ['Arms', 'Core', 'Cardiovascular System'],
    difficulty: 'Intermediate',
    equipment: ['Battle Ropes'],
    description: 'High-intensity conditioning for upper body and cardio.',
    instructions: ['Hold rope ends in each hand', 'Create waves alternating arms', 'Keep core tight', 'Maintain consistent intensity'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'cardio-008',
    name: 'Assault Bike',
    category: 'Cardio',
    muscleGroups: ['Full Body', 'Cardiovascular System'],
    difficulty: 'Advanced',
    equipment: ['Assault Bike'],
    description: 'Ultimate conditioning tool for HIIT workouts.',
    instructions: ['Push and pull arms while pedaling', 'Maintain high intensity', 'Use for intervals', 'Keep breathing steady'],
    targetArea: 'Full Body'
  }),

  // ============ FLEXIBILITY/MOBILITY (6 exercises) ============
  ex({
    id: 'flex-001',
    name: 'Dynamic Warm-Up',
    category: 'Flexibility',
    muscleGroups: ['Full Body'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Movement-based preparation for training.',
    instructions: ['Perform arm circles', 'Do leg swings', 'Include torso rotations', 'Progress to light jogging'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'flex-002',
    name: 'Hamstring Stretch',
    category: 'Flexibility',
    muscleGroups: ['Hamstrings'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Essential stretch for posterior chain flexibility.',
    instructions: ['Sit with legs extended', 'Reach toward toes', 'Hold stretch position', 'Breathe deeply'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'flex-003',
    name: 'Hip Flexor Stretch',
    category: 'Flexibility',
    muscleGroups: ['Hip Flexors', 'Quadriceps'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Counteracts sitting and improves hip mobility.',
    instructions: ['Kneel in lunge position', 'Push hips forward', 'Keep torso upright', 'Hold and breathe'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'flex-004',
    name: 'Shoulder Mobility Drill',
    category: 'Flexibility',
    muscleGroups: ['Shoulders', 'Thoracic Spine'],
    difficulty: 'Beginner',
    equipment: ['PVC Pipe', 'Resistance Band'],
    description: 'Improves overhead mobility and shoulder health.',
    instructions: ['Hold pipe wide', 'Pass over head and behind', 'Keep arms straight', 'Progress to narrower grip'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'flex-005',
    name: 'Lat Stretch',
    category: 'Flexibility',
    muscleGroups: ['Lats', 'Obliques'],
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    description: 'Opens up the sides of the torso and lats.',
    instructions: ['Reach arm overhead', 'Lean to opposite side', 'Feel stretch along side', 'Hold and switch'],
    targetArea: 'Upper Body'
  }),
  ex({
    id: 'flex-006',
    name: 'Foam Rolling',
    category: 'Flexibility',
    muscleGroups: ['Full Body'],
    difficulty: 'Beginner',
    equipment: ['Foam Roller'],
    description: 'Self-myofascial release for recovery and mobility.',
    instructions: ['Place roller under muscle', 'Roll slowly over area', 'Pause on tender spots', 'Breathe and relax'],
    targetArea: 'Full Body'
  }),

  // ============ FUNCTIONAL (6 exercises) ============
  ex({
    id: 'func-001',
    name: "Farmer's Carry",
    category: 'Functional',
    muscleGroups: ['Grip', 'Core', 'Traps', 'Full Body'],
    difficulty: 'Beginner',
    equipment: ['Dumbbells', 'Kettlebells'],
    description: 'Loaded carry for grip strength and core stability.',
    instructions: ['Hold heavy weights at sides', 'Walk with upright posture', 'Keep shoulders back', 'Take controlled steps'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'func-002',
    name: 'Sled Push',
    category: 'Functional',
    muscleGroups: ['Quadriceps', 'Glutes', 'Cardiovascular System'],
    difficulty: 'Intermediate',
    equipment: ['Prowler Sled'],
    description: 'Powerful conditioning for leg drive and work capacity.',
    instructions: ['Grip sled handles', 'Drive with legs', 'Keep back flat', 'Maintain consistent pace'],
    targetArea: 'Lower Body'
  }),
  ex({
    id: 'func-003',
    name: 'Kettlebell Swing',
    category: 'Functional',
    muscleGroups: ['Glutes', 'Hamstrings', 'Core', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: ['Kettlebell'],
    description: 'Hip hinge power exercise for conditioning.',
    instructions: ['Hinge at hips, swing back', 'Snap hips forward explosively', 'Let arms float up', 'Control swing back down'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'func-004',
    name: 'Medicine Ball Slam',
    category: 'Functional',
    muscleGroups: ['Core', 'Lats', 'Shoulders'],
    difficulty: 'Beginner',
    equipment: ['Slam Ball'],
    description: 'Explosive movement for power and stress relief.',
    instructions: ['Raise ball overhead', 'Slam down forcefully', 'Squat to pick up', 'Repeat with power'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'func-005',
    name: 'Turkish Get-Up',
    category: 'Functional',
    muscleGroups: ['Full Body', 'Core', 'Shoulders'],
    difficulty: 'Advanced',
    equipment: ['Kettlebell', 'Dumbbell'],
    description: 'Complex movement improving total body coordination.',
    instructions: ['Lie down with weight overhead', 'Progress through positions to standing', 'Keep arm locked out', 'Reverse to return'],
    targetArea: 'Full Body'
  }),
  ex({
    id: 'func-006',
    name: 'Box Jump',
    category: 'Functional',
    muscleGroups: ['Quadriceps', 'Glutes', 'Calves'],
    difficulty: 'Intermediate',
    equipment: ['Plyo Box'],
    description: 'Explosive plyometric for lower body power.',
    instructions: ['Stand facing box', 'Swing arms and jump', 'Land softly on box', 'Step down and repeat'],
    targetArea: 'Lower Body'
  })
];

// Export categories for filtering
export const exerciseCategories = ['Strength', 'Cardio', 'Core', 'Flexibility', 'Functional'];
export const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
export const targetAreas = ['Upper Body', 'Lower Body', 'Core', 'Full Body'];
export const muscleGroups = [
  'Chest', 'Upper Chest', 'Lower Chest',
  'Back', 'Lats', 'Middle Back', 'Lower Back', 'Rhomboids', 'Traps',
  'Shoulders', 'Front Delts', 'Side Delts', 'Rear Delts',
  'Biceps', 'Triceps', 'Forearms', 'Brachialis',
  'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Inner Thighs', 'Hip Flexors',
  'Abs', 'Obliques', 'Lower Abs', 'Core Stabilizers', 'Transverse Abdominis',
  'Cardiovascular System', 'Rotator Cuff', 'Grip', 'Full Body'
];

export default exercisesLibrary;
