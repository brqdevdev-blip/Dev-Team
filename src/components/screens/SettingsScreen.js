import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';

const SETTINGS_ROWS = [
  { icon: 'person-outline', title: 'Informations personnelles', sub: 'Nom, numéro, email' },
  { icon: 'lock-closed-outline', title: 'Sécurité', sub: 'Mot de passe, PIN' },
  { icon: 'notifications-outline', title: 'Notifications', sub: 'Alertes et SMS' },
  { icon: 'card-outline', title: 'Moyens de paiement', sub: 'Cartes et comptes' },
  { icon: 'help-circle-outline', title: 'Aide et support', sub: 'FAQ, contact' },
  { icon: 'information-circle-outline', title: 'À propos', sub: 'Version de l’application' },
];

export default function SettingsScreen({ user, onLogout, onBack, onOpenPayment }) {
  const handleRowPress = (title) => {
    if (title === 'Moyens de paiement' && onOpenPayment) {
      onOpenPayment();
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.container}>
      <ProfileCard user={user} />

      {SETTINGS_ROWS.map((row) => (
        <Pressable key={row.title} onPress={() => handleRowPress(row.title)} style={styles.settingsRow}>
          <View style={styles.settingsRowIcon}>
            <Ionicons name={row.icon} size={20} color="#1A72B6" />
          </View>
          <View style={styles.settingsRowText}>
            <Text style={styles.settingsRowTitle}>{row.title}</Text>
            <Text style={styles.settingsRowSub}>{row.sub}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={18} color="#9AA3AE" />
        </Pressable>
      ))}

      <Pressable onPress={onLogout} style={styles.settingsRow}>
        <View style={[styles.settingsRowIcon, { backgroundColor: '#FDE8E8' }]}>
          <Ionicons name="log-out-outline" size={20} color="#E3282C" />
        </View>
        <View style={styles.settingsRowText}>
          <Text style={[styles.settingsRowTitle, { color: '#E3282C' }]}>Se déconnecter</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
