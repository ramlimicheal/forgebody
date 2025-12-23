
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { JournalEditor } from './components/JournalEditor';
import { Dashboard } from './components/Dashboard';
import { Scheduling } from './components/Scheduling';
import { CompetitiveAnalysis } from './components/CompetitiveAnalysis';
import { VitalsAnalysis } from './components/VitalsAnalysis';
import { DeviceManager } from './components/DeviceManager';
import { TrendsView } from './components/TrendsView';
import { Reflection, ViewMode } from './types';
import { INITIAL_REFLECTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('Dashboard');
  const [reflections, setReflections] = useState<Reflection[]>(INITIAL_REFLECTIONS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_REFLECTIONS[0].id);

  const activeReflection = useMemo(() => {
    return reflections.find(r => r.id === selectedId) || reflections[0];
  }, [reflections, selectedId]);

  const handleUpdateReflection = (updated: Reflection) => {
    setReflections(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleNewReflection = () => {
    const now = new Date();
    const newRef: Reflection = {
      id: Date.now().toString(),
      title: 'Untracked Session',
      date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      createdAt: now.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }),
      emotionalTone: 'Neutral / RPE Log',
      tags: [],
      content: ''
    };
    setReflections([newRef, ...reflections]);
    setSelectedId(newRef.id);
    setView('Logs');
  };

  const renderContent = () => {
    switch (view) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Trends':
        return <TrendsView />;
      case 'Schedule':
        return <Scheduling />;
      case 'Competitive':
        return <CompetitiveAnalysis />;
      case 'Vitals':
        return <VitalsAnalysis />;
      case 'Devices':
        return <DeviceManager />;
      case 'Logs':
        return (
          <div className="flex flex-1 h-full overflow-hidden">
            <Sidebar 
              reflections={reflections} 
              selectedId={selectedId} 
              onSelect={setSelectedId} 
              onNew={handleNewReflection}
            />
            <JournalEditor 
              reflection={activeReflection} 
              onUpdate={handleUpdateReflection}
            />
          </div>
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-white text-slate-400 font-medium">
            <div className="text-center animate-fade-in">
              <span className="material-symbols-outlined text-4xl mb-4 opacity-20">construction</span>
              <p className="text-sm tracking-tight uppercase font-black">Module under architecture.</p>
              <button 
                onClick={() => setView('Dashboard')} 
                className="mt-6 px-8 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                Return to Core
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <Header currentView={view} onViewChange={setView} />
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
