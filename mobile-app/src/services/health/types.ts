export interface HealthData {
  date: string;
  steps: number;
  distance: number;
  activeMinutes: number;
  calories: number;
  floorsClimbed?: number;
  heartRate?: HeartRateData;
  sleep?: SleepData;
  workouts: WorkoutData[];
}

export interface HeartRateData {
  average: number;
  min: number;
  max: number;
  resting?: number;
  samples: HeartRateSample[];
}

export interface HeartRateSample {
  timestamp: string;
  value: number;
}

export interface SleepData {
  totalMinutes: number;
  startTime: string;
  endTime: string;
  stages?: SleepStage[];
}

export interface SleepStage {
  stage: 'awake' | 'light' | 'deep' | 'rem';
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export interface WorkoutData {
  id: string;
  type: WorkoutType;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  calories: number;
  distance?: number;
  steps?: number;
  averageHeartRate?: number;
}

export type WorkoutType = 
  | 'walking'
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'strength'
  | 'yoga'
  | 'hiit'
  | 'other';

export interface DailySummary {
  date: string;
  steps: number;
  stepsGoal: number;
  stepsProgress: number;
  distance: number;
  activeMinutes: number;
  activeMinutesGoal: number;
  activeMinutesProgress: number;
  calories: number;
  floorsClimbed: number;
  averageHeartRate?: number;
  restingHeartRate?: number;
  sleepHours?: number;
  sleepGoal: number;
  sleepProgress?: number;
  hydrationMl: number;
  hydrationGoal: number;
  hydrationProgress: number;
  readinessScore: number;
  workoutCount: number;
}

export interface WeeklySummary {
  startDate: string;
  endDate: string;
  totalSteps: number;
  averageSteps: number;
  totalDistance: number;
  totalActiveMinutes: number;
  averageActiveMinutes: number;
  totalCalories: number;
  averageSleepHours?: number;
  averageHeartRate?: number;
  workoutCount: number;
  activeDays: number;
  bestDay: string;
  improvement: number;
}

export interface HealthPermissions {
  steps: boolean;
  distance: boolean;
  calories: boolean;
  heartRate: boolean;
  sleep: boolean;
  workouts: boolean;
  floorsClimbed: boolean;
}

export type HealthPlatform = 'healthConnect' | 'healthKit' | 'none';

export interface HealthServiceConfig {
  platform: HealthPlatform;
  permissions: HealthPermissions;
  lastSync?: string;
}
