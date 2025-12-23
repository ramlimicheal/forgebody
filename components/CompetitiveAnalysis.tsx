
import React, { useState, useEffect } from 'react';
import { Benchmark } from '../types';

export const CompetitiveAnalysis: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const benchmarks: Benchmark[] = [
    { label: 'Strength/Weight Ratio', userValue: 2.8, eliteValue: 3.2, unit: 'xBW' },
    { label: 'Neural Resilience', userValue: 88, eliteValue: 95, unit: '%' },
    { label: 'Metabolic Efficiency', userValue: 74, eliteValue: 82, unit: 'pts' },
    { label: 'Peak Power Output', userValue: 1240, eliteValue: 1450, unit: 'W' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label bg-slate-900 text-white px-2 py-0.5 rounded">Module 04</span>
              <span className="tech-label">Arena Benchmark v2.1</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Arena Analysis</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Current Rank: <span className="text-emerald-500 font-black italic">APEX ELITE</span> — Tier 1 Cohort Performance.
            </p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100">
               <button className="px-6 py-1.5 bg-white shadow-sm rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900">Global Pro</button>
               <button className="px-6 py-1.5 text-slate-400 hover:text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest transition-all">Collegiate</button>
               <button className="px-6 py-1.5 text-slate-400 hover:text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest transition-all">Baseline</button>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="tech-label !text-[8px]">Delta v. Elite</span>
                <span className="text-xl font-bold italic text-rose-500">-4.2%</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-100"></div>
              <div className="flex flex-col items-end">
                <span className="tech-label !text-[8px]">Rank Progression</span>
                <span className="text-xl font-bold italic text-emerald-500">+1.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Radar Distribution Simulation */}
          <div className="lg:col-span-5">
            <div className="p-12 border border-slate-100 rounded-[3rem] bg-white aspect-square flex flex-col justify-center items-center relative overflow-hidden group shadow-xl shadow-slate-100/50">
               {/* Aesthetic Scan Lines overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
               <div className="scanner-line"></div>
               
               <span className="tech-label absolute top-10">Physiological Signature</span>
               
               <svg viewBox="0 0 100 100" className="w-full h-full p-6 drop-shadow-2xl">
                  {/* Grid Lines */}
                  {[20, 40, 60, 80, 100].map(r => (
                    <circle key={r} cx="50" cy="50" r={r/2} fill="none" stroke="#F1F5F9" strokeWidth="0.5" />
                  ))}
                  
                  {/* Performance Polygon */}
                  <polygon 
                    points="50,15 85,35 75,85 25,85 15,35" 
                    fill="#10B981" 
                    fillOpacity="0.05" 
                    stroke="#10B981" 
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  {/* Data Vertices */}
                  <circle cx="50" cy="15" r="1.5" fill="#10B981" className="animate-pulse" />
                  <circle cx="85" cy="35" r="1.5" fill="#10B981" />
                  <circle cx="75" cy="85" r="1.5" fill="#10B981" />
                  <circle cx="25" cy="85" r="1.5" fill="#10B981" />
                  <circle cx="15" cy="35" r="1.5" fill="#10B981" />
                  
                  {/* Labels positioned precisely */}
                  <text x="50" y="8" textAnchor="middle" className="text-[3.5px] font-black uppercase tracking-[0.2em] italic" fill="#0F172A">Power</text>
                  <text x="94" y="36" textAnchor="start" className="text-[3.5px] font-black uppercase tracking-[0.2em] italic" fill="#0F172A">Velocity</text>
                  <text x="80" y="92" textAnchor="middle" className="text-[3.5px] font-black uppercase tracking-[0.2em] italic" fill="#0F172A">Endurance</text>
                  <text x="20" y="92" textAnchor="middle" className="text-[3.5px] font-black uppercase tracking-[0.2em] italic" fill="#0F172A">Resilience</text>
                  <text x="6" y="36" textAnchor="end" className="text-[3.5px] font-black uppercase tracking-[0.2em] italic" fill="#0F172A">Precision</text>
               </svg>

               <div className="absolute bottom-12 flex gap-12">
                 <div className="text-center">
                    <p className="text-xs font-black text-slate-900 uppercase italic mb-1 tracking-tight">98.24</p>
                    <p className="tech-label !text-[7px]">Efficiency Index</p>
                 </div>
                 <div className="w-[1px] h-6 bg-slate-100 self-center"></div>
                 <div className="text-center">
                    <p className="text-xs font-black text-emerald-500 uppercase italic mb-1 tracking-tight">S-Grade</p>
                    <p className="tech-label !text-[7px]">Bio-Integrity</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Detailed Benchmarks */}
          <div className="lg:col-span-7 space-y-16">
             <div className="flex items-center justify-between">
                <h2 className="tech-label">Elite Gap Matrix</h2>
                <div className="h-[0.5px] flex-1 bg-slate-50 mx-8"></div>
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span className="tech-label !text-[8px]">You</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-200"></span>
                    <span className="tech-label !text-[8px]">Pro Mean</span>
                  </span>
                </div>
             </div>

             <div className="space-y-12">
                {benchmarks.map((bench, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-end mb-4">
                       <div>
                         <h4 className="text-lg font-bold text-slate-900 tracking-tighter italic uppercase">{bench.label}</h4>
                         <div className="flex items-center gap-2 mt-1">
                           <span className="tech-label !text-[8px]">Elite target: {bench.eliteValue}</span>
                           <span className="text-[8px] font-black text-rose-400 italic">(-{((1 - bench.userValue/bench.eliteValue) * 100).toFixed(1)}%)</span>
                         </div>
                       </div>
                       <div className="text-right">
                         <span className="text-4xl font-extrabold text-slate-900 italic tracking-tighter">{bench.userValue}</span>
                         <span className="tech-label !text-[10px] ml-2">{bench.unit}</span>
                       </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-50 rounded-full relative overflow-hidden shadow-inner">
                       {/* Pro Mean Indicator */}
                       <div 
                        className="absolute top-0 bottom-0 w-[3px] bg-slate-300 z-10 opacity-40" 
                        style={{ left: `${(bench.eliteValue / (bench.eliteValue * 1.1)) * 95}%` }}
                       ></div>
                       {/* User Progress Bar */}
                       <div 
                        className="absolute top-0 left-0 h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-500 shadow-lg"
                        style={{ 
                          width: isLoaded ? `${(bench.userValue / (bench.eliteValue * 1.1)) * 100}%` : '0%',
                          transitionDelay: `${idx * 100}ms`
                        }}
                       ></div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-16 p-12 bg-slate-950 rounded-[3rem] text-white flex items-center gap-12 relative overflow-hidden shadow-2xl shadow-slate-200">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-9xl">military_tech</span>
                </div>
                <div className="w-24 h-24 rounded-full border-[1px] border-emerald-500/30 flex items-center justify-center shrink-0 relative">
                   <div className="absolute inset-2 rounded-full border-[1px] border-emerald-500/50 animate-ping opacity-20"></div>
                   <span className="text-4xl font-black italic text-emerald-500">S</span>
                </div>
                <div>
                  <span className="tech-label text-emerald-500 mb-2 inline-block">Tactical Advantage Active</span>
                  <h3 className="text-2xl font-bold tracking-tighter italic mb-3 leading-tight">Neural Resilience exceeds 92.4% of Cohort.</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-lg">
                    Current data points confirm elite-level parasympathetic recovery. Protocol recommendation: <span className="text-white">Increase high-velocity stimulus</span> by 15% in next microcycle.
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* Global Distribution Map Mockup */}
        <div className="mt-32 border-t border-slate-100 pt-20">
           <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-2xl font-bold italic tracking-tighter text-slate-900 uppercase">Cohort Distribution</h2>
                <p className="tech-label mt-1">N=124,802 Verified Pro-Am Athletes</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg">
                  <span className="tech-label !text-[10px]">Your Percentile</span>
                  <span className="text-xl font-bold italic">96th</span>
                </div>
              </div>
           </div>
           <div className="h-48 flex items-end gap-1 px-4 relative">
              {[...Array(60)].map((_, i) => {
                const height = Math.abs(Math.sin(i * 0.1)) * 100;
                const isUser = i === 48;
                return (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm transition-all duration-1000 group cursor-help relative ${isUser ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-100 hover:bg-slate-200'}`}
                    style={{ 
                      height: isLoaded ? `${height}%` : '0%',
                      transitionDelay: `${i * 10}ms`
                    }}
                  >
                    {isUser && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest relative">
                          You
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
                        </div>
                      </div>
                    )}
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      Tier {i}: {height.toFixed(1)}% density
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};
