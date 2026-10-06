import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import OperatorPicker from '../ui/OperatorPicker';
import TransactionRow from '../ui/TransactionRow';
import { OPERATORS } from '../../data/operators';
import { updateUserBalance, User } from '../../data/mockUsers';
import { loadNumbers, NumbersMap } from '../../data/numbers';
import { formatBalance } from '../../utils/format';
import { useApp } from '../../context/AppContext';

type HistoryItem = { operator: string; number: string; amount: number; date: string };

const HISTORY_KEY = 'rechargeHistory';
const MAX_BALANCE = 20000;

async function loadHistory(): Promise<HistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history)).catch(() => {});
}

function formatDate(date: string | number | Date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

type Props = {
  user: User;
  onBack: () => void;
  onManagePuces: () => void;
  onUserUpdate: (user: User) => void;
};

export default function RechargeScreen({ user, onBack, onManagePuces, onUserUpdate }: Props) {
  const { t } = useApp();
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const [numbers, setNumbers] = useState<NumbersMap>({});
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadNumbers().then(setNumbers);
    loadHistory().then(setHistory);
  }, []);

  const operator = OPERATORS.find((o) => o.id === operatorId);
  const list = operator ? numbers[operator.id] || [] : [];

  const balance = Number(user?.balance) || 0;
  const ratio = Math.min(balance / MAX_BALANCE, 1);
  const R = 72;
  const CIRC = 2 * Math.PI * R;

  const confirmRecharge = () => {
    if (!operator) {
      Alert.alert('Opérateur requis', "Choisissez d'abord un opérateur.");
      return;
    }
    if (!selectedNumber) {
      Alert.alert('Puce requise', 'Sélectionnez la puce à recharger.');
      return;
    }
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      Alert.alert('Montant invalide', 'Entrez un montant à recharger.');
      return;
    }
    if (value > balance) {
      Alert.alert('Solde insuffisant', `Votre solde est de ${formatBalance(balance)} da.`);
      return;
    }
    Alert.alert(
      'Confirmation',
      `Recharger ${formatBalance(value)} da sur le numéro ${selectedNumber} (${operator.name}) ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            const newBalance = balance - value;
            updateUserBalance(user.phone, newBalance);
            if (onUserUpdate) onUserUpdate({ ...user, balance: newBalance });
            const entry: HistoryItem = {
              operator: operator.name,
              number: selectedNumber,
              amount: value,
              date: formatDate(new Date()),
            };
            const next = [entry, ...history];
            setHistory(next);
            saveHistory(next);
            Alert.alert('Succès', 'Recharge effectuée avec succès.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
      <ScreenHeader title={t('rechargeHeader')} onBack={onBack} />

      {/* Balance circle */}
      <View style={styles.rcBalanceWrap}>
        <Svg width={190} height={190} viewBox="0 0 190 190">
          <Circle cx={95} cy={95} r={R} stroke="#E1E3E0" strokeWidth={12} fill="none" />
          <Circle
            cx={95}
            cy={95}
            r={R}
            stroke="#1A72B6"
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${CIRC * ratio} ${CIRC}`}
            transform="rotate(-90 95 95)"
          />
        </Svg>
        <View style={styles.rcBalanceCenter}>
          <Text style={styles.rcBalanceLabel}>{t('solde')}</Text>
          <Text style={styles.rcBalanceValue}>{formatBalance(balance)}</Text>
          <Text style={styles.rcBalanceUnit}>da</Text>
        </View>
      </View>

      <Text style={styles.paySectionLabel}>{t('chooseOperator')}</Text>
      <OperatorPicker
        selectedId={operatorId}
        onSelect={(id) => {
          setOperatorId(id);
          setSelectedNumber(null);
        }}
      />

      {operator && (
        <>
          <Text style={styles.paySectionLabel}>{t('selectNumber')}</Text>
          {list.length === 0 ? (
            <Text style={styles.payEmpty}>{t('noPuce')}</Text>
          ) : (
            list.map((num, index) => {
              const selected = selectedNumber === num;
              return (
                <Pressable
                  key={`${num}-${index}`}
                  onPress={() => setSelectedNumber(num)}
                  style={[styles.rcNumRow, selected && styles.rcNumRowSelected]}
                >
                  <View style={[styles.payNumBadge, { backgroundColor: operator.color }]}>
                    <Text style={styles.payNumBadgeText}>{operator.name[0]}</Text>
                  </View>
                  <Text style={styles.payNumText}>{num}</Text>
                  <View style={[styles.rcRadio, selected && styles.rcRadioSelected]}>
                    {selected && <View style={styles.rcRadioDot} />}
                  </View>
                </Pressable>
              );
            })
          )}

          <Text style={styles.paySectionLabel}>{t('amount')}</Text>
          <TextInput
            style={styles.payFormInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="Ex : 500"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <Pressable onPress={confirmRecharge} style={styles.rcConfirmBtn}>
            <Text style={styles.rcConfirmText}>{t('recharge')}</Text>
          </Pressable>
        </>
      )}

      {/* Historique */}
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
    </ScrollView>
  );
}