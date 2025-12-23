import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { healthService, DailySummary } from './src/services/health';
import { Colors, Spacing, FontSizes, BorderRadius } from './src/constants/colors';

function StatCard({
  title,
  value,
  unit,
  progress,
  color = Colors.accent,
}: {
  title: string;
  value: string | number;
  unit: string;
  progress?: number;
  color?: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progress, 100)}%`, backgroundColor: color },
            ]}
          />
        </View>
      )}
    </View>
  );
}

function ReadinessRing({ score }: { score: number }) {
  return (
    <View style={styles.readinessContainer}>
      <View style={styles.readinessRing}>
        <Text style={styles.readinessScore}>{score}</Text>
        <Text style={styles.readinessLabel}>/ 100</Text>
      </View>
      <View style={styles.readinessInfo}>
        <Text style={styles.readinessTitle}>PEAK PERFORMANCE</Text>
        <Text style={styles.readinessDescription}>
          Your body is fully recovered. Push for maximum intensity today.
        </Text>
      </View>
    </View>
  );
}

export default function App() {
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      await healthService.initialize();
      const dailySummary = await healthService.getDailySummary();
      setSummary(dailySummary);
    } catch (error) {
      console.error('Failed to load health data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading health data...</Text>
        </View>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>⚡</Text>
          </View>
          <Text style={styles.logoText}>FORGEBODY</Text>
        </View>
        <View style={styles.syncStatus}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>SYNCED</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>LIVE TELEMETRY</Text>
          <Text style={styles.heroTitle}>Physio Briefing</Text>
          <Text style={styles.heroSubtitle}>
            Core Readiness: <Text style={styles.heroAccent}>{summary?.readinessScore || 94}%</Text> — CNS Primed
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="STEPS"
            value={summary?.steps.toLocaleString() || '8,420'}
            unit={`/ ${(summary?.stepsGoal || 10000).toLocaleString()}`}
            progress={summary?.stepsProgress || 84}
          />
          <StatCard
            title="ACTIVE MIN"
            value={summary?.activeMinutes || 45}
            unit={`/ ${summary?.activeMinutesGoal || 60} min`}
            progress={summary?.activeMinutesProgress || 75}
            color={Colors.warning}
          />
          <StatCard
            title="SLEEP"
            value={summary?.sleepHours?.toFixed(1) || '7.2'}
            unit={`/ ${summary?.sleepGoal || 8} hrs`}
            progress={summary?.sleepProgress || 90}
            color="#6366F1"
          />
          <StatCard
            title="HYDRATION"
            value={(summary?.hydrationMl || 1800).toLocaleString()}
            unit={`/ ${(summary?.hydrationGoal || 2500).toLocaleString()} ml`}
            progress={summary?.hydrationProgress || 72}
            color="#06B6D4"
          />
        </View>

        <View style={styles.readinessSection}>
          <Text style={styles.sectionTitle}>READINESS SCORE</Text>
          <ReadinessRing score={summary?.readinessScore || 94} />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💧</Text>
              <Text style={styles.actionText}>Log Water</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🏃</Text>
              <Text style={styles.actionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>View Trends</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.deviceSection}>
          <Text style={styles.sectionTitle}>CONNECTED DEVICES</Text>
          <View style={styles.deviceCard}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>Phone Sensors</Text>
              <Text style={styles.deviceStatus}>Active - Steps, Distance</Text>
            </View>
            <View style={styles.deviceConnected}>
              <View style={styles.connectedDot} />
            </View>
          </View>
          <TouchableOpacity style={styles.addDeviceButton}>
            <Text style={styles.addDeviceText}>+ Add Smartwatch</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ForgeBody works with your phone alone OR any smartwatch
          </Text>
          <Text style={styles.footerBrands}>
            Xiaomi • Fire-Boltt • boAt • Noise • Pebble • Amazfit • Fitbit
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoIcon: {
    width: 28,
    height: 28,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 14,
  },
  logoText: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
    letterSpacing: 2,
    color: Colors.primary,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  syncText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  heroLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  heroTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  heroAccent: {
    color: Colors.accent,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  statTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.primary,
  },
  statUnit: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginLeft: Spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  readinessSection: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  readinessContainer: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  readinessRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  readinessScore: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  readinessLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondaryDark,
  },
  readinessInfo: {
    flex: 1,
  },
  readinessTitle: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  readinessDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondaryDark,
    lineHeight: 20,
  },
  quickActions: {
    padding: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  actionText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  deviceSection: {
    padding: Spacing.lg,
  },
  deviceCard: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  deviceStatus: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  deviceConnected: {
    padding: Spacing.sm,
  },
  connectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
  },
  addDeviceButton: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  addDeviceText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  footerBrands: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
