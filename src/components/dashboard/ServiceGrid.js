import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const SHORTCUTS = [
  { icon: 'call-outline', label: 'تعبئة الرصيد', bg: '#E4A57B' },
  { icon: 'phone-portrait-sharp', label: 'الهواتف', bg: '#003527' },
  { icon: 'swap-horizontal-outline', label: 'الملحقات', bg: '#00496A' },
];

function chunk(arr, size) {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size));
  return rows;
}

export default function ServiceGrid({ onSelect }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Services</Text>
      {chunk(SHORTCUTS, 3).map((row, r) => (
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
