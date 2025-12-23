
import React, { useState, useEffect } from 'react';
import { MOCK_VITALS } from '../constants';

export const VitalsAnalysis: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    const pulseInterval = setInterval(() => setPulse(p => !p), 1200);
    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label bg-emerald-500 text-white px-2 py-0.5 rounded">Active Stream</span>
              <span className="tech-label">Sensor Node: L-09</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Live Vitals</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Physiological Status: <span className="text-emerald-500 font-black italic">HOMEOSTASIS</span> — Recovery window optimal.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="tech-label !text-[8px] mb-2">Sync Frequency</span>
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`w-1 h-4 rounded-full ${i < 8 ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1px bg-slate-50 border border-slate-50 rounded-[3rem] overflow-hidden">
          {/* Main Telemetry Box */}
          <div className="bg-white p-12 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
               <span className="tech-label">Resting HR</span>
               <span className={`material-symbols-outlined text-rose-500 text-sm transition-all duration-300 ${pulse ? 'scale-125 opacity-100' : 'scale-100 opacity-40'}`}>favorite</span>
            </div>
            <div className="my-10">
              <span className="text-8xl font-black italic tracking-tighter text-slate-900 leading-none">{MOCK_VITALS.rhr}</span>
              <span className="tech-label ml-4">BPM</span>
            </div>
            <div className="h-12 flex items-end gap-1">
               {MOCK_VITALS.telemetryHistory.map((v, i) => (
                 <div key={i} className="flex-1 bg-slate-100 hover:bg-slate-900 transition-all rounded-t-[1px]" style={{ height: `${v}%` }}></div>
               ))}
            </div>
          </div>

          <div className="bg-white p-12 flex flex-col justify-between group border-l border-slate-50">
            <span className="tech-label">Sleep Score</span>
            <div className="my-10 relative inline-flex items-center justify-center">
              <span className="text-8xl font-black italic tracking-tighter text-slate-900 leading-none">{MOCK_VITALS.sleepScore}</span>
              <div className="absolute -right-12 top-0">
                <span className="text-emerald-500 font-black italic text-xl">+4.2%</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between tech-label !text-[8px]">
                <span>Consistency Index</span>
                <span className="text-slate-900">92/100</span>
              </div>
              <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                 <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: isLoaded ? '92%' : '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 flex flex-col justify-between border-l border-slate-50">
            <span className="tech-label">Neural Tone (HRV)</span>
            <div className="my-10">
              <span className="text-8xl font-black italic tracking-tighter text-slate-900 leading-none">{MOCK_VITALS.hrv}</span>
              <span className="tech-label ml-4">MS</span>
            </div>
            <p className="tech-label !text-[8px] leading-relaxed">
              Parasympathetic dominance is high. System capacity is available for maximum intensity effort.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="p-12 border border-slate-100 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             <h3 className="tech-label text-emerald-500 mb-10 relative z-10">Sleep Architecture Analysis</h3>
             
             <div className="flex items-end h-64 gap-6 relative z-10">
                {MOCK_VITALS.sleepArchitecture.map((arch, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-6">
                    <div 
                      className="w-full rounded-t-xl transition-all duration-1000 ease-out flex flex-col items-center justify-center"
                      style={{ height: isLoaded ? `${arch.value * 2}%` : '0%', backgroundColor: arch.color }}
                    >
                      <span className="text-xs font-black italic text-white/40">{arch.value}%</span>
                    </div>
                    <span className="tech-label !text-[8px] text-slate-400">{arch.label}</span>
                  </div>
                ))}
             </div>
             
             <div className="mt-12 pt-12 border-t border-white/10 flex justify-between items-center relative z-10">
                <div>
                  <p className="text-2xl font-black italic tracking-tighter">07H 42M</p>
                  <p className="tech-label text-slate-500">Total Duration</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black italic tracking-tighter text-emerald-500">OPTIMAL</p>
                  <p className="tech-label text-slate-500">System Grade</p>
                </div>
             </div>
          </div>

          <div className="space-y-10">
             <div className="p-10 border border-slate-100 rounded-[3rem] bg-white group hover:border-slate-300 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="tech-label">Respiratory Rate</span>
                  <span className="material-symbols-outlined text-slate-300">air</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black italic tracking-tighter">{MOCK_VITALS.respiratoryRate}</span>
                  <span className="tech-label">Br/Min</span>
                </div>
                <div className="mt-6 flex gap-1">
                   {[...Array(20)].map((_, i) => (
                     <div key={i} className={`flex-1 h-1 rounded-full ${i < 14 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                   ))}
                </div>
             </div>

             <div className="p-10 border border-slate-100 rounded-[3rem] bg-white group hover:border-slate-300 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="tech-label">Oxygen Saturation</span>
                  <span className="material-symbols-outlined text-slate-300">bloodtype</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black italic tracking-tighter">99</span>
                  <span className="tech-label">SPO2 / %</span>
                </div>
                <p className="tech-label !text-[8px] mt-6 text-emerald-500 italic">No signs of arterial desaturation detected.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
