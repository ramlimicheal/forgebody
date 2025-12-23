
import { Reflection, Task, HumanStats, HydrationData, ReadinessContributor, ConnectedDevice, TrendData, Workout, NutritionDay, SocialActivity, Challenge, LeaderboardEntry, AIInsight } from './types';

export const INITIAL_REFLECTIONS: Reflection[] = [
  {
    id: '1',
    title: 'Post-Squat Biofeedback',
    date: 'Dec 02',
    createdAt: 'December 02, 2024 07:00 AM',
    emotionalTone: 'Peak Performance',
    tags: ['Lower Body', 'Hypertrophy'],
    content: `Central Nervous System (CNS) felt incredibly responsive today. Depth was consistent. I noticed a slight shift in my left hip during the 4th set—need to prioritize glute medius activation in tomorrow's mobility block.`
  },
  {
    id: '2',
    title: 'Recovery & HRV Analysis',
    date: 'Fri 29',
    createdAt: 'November 29, 2024 09:15 AM',
    emotionalTone: 'Restorative',
    tags: ['Recovery', 'Breathwork'],
    content: `HRV is up by 15ms. The cold plunge and focused nasal breathing are clearly moving the needle on parasympathetic tone.`
  }
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Power Clean: Explosive Phase', time: '06:30 AM', type: 'Strength', metabolicLoad: 'High', prepContext: 'CNS readiness is 92%. Push for 3-rep max with explosive intent.' },
  { id: 't2', title: 'Zone 2 Metabolic Conditioning', time: '08:00 AM', type: 'Conditioning', metabolicLoad: 'Medium' },
  { id: 't3', title: 'Myofascial Release: Posterior Chain', time: '05:00 PM', type: 'Recovery', metabolicLoad: 'Low' },
  { id: 't4', title: 'Nutrition Architecture: Refeed', time: '07:00 PM', type: 'Recovery', metabolicLoad: 'Low', prepContext: 'Increase carbohydrate intake by 40g to compensate for high glycogen depletion.' }
];

export const MOCK_STATS: HumanStats = {
  readiness: 94,
  strengthIndex: 1240,
  recoveryStreak: 21,
  metabolicFlow: [72, 85, 60, 95, 88, 70, 92]
};

export const MOCK_VITALS = {
  sleepScore: 88,
  hrv: 72,
  rhr: 42,
  respiratoryRate: 14.2,
  sleepArchitecture: [
    { label: 'Deep', value: 25, color: '#0F172A' },
    { label: 'REM', value: 30, color: '#10B981' },
    { label: 'Light', value: 45, color: '#94A3B8' }
  ],
  telemetryHistory: [42, 43, 41, 44, 42, 42, 41, 45, 42]
};

export const MOCK_HYDRATION: HydrationData = {
  current: 1800,
  goal: 2500,
  history: [2200, 1900, 2400, 2100, 1800, 2300, 1800],
  lastIntake: '10:45 AM'
};

export const MOCK_READINESS_CONTRIBUTORS: ReadinessContributor[] = [
  { label: 'Sleep Quality', value: 92, status: 'optimal', icon: 'bedtime' },
  { label: 'Heart Rate', value: 88, status: 'optimal', icon: 'favorite' },
  { label: 'Activity Balance', value: 85, status: 'good', icon: 'directions_run' },
  { label: 'Recovery Time', value: 78, status: 'good', icon: 'refresh' },
  { label: 'Step Count', value: 95, status: 'optimal', icon: 'footprint' },
  { label: 'Hydration', value: 72, status: 'fair', icon: 'water_drop' }
];

export const MOCK_DEVICES: ConnectedDevice[] = [
  { 
    id: 'd1', 
    name: 'Mi Band 8', 
    brand: 'Xiaomi', 
    type: 'band', 
    connected: true, 
    lastSync: '2 min ago',
    batteryLevel: 78
  },
  { 
    id: 'd2', 
    name: 'Amazfit GTR 4', 
    brand: 'Amazfit', 
    type: 'smartwatch', 
    connected: true, 
    lastSync: '15 min ago',
    batteryLevel: 45
  },
  { 
    id: 'd3', 
    name: 'Fitbit Inspire 3', 
    brand: 'Fitbit', 
    type: 'band', 
    connected: false, 
    lastSync: '2 days ago'
  }
];

