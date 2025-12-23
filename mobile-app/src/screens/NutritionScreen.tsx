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

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealGroup {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  icon: string;
  meals: Meal[];
}

type MealIconName = 'weather-sunset-up' | 'white-balance-sunny' | 'weather-night' | 'cookie';

const MOCK_MEALS: (Omit<MealGroup, 'icon'> & { iconName: MealIconName })[] = [
  {
    type: 'breakfast',
    iconName: 'weather-sunset-up',
    meals: [
      { id: '1', name: 'Oatmeal with Banana & Almonds', time: '07:30', calories: 420, protein: 15, carbs: 65, fat: 12 },
    ],
  },
  {
    type: 'lunch',
    iconName: 'white-balance-sunny',
    meals: [
      { id: '2', name: 'Grilled Chicken Salad', time: '13:00', calories: 550, protein: 45, carbs: 25, fat: 28 },
    ],
  },
  {
    type: 'dinner',
    iconName: 'weather-night',
    meals: [
      { id: '3', name: 'Salmon with Rice & Vegetables', time: '19:30', calories: 500, protein: 34, carbs: 65, fat: 14 },
    ],
  },
  {
    type: 'snack',
    iconName: 'cookie',
    meals: [
      { id: '4', name: 'Protein Shake', time: '10:00', calories: 180, protein: 30, carbs: 8, fat: 3 },
      { id: '5', name: 'Greek Yogurt with Berries', time: '16:00', calories: 200, protein: 18, carbs: 22, fat: 5 },
    ],
  },
];

const QUICK_FOODS = [
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31 },
  { name: 'Brown Rice (100g)', calories: 112, protein: 2.6 },
  { name: 'Eggs (1 large)', calories: 72, protein: 6 },
  { name: 'Paneer (100g)', calories: 265, protein: 18 },
  { name: 'Dal (100g)', calories: 116, protein: 9 },
  { name: 'Roti (1 piece)', calories: 71, protein: 2.7 },
];

function MacroCard({
  label,
  current,
  goal,
  color,
  unit = 'g',
}: {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
}) {
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <View style={[styles.macroCard, label === 'Calories' && styles.caloriesCard]}>
      <Text style={[styles.macroLabel, label === 'Calories' && styles.caloriesLabel]}>
        {label.toUpperCase()}
      </Text>
      <View style={styles.macroValueRow}>
        <Text style={[styles.macroValue, { color }, label === 'Calories' && styles.caloriesValue]}>
          {current}
        </Text>
        <Text style={[styles.macroGoal, label === 'Calories' && styles.caloriesGoal]}>
          / {goal}{unit !== 'g' ? '' : unit}
        </Text>
      </View>
      <View style={[styles.macroProgress, label === 'Calories' && styles.caloriesProgress]}>
        <View style={[styles.macroProgressFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.macroPercent, label === 'Calories' && styles.caloriesPercent]}>
        {Math.round(progress)}% of goal
      </Text>
    </View>
  );
}

