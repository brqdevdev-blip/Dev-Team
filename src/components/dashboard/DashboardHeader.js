import { View, Text } from 'react-native';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardHeader({ user }) {
  return (
    <LinearGradient
    colors={['#0090FF', '#0d5d9b']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.heroCard}
  >
    <View style={styles.glassHeader}>
      <View style={styles.dashAvatar}>
        <Logo width={34} height={34} />
      </View>
      <View style={styles.dashHeaderText}>
        <Text style={styles.dashGreeting}>Bonjour, {user?.name || 'utilisateur'} !</Text>
        <Text style={styles.dashSub}>{user?.phone || 'Bienvenue sur Recharge Express'}</Text>
      </View>
      </View>
  </LinearGradient>
  );
}
