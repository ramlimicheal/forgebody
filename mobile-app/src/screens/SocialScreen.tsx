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
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/colors';

const { width } = Dimensions.get('window');

interface Activity {
  id: string;
  user: {
    name: string;
    initials: string;
  };
  type: 'workout' | 'achievement' | 'milestone' | 'challenge';
  title: string;
  description: string;
  time: string;
  likes: number;
  comments: number;
}

interface Challenge {
  id: string;
  name: string;
  icon: string;
  participants: number;
  progress: number;
  goal: number;
  unit: string;
  daysLeft: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  initials: string;
  score: number;
  change: 'up' | 'down' | 'same';
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: { name: 'Priya Sharma', initials: 'PS' },
    type: 'workout',
    title: 'Completed Morning Yoga',
    description: '45 min flow session - feeling energized!',
    time: '2 hours ago',
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    user: { name: 'Rahul Verma', initials: 'RV' },
    type: 'achievement',
    title: 'Unlocked: Iron Will',
    description: 'Completed 30-day workout streak!',
    time: '4 hours ago',
    likes: 89,
    comments: 12,
  },
  {
    id: '3',
    user: { name: 'Ananya Patel', initials: 'AP' },
    type: 'milestone',
    title: '10,000 Steps Achieved',
    description: 'Hit my daily step goal for the 7th day in a row',
    time: '5 hours ago',
    likes: 45,
    comments: 8,
  },
  {
    id: '4',
    user: { name: 'Vikram Singh', initials: 'VS' },
    type: 'workout',
    title: 'New PR: Deadlift 180kg',
    description: 'Finally hit my goal! 6 months of consistent training paid off.',
    time: '8 hours ago',
    likes: 156,
    comments: 23,
  },
];

type ChallengeIconName = 'shoe-print' | 'arm-flex' | 'water';

const MOCK_CHALLENGES: (Omit<Challenge, 'icon'> & { iconName: ChallengeIconName })[] = [
  {
    id: '1',
    name: 'December Step Challenge',
    iconName: 'shoe-print',
    participants: 1234,
    progress: 245000,
    goal: 300000,
    unit: 'steps',
    daysLeft: 8,
  },
  {
    id: '2',
    name: 'Workout Warrior',
    iconName: 'arm-flex',
    participants: 567,
    progress: 16,
    goal: 20,
    unit: 'workouts',
    daysLeft: 8,
  },
  {
    id: '3',
    name: 'Hydration Hero',
    iconName: 'water',
    participants: 890,
    progress: 18,
    goal: 25,
    unit: 'liters',
    daysLeft: 8,
  },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Arjun Mehta', initials: 'AM', score: 12450, change: 'same' },
  { rank: 2, name: 'Sneha Reddy', initials: 'SR', score: 11890, change: 'up' },
  { rank: 3, name: 'Karan Patel', initials: 'KP', score: 11234, change: 'down' },
  { rank: 4, name: 'Priya Sharma', initials: 'PS', score: 10567, change: 'up' },
  { rank: 5, name: 'Rahul Verma', initials: 'RV', score: 9890, change: 'same' },
  { rank: 42, name: 'You', initials: 'AH', score: 5420, change: 'up' },
];

