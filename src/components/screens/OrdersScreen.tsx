import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles';

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Commandes</Text>
      <Text style={styles.t}>Écran des commandes (à construire).</Text>
    </ScrollView>
  );
}
