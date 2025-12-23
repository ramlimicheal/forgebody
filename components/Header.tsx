
import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems: { label: ViewMode; icon: string }[] = [
    { label: 'Dashboard', icon: 'monitoring' },
    { label: 'Schedule', icon: 'event_repeat' },
    { label: 'Logs', icon: 'fitness_center' },
    { label: 'Competitive', icon: 'leaderboard' },
    { label: 'Vitals', icon: 'ecg_heart' },
  ];

  return (
    <header className="h-14 border-b border-slate-100 flex items-center justify-between px-8 bg-white z-50 shrink-0">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter uppercase">
          <div className="w-6 h-6 bg-slate-900 text-white rounded flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>
          </div>
          <span className="text-slate-900 tracking-[0.1em]">ForgeBody</span>
        </div>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.label)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${
                currentView === item.label
                  ? 'text-slate-900 bg-slate-50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${currentView === item.label ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Live</span>
        </div>
        <div className="h-4 w-[1px] bg-slate-100 mx-2"></div>
        <button className="p-1.5 text-slate-400 hover:text-slate-900">
          <span className="material-symbols-outlined text-lg">settings</span>
        </button>
        <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center ml-1">
          <span className="text-[10px] font-bold text-white">AH</span>
        </div>
      </div>
    </header>
  );
};
