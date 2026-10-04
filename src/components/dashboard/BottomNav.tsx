import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import PhoneIcon from './PhoneIcon';

const LEFT_ITEMS = [
  { key: 'home', icon: 'home', labelKey: 'navHome' },
  { key: 'orders', icon: 'cart', labelKey: 'navShop' },
] as const;

const RIGHT_ITEMS = [
  { key: 'first', icon: 'gift', labelKey: 'navGiftCards' },
  { key: 'profile', icon: 'settings', labelKey: 'navProfile' },
] as const;

type NavItem = {
  key: string;
  icon: 'home' | 'cart' | 'gift' | 'settings';
  labelKey: string;
};

type Props = {
  active?: string;
  onNavigate?: (key: string) => void;
};

export default function BottomNav({ active = 'home', onNavigate }: Props) {
  const { t, colors } = useApp();

  const renderItem = (item: NavItem) => {
    const isActive = item.key === active;
    return (
      <Pressable
        key={item.key}
        onPress={() => onNavigate && onNavigate(item.key)}
        style={({ pressed }: { pressed: boolean }) => [
          styles.glassNavItem,
          pressed && styles.glassNavItemPressed,
        ]}
      >
        <Ionicons
          name={item.icon}
          size={22}
          color={isActive ? colors.primary : colors.subtext}
        />
        <Text style={[styles.glassNavLabel, { color: isActive ? colors.primary : colors.subtext }]}>
          {t(item.labelKey)}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.glassNav, { backgroundColor: colors.glass }]}>
      {LEFT_ITEMS.map(renderItem)}
      <Pressable
        onPress={() => onNavigate && onNavigate('recharge')}
        style={({ pressed }: { pressed: boolean }) => [
          styles.glassNavItem,
          pressed && styles.glassNavItemPressed,
        ]}
      >
        <View style={styles.navPhoneRing}>
          <View style={styles.navPhoneCircle}>
            <PhoneIcon size={28} color="#fff" />
          </View>
        </View>
      </Pressable>
      {RIGHT_ITEMS.map(renderItem)}
    </View>
  );
}