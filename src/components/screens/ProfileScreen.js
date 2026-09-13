import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

export default function ProfileScreen({ user, onLogout }) {
  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
      <Text style={styles.sectionTitle}>Profil</Text>
      <View style={styles.txRow}>
        <View style={styles.txIcon}>
          <Ionicons name="person" size={18} color="#1A72B6" />
        </View>
        <View style={styles.txTextWrap}>
          <Text style={styles.txTitle}>{user?.name || 'Utilisateur'}</Text>
          <Text style={styles.txDetail}>{user?.phone || 'Numéro'}</Text>
        </View>
      </View>
      <Pressable onPress={onLogout} style={styles.heroBtn}>
        <Text style={styles.heroBtnText}>Se déconnecter</Text>
      </Pressable>
    </ScrollView>
  );
}
