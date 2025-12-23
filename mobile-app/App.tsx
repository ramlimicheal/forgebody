import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import {
  DashboardScreen,
  WorkoutsScreen,
  NutritionScreen,
  SocialScreen,
  CoachScreen,
  DevicesScreen,
} from './src/screens';
import { Colors, FontSizes, Spacing, BorderRadius } from './src/constants/colors';

const Tab = createBottomTabNavigator();

type FeatherIconName = 'activity' | 'target' | 'coffee' | 'users' | 'cpu' | 'watch' | 'smartphone';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, FeatherIconName> = {
    Dashboard: 'activity',
    Workouts: 'target',
    Nutrition: 'coffee',
    Social: 'users',
    Coach: 'cpu',
    Devices: 'watch',
  };

  const iconName = icons[name] || 'smartphone';

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
      <Feather 
        name={iconName} 
        size={20} 
        color={focused ? Colors.accent : Colors.textMuted} 
      />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Feather name="zap" size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.logoText}>FORGEBODY</Text>
      </View>
      <View style={styles.syncStatus}>
        <View style={styles.syncDot} />
        <Text style={styles.syncText}>LIVE</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
            tabBarActiveTintColor: Colors.accent,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.tabBarItem,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Workouts" component={WorkoutsScreen} />
          <Tab.Screen name="Nutrition" component={NutritionScreen} />
          <Tab.Screen name="Social" component={SocialScreen} />
          <Tab.Screen name="Coach" component={CoachScreen} />
          <Tab.Screen name="Devices" component={DevicesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoIcon: {
    width: 36,
    height: 36,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 16,
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
    backgroundColor: Colors.accentMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
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
    color: Colors.accent,
    letterSpacing: 1,
  },
  tabBar: {
    backgroundColor: Colors.background,
    borderTopWidth: 0,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    height: 72,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  tabBarItem: {
    paddingVertical: Spacing.xs,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerActive: {
    backgroundColor: Colors.accentMuted,
  },
});
