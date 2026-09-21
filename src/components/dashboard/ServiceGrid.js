import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

const SHORTCUTS = [
  { icon: 'call-outline', labelKey: 'svcRecharge', color: '#3B82F6' },
  { icon: 'phone-portrait-outline', labelKey: 'svcPhones', color: '#22C55E' },
  { icon: 'swap-horizontal-outline', labelKey: 'svcAccessories', color: '#6366F1' },
  { icon: 'alarm-outline', labelKey: 'svcEmergency', color: '#EF4444' },
];

export default function ServiceGrid({ onSelect }) {
  const { t, colors } = useApp();
  return (
    <>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('services')}</Text>
      <View style={styles.svcRow}>
        {SHORTCUTS.map((s) => (
          <Pressable
            key={s.labelKey}
            onPress={() => onSelect && onSelect({ ...s, label: t(s.labelKey) })}
            style={({ pressed }) => [styles.svcItem, pressed && styles.svcBtnPressed]}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.svcCircle, { borderColor: `${s.color}55` }]}
            >
              <Ionicons name={s.icon} size={26} color={s.color} />
            </LinearGradient>
            <Text style={[styles.svcLabel, { color: colors.subtext }]}>{t(s.labelKey)}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}
