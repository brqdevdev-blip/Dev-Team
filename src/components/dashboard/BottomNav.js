import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const ITEMS = [
  { key: 'home', icon: 'home', label: 'Accueil' },

  { key: 'first', icon: 'gift', label: 'Cartes' },
  { key: 'recharge', icon: 'call', label: 'Recharge' },
  { key: 'orders', icon: 'bag-handle', label: 'Boutique' },
  { key: 'profile', icon: 'settings', label: 'Profil' },
];

export default function BottomNav({ active = 'home', onNavigate }) {
  return (
    <View style={styles.glassNav}>
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate && onNavigate(item.key)}
            style={({ pressed }) => [
              styles.glassNavItem,
              isActive && styles.glassNavItemActive,
              pressed && styles.glassNavItemPressed,
            ]}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={isActive ? '#fff' : '#434655'}
            />
            <Text style={[styles.glassNavLabel, isActive && styles.glassNavLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
