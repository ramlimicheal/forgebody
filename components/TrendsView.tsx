
import React, { useState, useEffect } from 'react';
import { MOCK_TRENDS } from '../constants';

type MetricType = 'steps' | 'heartRate' | 'sleep' | 'hydration';

export const TrendsView: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('steps');
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const metrics: { key: MetricType; label: string; icon: string; unit: string; color: string }[] = [
    { key: 'steps', label: 'Steps', icon: 'footprint', unit: 'steps', color: 'bg-slate-900' },
    { key: 'heartRate', label: 'Heart Rate', icon: 'favorite', unit: 'bpm', color: 'bg-rose-500' },
    { key: 'sleep', label: 'Sleep', icon: 'bedtime', unit: 'hrs', color: 'bg-indigo-500' },
    { key: 'hydration', label: 'Hydration', icon: 'water_drop', unit: 'ml', color: 'bg-blue-500' }
  ];

  const getMaxValue = (metric: MetricType) => {
    return Math.max(...MOCK_TRENDS.map(d => d[metric]));
  };

  const getAverage = (metric: MetricType) => {
    const sum = MOCK_TRENDS.reduce((acc, d) => acc + d[metric], 0);
    return Math.round(sum / MOCK_TRENDS.length);
  };

  const currentMetric = metrics.find(m => m.key === selectedMetric)!;
  const maxValue = getMaxValue(selectedMetric);
  const avgValue = getAverage(selectedMetric);

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label bg-slate-900 text-white px-2 py-0.5 rounded">Analytics</span>
              <span className="tech-label">7-Day Overview</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Trends</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Track your progress over time with data from your smartwatch
            </p>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100">
            <button 
              onClick={() => setTimeRange('week')}
              className={`px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                timeRange === 'week' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeRange('month')}
              className={`px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                timeRange === 'month' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric) => {
            const avg = getAverage(metric.key);
            const isSelected = selectedMetric === metric.key;
            return (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`p-8 border rounded-[2rem] transition-all text-left ${
                  isSelected 
                    ? 'border-slate-900 bg-slate-50 shadow-lg' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    {metric.icon}
                  </span>
                  <span className="tech-label !text-[8px]">{metric.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black italic tracking-tighter ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                    {metric.key === 'sleep' ? avg.toFixed(1) : avg.toLocaleString()}
                  </span>
                  <span className="tech-label !text-[8px]">{metric.unit}</span>
                </div>
                <p className="tech-label !text-[7px] mt-2 text-slate-400">7-day avg</p>
              </button>
            );
          })}
        </div>

        <div className="p-12 border border-slate-100 rounded-[3rem] bg-white mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className={`material-symbols-outlined text-2xl ${currentMetric.color.replace('bg-', 'text-')}`}>
                {currentMetric.icon}
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tighter italic uppercase">{currentMetric.label} Trend</h2>
                <p className="tech-label !text-[8px] mt-1">Daily breakdown for the past week</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="tech-label !text-[8px]">Average</span>
                <p className="text-lg font-black italic text-slate-900">
                  {selectedMetric === 'sleep' ? avgValue.toFixed(1) : avgValue.toLocaleString()} {currentMetric.unit}
                </p>
              </div>
              <div className="w-[1px] h-10 bg-slate-100"></div>
              <div className="text-right">
                <span className="tech-label !text-[8px]">Peak</span>
                <p className="text-lg font-black italic text-emerald-500">
                  {selectedMetric === 'sleep' ? maxValue.toFixed(1) : maxValue.toLocaleString()} {currentMetric.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end gap-4 px-4 relative">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-right pr-4">
              <span className="tech-label !text-[7px]">{maxValue.toLocaleString()}</span>
              <span className="tech-label !text-[7px]">{Math.round(maxValue / 2).toLocaleString()}</span>
              <span className="tech-label !text-[7px]">0</span>
            </div>
            <div className="flex-1 flex items-end gap-4 ml-12">
              {MOCK_TRENDS.map((data, i) => {
                const value = data[selectedMetric];
                const heightPercent = (value / maxValue) * 100;
                const isMax = value === maxValue;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-help">
                    <div className="relative w-full">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white tech-label !text-[7px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {selectedMetric === 'sleep' ? value.toFixed(1) : value.toLocaleString()} {currentMetric.unit}
                      </div>
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                          isMax ? 'bg-emerald-500' : currentMetric.color
                        } group-hover:opacity-80`}
                        style={{ 
                          height: isLoaded ? `${heightPercent}%` : '0%',
                          minHeight: '4px',
                          transitionDelay: `${i * 50}ms`
                        }}
                      ></div>
                    </div>
                    <span className="tech-label !text-[8px]">{data.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-10 border border-slate-100 rounded-[3rem] bg-white">
            <h3 className="tech-label !text-[10px] text-slate-900 mb-8">Weekly Summary</h3>
            <div className="space-y-6">
              {metrics.map((metric) => {
                const avg = getAverage(metric.key);
                const max = getMaxValue(metric.key);
                const progress = (avg / max) * 100;
                return (
                  <div key={metric.key} className="flex items-center gap-4">
                    <span className={`material-symbols-outlined text-lg ${metric.color.replace('bg-', 'text-')}`}>
                      {metric.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900">{metric.label}</span>
                        <span className="tech-label !text-[8px]">
                          {metric.key === 'sleep' ? avg.toFixed(1) : avg.toLocaleString()} {metric.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-10 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="material-symbols-outlined text-8xl">insights</span>
            </div>
            <div className="relative z-10">
              <span className="tech-label text-emerald-500 mb-4 inline-block">AI Insight</span>
              <h3 className="text-xl font-bold tracking-tighter italic mb-4">Your Week in Review</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Your step count peaked on Saturday with {MOCK_TRENDS[5].steps.toLocaleString()} steps. 
                Sleep quality was best mid-week. Consider maintaining consistent hydration on high-activity days.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-white/5 rounded-2xl">
                  <span className="tech-label !text-[7px] text-slate-400">Best Day</span>
                  <p className="text-lg font-black italic text-emerald-500">Saturday</p>
                </div>
                <div className="flex-1 p-4 bg-white/5 rounded-2xl">
                  <span className="tech-label !text-[7px] text-slate-400">Consistency</span>
                  <p className="text-lg font-black italic text-white">78%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
