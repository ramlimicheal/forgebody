import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/colors';

const { width } = Dimensions.get('window');

interface Insight {
  id: string;
  type: 'recommendation' | 'warning' | 'tip' | 'achievement';
  category: string;
  title: string;
  description: string;
  time: string;
  actionLabel?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  icon: string;
}

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'recommendation',
    category: 'workout',
    title: 'Optimize Your Push Day',
    description: 'Based on your recent performance, consider adding 2.5kg to your bench press. Your RPE has been consistently below 8 on working sets.',
    time: '1 hour ago',
    actionLabel: 'Update workout plan',
  },
  {
    id: '2',
    type: 'warning',
    category: 'recovery',
    title: 'Recovery Alert',
    description: 'Your HRV has dropped 15% over the past 3 days. Consider a deload day or active recovery session to prevent overtraining.',
    time: '2 hours ago',
    actionLabel: 'Schedule recovery',
  },
  {
    id: '3',
    type: 'tip',
    category: 'nutrition',
    title: 'Protein Timing',
    description: "You're hitting your protein goal, but distribution could be better. Try to consume 30-40g protein within 2 hours post-workout.",
    time: '4 hours ago',
  },
  {
    id: '4',
    type: 'achievement',
    category: 'general',
    title: 'Consistency Champion',
    description: "You've logged workouts for 21 consecutive days! This puts you in the top 5% of ForgeBody users.",
    time: '1 day ago',
  },
  {
    id: '5',
    type: 'recommendation',
    category: 'sleep',
    title: 'Sleep Optimization',
    description: 'Your deep sleep percentage has improved by 12% since you started going to bed before 10:30 PM. Maintain this schedule.',
    time: '1 day ago',
  },
];

const MOCK_CHAT: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Good morning! Based on your recovery score of 94%, today is a great day for high-intensity training. Your Push Day workout is scheduled - would you like me to suggest any modifications?",
    time: '08:00',
  },
  {
    id: '2',
    role: 'user',
    content: 'Yes, I want to focus more on chest today. Any suggestions?',
    time: '08:02',
  },
  {
    id: '3',
    role: 'assistant',
    content: "Great choice! I recommend adding an extra set of incline dumbbell press and replacing lateral raises with cable flyes. This will increase your chest volume by 20% while maintaining overall workout duration. Your current bench press 1RM suggests you can handle 4x8 at 75kg today.",
    time: '08:02',
  },
];

type PlanIconName = 'arm-flex' | 'fire' | 'lightning-bolt' | 'sprout';

const MOCK_PLANS: (Omit<TrainingPlan, 'icon'> & { iconName: PlanIconName })[] = [
  {
    id: '1',
    name: 'Strength Building',
    description: 'Progressive overload focused program for building raw strength',
    duration: '12 weeks',
    level: 'Intermediate',
    iconName: 'arm-flex',
  },
  {
    id: '2',
    name: 'Fat Loss',
    description: 'High-intensity program combining cardio and resistance training',
    duration: '8 weeks',
    level: 'All Levels',
    iconName: 'fire',
  },
  {
    id: '3',
    name: 'Athletic Performance',
    description: 'Sport-specific training for improved speed, agility, and power',
    duration: '10 weeks',
    level: 'Advanced',
    iconName: 'lightning-bolt',
  },
  {
    id: '4',
    name: 'Beginner Basics',
    description: 'Foundation program for those new to fitness',
    duration: '6 weeks',
    level: 'Beginner',
    iconName: 'sprout',
  },
];

function InsightCard({ insight }: { insight: Insight }) {
  const typeColors = {
    recommendation: Colors.accent,
    warning: Colors.warning,
    tip: '#6366F1',
    achievement: '#EC4899',
  };

  const typeIcons: Record<Insight['type'], 'lightbulb-on' | 'alert' | 'star' | 'trophy'> = {
    recommendation: 'lightbulb-on',
    warning: 'alert',
    tip: 'star',
    achievement: 'trophy',
  };

  return (
    <View style={[styles.insightCard, { borderLeftColor: typeColors[insight.type] }]}>
      <View style={styles.insightHeader}>
        <MaterialCommunityIcons name={typeIcons[insight.type]} size={24} color={typeColors[insight.type]} />
        <View style={styles.insightMeta}>
          <View style={[styles.typeBadge, { backgroundColor: typeColors[insight.type] + '20' }]}>
            <Text style={[styles.typeBadgeText, { color: typeColors[insight.type] }]}>
              {insight.type.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.categoryText}>{insight.category}</Text>
        </View>
        <Text style={styles.insightTime}>{insight.time}</Text>
      </View>
      <Text style={styles.insightTitle}>{insight.title}</Text>
      <Text style={styles.insightDescription}>{insight.description}</Text>
      {insight.actionLabel && (
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: typeColors[insight.type] }]}>
          <Text style={styles.actionButtonText}>{insight.actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.chatBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
      {!isUser && (
        <View style={styles.aiAvatar}>
          <MaterialCommunityIcons name="brain" size={20} color={Colors.accent} />
        </View>
      )}
      <View style={[styles.bubbleContent, isUser ? styles.userBubbleContent : styles.assistantBubbleContent]}>
        <Text style={[styles.bubbleText, isUser && styles.userBubbleText]}>{message.content}</Text>
        <Text style={[styles.bubbleTime, isUser && styles.userBubbleTime]}>{message.time}</Text>
      </View>
    </View>
  );
}

