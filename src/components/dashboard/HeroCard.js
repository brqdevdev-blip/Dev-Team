import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { formatBalance } from '../../utils/format';

export default function HeroCard({ user, onRecharge }) {
  const { t } = useApp();
  return (
    <LinearGradient
      colors={['#0090FF', '#0d5d9b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.heroCard}
    >
      <Text style={styles.heroLabel}>{t('balance')}</Text>
      <Text style={styles.heroBalance}>{formatBalance(user?.balance)} da</Text>
      <View style={styles.heroRow}>
        <Pressable onPress={onRecharge} style={styles.heroBtn}>
          <Ionicons name="add" size={16} color="#1A72B6" />
          <Text style={styles.heroBtnText}>{t('recharge')}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}