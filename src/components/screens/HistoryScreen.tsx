import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import TransactionList from '../dashboard/TransactionList';
import { useApp } from '../../context/AppContext';

type Props = {
  onBack: () => void;
};

export default function HistoryScreen({ onBack }: Props) {
  const { colors } = useApp();
  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <View style={styles.dasheader}>
        <Pressable onPress={onBack} style={styles.payBackBtn}>
          <Ionicons name="arrow-back-outline" size={22} color={colors.primary} />
        </Pressable>
        <Text style={[styles.textpay, { color: colors.primary }]}>Historique</Text>
      </View>
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <TransactionList />
      </ScrollView>
    </View>
  );
}