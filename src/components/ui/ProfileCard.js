import { View, Text } from 'react-native';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

export default function ProfileCard({ user }) {
  const { colors } = useApp();
  return (
    <View style={[styles.settingsProfileCard, { backgroundColor: colors.card }]}>
      <View style={[styles.settingsAvatar, { backgroundColor: colors.primarySoft }]}>
        <Logo width={80} height={80} />
      </View>
      <Text style={[styles.settingsName, { color: colors.text }]}>{user?.name || 'Utilisateur'}</Text>
      <Text style={[styles.settingsPhone, { color: colors.subtext }]}>{user?.phone || 'Numéro'}</Text>
    </View>
  );
}