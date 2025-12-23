# ForgeBody Mobile Companion App - Technical Architecture

## Overview

The ForgeBody Mobile Companion App serves as the bridge between phone sensors/health platforms and the ForgeBody web dashboard. It enables device-free health tracking by leveraging the phone's built-in sensors and integrating with Health Connect (Android) and HealthKit (iOS).

## Core Value Proposition

**"ForgeBody works with your phone alone OR any smartwatch"**

- No wearable device required to start tracking
- Seamless upgrade path when users add smartwatches
- Premium health insights from basic phone sensors

## Technical Stack

### Framework
- **React Native** with Expo (managed workflow for faster development)
- **TypeScript** for type safety
- **React Navigation** for navigation

### Health Data Integration
- **Android**: Health Connect API (react-native-health-connect)
- **iOS**: HealthKit (react-native-health)

### State Management & Storage
- **Zustand** for state management (lightweight, TypeScript-friendly)
- **AsyncStorage** for local persistence
- **React Query** for server state and caching

### Backend Sync
- REST API to ForgeBody backend
- Background sync using WorkManager (Android) / Background Tasks (iOS)

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA SOURCES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Phone Sensors│  │ Smartwatches │  │ Third-Party Apps     │   │
│  │ (Pedometer,  │  │ (Mi Band,    │  │ (Strava, Nike Run,   │   │
│  │  GPS, etc.)  │  │  Fire-Boltt) │  │  etc.)               │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                 │                      │               │
│         ▼                 ▼                      ▼               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           Health Connect (Android) / HealthKit (iOS)     │    │
│  │                    Unified Health Data Store             │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FORGEBODY MOBILE APP                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Health Data Service                    │   │
│  │  - Read steps, distance, active minutes                   │   │
│  │  - Read heart rate (if available from watch)              │   │
│  │  - Read sleep data (if available)                         │   │
│  │  - Read workout sessions                                  │   │
│  └─────────────────────────┬────────────────────────────────┘   │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Data Processing                        │   │
│  │  - Aggregate daily/weekly summaries                       │   │
│  │  - Calculate readiness scores                             │   │
│  │  - Generate local insights                                │   │
│  └─────────────────────────┬────────────────────────────────┘   │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Sync Service                           │   │
│  │  - Background sync to ForgeBody backend                   │   │
│  │  - Offline-first with queue                               │   │
│  │  - Conflict resolution                                    │   │
│  └─────────────────────────┬────────────────────────────────┘   │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FORGEBODY BACKEND                             │
├─────────────────────────────────────────────────────────────────┤
│  - User authentication                                           │
│  - Health data storage                                           │
│  - AI insights generation (Gemini)                               │
│  - Push notifications                                            │
└─────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FORGEBODY WEB DASHBOARD                       │
├─────────────────────────────────────────────────────────────────┤
│  - Real-time data visualization                                  │
│  - Goals and reports                                             │
│  - Settings and preferences                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Health Data Types

### Phone-Only (No Wearable Required)
| Data Type | Source | Accuracy |
|-----------|--------|----------|
| Steps | Pedometer sensor | High |
| Distance | GPS + Pedometer | High |
| Active Minutes | Motion detection | Medium |
| Calories (Active) | Calculated | Estimated |
| Workouts (Walk/Run) | GPS tracking | High |
| Floors Climbed | Barometer | Medium (device-dependent) |

### With Smartwatch
| Data Type | Source | Accuracy |
|-----------|--------|----------|
| Heart Rate | Watch sensor | High |
| Resting Heart Rate | Watch sensor | High |
| Sleep Duration | Watch sensor | Medium-High |
| Sleep Stages | Watch sensor | Medium |
| SpO2 | Watch sensor (if available) | Medium |
| Stress/HRV | Watch sensor (if available) | Medium |

## App Screens

### 1. Onboarding Flow
- Welcome screen
- Health permissions request (Health Connect / HealthKit)
- Account creation / login
- Initial sync

### 2. Home Dashboard
- Today's summary (steps, active minutes, calories)
- Readiness score
- Quick actions (log water, start workout)
- Sync status indicator

### 3. Activity Tab
- Daily/weekly/monthly activity charts
- Workout history
- Step trends

### 4. Health Tab
- Heart rate (if available)
- Sleep summary (if available)
- Hydration tracking (manual)

