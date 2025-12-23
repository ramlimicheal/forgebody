
import React, { useState } from 'react';
import { Workout, Exercise } from '../types';
import { MOCK_WORKOUTS, EXERCISE_DATABASE } from '../constants';

export const WorkoutLogger: React.FC = () => {
  const [workouts] = useState<Workout[]>(MOCK_WORKOUTS);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'templates' | 'stats'>('history');

  const feelingColors = {
    great: 'bg-emerald-500',
    good: 'bg-emerald-400',
    okay: 'bg-yellow-500',
    tired: 'bg-orange-500',
    exhausted: 'bg-red-500'
  };

  const typeColors = {
    Strength: 'bg-slate-900',
    Cardio: 'bg-blue-500',
    HIIT: 'bg-orange-500',
    Yoga: 'bg-purple-500',
    Sports: 'bg-green-500',
    Custom: 'bg-slate-600'
  };

  const getTotalVolume = (workout: Workout) => {
    return workout.exercises.reduce((total, exercise) => {
      return total + exercise.sets.reduce((setTotal, set) => {
        return setTotal + (set.reps * set.weight);
      }, 0);
    }, 0);
  };

  const getTotalSets = (workout: Workout) => {
    return workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
  };

  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Training Log</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Workout Logger</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Track every rep, set, and PR. <span className="text-emerald-500 font-black italic">Build your legacy.</span>
            </p>
          </div>
          <button 
            onClick={() => setShowNewWorkout(true)}
            className="px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Log Workout
          </button>
        </div>

        <div className="flex gap-2 mb-12">
          {(['history', 'templates', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full tech-label transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'history' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  onClick={() => setSelectedWorkout(workout)}
                  className={`p-8 rounded-3xl border transition-all cursor-pointer ${
                    selectedWorkout?.id === workout.id
                      ? 'border-slate-900 bg-slate-50 shadow-xl'
                      : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-white text-[9px] font-black uppercase tracking-wider ${typeColors[workout.type]}`}>
                          {workout.type}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${feelingColors[workout.feeling]}`}></span>
                        <span className="tech-label !text-[8px] capitalize">{workout.feeling}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight italic uppercase">{workout.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="tech-label !text-[10px] mb-1">{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <p className="text-slate-400 text-sm font-semibold">{workout.duration} min</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="tech-label !text-[8px] mb-1">Exercises</p>
                      <p className="text-2xl font-bold text-slate-900 italic">{workout.exercises.length}</p>
                    </div>
                    <div>
                      <p className="tech-label !text-[8px] mb-1">Total Sets</p>
                      <p className="text-2xl font-bold text-slate-900 italic">{getTotalSets(workout)}</p>
                    </div>
                    <div>
                      <p className="tech-label !text-[8px] mb-1">Volume</p>
                      <p className="text-2xl font-bold text-slate-900 italic">{(getTotalVolume(workout) / 1000).toFixed(1)}k</p>
                    </div>
                    <div>
                      <p className="tech-label !text-[8px] mb-1">Calories</p>
                      <p className="text-2xl font-bold text-emerald-500 italic">{workout.calories}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.slice(0, 4).map((exercise, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-semibold text-slate-600">
                        {exercise.name}
                      </span>
                    ))}
                    {workout.exercises.length > 4 && (
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-semibold text-slate-400">
                        +{workout.exercises.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              {selectedWorkout ? (
                <div className="p-8 bg-slate-950 rounded-3xl text-white sticky top-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="tech-label text-emerald-500">Workout Details</h3>
                    <button onClick={() => setSelectedWorkout(null)} className="text-slate-500 hover:text-white">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  
                  <h4 className="text-xl font-bold tracking-tight italic uppercase mb-6">{selectedWorkout.name}</h4>
                  
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    {selectedWorkout.exercises.map((exercise, i) => (
                      <div key={i} className="pb-6 border-b border-slate-800 last:border-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-white">{exercise.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase">{exercise.muscleGroup} • {exercise.equipment}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {exercise.sets.map((set, j) => (
                            <div key={j} className="flex items-center gap-4 text-sm">
                              <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">{j + 1}</span>
                              <span className="text-slate-300">{set.reps} reps</span>
                              {set.weight > 0 && <span className="text-slate-300">× {set.weight}kg</span>}
                              {set.rpe && <span className="text-emerald-500 text-[10px]">RPE {set.rpe}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedWorkout.notes && (
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <p className="tech-label !text-[8px] text-slate-500 mb-2">Notes</p>
                      <p className="text-sm text-slate-300">{selectedWorkout.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 border border-slate-100 rounded-3xl">
                  <h3 className="tech-label mb-6">Quick Stats</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="tech-label !text-[8px] mb-2">This Week</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900 italic">{workouts.length}</span>
                        <span className="text-slate-400 text-sm">workouts</span>
                      </div>
                    </div>
                    <div>
                      <p className="tech-label !text-[8px] mb-2">Total Volume</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900 italic">
                          {(workouts.reduce((t, w) => t + getTotalVolume(w), 0) / 1000).toFixed(1)}k
                        </span>
                        <span className="text-slate-400 text-sm">kg lifted</span>
                      </div>
                    </div>
                    <div>
                      <p className="tech-label !text-[8px] mb-2">Calories Burned</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-emerald-500 italic">
                          {workouts.reduce((t, w) => t + w.calories, 0)}
                        </span>
                        <span className="text-slate-400 text-sm">kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Muscle Groups Hit</h3>
                <div className="space-y-3">
                  {muscleGroups.map((group) => {
                    const count = workouts.reduce((total, w) => 
                      total + w.exercises.filter(e => e.muscleGroup === group).length, 0
                    );
                    const maxCount = 10;
                    return (
                      <div key={group}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] font-semibold text-slate-600 uppercase">{group}</span>
                          <span className="text-[10px] font-bold text-slate-900">{count}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-900 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((count / maxCount) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Push Day', exercises: ['Bench Press', 'Overhead Press', 'Incline DB Press', 'Lateral Raises', 'Tricep Pushdowns'], type: 'Strength' },
              { name: 'Pull Day', exercises: ['Deadlift', 'Pull-ups', 'Barbell Rows', 'Face Pulls', 'Bicep Curls'], type: 'Strength' },
              { name: 'Leg Day', exercises: ['Squat', 'Leg Press', 'Lunges', 'Leg Curl', 'Calf Raises'], type: 'Strength' },
              { name: 'Full Body HIIT', exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups', 'Plank'], type: 'HIIT' },
              { name: 'Upper Body', exercises: ['Bench Press', 'Rows', 'Overhead Press', 'Pull-ups', 'Curls'], type: 'Strength' },
              { name: 'Core Crusher', exercises: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises', 'Dead Bug'], type: 'Strength' }
            ].map((template, i) => (
              <div key={i} className="p-8 border border-slate-100 rounded-3xl hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-white text-[9px] font-black uppercase tracking-wider ${typeColors[template.type as keyof typeof typeColors]}`}>
                    {template.type}
                  </span>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-900 transition-colors">arrow_forward</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight italic uppercase mb-4">{template.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {template.exercises.map((ex, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-50 rounded text-[9px] font-semibold text-slate-500">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="p-8 bg-slate-950 rounded-3xl text-white">
              <span className="tech-label text-emerald-500 mb-4 block">Total Workouts</span>
              <p className="text-5xl font-bold italic">156</p>
              <p className="text-slate-500 text-sm mt-2">+12 this month</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">Current Streak</span>
              <p className="text-5xl font-bold text-slate-900 italic">21</p>
              <p className="text-slate-400 text-sm mt-2">days consecutive</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">Total Volume</span>
              <p className="text-5xl font-bold text-slate-900 italic">847k</p>
              <p className="text-slate-400 text-sm mt-2">kg lifted all time</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">Avg Duration</span>
              <p className="text-5xl font-bold text-slate-900 italic">52</p>
              <p className="text-slate-400 text-sm mt-2">minutes per session</p>
            </div>
          </div>
        )}

        {showNewWorkout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <div className="bg-white rounded-3xl p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight italic uppercase">New Workout</h2>
                <button onClick={() => setShowNewWorkout(false)} className="text-slate-400 hover:text-slate-900">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="tech-label mb-2 block">Workout Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Push Day - Chest Focus"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label mb-2 block">Type</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900">
                      <option>Strength</option>
                      <option>Cardio</option>
                      <option>HIIT</option>
                      <option>Yoga</option>
                      <option>Sports</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="tech-label mb-2 block">How do you feel?</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900">
                      <option>Great</option>
                      <option>Good</option>
                      <option>Okay</option>
                      <option>Tired</option>
                      <option>Exhausted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="tech-label mb-2 block">Add Exercises</label>
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {EXERCISE_DATABASE.slice(0, 8).map((ex, i) => (
                        <button key={i} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                          + {ex.name}
                        </button>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search exercises..."
                      className="w-full px-4 py-2 bg-slate-50 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="tech-label mb-2 block">Notes (optional)</label>
                  <textarea 
                    placeholder="How did the workout go? Any PRs?"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 h-24 resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowNewWorkout(false)}
                    className="flex-1 px-8 py-3 border border-slate-200 rounded-full tech-label text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowNewWorkout(false)}
                    className="flex-1 px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all"
                  >
                    Save Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
