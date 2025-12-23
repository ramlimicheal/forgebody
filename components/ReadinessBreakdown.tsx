
import React, { useState, useEffect } from 'react';
import { MOCK_READINESS_CONTRIBUTORS, MOCK_STATS } from '../constants';

export const ReadinessBreakdown: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-amber-500';
      case 'low': return 'text-rose-500';
      default: return 'text-slate-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-emerald-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-amber-500';
      case 'low': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const overallScore = MOCK_STATS.readiness;
  const scoreStatus = overallScore >= 90 ? 'optimal' : overallScore >= 75 ? 'good' : overallScore >= 60 ? 'fair' : 'low';

  return (
    <div className="p-12 border border-slate-100 rounded-[3rem] bg-white hover:border-slate-200 transition-all">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="tech-label">Readiness Score</span>
          <p className="tech-label !text-[8px] mt-1 text-slate-400">Based on your smartwatch data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getStatusBg(scoreStatus)} animate-pulse`}></span>
          <span className={`tech-label !text-[8px] ${getStatusColor(scoreStatus)} uppercase`}>{scoreStatus}</span>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-12">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
            <circle 
              cx="18" cy="18" r="16" fill="none" 
              stroke="#10B981" strokeWidth="3" 
              strokeDasharray={`${overallScore}, 100`}
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{ strokeDasharray: isLoaded ? `${overallScore}, 100` : '0, 100' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-black italic tracking-tighter text-slate-900">{overallScore}</span>
            <span className="tech-label !text-[8px]">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 tracking-tighter italic uppercase mb-2">
            {scoreStatus === 'optimal' ? 'Peak Performance' : 
             scoreStatus === 'good' ? 'Ready to Train' : 
             scoreStatus === 'fair' ? 'Light Activity' : 'Recovery Day'}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {scoreStatus === 'optimal' ? 'Your body is fully recovered. Push for maximum intensity today.' : 
             scoreStatus === 'good' ? 'Good recovery detected. Moderate to high intensity recommended.' : 
             scoreStatus === 'fair' ? 'Some fatigue detected. Consider lighter workouts.' : 
             'Your body needs rest. Focus on recovery activities.'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="tech-label !text-[9px] text-slate-900">Contributors</span>
          <div className="h-[0.5px] flex-1 bg-slate-100"></div>
        </div>

        {MOCK_READINESS_CONTRIBUTORS.map((contributor, idx) => (
          <div key={contributor.label} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-lg ${getStatusColor(contributor.status)}`}>
                  {contributor.icon}
                </span>
                <span className="text-sm font-semibold text-slate-900">{contributor.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`tech-label !text-[8px] ${getStatusColor(contributor.status)} uppercase`}>
                  {contributor.status}
                </span>
                <span className="text-sm font-black italic text-slate-900">{contributor.value}%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStatusBg(contributor.status)} rounded-full transition-all duration-700 ease-out`}
                style={{ 
                  width: isLoaded ? `${contributor.value}%` : '0%',
                  transitionDelay: `${idx * 100}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">info</span>
            <span className="tech-label !text-[8px] text-slate-400">
              Data synced from your connected smartwatch
            </span>
          </div>
          <button className="tech-label !text-[8px] text-emerald-500 hover:text-emerald-600 flex items-center gap-1">
            View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
