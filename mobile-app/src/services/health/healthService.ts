import { Platform } from 'react-native';
import {
  HealthData,
  DailySummary,
  WeeklySummary,
  HealthPermissions,
  HealthPlatform,
  HealthServiceConfig,
} from './types';
import { Config } from '../../constants/config';

class HealthService {
  private config: HealthServiceConfig = {
    platform: 'none',
    permissions: {
      steps: false,
      distance: false,
      calories: false,
      heartRate: false,
      sleep: false,
      workouts: false,
      floorsClimbed: false,
    },
  };

  async initialize(): Promise<HealthServiceConfig> {
    const platform = this.detectPlatform();
    this.config.platform = platform;

    if (platform === 'healthConnect') {
      await this.initializeHealthConnect();
    } else if (platform === 'healthKit') {
      await this.initializeHealthKit();
    }

    return this.config;
  }

  private detectPlatform(): HealthPlatform {
    if (Platform.OS === 'android') {
      return 'healthConnect';
    } else if (Platform.OS === 'ios') {
      return 'healthKit';
    }
    return 'none';
  }

  private async initializeHealthConnect(): Promise<void> {
    try {
      console.log('Initializing Health Connect...');
    } catch (error) {
      console.error('Failed to initialize Health Connect:', error);
    }
  }

  private async initializeHealthKit(): Promise<void> {
    try {
      console.log('Initializing HealthKit...');
    } catch (error) {
      console.error('Failed to initialize HealthKit:', error);
    }
  }

  async requestPermissions(): Promise<HealthPermissions> {
    if (this.config.platform === 'healthConnect') {
      return this.requestHealthConnectPermissions();
    } else if (this.config.platform === 'healthKit') {
      return this.requestHealthKitPermissions();
    }
    return this.config.permissions;
  }

  private async requestHealthConnectPermissions(): Promise<HealthPermissions> {
    try {
      this.config.permissions = {
        steps: true,
        distance: true,
        calories: true,
        heartRate: true,
        sleep: true,
        workouts: true,
        floorsClimbed: true,
      };
    } catch (error) {
      console.error('Failed to request Health Connect permissions:', error);
    }
    return this.config.permissions;
  }

  private async requestHealthKitPermissions(): Promise<HealthPermissions> {
    try {
      this.config.permissions = {
        steps: true,
        distance: true,
        calories: true,
        heartRate: true,
        sleep: true,
        workouts: true,
        floorsClimbed: true,
      };
    } catch (error) {
      console.error('Failed to request HealthKit permissions:', error);
    }
    return this.config.permissions;
  }

  async getDailySummary(date: Date = new Date()): Promise<DailySummary> {
    const dateStr = date.toISOString().split('T')[0];
    
    const mockData: DailySummary = {
      date: dateStr,
      steps: 8420,
      stepsGoal: Config.health.defaultStepGoal,
      stepsProgress: 84,
      distance: 6.2,
      activeMinutes: 45,
      activeMinutesGoal: Config.health.defaultActiveMinutesGoal,
      activeMinutesProgress: 75,
      calories: 2150,
      floorsClimbed: 8,
      averageHeartRate: 72,
      restingHeartRate: 58,
      sleepHours: 7.2,
      sleepGoal: Config.health.defaultSleepGoalHours,
      sleepProgress: 90,
      hydrationMl: 1800,
      hydrationGoal: Config.health.defaultHydrationGoalMl,
      hydrationProgress: 72,
      readinessScore: 94,
      workoutCount: 1,
    };

    return mockData;
  }

  async getWeeklySummary(endDate: Date = new Date()): Promise<WeeklySummary> {
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const mockData: WeeklySummary = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      totalSteps: 71360,
      averageSteps: 10194,
      totalDistance: 52.4,
      totalActiveMinutes: 315,
      averageActiveMinutes: 45,
      totalCalories: 15050,
      averageSleepHours: 7.2,
      averageHeartRate: 70,
      workoutCount: 5,
      activeDays: 6,
      bestDay: 'Saturday',
      improvement: 12,
    };

    return mockData;
  }

  async getHealthData(date: Date = new Date()): Promise<HealthData> {
    const dateStr = date.toISOString().split('T')[0];

    const mockData: HealthData = {
      date: dateStr,
      steps: 8420,
      distance: 6.2,
      activeMinutes: 45,
      calories: 2150,
      floorsClimbed: 8,
      heartRate: {
        average: 72,
        min: 52,
        max: 145,
        resting: 58,
        samples: [],
      },
      sleep: {
        totalMinutes: 432,
        startTime: '23:15:00',
        endTime: '06:27:00',
        stages: [
          { stage: 'light', startTime: '23:15:00', endTime: '00:30:00', durationMinutes: 75 },
          { stage: 'deep', startTime: '00:30:00', endTime: '02:00:00', durationMinutes: 90 },
          { stage: 'rem', startTime: '02:00:00', endTime: '03:30:00', durationMinutes: 90 },
          { stage: 'light', startTime: '03:30:00', endTime: '05:00:00', durationMinutes: 90 },
          { stage: 'rem', startTime: '05:00:00', endTime: '06:27:00', durationMinutes: 87 },
        ],
      },
      workouts: [
        {
          id: 'w1',
          type: 'running',
          startTime: '06:30:00',
          endTime: '07:15:00',
          durationMinutes: 45,
          calories: 450,
          distance: 5.2,
          steps: 6500,
          averageHeartRate: 142,
        },
      ],
    };

    return mockData;
  }

  getConfig(): HealthServiceConfig {
    return this.config;
  }

  isAvailable(): boolean {
    return this.config.platform !== 'none';
  }

  hasPermission(type: keyof HealthPermissions): boolean {
    return this.config.permissions[type];
  }
}

export const healthService = new HealthService();
