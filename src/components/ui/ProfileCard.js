import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

export default function ProfileCard({ user }) {
  return (
    <View style={styles.settingsProfileCard}>
      <View style={styles.settingsAvatar}>
        <Image source={require('../../../assets/Cat03.png')} style={styles.settingsAvatarImg} />
        </View>
      <Text style={styles.settingsName}>{user?.name || 'Utilisateur'}</Text>
      <Text style={styles.settingsPhone}>{user?.phone || 'Numéro'}</Text>
    </View>
  );
}
