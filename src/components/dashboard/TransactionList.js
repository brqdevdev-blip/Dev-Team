import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { formatBalance } from '../../utils/format';

const HISTORY_KEY = 'rechargeHistory';

export default function TransactionList() {
  const { t, colors } = useApp();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY)
      .then((raw) => setHistory(raw ? JSON.parse(raw) : []))
      .catch(() => setHistory([]));
  }, []);

  return (
    <>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('history')}</Text>
      {history.length === 0 ? (
        <Text style={[styles.payEmpty, { color: colors.muted }]}>{t('noHistory')}</Text>
      ) : (
        history.map((h, index) => (
          <View key={`${h.date}-${h.number}-${index}`} style={[styles.txRow, { backgroundColor: colors.card }]}>
            <View style={styles.txIcon}>
              <Ionicons name="arrow-up-circle" size={18} color="#E3282C" />
            </View>
            <View style={styles.txTextWrap}>
              <Text style={[styles.txTitle, { color: colors.text }]}>{h.operator}</Text>
              <Text style={[styles.txDetail, { color: colors.muted }]}>
                {h.number} • {h.date}
              </Text>
            </View>
            <Text style={[styles.txAmount, styles.txNeg]}>-{formatBalance(h.amount)} da</Text>
          </View>
        ))
      )}
    </>
  );
}