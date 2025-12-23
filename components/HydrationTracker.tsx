
import React, { useState } from 'react';
import { MOCK_HYDRATION } from '../constants';

export const HydrationTracker: React.FC = () => {
  const [hydration, setHydration] = useState(MOCK_HYDRATION);
  const percentage = Math.round((hydration.current / hydration.goal) * 100);

  const addWater = (amount: number) => {
    setHydration(prev => ({
      ...prev,
      current: Math.min(prev.current + amount, prev.goal + 500),
      lastIntake: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }));
  };

  return (
    <div className="p-10 border border-slate-100 rounded-[3rem] bg-white hover:border-slate-200 transition-all group">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="tech-label">Hydration Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="material-symbols-outlined text-blue-500">water_drop</span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Last: {hydration.lastIntake}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black italic tracking-tighter text-slate-900">{hydration.current}</span>
          <span className="tech-label ml-2">/ {hydration.goal} ml</span>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="tech-label !text-[8px]">0 ml</span>
          <span className={`tech-label !text-[8px] ${percentage >= 100 ? 'text-emerald-500' : ''}`}>
            {percentage}% Complete
          </span>
          <span className="tech-label !text-[8px]">{hydration.goal} ml</span>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {[150, 250, 500].map((amount) => (
          <button
            key={amount}
            onClick={() => addWater(amount)}
            className="flex-1 py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all group/btn"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-slate-400 group-hover/btn:text-blue-500 text-lg">add</span>
              <span className="tech-label !text-[8px] group-hover/btn:text-blue-600">{amount}ml</span>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-50">
        <span className="tech-label !text-[8px] mb-4 block">Weekly Intake</span>
        <div className="flex items-end gap-2 h-16">
          {hydration.history.map((value, i) => {
            const heightPercent = (value / hydration.goal) * 100;
            const isToday = i === hydration.history.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    isToday ? 'bg-blue-500' : heightPercent >= 100 ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                  style={{ height: `${Math.min(heightPercent, 100)}%` }}
                ></div>
                <span className="tech-label !text-[6px]">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {percentage >= 100 && (
        <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-500">check_circle</span>
          <span className="text-xs font-bold text-emerald-700">Daily hydration goal achieved!</span>
        </div>
      )}
    </div>
  );
};
