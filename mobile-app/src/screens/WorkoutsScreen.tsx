import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/colors';

const { width } = Dimensions.get('window');

interface Workout {
  id: string;
  name: string;
  type: 'Strength' | 'HIIT' | 'Cardio' | 'Yoga';
  date: string;
  duration: number;
  exercises: number;
  sets: number;
  volume: number;
  calories: number;
  feeling: 'great' | 'good' | 'okay' | 'tired';
}

const MOCK_WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Push Day - Chest & Shoulders',
    type: 'Strength',
    date: 'Mon, Dec 23',
    duration: 65,
    exercises: 4,
    sets: 13,
    volume: 4800,
    calories: 420,
    feeling: 'great',
  },
  {
    id: '2',
    name: 'Morning HIIT Session',
    type: 'HIIT',
    date: 'Sun, Dec 22',
    duration: 30,
    exercises: 3,
    sets: 9,
    volume: 0,
    calories: 380,
    feeling: 'good',
  },
  {
    id: '3',
    name: 'Pull Day - Back & Biceps',
    type: 'Strength',
    date: 'Sat, Dec 21',
    duration: 55,
    exercises: 3,
    sets: 9,
    volume: 3500,
    calories: 350,
    feeling: 'okay',
  },
];

type TemplateIconName = 'arm-flex' | 'weight-lifter' | 'run-fast' | 'fire' | 'lightning-bolt' | 'meditation';

const WORKOUT_TEMPLATES: { id: string; name: string; exercises: number; iconName: TemplateIconName }[] = [
  { id: '1', name: 'Push Day', exercises: 5, iconName: 'arm-flex' },
  { id: '2', name: 'Pull Day', exercises: 5, iconName: 'weight-lifter' },
  { id: '3', name: 'Leg Day', exercises: 6, iconName: 'run-fast' },
  { id: '4', name: 'Full Body', exercises: 8, iconName: 'fire' },
  { id: '5', name: 'HIIT Cardio', exercises: 4, iconName: 'lightning-bolt' },
  { id: '6', name: 'Yoga Flow', exercises: 10, iconName: 'meditation' },
];

function WorkoutCard({ workout }: { workout: Workout }) {
  const typeColors = {
    Strength: Colors.accent,
    HIIT: Colors.warning,
    Cardio: '#6366F1',
    Yoga: '#EC4899',
  };

  const feelingColors = {
    great: Colors.accent,
    good: '#22C55E',
    okay: Colors.warning,
    tired: Colors.error,
  };

  return (
    <TouchableOpacity style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <View style={styles.workoutTypeContainer}>
          <View style={[styles.typeBadge, { backgroundColor: typeColors[workout.type] + '20' }]}>
            <Text style={[styles.typeBadgeText, { color: typeColors[workout.type] }]}>
              {workout.type.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.feelingDot, { backgroundColor: feelingColors[workout.feeling] }]} />
        </View>
        <View style={styles.workoutDate}>
          <Text style={styles.dateText}>{workout.date}</Text>
          <Text style={styles.durationText}>{workout.duration} min</Text>
        </View>
      </View>
      <Text style={styles.workoutName}>{workout.name}</Text>
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Exercises</Text>
          <Text style={styles.statValue}>{workout.exercises}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Sets</Text>
          <Text style={styles.statValue}>{workout.sets}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>{(workout.volume / 1000).toFixed(1)}k</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={[styles.statValue, { color: Colors.warning }]}>{workout.calories}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TemplateCard({ template }: { template: typeof WORKOUT_TEMPLATES[0] }) {
  return (
    <TouchableOpacity style={styles.templateCard}>
      <MaterialCommunityIcons name={template.iconName} size={32} color={Colors.accent} />
      <Text style={styles.templateName}>{template.name}</Text>
      <Text style={styles.templateExercises}>{template.exercises} exercises</Text>
    </TouchableOpacity>
  );
}

export default function WorkoutsScreen() {
  const [activeTab, setActiveTab] = useState<'history' | 'templates' | 'stats'>('history');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>TRAINING LOG</Text>
          <Text style={styles.headerTitle}>Workout Logger</Text>
        </View>
        <TouchableOpacity style={styles.logButton}>
          <Text style={styles.logButtonText}>+ Log Workout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['history', 'templates', 'stats'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'history' && (
          <View style={styles.workoutsList}>
            {MOCK_WORKOUTS.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </View>
        )}

        {activeTab === 'templates' && (
          <View style={styles.templatesGrid}>
            {WORKOUT_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </View>
        )}

        {activeTab === 'stats' && (
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>This Week</Text>
              <View style={styles.statsRow}>
                <View style={styles.statsItem}>
                  <Text style={styles.statsValue}>3</Text>
                  <Text style={styles.statsLabel}>Workouts</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={styles.statsValue}>8.3k</Text>
                  <Text style={styles.statsLabel}>Volume (kg)</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={[styles.statsValue, { color: Colors.warning }]}>1,150</Text>
                  <Text style={styles.statsLabel}>Calories</Text>
                </View>
              </View>
            </View>

            <View style={styles.muscleCard}>
              <Text style={styles.statsTitle}>Muscle Groups Hit</Text>
              {[
                { name: 'Chest', count: 2 },
                { name: 'Back', count: 3 },
                { name: 'Legs', count: 1 },
                { name: 'Shoulders', count: 2 },
                { name: 'Arms', count: 0 },
                { name: 'Core', count: 1 },
              ].map((muscle) => (
                <View key={muscle.name} style={styles.muscleRow}>
                  <Text style={styles.muscleName}>{muscle.name}</Text>
                  <View style={styles.muscleBar}>
                    <View
                      style={[
                        styles.muscleBarFill,
                        { width: `${(muscle.count / 3) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.muscleCount}>{muscle.count}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 2,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.primary,
  },
  logButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  logButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  workoutsList: {
    gap: Spacing.md,
  },
  workoutCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  workoutTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  typeBadge: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  typeBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  feelingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  workoutDate: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  durationText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  workoutName: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    color: Colors.primary,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  templateCard: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  templateIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  templateName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  templateExercises: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  statsContainer: {
    gap: Spacing.lg,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  statsTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsItem: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.accent,
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  muscleCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  muscleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  muscleName: {
    width: 80,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  muscleBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  muscleBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  muscleCount: {
    width: 20,
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'right',
  },
});