export const MOCK_TRENDS: TrendData[] = [
  { date: 'Mon', steps: 8420, heartRate: 68, sleep: 7.2, hydration: 2200 },
  { date: 'Tue', steps: 12350, heartRate: 72, sleep: 6.8, hydration: 1900 },
  { date: 'Wed', steps: 6890, heartRate: 65, sleep: 8.1, hydration: 2400 },
  { date: 'Thu', steps: 9200, heartRate: 70, sleep: 7.5, hydration: 2100 },
  { date: 'Fri', steps: 11500, heartRate: 74, sleep: 6.5, hydration: 1800 },
  { date: 'Sat', steps: 15200, heartRate: 78, sleep: 7.8, hydration: 2300 },
  { date: 'Sun', steps: 7800, heartRate: 66, sleep: 8.5, hydration: 1800 }
];

export const SUPPORTED_DEVICES = [
  { brand: 'Xiaomi', models: ['Mi Band 7', 'Mi Band 8', 'Mi Band 8 Pro', 'Redmi Watch 3', 'Redmi Watch 4'] },
  { brand: 'Fire-Boltt', models: ['Phoenix Pro', 'Ninja Call Pro', 'Ring 3', 'Gladiator', 'Invincible Plus'] },
  { brand: 'boAt', models: ['Wave Lite', 'Storm Call', 'Xtend Plus', 'Lunar Connect', 'Wave Neo'] },
  { brand: 'Noise', models: ['ColorFit Pro 5', 'Pulse 2 Max', 'Icon 3', 'Twist Go', 'ColorFit Ultra 3'] },
  { brand: 'Pebble', models: ['Cosmos Luxe', 'Frost', 'Alive', 'Spark'] },
  { brand: 'Amazfit', models: ['GTR 4', 'GTS 4', 'Bip 5', 'Band 7', 'T-Rex 2'] },
  { brand: 'Fitbit', models: ['Inspire 3', 'Charge 6', 'Versa 4', 'Sense 2'] },
  { brand: 'Realme', models: ['Band 2', 'Watch 3 Pro', 'Watch S2'] }
];

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    name: 'Push Day - Chest & Shoulders',
    date: '2024-12-23',
    duration: 65,
    calories: 420,
    type: 'Strength',
    feeling: 'great',
    exercises: [
      { id: 'e1', name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', sets: [
        { reps: 8, weight: 80, rpe: 7, completed: true },
        { reps: 8, weight: 85, rpe: 8, completed: true },
        { reps: 6, weight: 90, rpe: 9, completed: true },
        { reps: 5, weight: 90, rpe: 10, completed: true }
      ]},
      { id: 'e2', name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', sets: [
        { reps: 10, weight: 40, rpe: 7, completed: true },
        { reps: 8, weight: 45, rpe: 8, completed: true },
        { reps: 8, weight: 45, rpe: 9, completed: true }
      ]},
      { id: 'e3', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', equipment: 'Dumbbells', sets: [
        { reps: 12, weight: 28, rpe: 7, completed: true },
        { reps: 10, weight: 30, rpe: 8, completed: true },
        { reps: 10, weight: 30, rpe: 9, completed: true }
      ]},
      { id: 'e4', name: 'Lateral Raises', muscleGroup: 'Shoulders', equipment: 'Dumbbells', sets: [
        { reps: 15, weight: 10, rpe: 8, completed: true },
        { reps: 12, weight: 12, rpe: 9, completed: true },
        { reps: 12, weight: 12, rpe: 9, completed: true }
      ]}
    ],
    notes: 'Felt strong today. PR on bench press!'
  },
  {
    id: 'w2',
    name: 'Morning HIIT Session',
    date: '2024-12-22',
    duration: 30,
    calories: 380,
    type: 'HIIT',
    feeling: 'good',
    exercises: [
      { id: 'e5', name: 'Burpees', muscleGroup: 'Full Body', equipment: 'Bodyweight', sets: [
        { reps: 15, weight: 0, completed: true },
        { reps: 15, weight: 0, completed: true },
        { reps: 12, weight: 0, completed: true }
      ]},
      { id: 'e6', name: 'Mountain Climbers', muscleGroup: 'Core', equipment: 'Bodyweight', sets: [
        { reps: 30, weight: 0, completed: true },
        { reps: 30, weight: 0, completed: true },
        { reps: 25, weight: 0, completed: true }
      ]},
      { id: 'e7', name: 'Jump Squats', muscleGroup: 'Legs', equipment: 'Bodyweight', sets: [
        { reps: 20, weight: 0, completed: true },
        { reps: 20, weight: 0, completed: true },
        { reps: 15, weight: 0, completed: true }
      ]}
    ]
  },
  {
    id: 'w3',
    name: 'Pull Day - Back & Biceps',
    date: '2024-12-21',
    duration: 55,
    calories: 350,
    type: 'Strength',
    feeling: 'okay',
    exercises: [
      { id: 'e8', name: 'Deadlift', muscleGroup: 'Back', equipment: 'Barbell', sets: [
        { reps: 5, weight: 120, rpe: 8, completed: true },
        { reps: 5, weight: 130, rpe: 9, completed: true },
        { reps: 3, weight: 140, rpe: 10, completed: true }
      ]},
      { id: 'e9', name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Bodyweight', sets: [
        { reps: 10, weight: 0, completed: true },
        { reps: 8, weight: 0, completed: true },
        { reps: 8, weight: 0, completed: true }
      ]},
      { id: 'e10', name: 'Barbell Rows', muscleGroup: 'Back', equipment: 'Barbell', sets: [
        { reps: 10, weight: 60, rpe: 7, completed: true },
        { reps: 10, weight: 65, rpe: 8, completed: true },
        { reps: 8, weight: 70, rpe: 9, completed: true }
      ]}
    ]
  }
];

