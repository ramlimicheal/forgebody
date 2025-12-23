
import React, { useState, useEffect } from 'react';
import { MOCK_STATS } from '../constants';
import { HydrationTracker } from './HydrationTracker';
import { ReadinessBreakdown } from './ReadinessBreakdown';

export const Dashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Live Telemetry</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Physio Briefing</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">Core Readiness: <span className="text-emerald-500 font-black italic">94.2%</span> — CNS Primed for Explosive Output.</p>
          </div>
          <div className="flex gap-4 mb-2">
            <button className="px-8 py-3 bg-slate-50 border border-slate-100 rounded-full tech-label text-slate-600 hover:bg-slate-100 transition-all">
              Re-Sync Biometrics
            </button>
            <button className="px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
              Engage Protocol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col">
            <span className="tech-label mb-5">Readiness (HRV)</span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-extrabold text-slate-900 tracking-tighter italic">{MOCK_STATS.readiness}</span>
              <span className="text-xs font-black text-emerald-500 uppercase italic">/ % Optimal</span>
            </div>
            <div className="mt-8 h-[2px] w-full bg-slate-50 relative overflow-hidden rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                style={{ width: isLoaded ? `${MOCK_STATS.readiness}%` : '0%' }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="tech-label mb-5">Power Index</span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-extrabold text-slate-900 tracking-tighter italic">{MOCK_STATS.strengthIndex}</span>
              <span className="tech-label ml-1">Pts Rel</span>
            </div>
            <p className="tech-label !text-[8px] mt-4">Relative Strength: S-Tier Profile</p>
          </div>

          <div className="flex flex-col">
            <span className="tech-label mb-5">Load History</span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-extrabold text-slate-900 tracking-tighter italic">{MOCK_STATS.recoveryStreak}</span>
              <span className="text-xs font-black text-orange-500 uppercase italic">/ Days Active</span>
            </div>
            <div className="flex gap-1.5 mt-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-2 w-full bg-slate-50 rounded-sm overflow-hidden">
                   <div 
                    className={`h-full ${i < 6 ? 'bg-orange-400' : 'bg-slate-100'} transition-all duration-700 ease-out`}
                    style={{ width: isLoaded ? '100%' : '0%', transitionDelay: `${i * 100}ms` }}
                   ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="tech-label mb-5">Metabolic Pulse</span>
            <div className="flex items-end gap-2 h-16 relative">
              {MOCK_STATS.metabolicFlow.map((v, i) => (
                <div key={i} className="flex-1 bg-slate-50 rounded-t-md relative group cursor-help h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white tech-label !text-[7px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    {v}%
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-slate-200 rounded-t-md group-hover:bg-slate-900 transition-all duration-1000 ease-out shadow-sm" 
                    style={{ 
                      height: isLoaded ? `${v}%` : '0%',
                      transitionDelay: `${i * 50}ms`
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <p className="tech-label mt-4">Status: Optimal Efficiency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <ReadinessBreakdown />
            <section>
              <div className="flex items-center justify-between mb-10">
                <h2 className="tech-label !text-[10px]">Neural-Physical Insights</h2>
                <div className="h-[0.5px] flex-1 bg-slate-100 mx-8"></div>
                <span className="material-symbols-outlined text-slate-300">precision_manufacturing</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-12 bg-slate-950 rounded-[3rem] text-white flex flex-col justify-between min-h-[300px] shadow-2xl shadow-slate-300/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-9xl">bolt</span>
                  </div>
                  <div className="space-y-6">
                    <span className="tech-label text-emerald-500">Adaptive Block Sync</span>
                    <h3 className="text-3xl font-bold tracking-tighter leading-tight italic uppercase">Structural Load Shift Detected</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">System suggests 12% reduction in axial loading for the next 48 hours to optimize neural recovery delta.</p>
                  </div>
                  <button className="tech-label !text-[10px] text-emerald-400 flex items-center gap-3 hover:gap-6 transition-all border-t border-white/10 pt-6 mt-6">
                    Apply Correction Protocol <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </button>
                </div>
                
                <div className="p-12 border border-slate-100 rounded-[3rem] bg-white hover:border-slate-300 transition-all flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-xl hover:shadow-slate-100">
                  <div className="space-y-6">
                    <span className="tech-label">Bio-Correlation</span>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tighter leading-tight italic uppercase">Glycogen Replenishment Delta</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Strength output increases by 8% when post-session architectural nutrition is met within 45 min.</p>
                  </div>
                  <div className="flex gap-4 pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="tech-label !text-[7px]">Current State</span>
                      <span className="text-emerald-500 font-bold italic">OPTIMIZED</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <HydrationTracker />
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="tech-label !text-[10px]">Load Schedule</h2>
              </div>
              <div className="space-y-10">
                {[
                  { time: '06:30', title: 'Power Phase: Concentric', type: '92% Neural Load' },
                  { time: '17:00', title: 'Structural Integration', type: 'Recovery Protocol' },
                  { time: '20:00', title: 'Deep Sleep Architecture', type: 'Restorative' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-10 group">
                    <span className="tech-label !text-[10px] mt-1 shrink-0 italic">{item.time}</span>
                    <div className="flex-1 pb-8 border-b border-slate-50">
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-500 transition-all italic tracking-tighter uppercase">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                        <span className="tech-label !text-[8px]">{item.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
