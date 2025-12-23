
import React, { useState, useEffect } from 'react';
import { Reflection } from '../types';
import { generateReflectionQuestion } from '../services/gemini';

interface JournalEditorProps {
  reflection: Reflection;
  onUpdate: (updated: Reflection) => void;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ reflection, onUpdate }) => {
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuestion = async () => {
    setIsGenerating(true);
    const question = await generateReflectionQuestion(reflection.content);
    setAiQuestion(question);
    setIsGenerating(false);
  };

  useEffect(() => {
    setAiQuestion('');
  }, [reflection.id]);

  return (
    <section className="flex-1 flex flex-col bg-white animate-fade-in">
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <input
              className="text-4xl font-extrabold text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-full tracking-tighter placeholder:text-slate-100"
              value={reflection.title}
              placeholder="Session Intent..."
              onChange={(e) => onUpdate({ ...reflection, title: e.target.value })}
            />
            <div className="flex items-center gap-4 mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              <span>{reflection.createdAt}</span>
              <span className="h-3 w-[1px] bg-slate-100"></span>
              <span className="text-slate-900">{reflection.emotionalTone}</span>
              <span className="h-3 w-[1px] bg-slate-100"></span>
              <span className="text-emerald-500">Recovery Active</span>
            </div>
          </div>

          <div className="prose prose-slate prose-sm max-w-none">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-slate-600 leading-[2] min-h-[400px] resize-none text-lg p-0 placeholder:text-slate-100"
              value={reflection.content}
              onChange={(e) => onUpdate({ ...reflection, content: e.target.value })}
              placeholder="Log bio-feedback: RPE, bar speed, joint integrity, and CNS state..."
            />
          </div>

          {aiQuestion && (
            <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white animate-in fade-in slide-in-from-bottom-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <span className="material-symbols-outlined text-8xl">bolt</span>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6 inline-block">Physiological Probe Generated</span>
               <h3 className="text-2xl font-bold tracking-tight mb-10 leading-snug">"{aiQuestion}"</h3>
               <div className="flex gap-4">
                 <button className="px-8 py-2.5 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all">
                   Commit to Training Logic
                 </button>
                 <button onClick={() => setAiQuestion('')} className="px-8 py-2.5 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
                   Ignore
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Insight Bar */}
      <div className="h-20 border-t border-slate-50 flex items-center justify-between px-12 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
           <button className="text-slate-300 hover:text-slate-900 transition-all flex items-center gap-2">
             <span className="material-symbols-outlined">analytics</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Metrics</span>
           </button>
           <button className="text-slate-300 hover:text-slate-900 transition-all flex items-center gap-2">
             <span className="material-symbols-outlined">attachment</span>
             <span className="text-[9px] font-black uppercase tracking-widest">Media</span>
           </button>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
            {reflection.content.length > 0 ? `${reflection.content.split(/\s+/).filter(Boolean).length} Data Points Captured` : 'Ready for Input'}
          </span>
          <button 
            onClick={handleGenerateQuestion}
            disabled={isGenerating}
            className={`px-10 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 flex items-center gap-3 ${isGenerating ? 'opacity-50' : ''}`}
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            {isGenerating ? 'Analyzing Biometrics...' : 'Deep Physio Probe'}
          </button>
        </div>
      </div>
    </section>
  );
};
