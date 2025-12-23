export const Config = {
  appName: 'ForgeBody',
  appVersion: '1.0.0',
  
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.forgebody.app',
    timeout: 30000,
  },
  
  sync: {
    intervalMinutes: 15,
    retryAttempts: 3,
    retryDelayMs: 5000,
  },
  
  health: {
    defaultStepGoal: 10000,
    defaultSleepGoalHours: 8,
    defaultHydrationGoalMl: 2500,
    defaultActiveMinutesGoal: 60,
  },
  
  storage: {
    keys: {
      user: '@forgebody/user',
      healthData: '@forgebody/health',
      settings: '@forgebody/settings',
      onboardingComplete: '@forgebody/onboarding_complete',
      lastSync: '@forgebody/last_sync',
    },
  },
};
