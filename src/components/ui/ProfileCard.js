<<<<<<< HEAD
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
=======
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../ui/Logo';
>>>>>>> 0107044 (Initial commit)
import styles from '../../styles';

export default function ProfileCard({ user }) {
  return (
    <View style={styles.settingsProfileCard}>
      <View style={styles.settingsAvatar}>
<<<<<<< HEAD
        <Image source={require('../../../assets/Cat03.png')} style={styles.settingsAvatarImg} />
=======
        <Logo width={80} height={80} />
>>>>>>> 0107044 (Initial commit)
        </View>
      <Text style={styles.settingsName}>{user?.name || 'Utilisateur'}</Text>
      <Text style={styles.settingsPhone}>{user?.phone || 'Numéro'}</Text>
    </View>
  );
}