### 5. Settings
- Connected devices
- Sync preferences
- Notifications
- Account management

## API Endpoints (Backend)

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh

GET  /api/health/summary?date={date}
POST /api/health/sync
GET  /api/health/trends?metric={metric}&range={range}

GET  /api/goals
PUT  /api/goals/{goalId}

GET  /api/insights
POST /api/insights/generate
```

## Health Connect Integration (Android)

### Required Permissions
```kotlin
val permissions = setOf(
    HealthPermission.getReadPermission(StepsRecord::class),
    HealthPermission.getReadPermission(DistanceRecord::class),
    HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class),
    HealthPermission.getReadPermission(HeartRateRecord::class),
    HealthPermission.getReadPermission(SleepSessionRecord::class),
    HealthPermission.getReadPermission(ExerciseSessionRecord::class),
)
```

### Data Reading Pattern
```typescript
// React Native Health Connect usage
import { readRecords } from 'react-native-health-connect';

const getSteps = async (startDate: Date, endDate: Date) => {
  const result = await readRecords('Steps', {
    timeRangeFilter: {
      operator: 'between',
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    },
  });
  return result.reduce((sum, record) => sum + record.count, 0);
};
```

## HealthKit Integration (iOS)

### Required Permissions
```typescript
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
    write: [],
  },
};
```

## Background Sync Strategy

### Android (WorkManager)
- Periodic sync every 15 minutes (minimum allowed)
- Constraint: Network available
- Retry with exponential backoff

### iOS (Background Tasks)
- BGAppRefreshTask for periodic updates
- BGProcessingTask for larger syncs
- Constraint: Network available, device charging (for processing)

## Security Considerations

1. **Data Encryption**: All health data encrypted at rest and in transit
2. **Minimal Data Collection**: Only collect what's needed for features
3. **User Consent**: Clear permission dialogs explaining data usage
4. **Data Deletion**: Users can delete all their data at any time
5. **No Third-Party Sharing**: Health data never shared with advertisers

## Development Phases

### Phase 1: MVP (4-6 weeks)
- [ ] Project setup with Expo
- [ ] Health Connect integration (Android)
- [ ] Basic dashboard with steps/distance
- [ ] Manual hydration tracking
- [ ] Local data storage

### Phase 2: iOS Support (2-3 weeks)
- [ ] HealthKit integration
- [ ] Cross-platform testing
- [ ] App Store preparation

### Phase 3: Backend Integration (3-4 weeks)
- [ ] User authentication
- [ ] Cloud sync
- [ ] Web dashboard connection
- [ ] Push notifications

### Phase 4: Advanced Features (4-6 weeks)
- [ ] AI insights (Gemini integration)
- [ ] Social features
- [ ] Challenges and achievements
- [ ] Premium features

## File Structure

```
mobile-app/
├── app/                    # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx       # Home dashboard
│   │   ├── activity.tsx    # Activity tab
│   │   ├── health.tsx      # Health tab
│   │   └── settings.tsx    # Settings tab
│   ├── onboarding/
│   │   ├── welcome.tsx
│   │   ├── permissions.tsx
│   │   └── setup.tsx
│   └── _layout.tsx
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── charts/             # Chart components
│   └── cards/              # Card components
├── services/
│   ├── health/
│   │   ├── healthConnect.ts
│   │   ├── healthKit.ts
│   │   └── index.ts
│   ├── sync/
│   │   └── syncService.ts
│   └── api/
│       └── client.ts
├── stores/
│   ├── healthStore.ts
│   ├── userStore.ts
│   └── settingsStore.ts
├── utils/
│   ├── calculations.ts
│   └── formatting.ts
├── constants/
│   ├── colors.ts
│   └── config.ts
├── app.json
├── package.json
└── tsconfig.json
```

## Design System

The mobile app will follow the same design system as the web dashboard:

- **Primary Color**: #0F172A (slate-900)
- **Accent Color**: #10B981 (emerald-500)
- **Font**: Plus Jakarta Sans (headings), System font (body)
- **Style**: Sport-italic headings, tech-label for metadata
- **Dark Mode**: Full support from day one

## Next Steps

1. Initialize Expo project with TypeScript
2. Set up navigation structure
3. Implement Health Connect service
4. Build home dashboard UI
5. Add local storage for offline support
6. Test on Android devices
