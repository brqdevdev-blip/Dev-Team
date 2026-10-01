import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const SERVICES = [
  { key: 'voucher', label: 'Voucher', icon: 'ticket', color: '#F5B301' },
  { key: 'cartes', label: 'Cartes Recharges', icon: 'gift', color: '#E3282C' },
  { key: 'iptv', label: 'IPTV', icon: 'tv', color: '#E3282C' },
  { key: 'code', label: 'Code', icon: 'hash', color: '#1A72B6' },
  { key: 'mobile', label: 'Mobile', icon: 'phone-portrait', color: '#1A72B6' },
  { key: 'sim', label: 'Sim', icon: 'hardware-chip', color: '#1A72B6' },
  { key: 'chargeur', label: 'Chargeur', icon: 'flash', color: '#F5B301' },
  { key: 'plus', label: 'Plus', icon: 'apps', color: '#8B5CF6' },
];

export default function ServiceGrid({ onSelect }) {
  return (
    <View style={styles.svcGridNew}>
      {SERVICES.map((s) => (
        <Pressable
          key={s.key}
          onPress={() => onSelect && onSelect(s)}
          style={({ pressed }) => [styles.svcTile, pressed && { opacity: 0.6 }]}
        >
          <View style={styles.svcTileBox}>
            <Ionicons name={s.icon} size={28} color={s.color} />
          </View>
          <Text style={styles.svcTileLabel} numberOfLines={2}>{s.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}