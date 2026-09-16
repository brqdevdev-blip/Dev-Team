import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../ui/Logo';
import styles from '../../styles';

export default function ProfileCard({ user }) {
  return (
    <View style={styles.settingsProfileCard}>
      <View style={styles.settingsAvatar}>
        <Logo width={80} height={80} />
        </View>
      <Text style={styles.settingsName}>{user?.name || 'Utilisateur'}</Text>
      <Text style={styles.settingsPhone}>{user?.phone || 'Numéro'}</Text>
    </View>
  );
}
