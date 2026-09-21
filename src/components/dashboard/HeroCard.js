import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD
=======
import { LinearGradient } from 'expo-linear-gradient';
>>>>>>> 0107044 (Initial commit)
import styles from '../../styles';
import { formatBalance } from '../../utils/format';

export default function HeroCard({ user, onRecharge }) {
  return (
<<<<<<< HEAD
    <View style={styles.heroCard}>
      <Text style={styles.heroLabel}>SOLDE DISPONIBLE</Text>
      <Text style={styles.heroBalance}>{formatBalance(user?.balance)} da</Text>
      <View style={styles.heroRow}>
        <Ionicons name="call-outline" size={16} color="#fff" />
        <Pressable onPress={onRecharge} style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>+ Recharger</Text>
        </Pressable>
      </View>
    </View>
=======
    <LinearGradient
      colors={['#0090FF', '#0d5d9b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.heroCard}
    >
      <Text style={styles.heroLabel}>SOLDE DISPONIBLE</Text>
      <Text style={styles.heroBalance}>{formatBalance(user?.balance)} da</Text>
      <View style={styles.heroRow}>
        <Pressable onPress={onRecharge} style={styles.heroBtn}>
          <Ionicons name="add" size={16} color="#1A72B6" />
          <Text style={styles.heroBtnText}>Recharger</Text>
        </Pressable>
      </View>
    </LinearGradient>
>>>>>>> 0107044 (Initial commit)
  );
}