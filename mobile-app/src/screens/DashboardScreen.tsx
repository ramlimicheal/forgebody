import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { healthService, DailySummary } from '../services/health';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 2 - Spacing.md) / 2;

function StatCard({
  title,
  value,
  unit,
  progress,
  color = Colors.accent,
  icon,
}: {
  title: string;
  value: string | number;
  unit: string;
  progress?: number;
  color?: string;
  icon: string;
}) {
  return (
    <View style={[styles.statCard, { width: CARD_WIDTH }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <View style={styles.statValueRow}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
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
  const getScoreColor = () => {
    if (score >= 85) return Colors.accent;
    if (score >= 70) return Colors.warning;
    return Colors.error;
  };

  const getScoreLabel = () => {
    if (score >= 85) return 'PEAK PERFORMANCE';
    if (score >= 70) return 'GOOD CONDITION';
    return 'RECOVERY NEEDED';
  };

  return (
    <View style={styles.readinessContainer}>
      <View style={[styles.readinessRing, { borderColor: getScoreColor() }]}>
        <Text style={styles.readinessScore}>{score}</Text>
        <Text style={styles.readinessLabel}>/ 100</Text>
      </View>
      <View style={styles.readinessInfo}>
        <Text style={styles.readinessTitle}>{getScoreLabel()}</Text>
        <Text style={styles.readinessDescription}>
          {score >= 85
            ? 'Your body is fully recovered. Push for maximum intensity today.'
            : score >= 70
            ? 'Good recovery. Moderate intensity recommended.'
            : 'Consider rest or light activity today.'}
        </Text>
      </View>
    </View>
  );
}

function ContributorItem({
  icon,
  label,
  value,
  status,
}: {
  icon: string;
  label: string;
  value: number;
  status: 'optimal' | 'good' | 'fair' | 'poor';
}) {
  const statusColors = {
    optimal: Colors.accent,
    good: '#22C55E',
    fair: Colors.warning,
    poor: Colors.error,
  };

  return (
    <View style={styles.contributorItem}>
      <View style={styles.contributorLeft}>
        <Text style={styles.contributorIcon}>{icon}</Text>
        <Text style={styles.contributorLabel}>{label}</Text>
      </View>
      <View style={styles.contributorRight}>
        <View style={[styles.statusDot, { backgroundColor: statusColors[status] }]} />
        <Text style={[styles.contributorValue, { color: statusColors[status] }]}>
          {value}%
        </Text>
      </View>
    </View>
  );
}

export default function DashboardScreen() {
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
      <View style={styles.loadingContainer}>
        <View style={styles.loadingSpinner}>
          <Text style={styles.loadingIcon}>⚡</Text>
        </View>
        <Text style={styles.loadingText}>Syncing health data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroLabel}>LIVE TELEMETRY</Text>
          <View style={styles.syncBadge}>
            <View style={styles.syncDot} />
            <Text style={styles.syncText}>SYNCED</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Physio Briefing</Text>
        <Text style={styles.heroSubtitle}>
          Core Readiness:{' '}
          <Text style={styles.heroAccent}>{summary?.readinessScore || 94}%</Text> — CNS
          Primed
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="👟"
          title="STEPS"
          value={(summary?.steps || 8420).toLocaleString()}
          unit={`/ ${(summary?.stepsGoal || 10000).toLocaleString()}`}
          progress={summary?.stepsProgress || 84}
          color={Colors.accent}
        />
        <StatCard
          icon="⏱️"
          title="ACTIVE"
          value={summary?.activeMinutes || 45}
          unit={`/ ${summary?.activeMinutesGoal || 60} min`}
          progress={summary?.activeMinutesProgress || 75}
          color={Colors.warning}
        />
        <StatCard
          icon="😴"
          title="SLEEP"
          value={summary?.sleepHours?.toFixed(1) || '7.2'}
          unit={`/ ${summary?.sleepGoal || 8} hrs`}
          progress={summary?.sleepProgress || 90}
          color="#6366F1"
        />
        <StatCard
          icon="💧"
          title="HYDRATION"
          value={((summary?.hydrationMl || 1800) / 1000).toFixed(1)}
          unit={`/ ${(summary?.hydrationGoal || 2500) / 1000}L`}
          progress={summary?.hydrationProgress || 72}
          color="#06B6D4"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>READINESS SCORE</Text>
        <ReadinessRing score={summary?.readinessScore || 94} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTRIBUTORS</Text>
        <View style={styles.contributorsCard}>
          <ContributorItem icon="😴" label="Sleep Quality" value={92} status="optimal" />
          <ContributorItem icon="❤️" label="Heart Rate" value={88} status="optimal" />
          <ContributorItem icon="🏃" label="Activity Balance" value={85} status="good" />
          <ContributorItem icon="🔄" label="Recovery Time" value={78} status="good" />
          <ContributorItem icon="👟" label="Step Count" value={95} status="optimal" />
          <ContributorItem icon="💧" label="Hydration" value={72} status="fair" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>💧</Text>
            <Text style={styles.actionLabel}>Log Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🏋️</Text>
            <Text style={styles.actionLabel}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🍎</Text>
            <Text style={styles.actionLabel}>Log Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionLabel}>View Trends</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>AI INSIGHT</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Text style={styles.insightIcon}>🧠</Text>
            <View style={styles.insightBadge}>
              <Text style={styles.insightBadgeText}>RECOMMENDATION</Text>
            </View>
          </View>
          <Text style={styles.insightTitle}>Optimize Your Push Day</Text>
          <Text style={styles.insightText}>
            Based on your recovery score, consider adding 2.5kg to your bench press. Your
            RPE has been consistently below 8 on working sets.
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>Apply Suggestion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: Colors.background,
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  loadingIcon: {
    fontSize: 28,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  heroSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  heroLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 2,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginRight: Spacing.xs,
  },
  syncText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1,
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
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  statTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
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
  section: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  lastSection: {
    paddingBottom: Spacing.xxl,
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
  contributorsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  contributorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contributorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributorIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  contributorLabel: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  contributorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  contributorValue: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCard: {
    width: (width - Spacing.lg * 2 - Spacing.md * 3) / 4,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  actionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  insightBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  insightBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1,
  },
  insightTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  insightText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  insightButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
  },
  insightButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
