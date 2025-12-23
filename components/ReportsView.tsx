import React, { useState } from 'react';
import { MOCK_TRENDS } from '../constants';

type ReportPeriod = 'week' | 'month';

interface WeeklySummary {
  totalSteps: number;
  avgHeartRate: number;
  totalSleep: number;
  avgHydration: number;
  activeDays: number;
  bestDay: string;
  improvement: number;
}

const calculateWeeklySummary = (): WeeklySummary => {
  const totalSteps = MOCK_TRENDS.reduce((sum, d) => sum + d.steps, 0);
  const avgHeartRate = Math.round(MOCK_TRENDS.reduce((sum, d) => sum + d.heartRate, 0) / MOCK_TRENDS.length);
  const totalSleep = MOCK_TRENDS.reduce((sum, d) => sum + d.sleep, 0);
  const avgHydration = Math.round(MOCK_TRENDS.reduce((sum, d) => sum + d.hydration, 0) / MOCK_TRENDS.length);
  const maxSteps = Math.max(...MOCK_TRENDS.map(d => d.steps));
  const bestDay = MOCK_TRENDS.find(d => d.steps === maxSteps)?.date || 'Sat';
  
  return {
    totalSteps,
    avgHeartRate,
    totalSleep: Math.round(totalSleep * 10) / 10,
    avgHydration,
    activeDays: 6,
    bestDay,
    improvement: 12,
  };
};

export const ReportsView: React.FC = () => {
  const [period, setPeriod] = useState<ReportPeriod>('week');
  const [isLoaded, setIsLoaded] = useState(false);
  const summary = calculateWeeklySummary();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const insights = [
    {
      icon: 'trending_up',
      title: 'Step Count Improving',
      description: 'Your average daily steps increased by 12% compared to last week. Keep up the momentum!',
      type: 'positive',
    },
    {
      icon: 'bedtime',
      title: 'Sleep Consistency',
      description: 'You maintained a consistent sleep schedule with an average of 7.2 hours per night.',
      type: 'neutral',
    },
    {
      icon: 'water_drop',
      title: 'Hydration Alert',
      description: 'Your hydration dropped below target on 3 days. Consider setting reminders.',
      type: 'warning',
    },
    {
      icon: 'favorite',
      title: 'Heart Health',
      description: 'Resting heart rate is stable at 70 bpm, indicating good cardiovascular fitness.',
      type: 'positive',
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Performance Analysis</span>
              <span className="px-3 py-1 bg-slate-900 text-white rounded-full tech-label !text-[8px]">
                {period === 'week' ? 'Weekly' : 'Monthly'} Report
              </span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Reports</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              AI-generated insights from your health data
            </p>
          </div>
          <div className="flex gap-2 bg-slate-50 p-1 rounded-full">
            <button
              onClick={() => setPeriod('week')}
              className={`px-6 py-2 rounded-full tech-label transition-all ${
                period === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-6 py-2 rounded-full tech-label transition-all ${
                period === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Total Steps', value: summary.totalSteps.toLocaleString(), icon: 'footprint', color: 'emerald' },
            { label: 'Avg Heart Rate', value: `${summary.avgHeartRate} bpm`, icon: 'favorite', color: 'rose' },
            { label: 'Total Sleep', value: `${summary.totalSleep} hrs`, icon: 'bedtime', color: 'indigo' },
            { label: 'Avg Hydration', value: `${summary.avgHydration} ml`, icon: 'water_drop', color: 'blue' },
          ].map((stat, idx) => (
            <div 
              key={stat.label}
              className="p-6 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`material-symbols-outlined text-${stat.color}-500`}>{stat.icon}</span>
                <span className="tech-label !text-[8px]">{stat.label}</span>
              </div>
              <p className="text-3xl font-black italic text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 p-8 bg-slate-950 rounded-[2rem] text-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="tech-label text-emerald-400">AI Summary</span>
                <h2 className="text-2xl font-bold tracking-tight mt-2 italic uppercase">Your Week in Review</h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-400">auto_awesome</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-8">
              This week showed strong progress in your fitness journey. Your step count peaked on {summary.bestDay} 
              with exceptional activity levels. Sleep quality remained consistent, though there's room for improvement 
              in hydration habits. Your resting heart rate indicates good cardiovascular health, and the {summary.improvement}% 
              improvement in daily steps suggests your training is paying off.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="tech-label !text-[8px] text-slate-500">Active Days</span>
                <p className="text-2xl font-black italic text-white mt-1">{summary.activeDays}/7</p>
              </div>
              <div>
                <span className="tech-label !text-[8px] text-slate-500">Best Day</span>
                <p className="text-2xl font-black italic text-emerald-400 mt-1">{summary.bestDay}</p>
              </div>
              <div>
                <span className="tech-label !text-[8px] text-slate-500">Improvement</span>
                <p className="text-2xl font-black italic text-emerald-400 mt-1">+{summary.improvement}%</p>
              </div>
            </div>
          </div>

          <div className="p-8 border border-slate-100 rounded-[2rem]">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-slate-400">emoji_events</span>
              <span className="tech-label">Achievements</span>
            </div>
            <div className="space-y-4">
              {[
                { icon: 'local_fire_department', label: '6-Day Streak', unlocked: true },
                { icon: 'directions_walk', label: '70K Steps', unlocked: true },
                { icon: 'hotel', label: 'Sleep Champion', unlocked: true },
                { icon: 'water_drop', label: 'Hydration Hero', unlocked: false },
              ].map((achievement, idx) => (
                <div 
                  key={achievement.label}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    achievement.unlocked 
                      ? 'bg-emerald-50 border border-emerald-100' 
                      : 'bg-slate-50 border border-slate-100 opacity-50'
                  }`}
                  style={{ 
                    opacity: isLoaded ? (achievement.unlocked ? 1 : 0.5) : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${idx * 100}ms`
                  }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    achievement.unlocked ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}>
                    <span className="material-symbols-outlined text-white text-lg">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${achievement.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                      {achievement.label}
                    </p>
                    <p className="tech-label !text-[7px]">
                      {achievement.unlocked ? 'Unlocked this week' : 'Keep going!'}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <span className="material-symbols-outlined text-emerald-500 filled">verified</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="tech-label !text-[10px]">Key Insights</span>
            <div className="h-[0.5px] flex-1 bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, idx) => (
              <div 
                key={insight.title}
                className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${
                  insight.type === 'positive' ? 'border-emerald-100 bg-emerald-50/30 hover:border-emerald-200' :
                  insight.type === 'warning' ? 'border-amber-100 bg-amber-50/30 hover:border-amber-200' :
                  'border-slate-100 bg-white hover:border-slate-200'
                }`}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease-out ${idx * 100}ms`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    insight.type === 'positive' ? 'bg-emerald-500' :
                    insight.type === 'warning' ? 'bg-amber-500' :
                    'bg-slate-400'
                  }`}>
                    <span className="material-symbols-outlined text-white">{insight.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 border border-slate-100 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-slate-400">download</span>
            <div>
              <h3 className="font-bold text-slate-900">Export Report</h3>
              <p className="tech-label !text-[8px]">Download your data as PDF or CSV</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 border border-slate-200 rounded-full tech-label text-slate-600 hover:bg-slate-50 transition-all">
              CSV
            </button>
            <button className="px-6 py-2 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all">
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
