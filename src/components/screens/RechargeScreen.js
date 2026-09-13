import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles';

export default function RechargeScreen() {
  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
      <Text style={styles.sectionTitle}>Recharge</Text>
      <Text style={styles.t}>Écran de recharge (à construire).</Text>
    </ScrollView>
  );
}
