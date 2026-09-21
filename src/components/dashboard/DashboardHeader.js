import { View, Text } from 'react-native';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

export default function DashboardHeader({ user }) {
  const { t, colors } = useApp();
  return (
    <View style={[styles.glassHeader, { backgroundColor: colors.glass }]}>
      <View style={[styles.dashAvatar, { backgroundColor: colors.primarySoft }]}>
        <Logo width={34} height={34} />
      </View>
      <View style={styles.dashHeaderText}>
        <Text style={[styles.dashGreeting, { color: colors.text }]}>
          {t('greeting')}, {user?.name || 'utilisateur'} !
        </Text>
        <Text style={[styles.dashSub, { color: colors.muted }]}>
          {user?.phone || 'Recharge Express'}
        </Text>
      </View>
    </View>
  );
}