export const MOCK_NUTRITION: NutritionDay = {
  date: '2024-12-23',
  calorieGoal: 2400,
  proteinGoal: 180,
  carbsGoal: 250,
  fatGoal: 80,
  totalCalories: 1850,
  totalProtein: 142,
  totalCarbs: 185,
  totalFat: 62,
  meals: [
    { id: 'm1', name: 'Oatmeal with Banana & Almonds', calories: 420, protein: 15, carbs: 65, fat: 12, fiber: 8, time: '07:30', mealType: 'breakfast' },
    { id: 'm2', name: 'Protein Shake', calories: 180, protein: 30, carbs: 8, fat: 3, time: '10:00', mealType: 'snack' },
    { id: 'm3', name: 'Grilled Chicken Salad', calories: 550, protein: 45, carbs: 25, fat: 28, fiber: 6, time: '13:00', mealType: 'lunch' },
    { id: 'm4', name: 'Greek Yogurt with Berries', calories: 200, protein: 18, carbs: 22, fat: 5, time: '16:00', mealType: 'snack' },
    { id: 'm5', name: 'Salmon with Rice & Vegetables', calories: 500, protein: 34, carbs: 65, fat: 14, fiber: 5, time: '19:30', mealType: 'dinner' }
  ]
};

export const MOCK_SOCIAL_ACTIVITIES: SocialActivity[] = [
  { id: 's1', userId: 'u1', userName: 'Priya Sharma', userAvatar: 'PS', type: 'workout', title: 'Completed Morning Yoga', description: '45 min flow session - feeling energized!', timestamp: '2 hours ago', likes: 24, comments: 5, isLiked: true },
  { id: 's2', userId: 'u2', userName: 'Rahul Verma', userAvatar: 'RV', type: 'achievement', title: 'Unlocked: Iron Will', description: 'Completed 30-day workout streak!', timestamp: '4 hours ago', likes: 89, comments: 12, isLiked: false },
  { id: 's3', userId: 'u3', userName: 'Ananya Patel', userAvatar: 'AP', type: 'milestone', title: '10,000 Steps Achieved', description: 'Hit my daily step goal for the 7th day in a row', timestamp: '5 hours ago', likes: 45, comments: 8, isLiked: true },
  { id: 's4', userId: 'u4', userName: 'Vikram Singh', userAvatar: 'VS', type: 'workout', title: 'New PR: Deadlift 180kg', description: 'Finally hit my goal! 6 months of consistent training paid off.', timestamp: '8 hours ago', likes: 156, comments: 23, isLiked: false },
  { id: 's5', userId: 'u5', userName: 'Meera Reddy', userAvatar: 'MR', type: 'challenge', title: 'Joined: December Fitness Challenge', description: 'Let\'s crush this together! Who else is in?', timestamp: '1 day ago', likes: 67, comments: 15, isLiked: true }
];

