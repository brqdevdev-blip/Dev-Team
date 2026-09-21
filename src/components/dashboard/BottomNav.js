import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const ITEMS = [
  { key: 'home', icon: 'home', label: 'Accueil' },
<<<<<<< HEAD
  { key: 'recharge', icon: 'cart-outline', label: 'Recharge' },
  { key: 'orders', icon: 'person-outline', label: 'Commandes' },
  { key: 'profile', icon: 'settings-outline', label: 'Profil' },
=======

  { key: 'first', icon: 'gift', label: 'Cartes' },
  { key: 'recharge', icon: 'call', label: 'Recharge' },
  { key: 'orders', icon: 'bag-handle', label: 'Boutique' },
  { key: 'profile', icon: 'settings', label: 'Profil' },
>>>>>>> 0107044 (Initial commit)
];

export default function BottomNav({ active = 'home', onNavigate }) {
  return (
<<<<<<< HEAD
    <View style={styles.bottomNav}>
=======
    <View style={styles.glassNav}>
>>>>>>> 0107044 (Initial commit)
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate && onNavigate(item.key)}
<<<<<<< HEAD
            style={styles.navItem}
          >
            <Ionicons name={item.icon} size={22} color={isActive ? '#1A72B6' : '#9AA3AE'} />
            <Text style={isActive ? styles.navLabelActive : styles.navLabel}>{item.label}</Text>
=======
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
>>>>>>> 0107044 (Initial commit)
          </Pressable>
        );
      })}
    </View>
  );
}