function ActivityCard({ activity }: { activity: Activity }) {
  const typeColors = {
    workout: Colors.accent,
    achievement: Colors.warning,
    milestone: '#6366F1',
    challenge: '#EC4899',
  };

  const typeIcons: Record<Activity['type'], 'arm-flex' | 'trophy' | 'target' | 'fire'> = {
    workout: 'arm-flex',
    achievement: 'trophy',
    milestone: 'target',
    challenge: 'fire',
  };

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={[styles.avatar, { backgroundColor: typeColors[activity.type] + '20' }]}>
          <Text style={[styles.avatarText, { color: typeColors[activity.type] }]}>
            {activity.user.initials}
          </Text>
        </View>
        <View style={styles.activityUserInfo}>
          <View style={styles.activityUserRow}>
            <Text style={styles.activityUserName}>{activity.user.name}</Text>
            <View style={[styles.typeBadge, { backgroundColor: typeColors[activity.type] + '20' }]}>
              <Text style={[styles.typeBadgeText, { color: typeColors[activity.type] }]}>
                {activity.type.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
        <MaterialCommunityIcons name={typeIcons[activity.type]} size={24} color={typeColors[activity.type]} />
      </View>
      <Text style={styles.activityTitle}>{activity.title}</Text>
      <Text style={styles.activityDescription}>{activity.description}</Text>
      <View style={styles.activityActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="heart" size={18} color={Colors.textSecondary} />
          <Text style={styles.actionCount}>{activity.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={18} color={Colors.textSecondary} />
          <Text style={styles.actionCount}>{activity.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="share" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ChallengeCard({ challenge }: { challenge: typeof MOCK_CHALLENGES[0] }) {
  const progress = (challenge.progress / challenge.goal) * 100;

  return (
    <TouchableOpacity style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <MaterialCommunityIcons name={challenge.iconName} size={32} color={Colors.accent} style={styles.challengeIcon} />
        <View style={styles.challengeInfo}>
          <Text style={styles.challengeName}>{challenge.name}</Text>
          <Text style={styles.challengeParticipants}>
            {challenge.participants.toLocaleString()} participants
          </Text>
        </View>
        <View style={styles.daysLeftBadge}>
          <Text style={styles.daysLeftText}>{challenge.daysLeft}d left</Text>
        </View>
      </View>
      <View style={styles.challengeProgress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {challenge.progress.toLocaleString()} / {challenge.goal.toLocaleString()} {challenge.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function LeaderboardRow({ entry, isYou }: { entry: LeaderboardEntry; isYou: boolean }) {
  const getRankStyle = () => {
    if (entry.rank === 1) return { backgroundColor: '#FFD700' };
    if (entry.rank === 2) return { backgroundColor: '#C0C0C0' };
    if (entry.rank === 3) return { backgroundColor: '#CD7F32' };
    return { backgroundColor: Colors.surface };
  };

  const changeIcons = {
    up: '↑',
    down: '↓',
    same: '−',
  };

  const changeColors = {
    up: Colors.accent,
    down: Colors.error,
    same: Colors.textMuted,
  };

  return (
    <View style={[styles.leaderboardRow, isYou && styles.leaderboardRowYou]}>
      <View style={[styles.rankBadge, getRankStyle()]}>
        <Text style={[styles.rankText, entry.rank <= 3 && styles.rankTextTop]}>
          {entry.rank}
        </Text>
      </View>
      <View style={styles.leaderboardAvatar}>
        <Text style={styles.leaderboardAvatarText}>{entry.initials}</Text>
      </View>
      <Text style={[styles.leaderboardName, isYou && styles.leaderboardNameYou]}>
        {entry.name}
      </Text>
      <Text style={[styles.changeIcon, { color: changeColors[entry.change] }]}>
        {changeIcons[entry.change]}
      </Text>
      <Text style={styles.leaderboardScore}>{entry.score.toLocaleString()}</Text>
    </View>
  );
}

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard'>('feed');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>COMMUNITY</Text>
          <Text style={styles.headerTitle}>Social Hub</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>+ Share Update</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['feed', 'challenges', 'leaderboard'] as const).map((tab) => (
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
        {activeTab === 'feed' && (
          <View style={styles.feedContainer}>
            {MOCK_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </View>
        )}

        {activeTab === 'challenges' && (
          <View style={styles.challengesContainer}>
            <Text style={styles.sectionTitle}>ACTIVE CHALLENGES</Text>
            {MOCK_CHALLENGES.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse All Challenges</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View style={styles.leaderboardContainer}>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.sectionTitle}>GLOBAL RANKING</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>This Week</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.leaderboardCard}>
              {MOCK_LEADERBOARD.map((entry) => (
                <LeaderboardRow
                  key={entry.rank}
                  entry={entry}
                  isYou={entry.name === 'You'}
                />
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
    paddingTop: Spacing.xl,
  },
  headerLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.primary,
  },
  shareButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  shareButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
  },
  activeTab: {
    backgroundColor: Colors.accent,
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
  },
  feedContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  activityCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  activityUserInfo: {
    flex: 1,
  },
  activityUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  activityUserName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  typeBadge: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  typeBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activityTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  activityDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  activityActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionCount: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  challengesContainer: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  challengeCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  challengeIcon: {
    fontSize: 32,
    marginRight: Spacing.sm,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  challengeParticipants: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  daysLeftBadge: {
    backgroundColor: Colors.accentLight,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  daysLeftText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
  },
  challengeProgress: {
    gap: Spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  browseButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  browseButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  leaderboardContainer: {
    padding: Spacing.lg,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  filterButton: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  filterButtonText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  leaderboardCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadows.md,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leaderboardRowYou: {
    backgroundColor: Colors.accentLight,
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  rankText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rankTextTop: {
    color: '#FFFFFF',
  },
  leaderboardAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  leaderboardAvatarText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  leaderboardName: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  leaderboardNameYou: {
    fontWeight: '800',
    color: Colors.accent,
  },
  changeIcon: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginRight: Spacing.sm,
  },
  leaderboardScore: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
});
