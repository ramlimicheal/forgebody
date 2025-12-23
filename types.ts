
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

export type ViewMode = 'Dashboard' | 'Schedule' | 'Logs' | 'Vitals' | 'Competitive' | 'Devices' | 'Trends' | 'Goals' | 'Reports' | 'Settings';
