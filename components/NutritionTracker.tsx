
import React, { useState } from 'react';
import { MealEntry } from '../types';
import { MOCK_NUTRITION, FOOD_DATABASE } from '../constants';

export const NutritionTracker: React.FC = () => {
  const [nutrition] = useState(MOCK_NUTRITION);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'insights'>('today');

  const calorieProgress = (nutrition.totalCalories / nutrition.calorieGoal) * 100;
  const proteinProgress = (nutrition.totalProtein / nutrition.proteinGoal) * 100;
  const carbsProgress = (nutrition.totalCarbs / nutrition.carbsGoal) * 100;
  const fatProgress = (nutrition.totalFat / nutrition.fatGoal) * 100;

  const mealTypeIcons = {
    breakfast: 'wb_sunny',
    lunch: 'light_mode',
    dinner: 'dark_mode',
    snack: 'cookie'
  };

  const mealTypeColors = {
    breakfast: 'bg-orange-500',
    lunch: 'bg-yellow-500',
    dinner: 'bg-indigo-500',
    snack: 'bg-pink-500'
  };

  const getMealsByType = (type: string) => nutrition.meals.filter(m => m.mealType === type);

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Fuel System</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Nutrition Tracker</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Precision fueling for <span className="text-emerald-500 font-black italic">peak performance.</span>
            </p>
          </div>
          <button 
            onClick={() => setShowAddMeal(true)}
            className="px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Log Meal
          </button>
        </div>

        <div className="flex gap-2 mb-12">
          {(['today', 'history', 'insights'] as const).map((tab) => (
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

        {activeTab === 'today' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="p-8 bg-slate-950 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <span className="tech-label text-emerald-500 mb-4 block">Calories</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold italic">{nutrition.totalCalories}</span>
                  <span className="text-slate-500">/ {nutrition.calorieGoal}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-slate-500 text-sm mt-3">{nutrition.calorieGoal - nutrition.totalCalories} remaining</p>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <span className="tech-label mb-4 block">Protein</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-slate-900 italic">{nutrition.totalProtein}g</span>
                  <span className="text-slate-400">/ {nutrition.proteinGoal}g</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-3">{Math.round(proteinProgress)}% of goal</p>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <span className="tech-label mb-4 block">Carbs</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-slate-900 italic">{nutrition.totalCarbs}g</span>
                  <span className="text-slate-400">/ {nutrition.carbsGoal}g</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(carbsProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-3">{Math.round(carbsProgress)}% of goal</p>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <span className="tech-label mb-4 block">Fat</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-slate-900 italic">{nutrition.totalFat}g</span>
                  <span className="text-slate-400">/ {nutrition.fatGoal}g</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(fatProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-3">{Math.round(fatProgress)}% of goal</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="tech-label !text-[10px]">Today's Meals</h2>
                  <div className="h-[0.5px] flex-1 bg-slate-100 mx-8"></div>
                  <span className="material-symbols-outlined text-slate-300">restaurant</span>
                </div>

                <div className="space-y-6">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mealType) => {
                    const meals = getMealsByType(mealType);
                    const totalCals = meals.reduce((t, m) => t + m.calories, 0);
                    
                    return (
                      <div key={mealType} className="p-6 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${mealTypeColors[mealType]} flex items-center justify-center`}>
                              <span className="material-symbols-outlined text-white text-lg">{mealTypeIcons[mealType]}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 capitalize">{mealType}</h3>
                              <p className="text-[10px] text-slate-400 uppercase">{meals.length} items • {totalCals} kcal</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => { setSelectedMealType(mealType); setShowAddMeal(true); }}
                            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider transition-colors"
                          >
                            + Add
                          </button>
                        </div>

                        {meals.length > 0 ? (
                          <div className="space-y-3">
                            {meals.map((meal) => (
                              <div key={meal.id} className="flex items-center justify-between py-3 border-t border-slate-50">
                                <div className="flex-1">
                                  <p className="font-medium text-slate-900">{meal.name}</p>
                                  <p className="text-[10px] text-slate-400">{meal.time}</p>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="text-center">
                                    <p className="font-bold text-slate-900">{meal.calories}</p>
                                    <p className="text-[8px] text-slate-400 uppercase">kcal</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="font-bold text-blue-500">{meal.protein}g</p>
                                    <p className="text-[8px] text-slate-400 uppercase">protein</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="font-bold text-orange-500">{meal.carbs}g</p>
                                    <p className="text-[8px] text-slate-400 uppercase">carbs</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="font-bold text-purple-500">{meal.fat}g</p>
                                    <p className="text-[8px] text-slate-400 uppercase">fat</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm py-4 text-center">No meals logged yet</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-8">
                <div className="p-8 bg-slate-950 rounded-3xl text-white">
                  <h3 className="tech-label text-emerald-500 mb-6">Macro Split</h3>
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="12" />
                      <circle 
                        cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12"
                        strokeDasharray={`${(nutrition.totalProtein * 4 / nutrition.totalCalories) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                      <circle 
                        cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="12"
                        strokeDasharray={`${(nutrition.totalCarbs * 4 / nutrition.totalCalories) * 251.2} 251.2`}
                        strokeDashoffset={`-${(nutrition.totalProtein * 4 / nutrition.totalCalories) * 251.2}`}
                        strokeLinecap="round"
                      />
                      <circle 
                        cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12"
                        strokeDasharray={`${(nutrition.totalFat * 9 / nutrition.totalCalories) * 251.2} 251.2`}
                        strokeDashoffset={`-${((nutrition.totalProtein * 4 + nutrition.totalCarbs * 4) / nutrition.totalCalories) * 251.2}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold italic">{nutrition.totalCalories}</span>
                      <span className="text-[10px] text-slate-500 uppercase">kcal</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-2"></div>
                      <p className="text-white font-bold">{Math.round((nutrition.totalProtein * 4 / nutrition.totalCalories) * 100)}%</p>
                      <p className="text-[9px] text-slate-500 uppercase">Protein</p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-2"></div>
                      <p className="text-white font-bold">{Math.round((nutrition.totalCarbs * 4 / nutrition.totalCalories) * 100)}%</p>
                      <p className="text-[9px] text-slate-500 uppercase">Carbs</p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-purple-500 mx-auto mb-2"></div>
                      <p className="text-white font-bold">{Math.round((nutrition.totalFat * 9 / nutrition.totalCalories) * 100)}%</p>
                      <p className="text-[9px] text-slate-500 uppercase">Fat</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-slate-100 rounded-3xl">
                  <h3 className="tech-label mb-6">Quick Add</h3>
                  <div className="space-y-3">
                    {FOOD_DATABASE.slice(0, 6).map((food, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left">
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{food.name}</p>
                          <p className="text-[10px] text-slate-400">{food.protein}g protein</p>
                        </div>
                        <span className="text-sm font-bold text-slate-600">{food.calories}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i);
              const cals = 1800 + Math.floor(Math.random() * 800);
              const goal = 2400;
              
              return (
                <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">
                        {i === 0 ? 'Today' : i === 1 ? 'Yesterday' : date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase mt-1">
                        {Math.floor(Math.random() * 3) + 3} meals logged
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900 italic">{cals}</p>
                        <p className="text-[10px] text-slate-400">/ {goal} kcal</p>
                      </div>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cals > goal ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min((cals / goal) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-950 rounded-3xl text-white">
              <span className="tech-label text-emerald-500 mb-4 block">Weekly Average</span>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold italic">2,180</p>
                  <p className="text-slate-500 text-sm">calories/day</p>
                </div>
                <div>
                  <p className="text-4xl font-bold italic">156g</p>
                  <p className="text-slate-500 text-sm">protein/day</p>
                </div>
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">Consistency Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-emerald-500 italic">87%</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">You hit your protein goal 6/7 days this week</p>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">Top Protein Sources</span>
              <div className="space-y-3 mt-4">
                {['Chicken Breast', 'Greek Yogurt', 'Eggs', 'Whey Protein'].map((food, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{food}</span>
                    <span className="text-slate-400 text-sm">{[31, 18, 12, 24][i]}g avg</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-3xl">
              <span className="tech-label mb-4 block">AI Recommendation</span>
              <p className="text-slate-700 leading-relaxed">
                Your protein intake is well-distributed throughout the day. Consider adding more fiber-rich foods 
                to your dinner meals - you're averaging only 12g fiber vs the recommended 25-30g.
              </p>
            </div>
          </div>
        )}

        {showAddMeal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <div className="bg-white rounded-3xl p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight italic uppercase">Log Meal</h2>
                <button onClick={() => setShowAddMeal(false)} className="text-slate-400 hover:text-slate-900">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="tech-label mb-3 block">Meal Type</label>
                  <div className="grid grid-cols-4 gap-3">
                    {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedMealType(type)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedMealType === type
                            ? 'border-slate-900 bg-slate-50'
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-2xl mb-2 ${selectedMealType === type ? 'text-slate-900' : 'text-slate-400'}`}>
                          {mealTypeIcons[type]}
                        </span>
                        <p className={`text-sm font-semibold capitalize ${selectedMealType === type ? 'text-slate-900' : 'text-slate-500'}`}>
                          {type}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="tech-label mb-2 block">Search Food</label>
                  <input 
                    type="text" 
                    placeholder="Search foods or scan barcode..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="tech-label mb-3 block">Quick Add</label>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                    {FOOD_DATABASE.map((food, i) => (
                      <button key={i} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left">
                        <p className="font-medium text-slate-900 text-sm">{food.name}</p>
                        <p className="text-[10px] text-slate-400">{food.calories} kcal • {food.protein}g protein</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <label className="tech-label mb-3 block">Or Enter Manually</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Food name" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                    <input type="number" placeholder="Calories" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                    <input type="number" placeholder="Protein (g)" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                    <input type="number" placeholder="Carbs (g)" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                    <input type="number" placeholder="Fat (g)" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                    <input type="time" className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowAddMeal(false)}
                    className="flex-1 px-8 py-3 border border-slate-200 rounded-full tech-label text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowAddMeal(false)}
                    className="flex-1 px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all"
                  >
                    Add Meal
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