function MealGroupCard({ group }: { group: typeof MOCK_MEALS[0] }) {
  const totalCalories = group.meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <View style={styles.mealGroupCard}>
      <View style={styles.mealGroupHeader}>
        <View style={styles.mealGroupLeft}>
          <MaterialCommunityIcons name={group.iconName} size={24} color={Colors.accent} style={styles.mealGroupIcon} />
          <View>
            <Text style={styles.mealGroupType}>
              {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
            </Text>
            <Text style={styles.mealGroupInfo}>
              {group.meals.length} items • {totalCalories} kcal
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addMealButton}>
          <Text style={styles.addMealText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      {group.meals.map((meal) => (
        <View key={meal.id} style={styles.mealItem}>
          <View style={styles.mealItemLeft}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealTime}>{meal.time}</Text>
          </View>
          <View style={styles.mealMacros}>
            <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
            <View style={styles.mealMacroRow}>
              <Text style={[styles.mealMacro, { color: '#6366F1' }]}>{meal.protein}g</Text>
              <Text style={[styles.mealMacro, { color: Colors.warning }]}>{meal.carbs}g</Text>
              <Text style={[styles.mealMacro, { color: '#EC4899' }]}>{meal.fat}g</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function NutritionScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'insights'>('today');

  const totalCalories = 1850;
  const totalProtein = 142;
  const totalCarbs = 185;
  const totalFat = 62;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>FUEL SYSTEM</Text>
          <Text style={styles.headerTitle}>Nutrition Tracker</Text>
        </View>
        <TouchableOpacity style={styles.logButton}>
          <Text style={styles.logButtonText}>+ Log Meal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['today', 'history', 'insights'] as const).map((tab) => (
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
        {activeTab === 'today' && (
          <>
            <View style={styles.macrosGrid}>
              <MacroCard
                label="Calories"
                current={totalCalories}
                goal={2400}
                color={Colors.accent}
                unit=" kcal"
              />
              <View style={styles.macrosRow}>
                <MacroCard label="Protein" current={totalProtein} goal={180} color="#6366F1" />
                <MacroCard label="Carbs" current={totalCarbs} goal={250} color={Colors.warning} />
                <MacroCard label="Fat" current={totalFat} goal={80} color="#EC4899" />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>TODAY'S MEALS</Text>
              {MOCK_MEALS.map((group) => (
                <MealGroupCard key={group.type} group={group} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>QUICK ADD</Text>
              <View style={styles.quickFoodsGrid}>
                {QUICK_FOODS.map((food, index) => (
                  <TouchableOpacity key={index} style={styles.quickFoodCard}>
                    <Text style={styles.quickFoodName}>{food.name}</Text>
                    <Text style={styles.quickFoodProtein}>{food.protein}g protein</Text>
                    <Text style={styles.quickFoodCalories}>{food.calories} kcal</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === 'history' && (
          <View style={styles.historyContainer}>
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = date.getDate();
              const calories = Math.floor(1800 + Math.random() * 600);
              const goal = 2400;
              const progress = (calories / goal) * 100;

              return (
                <TouchableOpacity key={i} style={styles.historyCard}>
                  <View style={styles.historyDate}>
                    <Text style={styles.historyDay}>{dayName}</Text>
                    <Text style={styles.historyNum}>{dayNum}</Text>
                  </View>
                  <View style={styles.historyProgress}>
                    <View style={styles.historyBar}>
                      <View
                        style={[
                          styles.historyBarFill,
                          {
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: progress > 100 ? Colors.error : Colors.accent,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.historyCalories}>{calories} / {goal} kcal</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {activeTab === 'insights' && (
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>🎯</Text>
              <Text style={styles.insightTitle}>Protein Target</Text>
              <Text style={styles.insightText}>
                You're hitting 79% of your protein goal on average. Try adding a protein shake post-workout.
              </Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>⏰</Text>
              <Text style={styles.insightTitle}>Meal Timing</Text>
              <Text style={styles.insightText}>
                Your dinner is typically late (after 8 PM). Earlier meals may improve sleep quality.
              </Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>💪</Text>
              <Text style={styles.insightTitle}>Macro Balance</Text>
              <Text style={styles.insightText}>
                Great job maintaining a 30/40/30 protein/carbs/fat ratio this week!
              </Text>
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
  logButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  logButtonText: {
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
  macrosGrid: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  macrosRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  macroCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  caloriesCard: {
    backgroundColor: Colors.primary,
    ...Shadows.lg,
  },
  macroLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  caloriesLabel: {
    color: Colors.textSecondaryDark,
  },
  macroValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  macroValue: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  caloriesValue: {
    fontSize: FontSizes.xxxl,
    color: '#FFFFFF',
  },
  macroGoal: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginLeft: Spacing.xs,
  },
  caloriesGoal: {
    color: Colors.textSecondaryDark,
  },
  macroProgress: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  caloriesProgress: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  macroPercent: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  caloriesPercent: {
    color: Colors.textSecondaryDark,
  },
  section: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  mealGroupCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  mealGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mealGroupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealGroupIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  mealGroupType: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  mealGroupInfo: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  addMealButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  addMealText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accent,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  mealItemLeft: {
    flex: 1,
  },
  mealName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  mealTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  mealMacros: {
    alignItems: 'flex-end',
  },
  mealCalories: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  mealMacroRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  mealMacro: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  quickFoodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickFoodCard: {
    width: (width - Spacing.lg * 2 - Spacing.sm * 2) / 3,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  quickFoodName: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  quickFoodProtein: {
    fontSize: FontSizes.xs,
    color: '#6366F1',
    marginBottom: 2,
  },
  quickFoodCalories: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  historyContainer: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  historyDate: {
    width: 50,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  historyDay: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  historyNum: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.primary,
  },
  historyProgress: {
    flex: 1,
  },
  historyBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  historyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  historyCalories: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  insightsContainer: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  insightCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  insightIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
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
  },
});
