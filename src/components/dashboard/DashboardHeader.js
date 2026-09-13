import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

export default function DashboardHeader({ user, onLogout }) {
  return (
    <View style={styles.dashHeader}>
      <View style={styles.dashAvatar}>
        <Image source={require('../../../assets/Frame 2.png')} style={styles.dashAvatarImg} />
      </View>
      <View style={styles.dashHeaderText}>
        <Text style={styles.dashGreeting}>Bonjour, {user?.name || 'utilisateur'} !</Text>
        <Text style={styles.dashSub}>Bienvenue sur Recharge Express</Text>
      </View>
      <Pressable onPress={onLogout} hitSlop={8}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}