export const MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', name: 'December Step Challenge', description: 'Walk 300,000 steps this month', type: 'steps', target: 300000, current: 245000, startDate: '2024-12-01', endDate: '2024-12-31', participants: 1247, rank: 42 },
  { id: 'c2', name: 'Workout Warrior', description: 'Complete 20 workouts this month', type: 'workouts', target: 20, current: 16, startDate: '2024-12-01', endDate: '2024-12-31', participants: 892, rank: 15 },
  { id: 'c3', name: '7-Day Streak', description: 'Work out every day for a week', type: 'streak', target: 7, current: 5, startDate: '2024-12-18', endDate: '2024-12-25', participants: 2341, rank: 128 },
  { id: 'c4', name: 'Calorie Crusher', description: 'Burn 15,000 calories through exercise', type: 'calories', target: 15000, current: 11200, startDate: '2024-12-01', endDate: '2024-12-31', participants: 567, rank: 8 }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: 'l1', userName: 'Arjun Kapoor', userAvatar: 'AK', score: 98500, change: 'same' },
  { rank: 2, userId: 'l2', userName: 'Sneha Iyer', userAvatar: 'SI', score: 94200, change: 'up' },
  { rank: 3, userId: 'l3', userName: 'Karan Malhotra', userAvatar: 'KM', score: 91800, change: 'down' },
  { rank: 4, userId: 'l4', userName: 'Divya Nair', userAvatar: 'DN', score: 89400, change: 'up' },
  { rank: 5, userId: 'l5', userName: 'Rohit Sharma', userAvatar: 'RS', score: 87100, change: 'same' },
  { rank: 6, userId: 'l6', userName: 'Pooja Gupta', userAvatar: 'PG', score: 85600, change: 'up' },
  { rank: 7, userId: 'l7', userName: 'Amit Patel', userAvatar: 'AP', score: 83200, change: 'down' },
  { rank: 8, userId: 'u0', userName: 'You', userAvatar: 'AH', score: 81500, change: 'up' },
  { rank: 9, userId: 'l8', userName: 'Neha Singh', userAvatar: 'NS', score: 79800, change: 'down' },
  { rank: 10, userId: 'l9', userName: 'Sanjay Kumar', userAvatar: 'SK', score: 77400, change: 'same' }
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  { id: 'ai1', type: 'recommendation', category: 'workout', title: 'Optimize Your Push Day', message: 'Based on your recent performance, consider adding 2.5kg to your bench press. Your RPE has been consistently below 8 on working sets, indicating room for progressive overload.', priority: 'high', actionable: true, action: 'Update workout plan', timestamp: '1 hour ago' },
  { id: 'ai2', type: 'warning', category: 'recovery', title: 'Recovery Alert', message: 'Your HRV has dropped 15% over the past 3 days. Consider a deload day or active recovery session to prevent overtraining.', priority: 'high', actionable: true, action: 'Schedule recovery', timestamp: '2 hours ago' },
  { id: 'ai3', type: 'tip', category: 'nutrition', title: 'Protein Timing', message: 'You\'re hitting your protein goal, but distribution could be better. Try to consume 30-40g protein within 2 hours post-workout for optimal muscle protein synthesis.', priority: 'medium', actionable: false, timestamp: '4 hours ago' },
  { id: 'ai4', type: 'achievement', category: 'general', title: 'Consistency Champion', message: 'You\'ve logged workouts for 21 consecutive days! This puts you in the top 5% of ForgeBody users. Keep up the incredible work!', priority: 'low', actionable: false, timestamp: '1 day ago' },
  { id: 'ai5', type: 'recommendation', category: 'sleep', title: 'Sleep Optimization', message: 'Your deep sleep percentage has improved by 12% since you started going to bed before 10:30 PM. Maintain this schedule for continued benefits.', priority: 'medium', actionable: false, timestamp: '1 day ago' },
  { id: 'ai6', type: 'tip', category: 'workout', title: 'Volume Insight', message: 'Your weekly chest volume (18 sets) is at the higher end of the optimal range. If you\'re not seeing gains, consider reducing to 12-15 sets and increasing intensity.', priority: 'medium', actionable: true, action: 'Adjust volume', timestamp: '2 days ago' }
];

