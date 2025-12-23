
import { Reflection, Task, HumanStats } from './types';

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
