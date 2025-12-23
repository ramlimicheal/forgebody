
import React, { useState, useEffect } from 'react';
import { MOCK_TASKS, MOCK_VITALS, MOCK_STATS } from '../constants';
import { Task } from '../types';
import { generateTrainingProtocol } from '../services/gemini';

export const Scheduling: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [isCalculating, setIsCalculating] = useState(false);
  const [committedTasks, setCommittedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRecalculate = async () => {
    setIsCalculating(true);
    const newProtocol = await generateTrainingProtocol(MOCK_VITALS, MOCK_STATS);
    if (newProtocol) {
      setTasks(newProtocol);
      setCommittedTasks(new Set());
    }
    setIsCalculating(false);
  };

  const toggleCommit = (id: string) => {
    setCommittedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const complianceRate = tasks.length > 0 ? Math.round((committedTasks.size / tasks.length) * 100) : 0;

  return (
    <div className="flex h-full w-full bg-white animate-fade-in overflow-hidden relative">
      {/* AI Loading State */}
      {isCalculating && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 border-t-2 border-slate-900 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-900 animate-pulse">psychology</span>
            </div>
          </div>
          <p className="tech-label mt-8 tracking-[0.3em] animate-pulse">Running Neural Optimization Simulations...</p>
        </div>
      )}

      {/* Main Protocol Column */}
      <div className="flex-1 h-full min-w-0 overflow-y-auto custom-scrollbar p-12 lg:p-16">
        <div className="max-w-5xl mx-auto pb-32">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-slate-50 pb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="tech-label bg-emerald-500 text-white px-2 py-0.5 rounded italic">Status: Compliant</span>
                <span className="tech-label">Session Node: T-104</span>
              </div>
              <h1 className="text-7xl sport-italic text-slate-900 mb-2 leading-none">Schedule</h1>
              <p className="text-slate-400 text-xs font-semibold tracking-tight uppercase">
                Phase: <span className="text-slate-900 font-black italic">INTENSIFICATION II</span> — Volume Delta: +4.2% Prev Cycle.
              </p>
            </div>
            
            <div className="mt-8 md:mt-0 flex flex-col items-end gap-6">
              <div className="flex gap-10">
                <div className="text-right">
                  <p className="tech-label !text-[8px]">Daily Load</p>
                  <p className="text-2xl font-black italic text-slate-900">8.4<span className="text-slate-300 text-sm ml-1">AU</span></p>
                </div>
                <div className="w-[1px] h-10 bg-slate-100"></div>
                <div className="text-right relative">
                  <p className="tech-label !text-[8px]">Protocol Integrity</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black italic text-emerald-500">{complianceRate}%</p>
                    {complianceRate === 100 && <span className="material-symbols-outlined text-emerald-500 text-sm">verified</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Microcycle Load Graph */}
          <div className="mb-24">
             <div className="flex items-center justify-between mb-8">
               <h2 className="tech-label italic text-slate-900">Weekly Intensity Variance</h2>
               <div className="flex gap-4">
                 <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span><span className="tech-label !text-[7px]">Current</span></span>
                 <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-100"></span><span className="tech-label !text-[7px]">Projected</span></span>
               </div>
             </div>
             <div className="h-32 flex items-end gap-2.5 px-2 group">
                {[80, 95, 40, 85, 90, 100, 20].map((load, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 cursor-help group/bar">
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-1000 ease-out relative ${
                        load > 90 ? 'bg-rose-500' : 
                        load < 50 ? 'bg-emerald-400' : 'bg-slate-200 group-hover:bg-slate-900'
                      }`}
                      style={{ height: isLoaded ? `${load}%` : '0%', transitionDelay: `${i * 40}ms` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 tech-label !text-[6px] opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">{load}% LOAD</div>
                    </div>
                    <span className="tech-label !text-[7px]">Day {i+1}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Timeline Protocol */}
          <div className="space-y-16">
            <div className="flex items-center gap-6">
              <h2 className="tech-label !text-[10px] text-slate-900 italic">Structural Blocks</h2>
              <div className="h-[0.5px] flex-1 bg-slate-100"></div>
            </div>

            <div className="space-y-10">
              {tasks.map((task, idx) => {
                const isCommitted = committedTasks.has(task.id);
                return (
                  <div key={task.id} className="group flex gap-16 relative">
                    {/* Time Indicator */}
                    <div className="w-24 pt-4 shrink-0">
                      <span className={`text-base font-black uppercase tracking-tighter italic ${isCommitted ? 'text-slate-200' : 'text-slate-950'}`}>{task.time}</span>
                      <p className="tech-label !text-[7px] mt-1.5 opacity-40">UTC-8.00</p>
                    </div>
                    
                    <div className="flex-1 relative pb-16">
                      {/* Vertical Spine */}
                      <div className="absolute left-[-4.125rem] top-6 bottom-0 w-[1px] bg-slate-50 group-last:bg-transparent"></div>
                      
                      {/* Checkbox Interactive Circle */}
                      <button 
                        onClick={() => toggleCommit(task.id)}
                        className={`absolute left-[-4.65rem] top-5 w-4.5 h-4.5 rounded-full border-[3px] border-white shadow-lg z-10 transition-all transform active:scale-90 ${
                          isCommitted ? 'bg-emerald-500' : 'bg-slate-100 hover:bg-slate-950'
                        }`}
                      >
                        {isCommitted && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
                      </button>

                      {/* Task Content Card */}
                      <div className={`p-10 border rounded-[3rem] transition-all duration-700 relative overflow-hidden ${
                        isCommitted 
                        ? 'bg-slate-50 border-slate-50 opacity-40 scale-[0.98]' 
                        : 'bg-white border-slate-100 group-hover:border-slate-900 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]'
                      }`}>
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-5">
                              <span className={`tech-label !text-[8px] italic px-2 py-0.5 rounded border ${
                                task.type === 'Strength' ? 'border-rose-100 text-rose-600' : 
                                task.type === 'Conditioning' ? 'border-amber-100 text-amber-600' : 
                                'border-emerald-100 text-emerald-600'
                              }`}>
                                {task.type}
                              </span>
                              {!isCommitted && <span className="tech-label !text-[7px] opacity-30">Block ID: 0{idx+1}</span>}
                            </div>
                            <h3 className={`text-4xl font-bold tracking-tighter italic uppercase leading-none ${isCommitted ? 'line-through text-slate-400' : 'text-slate-950'}`}>
                              {task.title}
                            </h3>
                            
                            {/* Performance Metadata Gap Fix */}
                            {!isCommitted && (
                              <div className="mt-6 flex gap-8 items-center border-t border-slate-50 pt-6">
                                <div>
                                  <p className="tech-label !text-[7px] mb-1">Target RPE</p>
                                  <p className="text-sm font-black italic text-slate-900">8.5 / 10</p>
                                </div>
                                <div>
                                  <p className="tech-label !text-[7px] mb-1">Tempo Pattern</p>
                                  <p className="text-sm font-black italic text-slate-400">3 - 1 - X - 1</p>
                                </div>
                                <div>
                                  <p className="tech-label !text-[7px] mb-1">Equipment</p>
                                  <p className="text-sm font-black italic text-slate-400 uppercase">Barbell</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <p className="tech-label !text-[8px] mb-1">Load Coefficient</p>
                            <span className={`text-2xl font-black uppercase italic ${
                              isCommitted ? 'text-slate-300' : 
                              task.metabolicLoad === 'High' ? 'text-rose-500' : 
                              task.metabolicLoad === 'Medium' ? 'text-amber-500' : 
                              'text-emerald-500'
                            }`}>
                              {task.metabolicLoad}
                            </span>
                          </div>
                        </div>
                        
                        {task.prepContext && (
                          <div className={`mt-10 p-8 rounded-[2.5rem] flex items-start gap-6 relative overflow-hidden transition-all ${
                            isCommitted ? 'bg-slate-200' : 'bg-slate-950 shadow-2xl shadow-slate-200'
                          }`}>
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
                            <span className={`material-symbols-outlined text-2xl relative z-10 ${isCommitted ? 'text-slate-400' : 'text-emerald-400'}`}>psychology_alt</span>
                            <div className="relative z-10">
                              <span className={`tech-label mb-2 inline-block ${isCommitted ? 'text-slate-400' : 'text-emerald-400'}`}>Coach's Constraint</span>
                              <p className={`text-[13px] leading-relaxed font-semibold italic ${isCommitted ? 'text-slate-500' : 'text-slate-400'}`}>
                                "{task.prepContext}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar - Fueling Hub */}
      <aside className="w-[420px] h-full border-l border-slate-50 bg-white flex flex-col shrink-0 animate-fade-in">
        <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-16">
          <div className="flex items-center justify-between mb-16 shrink-0">
            <h3 className="tech-label italic text-slate-950 font-black">Support Telemetry</h3>
            <span className="material-symbols-outlined text-slate-200 animate-pulse">sensors</span>
          </div>

          <div className="space-y-16 flex-1">
            {/* Glycogen Simulation */}
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 relative overflow-hidden group">
              <div className="scanner-line !opacity-[0.04]"></div>
              <h4 className="tech-label !text-[8px] text-center mb-10 text-slate-900">Metabolic Reserve Architecture</h4>
              <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" 
                    stroke="#0F172A" strokeWidth="4" 
                    strokeDasharray="75, 100" 
                    strokeLinecap="round" 
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-6xl font-black italic tracking-tighter text-slate-950">75</span>
                  <span className="tech-label !text-[10px] mt-1 text-slate-400">GLY %</span>
                </div>
              </div>
              <div className="mt-12 pt-10 border-t border-white text-center">
                 <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                  Recommendation: <span className="text-slate-950 font-black">+25g CHO</span> at T-15m
                 </p>
              </div>
            </div>

            {/* Micro-Nutrient Status */}
            <div className="space-y-8">
              <h4 className="tech-label !text-[9px] text-slate-950 border-b border-slate-50 pb-4">Cellular Integrity</h4>
              {[
                { label: 'Electrolytes', value: 'High', status: 'Optimal', color: 'bg-emerald-500' },
                { label: 'Amino Pool', value: '92%', status: 'Stable', color: 'bg-emerald-500' },
                { label: 'Neural Buffer', value: 'Active', status: 'Engaged', color: 'bg-amber-400' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-xs font-black text-slate-950 italic uppercase tracking-tighter">{item.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="tech-label !text-[8px] text-slate-400">{item.value}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-lg shadow-emerald-200 animate-pulse`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Protocol Sync Logic */}
            <div className="mt-12 space-y-4 shrink-0">
              <button 
                onClick={handleRecalculate}
                disabled={isCalculating}
                className="w-full py-5 bg-slate-950 text-white rounded-full tech-label hover:bg-slate-800 transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">settings_input_antenna</span>
                {isCalculating ? 'Neural Computing...' : 'Optimize Protocol'}
              </button>
              <p className="tech-label !text-[7px] text-center text-slate-400 uppercase tracking-[0.2em]">Last Sync: 09:42:01 AM</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
