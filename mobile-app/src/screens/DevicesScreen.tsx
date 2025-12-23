import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/colors';

const { width } = Dimensions.get('window');

interface ConnectedDevice {
  id: string;
  name: string;
  brand: string;
  type: 'smartwatch' | 'phone' | 'scale';
  status: 'connected' | 'syncing' | 'disconnected';
  battery: number;
  lastSync: string;
  metrics: string[];
}

interface SupportedBrand {
  id: string;
  name: string;
  logo: string;
  models: string[];
  popular: boolean;
}

const CONNECTED_DEVICES: ConnectedDevice[] = [
  {
    id: '1',
    name: 'Phone Sensors',
    brand: 'Android',
    type: 'phone',
    status: 'connected',
    battery: 85,
    lastSync: 'Just now',
    metrics: ['Steps', 'Distance', 'Active Minutes'],
  },
];

const SUPPORTED_BRANDS: SupportedBrand[] = [
  {
    id: '1',
    name: 'Xiaomi',
    logo: '⌚',
    models: ['Mi Band 8', 'Mi Band 7', 'Mi Band 6', 'Redmi Watch 3', 'Redmi Watch 2'],
    popular: true,
  },
  {
    id: '2',
    name: 'Fire-Boltt',
    logo: '🔥',
    models: ['Phoenix Pro', 'Ninja Call Pro', 'Ring 3', 'Visionary', 'Thunder'],
    popular: true,
  },
  {
    id: '3',
    name: 'boAt',
    logo: '⛵',
    models: ['Wave Lite', 'Storm Pro', 'Xtend Plus', 'Flash Edition', 'Primia'],
    popular: true,
  },
  {
    id: '4',
    name: 'Noise',
    logo: '🎵',
    models: ['ColorFit Pro 4', 'ColorFit Ultra 3', 'Pulse 2 Max', 'Icon 3', 'Twist Go'],
    popular: true,
  },
  {
    id: '5',
    name: 'Pebble',
    logo: '🪨',
    models: ['Cosmos Luxe', 'Alive', 'Frost', 'Pace Pro', 'Vienna'],
    popular: false,
  },
  {
    id: '6',
    name: 'Amazfit',
    logo: '🏃',
    models: ['GTR 4', 'GTS 4', 'Bip 3', 'Band 7', 'T-Rex 2'],
    popular: false,
  },
  {
    id: '7',
    name: 'Fitbit',
    logo: '💚',
    models: ['Charge 6', 'Versa 4', 'Sense 2', 'Inspire 3', 'Luxe'],
    popular: false,
  },
  {
    id: '8',
    name: 'Realme',
    logo: '📱',
    models: ['Watch 3 Pro', 'Watch S100', 'Band 2', 'TechLife Watch R100'],
    popular: false,
  },
];

