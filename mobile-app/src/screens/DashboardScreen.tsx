import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';
import { healthService, DailySummary } from '../services/health';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/colors';

const { width } = Dimensions.get('window');

type StatIconName = 'foot-print' | 'clock-outline' | 'sleep' | 'water-outline';

function CircularProgress({
  progress,
  size = 80,
  strokeWidth = 8,
  color = Colors.accent,
  showDots = true,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showDots?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressOffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {showDots ? (
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={Colors.progressTrack}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray="4 4"
            />
          ) : (
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={Colors.progressTrack}
              strokeWidth={strokeWidth}
              fill="none"
            />
          )}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
}

function StatCard({
  title,
  value,
  unit,
  progress,
  color = Colors.accent,
  iconName,
}: {
  title: string;
  value: string | number;
  unit: string;
  progress?: number;
  color?: string;
  iconName: StatIconName;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statCardContent}>
        <View style={[styles.iconBadge, { backgroundColor: `${color}15` }]}>
          <MaterialCommunityIcons name={iconName} size={20} color={color} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.statValueContainer}>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
        </View>
      </View>
      {progress !== undefined && (
        <View style={styles.statProgressContainer}>
          <CircularProgress progress={progress} size={56} strokeWidth={6} color={color} />
          <Text style={[styles.progressText, { color }]}>{progress}%</Text>
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

  const color = getScoreColor();

  return (
    <View style={styles.readinessCard}>
      <View style={styles.readinessContent}>
        <View style={styles.readinessRingContainer}>
          <CircularProgress 
            progress={score} 
            size={120} 
            strokeWidth={10} 
            color={color} 
            showDots={true}
          />
          <View style={styles.readinessScoreOverlay}>
            <Text style={styles.readinessScore}>{score}</Text>
            <Text style={styles.readinessScoreLabel}>/ 100</Text>
          </View>
        </View>
        <View style={styles.readinessInfo}>
          <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
            <View style={[styles.statusDot, { backgroundColor: color }]} />
            <Text style={[styles.statusText, { color }]}>{getScoreLabel()}</Text>
          </View>
          <Text style={styles.readinessDescription}>
            {score >= 85
              ? 'Your body is fully recovered. Push for maximum intensity today.'
              : score >= 70
              ? 'Good recovery. Moderate intensity recommended.'
              : 'Consider rest or light activity today.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

type ContributorIconName = 'sleep' | 'heart-pulse' | 'run' | 'restore' | 'foot-print' | 'water-outline';

function ContributorItem({
  iconName,
  label,
  value,
  status,
}: {
  iconName: ContributorIconName;
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

  const color = statusColors[status];

  return (
    <View style={styles.contributorCard}>
      <View style={[styles.contributorIconBadge, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={iconName} size={20} color={color} />
      </View>
      <Text style={styles.contributorLabel}>{label}</Text>
      <View style={styles.contributorValueContainer}>
        <CircularProgress progress={value} size={44} strokeWidth={4} color={color} showDots={false} />
        <Text style={[styles.contributorValue, { color }]}>{value}%</Text>
      </View>
    </View>
  );
}

function QuickActionButton({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <View style={styles.quickActionIconContainer}>
        <Feather name={icon as any} size={20} color={Colors.accent} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
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
          <CircularProgress progress={75} size={80} strokeWidth={6} color={Colors.accent} />
          <View style={styles.loadingIconOverlay}>
            <Feather name="zap" size={24} color={Colors.accent} />
          </View>
        </View>
        <Text style={styles.loadingText}>Syncing health data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.headerTitle}>Physio Briefing</Text>
        </View>
        <View style={styles.syncBadge}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>SYNCED</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard
            iconName="foot-print"
            title="Steps"
            value={(summary?.steps || 8420).toLocaleString()}
            unit={`/ ${(summary?.stepsGoal || 10000).toLocaleString()}`}
            progress={summary?.stepsProgress || 84}
            color={Colors.accent}
          />
          <StatCard
            iconName="clock-outline"
            title="Active"
            value={summary?.activeMinutes || 45}
            unit={`/ ${summary?.activeMinutesGoal || 60} min`}
            progress={summary?.activeMinutesProgress || 75}
            color={Colors.warning}
          />
          <StatCard
            iconName="sleep"
            title="Sleep"
            value={summary?.sleepHours?.toFixed(1) || '7.2'}
            unit={`/ ${summary?.sleepGoal || 8} hrs`}
            progress={summary?.sleepProgress || 90}
            color="#6366F1"
          />
          <StatCard
            iconName="water-outline"
            title="Hydration"
            value={((summary?.hydrationMl || 1800) / 1000).toFixed(1)}
            unit={`/ ${(summary?.hydrationGoal || 2500) / 1000}L`}
            progress={summary?.hydrationProgress || 72}
            color="#06B6D4"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Readiness Score</Text>
        <ReadinessRing score={summary?.readinessScore || 94} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contributors</Text>
        <View style={styles.contributorsGrid}>
          <ContributorItem iconName="sleep" label="Sleep" value={92} status="optimal" />
          <ContributorItem iconName="heart-pulse" label="Heart" value={88} status="optimal" />
          <ContributorItem iconName="run" label="Activity" value={85} status="good" />
          <ContributorItem iconName="restore" label="Recovery" value={78} status="good" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <QuickActionButton icon="droplet" label="Log Water" />
          <QuickActionButton icon="target" label="Workout" />
          <QuickActionButton icon="coffee" label="Log Meal" />
          <QuickActionButton icon="trending-up" label="Trends" />
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>AI Insight</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIconBadge}>
              <Feather name="cpu" size={18} color={Colors.accent} />
            </View>
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
            <Feather name="arrow-right" size={16} color="#FFFFFF" />
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
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  loadingIconOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  greeting: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.primary,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginRight: Spacing.sm,
  },
  syncText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  lastSection: {
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadows.md,
  },
  statCardContent: {
    flex: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
  },
  statUnit: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginLeft: Spacing.xs,
  },
  statProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  readinessCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  readinessContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readinessRingContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  readinessScoreOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  readinessScore: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  readinessScoreLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondaryDark,
  },
  readinessInfo: {
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  readinessDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondaryDark,
    lineHeight: 20,
  },
  contributorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  contributorCard: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  contributorIconBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  contributorLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  contributorValueContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contributorValue: {
    position: 'absolute',
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  insightCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  insightIconBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  insightBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  insightBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  insightTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  insightText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  insightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  insightButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
