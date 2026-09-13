import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

export default function HeroCard({ user, onRecharge }) {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroLabel}>SOLDE DISPONIBLE</Text>
      <Text style={styles.heroBalance}>12 500 da</Text>
      <View style={styles.heroRow}>
        <Ionicons name="call-outline" size={16} color="#fff" />
        <Pressable onPress={onRecharge} style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>+ Recharger</Text>
        </Pressable>
      </View>
    </View>
  );
}