function ConnectedDeviceCard({ device }: { device: ConnectedDevice }) {
  const statusColors = {
    connected: Colors.accent,
    syncing: Colors.warning,
    disconnected: Colors.error,
  };

  const typeIcons = {
    smartwatch: '⌚',
    phone: '📱',
    scale: '⚖️',
  };

  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceIconContainer}>
          <Text style={styles.deviceIcon}>{typeIcons[device.type]}</Text>
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceBrand}>{device.brand}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[device.status] + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColors[device.status] }]} />
          <Text style={[styles.statusText, { color: statusColors[device.status] }]}>
            {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.deviceMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🔋</Text>
          <Text style={styles.metaText}>{device.battery}%</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🔄</Text>
          <Text style={styles.metaText}>{device.lastSync}</Text>
        </View>
      </View>
      <View style={styles.metricsContainer}>
        <Text style={styles.metricsLabel}>TRACKING</Text>
        <View style={styles.metricsTags}>
          {device.metrics.map((metric, index) => (
            <View key={index} style={styles.metricTag}>
              <Text style={styles.metricTagText}>{metric}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function BrandCard({ brand, onPress }: { brand: SupportedBrand; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.brandCard} onPress={onPress}>
      <Text style={styles.brandLogo}>{brand.logo}</Text>
      <Text style={styles.brandName}>{brand.name}</Text>
      <Text style={styles.brandModels}>{brand.models.length} models</Text>
      {brand.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function DevicesScreen() {
  const [selectedBrand, setSelectedBrand] = useState<SupportedBrand | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>DEVICE HUB</Text>
          <Text style={styles.headerTitle}>Connected Devices</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Device</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIVE CONNECTIONS</Text>
          {CONNECTED_DEVICES.map((device) => (
            <ConnectedDeviceCard key={device.id} device={device} />
          ))}
          <TouchableOpacity style={styles.addDeviceCard}>
            <Text style={styles.addDeviceIcon}>+</Text>
            <Text style={styles.addDeviceText}>Connect a Smartwatch</Text>
            <Text style={styles.addDeviceSubtext}>
              Sync your health data automatically
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORTED BRANDS</Text>
          <Text style={styles.sectionSubtitle}>
            ForgeBody works with popular Indian smartwatch brands
          </Text>
          <View style={styles.brandsGrid}>
            {SUPPORTED_BRANDS.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onPress={() => setSelectedBrand(brand)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW IT WORKS</Text>
          <View style={styles.howItWorksCard}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Install Companion App</Text>
                <Text style={styles.stepDescription}>
                  Download your smartwatch's official app (Mi Fitness, boAt Crest, etc.)
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Enable Health Connect</Text>
                <Text style={styles.stepDescription}>
                  Allow the companion app to sync with Health Connect on Android
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Connect ForgeBody</Text>
                <Text style={styles.stepDescription}>
                  Grant ForgeBody permission to read your health data
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Enjoy Premium Insights</Text>
                <Text style={styles.stepDescription}>
                  Get WHOOP-level analytics from your budget smartwatch
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoTitle}>No Smartwatch? No Problem!</Text>
            <Text style={styles.infoText}>
              ForgeBody can track steps, distance, and active minutes using just your phone's
              sensors. Add a smartwatch later for heart rate, sleep, and more detailed metrics.
            </Text>
          </View>
        </View>
      </ScrollView>

      {selectedBrand && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalLogo}>{selectedBrand.logo}</Text>
              <Text style={styles.modalTitle}>{selectedBrand.name}</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setSelectedBrand(null)}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Supported Models</Text>
            <View style={styles.modelsList}>
              {selectedBrand.models.map((model, index) => (
                <View key={index} style={styles.modelItem}>
                  <Text style={styles.modelCheck}>✓</Text>
                  <Text style={styles.modelName}>{model}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelectedBrand(null)}
            >
              <Text style={styles.modalButtonText}>Connect {selectedBrand.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  addButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  addButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Spacing.lg,
  },
  lastSection: {
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  deviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  deviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  deviceIcon: {
    fontSize: 24,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  deviceBrand: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
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
  },
  deviceMeta: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  metaText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  metricsContainer: {},
  metricsLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  metricsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  metricTag: {
    backgroundColor: Colors.accentLight,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  metricTagText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accent,
  },
  addDeviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  addDeviceIcon: {
    fontSize: 32,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  addDeviceText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  addDeviceSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  brandCard: {
    width: (width - Spacing.lg * 2 - Spacing.md * 3) / 4,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  brandLogo: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  brandName: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },
  brandModels: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  popularBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.accent,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  howItWorksCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 340,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalLogo: {
    fontSize: 32,
    marginRight: Spacing.sm,
  },
  modalTitle: {
    flex: 1,
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.primary,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  modelsList: {
    marginBottom: Spacing.lg,
  },
  modelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modelCheck: {
    fontSize: 14,
    color: Colors.accent,
    marginRight: Spacing.sm,
  },
  modelName: {
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  modalButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
