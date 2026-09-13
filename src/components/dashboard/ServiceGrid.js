import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const SHORTCUTS = [
  { icon: 'call-outline', label: 'تعبئة الرصيد', bg: '#E4A57B' },
  { icon: 'phone-portrait-sharp', label: 'الهواتف', bg: '#003527' },
  { icon: 'swap-horizontal-outline', label: 'الملحقات', bg: '#00496A' },
  { icon: 'book-outline', label: 'افهرس البضائع', bg: '#BA1A1A' },
  { icon: 'card-sharp', label: 'طوارئ', bg: '#BA1A1A' },
  { icon: 'receipt-outline', label: 'لفهرس الرقمي', bg: '#BA1A1A' },
];

export default function ServiceGrid({ onSelect }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Services</Text>
      {[SHORTCUTS.slice(0, 3), SHORTCUTS.slice(3, 6)].map((row, r) => (
        <View key={r} style={styles.serviceRow}>
          {row.map((s) => (
            <Pressable key={s.label} onPress={() => onSelect && onSelect(s)} style={styles.serviceBtn}>
              <View style={[styles.serviceCircle, { backgroundColor: s.bg }]}>
                <Ionicons name={s.icon} size={26} color="#fff" />
              </View>
              <Text style={styles.serviceLabel}>{s.label}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </>
  );
}