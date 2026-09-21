import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

const ITEMS = [
  { key: 'home', icon: 'home', labelKey: 'navHome' },
  { key: 'recharge', icon: 'cart', labelKey: 'navRecharge' },
  { key: 'first', icon: 'gift', labelKey: 'navGiftCards' },
  { key: 'orders', icon: 'bag-handle', labelKey: 'navShop' },
  { key: 'profile', icon: 'settings', labelKey: 'navProfile' },
];

export default function BottomNav({ active = 'home', onNavigate }) {
  const { t, colors } = useApp();
  return (
    <View style={[styles.glassNav, { backgroundColor: colors.glass }]}>
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
              color={isActive ? colors.primary : colors.subtext}
            />
            <Text style={[styles.glassNavLabel, { color: isActive ? '#fff' : colors.subtext }]}>
              {t(item.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}