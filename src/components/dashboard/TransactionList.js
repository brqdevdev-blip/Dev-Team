import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const TRANSACTIONS = [
  { title: 'Recharge MTN', detail: '07 07 07 07 07', amount: '-2 000 da', positive: false },
  { title: 'Recharge Orange', detail: '05 05 05 05 05', amount: '-1 000 da', positive: false },
  { title: 'Bonus parrainage', detail: "Aujourd'hui", amount: '+500 da', positive: true },
];

export default function TransactionList() {
  return (
    <>
      <Text style={styles.sectionTitle}>Historique</Text>
      {TRANSACTIONS.map((t) => (
        <View key={t.title} style={styles.txRow}>
          <View style={styles.txIcon}>
            <Ionicons
              name={t.positive ? 'arrow-down-circle' : 'arrow-up-circle'}
              size={18}
              color={t.positive ? '#2E9E4F' : '#E3282C'}
            />
          </View>
          <View style={styles.txTextWrap}>
            <Text style={styles.txTitle}>{t.title}</Text>
            <Text style={styles.txDetail}>{t.detail}</Text>
          </View>
          <Text style={[styles.txAmount, t.positive ? styles.txPos : styles.txNeg]}>{t.amount}</Text>
        </View>
      ))}
    </>
  );
}