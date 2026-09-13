import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const ITEMS = [
  { key: 'home', icon: 'home', label: 'Accueil' },
  { key: 'recharge', icon: 'cart-outline', label: 'Recharge' },
  { key: 'orders', icon: 'person-outline', label: 'Commandes' },
  { key: 'profile', icon: 'settings-outline', label: 'Profil' },
];

export default function BottomNav({ active = 'home', onNavigate }) {
  return (
    <View style={styles.bottomNav}>
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate && onNavigate(item.key)}
            style={styles.navItem}
          >
            <Ionicons name={item.icon} size={22} color={isActive ? '#1A72B6' : '#9AA3AE'} />
            <Text style={isActive ? styles.navLabelActive : styles.navLabel}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
