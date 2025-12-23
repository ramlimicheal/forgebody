import React, { useState } from 'react';

interface UserPreferences {
  notifications: boolean;
  weeklyReports: boolean;
  dailyReminders: boolean;
  darkMode: boolean;
  units: 'metric' | 'imperial';
  language: string;
}

interface SettingsViewProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ darkMode, onDarkModeToggle }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: true,
    weeklyReports: true,
    dailyReminders: false,
    darkMode: darkMode,
    units: 'metric',
    language: 'English',
  });
  const [showExportModal, setShowExportModal] = useState(false);

  const handleToggle = (key: keyof UserPreferences) => {
    if (key === 'darkMode') {
      onDarkModeToggle();
    }
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    {
      title: 'Notifications',
      icon: 'notifications',
      settings: [
        { key: 'notifications' as const, label: 'Push Notifications', description: 'Receive alerts for goals and insights' },
        { key: 'weeklyReports' as const, label: 'Weekly Reports', description: 'Get a summary every Sunday' },
        { key: 'dailyReminders' as const, label: 'Daily Reminders', description: 'Hydration and activity reminders' },
      ],
    },
    {
      title: 'Appearance',
      icon: 'palette',
      settings: [
        { key: 'darkMode' as const, label: 'Dark Mode', description: 'Switch to dark theme' },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-12 bg-white dark:bg-slate-900 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-slate-50 dark:border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label dark:text-slate-500">Configuration</span>
            </div>
            <h1 className="text-6xl sport-italic text-slate-900 dark:text-white mb-2">Settings</h1>
            <p className="text-slate-400 text-sm font-semibold tracking-tight uppercase">
              Customize your ForgeBody experience
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">{section.icon}</span>
                <span className="tech-label !text-[10px] dark:text-slate-500">{section.title}</span>
                <div className="h-[0.5px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div 
                    key={setting.key}
                    className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{setting.label}</h3>
                      <p className="text-sm text-slate-400 mt-1">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(setting.key)}
                      className={`relative w-14 h-8 rounded-full transition-all ${
                        preferences[setting.key] 
                          ? 'bg-emerald-500' 
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      <div 
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${
                          preferences[setting.key] ? 'left-7' : 'left-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">tune</span>
              <span className="tech-label !text-[10px] dark:text-slate-500">Preferences</span>
              <div className="h-[0.5px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-800 rounded-2xl">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Units</h3>
                  <p className="text-sm text-slate-400 mt-1">Choose your preferred measurement system</p>
                </div>
                <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-full">
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, units: 'metric' }))}
                    className={`px-4 py-2 rounded-full tech-label transition-all ${
                      preferences.units === 'metric' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-400'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, units: 'imperial' }))}
                    className={`px-4 py-2 rounded-full tech-label transition-all ${
                      preferences.units === 'imperial' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-400'
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-800 rounded-2xl">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Language</h3>
                  <p className="text-sm text-slate-400 mt-1">Select your preferred language</p>
                </div>
                <select 
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white tech-label focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">database</span>
              <span className="tech-label !text-[10px] dark:text-slate-500">Data Management</span>
              <div className="h-[0.5px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-800 cursor-pointer transition-all group"
                onClick={() => setShowExportModal(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all">
                    <span className="material-symbols-outlined text-emerald-500">download</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Export Your Data</h3>
                    <p className="text-sm text-slate-400 mt-1">Download all your health data as CSV or JSON</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-all">
                  arrow_forward
                </span>
              </div>

              <div className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-rose-200 dark:hover:border-rose-800 cursor-pointer transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-all">
                    <span className="material-symbols-outlined text-rose-500">delete</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Delete All Data</h3>
                    <p className="text-sm text-slate-400 mt-1">Permanently remove all your health data</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-rose-500 transition-all">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">info</span>
              <span className="tech-label !text-[10px] dark:text-slate-500">About</span>
              <div className="h-[0.5px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white dark:text-slate-900">bolt</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">ForgeBody</h3>
                  <p className="tech-label !text-[8px]">Human Performance OS</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Version</span>
                  <p className="font-semibold text-slate-900 dark:text-white">1.0.0</p>
                </div>
                <div>
                  <span className="text-slate-400">Build</span>
                  <p className="font-semibold text-slate-900 dark:text-white">2024.12.23</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Export Data</h2>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                >
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <p className="text-slate-500 mb-8">Choose your preferred export format. Your data will be downloaded immediately.</p>
              <div className="space-y-3">
                <button className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-500">table_chart</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 dark:text-white">CSV Format</h3>
                    <p className="text-sm text-slate-400">Compatible with Excel, Google Sheets</p>
                  </div>
                </button>
                <button className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-500">code</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 dark:text-white">JSON Format</h3>
                    <p className="text-sm text-slate-400">For developers and integrations</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
