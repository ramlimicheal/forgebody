
import React, { useState } from 'react';
import { SocialActivity, Challenge, LeaderboardEntry } from '../types';
import { MOCK_SOCIAL_ACTIVITIES, MOCK_CHALLENGES, MOCK_LEADERBOARD } from '../constants';

export const SocialFeed: React.FC = () => {
  const [activities, setActivities] = useState<SocialActivity[]>(MOCK_SOCIAL_ACTIVITIES);
  const [challenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [leaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard'>('feed');

  const activityTypeIcons = {
    workout: 'fitness_center',
    achievement: 'emoji_events',
    milestone: 'flag',
    challenge: 'local_fire_department'
  };

  const activityTypeColors = {
    workout: 'bg-blue-500',
    achievement: 'bg-yellow-500',
    milestone: 'bg-emerald-500',
    challenge: 'bg-orange-500'
  };

  const challengeTypeIcons = {
    steps: 'directions_walk',
    workouts: 'fitness_center',
    streak: 'local_fire_department',
    calories: 'whatshot'
  };

  const handleLike = (id: string) => {
    setActivities(prev => prev.map(a => 
      a.id === id 
        ? { ...a, isLiked: !a.isLiked, likes: a.isLiked ? a.likes - 1 : a.likes + 1 }
        : a
    ));
  };

  return (
    <div className="h-full overflow-y-auto p-12 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">Community</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 mb-2">Social Hub</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Train together. <span className="text-emerald-500 font-black italic">Compete. Inspire.</span>
            </p>
          </div>
          <button className="px-8 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Share Update
          </button>
        </div>

        <div className="flex gap-2 mb-12">
          {(['feed', 'challenges', 'leaderboard'] as const).map((tab) => (
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

        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="p-8 border border-slate-100 rounded-3xl hover:border-slate-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                      {activity.userAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900">{activity.userName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-white text-[8px] font-black uppercase ${activityTypeColors[activity.type]}`}>
                          {activity.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">{activity.timestamp}</p>
                    </div>
                    <span className={`material-symbols-outlined text-2xl ${activityTypeColors[activity.type].replace('bg-', 'text-')}`}>
                      {activityTypeIcons[activity.type]}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight italic uppercase mb-2">{activity.title}</h4>
                    <p className="text-slate-600">{activity.description}</p>
                  </div>

                  <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => handleLike(activity.id)}
                      className={`flex items-center gap-2 transition-colors ${activity.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <span className={`material-symbols-outlined ${activity.isLiked ? 'filled' : ''}`}>favorite</span>
                      <span className="text-sm font-semibold">{activity.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <span className="material-symbols-outlined">chat_bubble</span>
                      <span className="text-sm font-semibold">{activity.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors ml-auto">
                      <span className="material-symbols-outlined">share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-slate-950 rounded-3xl text-white">
                <h3 className="tech-label text-emerald-500 mb-6">Your Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-bold italic">156</p>
                    <p className="text-slate-500 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold italic">89</p>
                    <p className="text-slate-500 text-sm">Following</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold italic">42</p>
                    <p className="text-slate-500 text-sm">Posts</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold italic">1.2k</p>
                    <p className="text-slate-500 text-sm">Likes</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Active Challenges</h3>
                <div className="space-y-4">
                  {challenges.slice(0, 2).map((challenge) => (
                    <div key={challenge.id} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-emerald-500">{challengeTypeIcons[challenge.type]}</span>
                        <p className="font-semibold text-slate-900 text-sm">{challenge.name}</p>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {challenge.current.toLocaleString()} / {challenge.target.toLocaleString()} • Rank #{challenge.rank}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Suggested Friends</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Aditya Kumar', avatar: 'AK', mutual: 12 },
                    { name: 'Riya Patel', avatar: 'RP', mutual: 8 },
                    { name: 'Siddharth Jain', avatar: 'SJ', mutual: 5 }
                  ].map((friend, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {friend.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{friend.name}</p>
                          <p className="text-[10px] text-slate-400">{friend.mutual} mutual friends</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase hover:bg-slate-800 transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-8 border border-slate-100 rounded-3xl hover:border-slate-300 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl">{challengeTypeIcons[challenge.type]}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight italic uppercase">{challenge.name}</h3>
                      <p className="text-[10px] text-slate-400 uppercase">{challenge.participants.toLocaleString()} participants</p>
                    </div>
                  </div>
                  {challenge.rank && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-500 italic">#{challenge.rank}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Your Rank</p>
                    </div>
                  )}
                </div>

                <p className="text-slate-600 mb-6">{challenge.description}</p>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">{challenge.current.toLocaleString()}</span>
                    <span className="text-sm text-slate-400">{challenge.target.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    {Math.round((challenge.current / challenge.target) * 100)}% complete • Ends {new Date(challenge.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-slate-900 rounded-full tech-label text-white hover:bg-slate-800 transition-all">
                    View Details
                  </button>
                  <button className="px-6 py-3 border border-slate-200 rounded-full tech-label text-slate-600 hover:bg-slate-50 transition-all">
                    Invite
                  </button>
                </div>
              </div>
            ))}

            <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center hover:border-slate-300 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">add_circle</span>
              <h3 className="text-xl font-bold text-slate-400 tracking-tight italic uppercase mb-2">Create Challenge</h3>
              <p className="text-slate-400 text-sm">Start your own challenge and invite friends</p>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="p-8 bg-slate-950 rounded-3xl text-white mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="tech-label text-emerald-500">Top Performers</h3>
                  <select className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm border-none focus:outline-none">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>
                </div>

                <div className="flex justify-center gap-8 mb-8">
                  {leaderboard.slice(0, 3).map((entry, i) => (
                    <div key={entry.rank} className={`text-center ${i === 1 ? 'order-first' : ''}`}>
                      <div className={`relative ${i === 1 ? 'mb-4' : 'mt-8'}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                          i === 1 ? 'bg-yellow-500 text-slate-900' : i === 0 ? 'bg-slate-600 text-white' : 'bg-orange-600 text-white'
                        }`}>
                          {entry.userAvatar}
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          i === 1 ? 'bg-yellow-400 text-slate-900' : i === 0 ? 'bg-slate-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {entry.rank}
                        </div>
                      </div>
                      <p className="font-bold text-white mt-4">{entry.userName}</p>
                      <p className="text-emerald-500 font-bold">{entry.score.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {leaderboard.slice(3).map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`p-6 rounded-2xl flex items-center justify-between transition-all ${
                      entry.userId === 'u0' 
                        ? 'bg-emerald-50 border-2 border-emerald-500' 
                        : 'border border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-2xl font-bold w-8 ${entry.userId === 'u0' ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {entry.rank}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {entry.userAvatar}
                      </div>
                      <div>
                        <p className={`font-bold ${entry.userId === 'u0' ? 'text-emerald-700' : 'text-slate-900'}`}>
                          {entry.userName}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase">
                          {entry.change === 'up' && '↑ Moved up'}
                          {entry.change === 'down' && '↓ Moved down'}
                          {entry.change === 'same' && '— No change'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold italic ${entry.userId === 'u0' ? 'text-emerald-500' : 'text-slate-900'}`}>
                        {entry.score.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase">Points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">How Points Work</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Complete a workout', points: '+100' },
                    { action: 'Hit daily step goal', points: '+50' },
                    { action: 'Log all meals', points: '+30' },
                    { action: 'Maintain streak', points: '+20/day' },
                    { action: 'Win a challenge', points: '+500' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 text-sm">{item.action}</span>
                      <span className="text-emerald-500 font-bold">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-950 rounded-3xl text-white">
                <h3 className="tech-label text-emerald-500 mb-6">Your Progress</h3>
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold italic">81,500</p>
                  <p className="text-slate-500">Total Points</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400 text-sm">To next rank</span>
                      <span className="text-white text-sm font-bold">1,700 pts</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="tech-label mb-6">Achievements</h3>
                <div className="grid grid-cols-4 gap-3">
                  {['🏆', '🔥', '💪', '🎯', '⭐', '🏅', '🚀', '💎'].map((emoji, i) => (
                    <div 
                      key={i} 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        i < 5 ? 'bg-slate-100' : 'bg-slate-50 opacity-40'
                      }`}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-4 text-center">5 of 8 achievements unlocked</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