function PlanCard({ plan }: { plan: typeof MOCK_PLANS[0] }) {
  return (
    <TouchableOpacity style={styles.planCard}>
      <MaterialCommunityIcons name={plan.iconName} size={32} color={Colors.accent} style={styles.planIcon} />
      <View style={styles.planInfo}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planDescription}>{plan.description}</Text>
        <View style={styles.planMeta}>
          <Text style={styles.planDuration}>{plan.duration}</Text>
          <Text style={styles.planLevel}>{plan.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function CoachScreen() {
  const [activeTab, setActiveTab] = useState<'insights' | 'chat' | 'plans'>('insights');
  const [chatInput, setChatInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>NEURAL INTELLIGENCE</Text>
          <Text style={styles.headerTitle}>AI Coach</Text>
        </View>
        <View style={styles.aiActiveBadge}>
          <View style={styles.aiActiveDot} />
          <Text style={styles.aiActiveText}>AI ACTIVE</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {(['insights', 'chat', 'plans'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'chat' ? 'Chat with AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'insights' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.todayFocus}>
            <Text style={styles.sectionTitle}>TODAY'S FOCUS</Text>
            <View style={styles.focusCard}>
              <View style={styles.focusItem}>
                <MaterialCommunityIcons name="arm-flex" size={24} color={Colors.accent} style={styles.focusIcon} />
                <View>
                  <Text style={styles.focusLabel}>Push Day</Text>
                  <Text style={styles.focusDescription}>Recommended based on recovery</Text>
                </View>
              </View>
              <View style={styles.focusItem}>
                <MaterialCommunityIcons name="food-drumstick" size={24} color={Colors.accent} style={styles.focusIcon} />
                <View>
                  <Text style={styles.focusLabel}>High Protein Day</Text>
                  <Text style={styles.focusDescription}>180g target for muscle synthesis</Text>
                </View>
              </View>
              <View style={styles.focusItem}>
                <MaterialCommunityIcons name="sleep" size={24} color={Colors.accent} style={styles.focusIcon} />
                <View>
                  <Text style={styles.focusLabel}>Sleep by 10:30 PM</Text>
                  <Text style={styles.focusDescription}>Optimize recovery window</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>PERSONALIZED INSIGHTS</Text>
            {MOCK_INSIGHTS.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>
        </ScrollView>
      )}

      {activeTab === 'chat' && (
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatMessages} showsVerticalScrollIndicator={false}>
            {MOCK_CHAT.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </ScrollView>
          <View style={styles.chatInputContainer}>
            <View style={styles.quickSuggestions}>
              <TouchableOpacity style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>Modify workout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>Nutrition advice</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>Recovery tips</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask your AI coach..."
                placeholderTextColor={Colors.textMuted}
                value={chatInput}
                onChangeText={setChatInput}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {activeTab === 'plans' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.plansSection}>
            <Text style={styles.sectionTitle}>TRAINING PLANS</Text>
            <Text style={styles.plansSubtitle}>
              AI-generated programs tailored to your goals and fitness level
            </Text>
            {MOCK_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </View>
        </ScrollView>
      )}
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
  aiActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentMuted,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  aiActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginRight: Spacing.sm,
  },
  aiActiveText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 1,
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
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  todayFocus: {
    marginBottom: Spacing.lg,
  },
  focusCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  focusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  focusIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  focusLabel: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  focusDescription: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondaryDark,
  },
  insightsSection: {
    marginBottom: Spacing.xxl,
  },
  insightCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    ...Shadows.md,
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
  insightMeta: {
    flex: 1,
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
    letterSpacing: 0.5,
  },
  categoryText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  insightTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  insightTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  insightDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  actionButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
  },
  chatMessages: {
    flex: 1,
    padding: Spacing.lg,
  },
  chatBubble: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  assistantBubble: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  aiAvatarText: {
    fontSize: 18,
  },
  bubbleContent: {
    maxWidth: '80%',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
  },
  userBubbleContent: {
    backgroundColor: Colors.accent,
  },
  assistantBubbleContent: {
    backgroundColor: Colors.surface,
  },
  bubbleText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#FFFFFF',
  },
  bubbleTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  userBubbleTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  chatInputContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  quickSuggestions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  suggestionChip: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  suggestionText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  chatInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  plansSection: {
    marginBottom: Spacing.xxl,
  },
  plansSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  planIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  planDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  planMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  planDuration: {
    fontSize: FontSizes.xs,
    color: Colors.accent,
    fontWeight: '700',
  },
  planLevel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