export const EXERCISE_DATABASE = [
  { name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell' },
  { name: 'Incline Bench Press', muscleGroup: 'Chest', equipment: 'Barbell' },
  { name: 'Dumbbell Flyes', muscleGroup: 'Chest', equipment: 'Dumbbells' },
  { name: 'Push-ups', muscleGroup: 'Chest', equipment: 'Bodyweight' },
  { name: 'Deadlift', muscleGroup: 'Back', equipment: 'Barbell' },
  { name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Bodyweight' },
  { name: 'Barbell Rows', muscleGroup: 'Back', equipment: 'Barbell' },
  { name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Cable' },
  { name: 'Squat', muscleGroup: 'Legs', equipment: 'Barbell' },
  { name: 'Leg Press', muscleGroup: 'Legs', equipment: 'Machine' },
  { name: 'Lunges', muscleGroup: 'Legs', equipment: 'Dumbbells' },
  { name: 'Leg Curl', muscleGroup: 'Legs', equipment: 'Machine' },
  { name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell' },
  { name: 'Lateral Raises', muscleGroup: 'Shoulders', equipment: 'Dumbbells' },
  { name: 'Face Pulls', muscleGroup: 'Shoulders', equipment: 'Cable' },
  { name: 'Bicep Curls', muscleGroup: 'Arms', equipment: 'Dumbbells' },
  { name: 'Tricep Pushdowns', muscleGroup: 'Arms', equipment: 'Cable' },
  { name: 'Hammer Curls', muscleGroup: 'Arms', equipment: 'Dumbbells' },
  { name: 'Plank', muscleGroup: 'Core', equipment: 'Bodyweight' },
  { name: 'Crunches', muscleGroup: 'Core', equipment: 'Bodyweight' }
];

export const FOOD_DATABASE = [
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (100g cooked)', calories: 112, protein: 2.6, carbs: 24, fat: 0.9 },
  { name: 'Eggs (1 large)', calories: 72, protein: 6, carbs: 0.4, fat: 5 },
  { name: 'Oatmeal (100g)', calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.7 },
  { name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { name: 'Whey Protein (scoop)', calories: 120, protein: 24, carbs: 3, fat: 1.5 },
  { name: 'Paneer (100g)', calories: 265, protein: 18, carbs: 1.2, fat: 21 },
  { name: 'Dal (100g cooked)', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Roti (1 medium)', calories: 71, protein: 2.7, carbs: 15, fat: 0.4 },
  { name: 'Idli (1 piece)', calories: 39, protein: 2, carbs: 8, fat: 0.1 }
];
