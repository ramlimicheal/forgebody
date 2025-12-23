
export interface Reflection {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  emotionalTone: string; // Now "Bio-Status"
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  type: 'Strength' | 'Conditioning' | 'Mobility' | 'Recovery';
  metabolicLoad: 'Low' | 'Medium' | 'High';
  prepContext?: string;
}

export interface HumanStats {
  readiness: number;
  strengthIndex: number;
  recoveryStreak: number;
  metabolicFlow: number[];
}

export interface Benchmark {
  label: string;
  userValue: number;
  eliteValue: number;
  unit: string;
}

export interface HydrationData {
  current: number;
  goal: number;
  history: number[];
  lastIntake: string;
}

export interface ReadinessContributor {
  label: string;
  value: number;
  status: 'optimal' | 'good' | 'fair' | 'low';
  icon: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  brand: string;
  type: 'smartwatch' | 'band' | 'scale';
  connected: boolean;
  lastSync: string;
  batteryLevel?: number;
}

export interface TrendData {
  date: string;
  steps: number;
  heartRate: number;
  sleep: number;
  hydration: number;
}

export type ViewMode = 'Dashboard' | 'Schedule' | 'Logs' | 'Vitals' | 'Competitive' | 'Devices' | 'Trends' | 'Goals' | 'Reports' | 'Settings' | 'Workouts' | 'Nutrition' | 'Social' | 'Coach';

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  muscleGroup: string;
  equipment: string;
}

export interface ExerciseSet {
  reps: number;
  weight: number;
  rpe?: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  exercises: Exercise[];
  calories: number;
  type: 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Sports' | 'Custom';
  notes?: string;
  feeling: 'great' | 'good' | 'okay' | 'tired' | 'exhausted';
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  time: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface NutritionDay {
  date: string;
  meals: MealEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface SocialActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'workout' | 'achievement' | 'milestone' | 'challenge';
  title: string;
  description: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'steps' | 'workouts' | 'streak' | 'calories';
  target: number;
  current: number;
  startDate: string;
  endDate: string;
  participants: number;
  rank?: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar: string;
  score: number;
  change: 'up' | 'down' | 'same';
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'tip';
  category: 'workout' | 'nutrition' | 'recovery' | 'sleep' | 'general';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  action?: string;
  timestamp: string;
}
