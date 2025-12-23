
import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  darkMode?: boolean;
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, darkMode = false, onSettingsClick }) => {
  const navItems: { label: ViewMode; icon: string }[] = [
    { label: 'Dashboard', icon: 'monitoring' },
    { label: 'Trends', icon: 'trending_up' },
    { label: 'Goals', icon: 'flag' },
    { label: 'Reports', icon: 'assessment' },
    { label: 'Logs', icon: 'fitness_center' },
    { label: 'Devices', icon: 'watch' },
  ];

  return (
    <header className={`h-14 border-b flex items-center justify-between px-8 z-50 shrink-0 transition-colors ${
      darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'
    }`}>
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter uppercase">
          <div className={`w-6 h-6 rounded flex items-center justify-center ${darkMode ? 'bg-white' : 'bg-slate-900'}`}>
            <span className={`material-symbols-outlined ${darkMode ? 'text-slate-900' : 'text-white'}`} style={{ fontSize: '14px' }}>bolt</span>
          </div>
          <span className={`tracking-[0.1em] ${darkMode ? 'text-white' : 'text-slate-900'}`}>ForgeBody</span>
        </div>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.label)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${
                currentView === item.label
                  ? darkMode ? 'text-white bg-slate-800' : 'text-slate-900 bg-slate-50'
                  : darkMode ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
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
          <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>System Live</span>
        </div>
        <div className={`h-4 w-[1px] mx-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
        <button 
          onClick={onSettingsClick}
          className={`p-1.5 transition-colors ${
            currentView === 'Settings' 
              ? 'text-emerald-500' 
              : darkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-lg">settings</span>
        </button>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ml-1 ${darkMode ? 'bg-white' : 'bg-slate-900'}`}>
          <span className={`text-[10px] font-bold ${darkMode ? 'text-slate-900' : 'text-white'}`}>AH</span>
        </div>
      </div>
    </header>
  );
};
