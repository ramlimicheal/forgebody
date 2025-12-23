import React, { useState } from 'react';

interface Goal {
  id: string;
  label: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const INITIAL_GOALS: Goal[] = [
  { id: 'steps', label: 'Daily Steps', icon: 'footprint', current: 8420, target: 10000, unit: 'steps', color: 'emerald' },
  { id: 'sleep', label: 'Sleep Duration', icon: 'bedtime', current: 7.2, target: 8, unit: 'hrs', color: 'indigo' },
  { id: 'hydration', label: 'Hydration', icon: 'water_drop', current: 1800, target: 2500, unit: 'ml', color: 'blue' },
  { id: 'active', label: 'Active Minutes', icon: 'directions_run', current: 45, target: 60, unit: 'min', color: 'orange' },
];

export const GoalSetting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEditStart = (goal: Goal) => {
    setEditingId(goal.id);
    setEditValue(goal.target.toString());
  };

  const handleEditSave = (goalId: string) => {
    const newTarget = parseFloat(editValue);
    if (!isNaN(newTarget) && newTarget > 0) {
      setGoals(goals.map(g => g.id === goalId ? { ...g, target: newTarget } : g));
    }
    setEditingId(null);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; ring: string }> = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', ring: 'ring-emerald-500' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', ring: 'ring-indigo-500' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', ring: 'ring-blue-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', ring: 'ring-orange-500' },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Personal Targets</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full tech-label !text-[8px]">Customizable</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Goals</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">Set your daily targets and track your progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {goals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const colorClasses = getColorClasses(goal.color);
            const isComplete = goal.current >= goal.target;

            return (
              <div 
                key={goal.id} 
                className={`p-8 border rounded-[2rem] transition-all hover:shadow-lg ${
                  isComplete ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${colorClasses.bg} bg-opacity-10 flex items-center justify-center`}>
                      <span className={`material-symbols-outlined ${colorClasses.text}`}>{goal.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{goal.label}</h3>
                      <p className="tech-label !text-[8px] mt-1">
                        {isComplete ? 'Goal Achieved!' : `${Math.round(progress)}% Complete`}
                      </p>
                    </div>
                  </div>
                  {isComplete && (
                    <span className="material-symbols-outlined text-emerald-500 filled">check_circle</span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black italic text-slate-900">{goal.current.toLocaleString()}</span>
                  <span className="text-slate-400 font-semibold">/ {goal.target.toLocaleString()} {goal.unit}</span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full ${colorClasses.bg} rounded-full transition-all duration-700`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="tech-label !text-[8px]">Target:</span>
                    {editingId === goal.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20 px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          autoFocus
                        />
                        <button 
                          onClick={() => handleEditSave(goal.id)}
                          className="p-1 text-emerald-500 hover:bg-emerald-50 rounded"
                        >
                          <span className="material-symbols-outlined text-sm">check</span>
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-1 text-slate-400 hover:bg-slate-50 rounded"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditStart(goal)}
                        className="flex items-center gap-1 text-slate-600 hover:text-emerald-500 transition-colors"
                      >
                        <span className="font-semibold">{goal.target.toLocaleString()} {goal.unit}</span>
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full tech-label !text-[8px] ${
                    isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isComplete ? 'Complete' : 'In Progress'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 bg-slate-950 rounded-[2rem] text-white">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-emerald-400">tips_and_updates</span>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-2 italic uppercase">Pro Tip</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Start with achievable goals and gradually increase them as you build consistency. 
                Research shows that hitting your targets 80% of the time leads to better long-term adherence 
                than setting aggressive goals you rarely achieve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
