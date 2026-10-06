import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { formatBalance } from '../../utils/format';

type Props = {
  operator: string;
  number: string;
  date: string;
  amount: number;
};

export default function TransactionRow({ operator, number, date, amount }: Props) {
  const { colors } = useApp();
  return (
    <View style={[styles.txRow, { backgroundColor: colors.card }]}>
      <View style={styles.txIcon}>
        <Ionicons name="arrow-up-circle" size={18} color="#E3282C" />
      </View>
      <View style={styles.txTextWrap}>
        <Text style={[styles.txTitle, { color: colors.text }]}>{operator}</Text>
        <Text style={[styles.txDetail, { color: colors.muted }]}>
          {number} • {date}
        </Text>
      </View>
      <Text style={[styles.txAmount, styles.txNeg]}>-{formatBalance(amount)} da</Text>
    </View>
  );
}