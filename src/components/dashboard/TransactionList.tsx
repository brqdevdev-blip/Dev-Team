import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import TransactionRow from '../ui/TransactionRow';
import { useApp } from '../../context/AppContext';

const HISTORY_KEY = 'rechargeHistory';
const CALL_HISTORY_KEY = 'callHistory';

type HistoryItem = { date: string; number: string; operator: string; amount: number; source: 'call' | 'recharge' };

const toTimestamp = (d: string) => {
  const [day, month, year] = d.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

export default function TransactionList() {
  const { t } = useApp();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(HISTORY_KEY),
      AsyncStorage.getItem(CALL_HISTORY_KEY),
    ])
      .then(([rechargeRaw, callRaw]) => {
        const recharge: HistoryItem[] = rechargeRaw
          ? JSON.parse(rechargeRaw).map((i: Omit<HistoryItem, 'source'>) => ({ ...i, source: 'recharge' }))
          : [];
        const call: HistoryItem[] = callRaw
          ? JSON.parse(callRaw).map((i: Omit<HistoryItem, 'source'>) => ({ ...i, source: 'call' }))
          : [];
        const merged = [...recharge, ...call];
        setHistory(merged.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date)));
      })
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
            icon={h.source === 'call' ? 'arrow-down-circle' : 'arrow-up-circle'}
            color={h.source === 'call' ? '#2E9E4F' : '#E3282C'}
          />
        ))
      )}
    </>
  );
}
