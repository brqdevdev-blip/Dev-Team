import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { formatBalance, formatPhone } from '../../utils/format';

type Props = {
  operator: string;
  number: string;
  date: string;
  amount: number;
  icon?: 'arrow-up-circle' | 'arrow-down-circle';
  color?: string;
};

export default function TransactionRow({ operator, number, date, amount, icon = 'arrow-up-circle', color = '#E3282C' }: Props) {
  const { colors } = useApp();
  return (
    <View style={[styles.txRow, { backgroundColor: colors.card }]}>
      <View style={styles.txIcon}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.txTextWrap}>
        <Text style={[styles.txTitle, { color: colors.text }]}>{operator}</Text>
        <Text style={[styles.txDetail, { color: colors.muted }]}>
          {formatPhone(number)} • {date}
        </Text>
      </View>
      <Text style={[styles.txAmount, styles.txNeg]}>-{formatBalance(amount)} da</Text>
    </View>
  );
}