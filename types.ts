
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

export type ViewMode = 'Dashboard' | 'Schedule' | 'Logs' | 'Vitals' | 'Competitive';

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
