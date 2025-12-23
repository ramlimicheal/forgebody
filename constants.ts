
import { Reflection, Task, HumanStats, HydrationData, ReadinessContributor, ConnectedDevice, TrendData } from './types';

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
  { brand: 'Xiaomi', models: ['Mi Band 7', 'Mi Band 8', 'Mi Band 8 Pro', 'Redmi Watch 3'] },
  { brand: 'Amazfit', models: ['GTR 4', 'GTS 4', 'Bip 5', 'Band 7', 'T-Rex 2'] },
  { brand: 'Fitbit', models: ['Inspire 3', 'Charge 6', 'Versa 4', 'Sense 2'] },
  { brand: 'Samsung', models: ['Galaxy Fit 3', 'Galaxy Watch FE'] },
  { brand: 'Huawei', models: ['Band 8', 'Band 9', 'Watch Fit 3'] },
  { brand: 'Realme', models: ['Band 2', 'Watch 3 Pro'] },
  { brand: 'Honor', models: ['Band 7', 'Watch 4'] }
];
