
import React, { useState } from 'react';
import { AIInsight } from '../types';
import { MOCK_AI_INSIGHTS, MOCK_STATS, MOCK_VITALS } from '../constants';

export const AICoach: React.FC = () => {
  const [insights] = useState<AIInsight[]>(MOCK_AI_INSIGHTS);
  const [activeTab, setActiveTab] = useState<'insights' | 'chat' | 'plans'>('insights');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Hey! I'm your AI coach. Based on your recent data, I've noticed some patterns we should discuss. Your recovery metrics are looking strong, but I have some suggestions for optimizing your training. What would you like to focus on today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const insightTypeIcons = {
    recommendation: 'lightbulb',
    warning: 'warning',
    achievement: 'emoji_events',
    tip: 'tips_and_updates'
  };

  const insightTypeColors = {
    recommendation: 'bg-blue-500',
    warning: 'bg-orange-500',
    achievement: 'bg-yellow-500',
    tip: 'bg-emerald-500'
  };

  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-slate-300'
  };

  const categoryIcons = {
    workout: 'fitness_center',
    nutrition: 'restaurant',
    recovery: 'self_improvement',
    sleep: 'bedtime',
    general: 'psychology'
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    setInputMessage('');
    
    setTimeout(() => {
      const responses = [
        "Based on your HRV data, I'd recommend focusing on recovery today. Your nervous system needs some rest after the intense sessions this week.",
        "Great question! Looking at your workout history, you've been making solid progress on your compound lifts. I'd suggest adding 2.5kg to your working sets next week.",
        "Your sleep quality has been improving! The changes you made to your evening routine are clearly working. Keep maintaining that 10:30 PM bedtime.",
        "I've analyzed your nutrition logs - you're hitting your protein targets consistently. Consider adding more fiber-rich foods to support gut health and recovery."
      ];
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1000);
  };

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Neural Intelligence</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">AI Coach</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Personalized guidance powered by <span className="text-emerald-500 font-black italic">Gemini AI.</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-emerald-50 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase">AI Active</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-12">
          {(['insights', 'chat', 'plans'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full tech-label transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab === 'chat' ? 'Chat with AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="tech-label !text-[10px]">Personalized Insights</h2>
                <div className="flex gap-2">
                  {(['all', 'high', 'actionable'] as const).map((filter) => (
                    <button key={filter} className="px-3 py-1 rounded-full text-[9px] font-bold uppercase bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {insights.map((insight) => (
                <div 
                  key={insight.id} 
                  className={`p-8 border border-slate-100 rounded-3xl hover:border-slate-200 hover:shadow-lg transition-all border-l-4 ${priorityColors[insight.priority]}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${insightTypeColors[insight.type]} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-white text-xl">{insightTypeIcons[insight.type]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-white text-[8px] font-black uppercase ${insightTypeColors[insight.type]}`}>
                            {insight.type}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase">{insight.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{insight.title}</h3>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{insight.timestamp}</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6">{insight.message}</p>

                  {insight.actionable && insight.action && (
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <button className="px-6 py-2.5 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check</span>
                        {insight.action}
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">bookmark_border</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-slate-950 rounded-3xl text-white">
                <h3 className="tech-label text-emerald-500 mb-6">Today's Focus</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-500">fitness_center</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">Push Day</p>
                      <p className="text-slate-500 text-sm">Recommended based on recovery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-500">restaurant</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">High Protein Day</p>
                      <p className="text-slate-500 text-sm">180g target for muscle synthesis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-500">bedtime</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">Sleep by 10:30 PM</p>
                      <p className="text-slate-500 text-sm">Optimize recovery window</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Performance Score</h3>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                      strokeDasharray={`${MOCK_STATS.readiness * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-slate-900 italic">{MOCK_STATS.readiness}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Readiness</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-slate-900 italic">{MOCK_VITALS.hrv}</p>
                    <p className="text-[9px] text-slate-400 uppercase">HRV</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 italic">{MOCK_VITALS.rhr}</p>
                    <p className="text-[9px] text-slate-400 uppercase">RHR</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 italic">{MOCK_VITALS.sleepScore}</p>
                    <p className="text-[9px] text-slate-400 uppercase">Sleep</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Weekly Trends</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Training Load', value: '+12%', trend: 'up', color: 'text-emerald-500' },
                    { label: 'Recovery Score', value: '+8%', trend: 'up', color: 'text-emerald-500' },
                    { label: 'Sleep Quality', value: '+15%', trend: 'up', color: 'text-emerald-500' },
                    { label: 'Stress Level', value: '-5%', trend: 'down', color: 'text-emerald-500' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 text-sm">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-3xl p-8 mb-6 h-[500px] overflow-y-auto">
              <div className="space-y-6">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                      {msg.role === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">psychology</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">AI Coach</span>
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-slate-900 text-white rounded-br-sm' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                      }`}>
                        <p className="leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your AI coach anything..."
                className="flex-1 px-6 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 text-lg"
              />
              <button 
                onClick={handleSendMessage}
                className="px-8 py-4 bg-slate-900 rounded-2xl text-white hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                'How should I train today?',
                'Analyze my sleep patterns',
                'Nutrition recommendations',
                'Recovery tips'
              ].map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => setInputMessage(suggestion)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Strength Building',
                duration: '12 weeks',
                focus: 'Hypertrophy & Strength',
                description: 'Progressive overload program designed to maximize muscle growth and strength gains.',
                workouts: 4,
                difficulty: 'Intermediate'
              },
              {
                title: 'Fat Loss Protocol',
                duration: '8 weeks',
                focus: 'Body Recomposition',
                description: 'High-intensity training combined with strategic nutrition for optimal fat loss.',
                workouts: 5,
                difficulty: 'Advanced'
              },
              {
                title: 'Athletic Performance',
                duration: '16 weeks',
                focus: 'Speed & Power',
                description: 'Sport-specific training to enhance explosive power and athletic performance.',
                workouts: 5,
                difficulty: 'Advanced'
              },
              {
                title: 'Beginner Foundation',
                duration: '6 weeks',
                focus: 'Movement Mastery',
                description: 'Learn proper form and build a solid foundation for future training.',
                workouts: 3,
                difficulty: 'Beginner'
              },
              {
                title: 'Recovery & Mobility',
                duration: '4 weeks',
                focus: 'Flexibility & Recovery',
                description: 'Improve mobility, reduce injury risk, and enhance recovery between sessions.',
                workouts: 4,
                difficulty: 'All Levels'
              },
              {
                title: 'Custom Plan',
                duration: 'Personalized',
                focus: 'Your Goals',
                description: 'AI-generated plan based on your specific goals, schedule, and preferences.',
                workouts: 'Varies',
                difficulty: 'Personalized',
                isCustom: true
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-3xl transition-all cursor-pointer group ${
                  plan.isCustom 
                    ? 'bg-slate-950 text-white hover:bg-slate-900' 
                    : 'border border-slate-100 hover:border-slate-300 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    plan.isCustom ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {plan.difficulty}
                  </span>
                  <span className={`material-symbols-outlined ${plan.isCustom ? 'text-emerald-500' : 'text-slate-300'} group-hover:text-emerald-500 transition-colors`}>
                    {plan.isCustom ? 'auto_awesome' : 'arrow_forward'}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold tracking-tight italic uppercase mb-2 ${plan.isCustom ? 'text-white' : 'text-slate-900'}`}>
                  {plan.title}
                </h3>
                <p className={`text-sm mb-4 ${plan.isCustom ? 'text-emerald-500' : 'text-emerald-600'}`}>{plan.focus}</p>
                <p className={`text-sm leading-relaxed mb-6 ${plan.isCustom ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className={`flex items-center gap-6 pt-6 border-t ${plan.isCustom ? 'border-slate-800' : 'border-slate-50'}`}>
                  <div>
                    <p className={`text-lg font-bold ${plan.isCustom ? 'text-white' : 'text-slate-900'}`}>{plan.duration}</p>
                    <p className={`text-[9px] uppercase ${plan.isCustom ? 'text-slate-500' : 'text-slate-400'}`}>Duration</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${plan.isCustom ? 'text-white' : 'text-slate-900'}`}>{plan.workouts}</p>
                    <p className={`text-[9px] uppercase ${plan.isCustom ? 'text-slate-500' : 'text-slate-400'}`}>Workouts/Week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
