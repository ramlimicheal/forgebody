
import React from 'react';
import { Reflection } from '../types';

interface SidebarProps {
  reflections: Reflection[];
  selectedId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ reflections, selectedId, onSelect, onNew }) => {
  return (
    <aside className="w-72 border-r border-slate-100 flex flex-col bg-white shrink-0 animate-fade-in">
      <div className="p-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="tech-label text-slate-950">Microcycle Logs</h2>
          <button onClick={onNew} className="text-slate-300 hover:text-slate-950 transition-all flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="tech-label !text-[7px]">Create</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-12 pr-4 custom-scrollbar">
          <div className="space-y-10">
            {reflections.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`group cursor-pointer transition-all relative ${
                  selectedId === item.id ? 'opacity-100' : 'opacity-30 hover:opacity-100'
                }`}
              >
                {selectedId === item.id && (
                  <div className="absolute -left-10 top-0.5 w-[3px] h-4 bg-slate-950 rounded-full"></div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <span className="tech-label !text-[8px] italic">{item.date}</span>
                  {item.tags.length > 0 && <span className="w-1 h-1 rounded-full bg-emerald-500"></span>}
                </div>
                <h4 className="text-sm font-bold text-slate-950 leading-tight mb-2 group-hover:translate-x-1 transition-transform italic uppercase tracking-tighter">
                  {item.title || 'Untracked Session'}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  <span className="tech-label !text-[7px]">
                    {item.emotionalTone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50">
          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-5 group cursor-help hover:border-slate-200 transition-all">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
               <span className="material-symbols-outlined text-xl text-slate-950 filled group-hover:scale-110 transition-transform">ecg_heart</span>
             </div>
             <div>
               <p className="tech-label text-slate-950 !text-[8px] mb-1">Cardiac Baseline</p>
               <p className="text-sm font-black text-emerald-500 italic uppercase tracking-tighter">42 BPM</p>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
