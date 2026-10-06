import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import TransactionRow from '../ui/TransactionRow';
import { useApp } from '../../context/AppContext';

const HISTORY_KEY = 'rechargeHistory';

type HistoryItem = { date: string; number: string; operator: string; amount: number };

export default function TransactionList() {
  const { t } = useApp();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY)
      .then((raw) => setHistory(raw ? JSON.parse(raw) : []))
      .catch(() => setHistory([]));
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>{t('history')}</Text>
      {history.length === 0 ? (
        <Text style={styles.payEmpty}>{t('noHistory')}</Text>
      ) : (
        history.map((h, index) => (
          <TransactionRow
            key={`${h.date}-${h.number}-${index}`}
            operator={h.operator}
            number={h.number}
            date={h.date}
            amount={h.amount}
          />
        ))
      )}
    </>
  );
}