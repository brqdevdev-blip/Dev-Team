import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';
import { User, updateUserBalance } from '../../data/mockUsers';
import { formatBalance } from '../../utils/format';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'] as const;
const HISTORY_KEY = 'rechargeHistory';

type HistoryItem = { operator: string; number: string; amount: number; date: string };

type Props = {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
};

export default function CallScreen({ user, onBack, onUserUpdate }: Props) {
  const { colors, t } = useApp();
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');

  const balance = Number(user?.balance) || 0;

  const pressKey = (key: string) => {
    if (number.length < 15) setNumber(number + key);
  };

  const deleteDigit = () => {
    setNumber(number.slice(0, -1));
  };

  const recharge = () => {
    if (!number) {
      Alert.alert(t('numberRequired'), t('composeFirst'));
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
      `Recharger ${formatBalance(value)} da sur le numéro ${number} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            const newBalance = balance - value;
            updateUserBalance(user.phone, newBalance);
            if (onUserUpdate) onUserUpdate({ ...user, balance: newBalance });
            const entry: HistoryItem = {
              operator: 'Manuel',
              number,
              amount: value,
              date: new Date().toLocaleDateString('fr-FR'),
            };
            AsyncStorage.getItem(HISTORY_KEY)
              .then((raw) => {
                const next = [entry, ...(raw ? JSON.parse(raw) : [])];
                AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next)).catch(() => {});
              })
              .catch(() => {});
            setAmount('');
            setNumber('');
            Alert.alert('Succès', 'Recharge effectuée avec succès.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.callRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('envoie')} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.callContent} showsVerticalScrollIndicator={false}>
        <View style={styles.callBalance}>
          <Text style={[styles.callBalanceText, { color: colors.subtext }]}>
            {t('solde')}:{' '}
            <Text style={{ color: colors.text, fontWeight: '700' }}>{formatBalance(balance)} da</Text>
          </Text>
        </View>

        <View style={styles.callDisplay}>
          <Text style={[styles.callNumber, { color: colors.text }]}>
            {number || (
              <Text style={[styles.callPlaceholder, { color: colors.muted }]}>{t('enterNumber')}</Text>
            )}
          </Text>
        </View>

        <View style={styles.callPad}>
          {KEYS.map((k) => (
            <Pressable
              key={k}
              onPress={() => pressKey(k)}
              style={({ pressed }: { pressed: boolean }) => [styles.callKey, pressed && { opacity: 0.6 }]}
            >
              <Text style={[styles.callKeyText, { color: colors.text }]}>{k}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={deleteDigit} style={styles.callDeleteBtn} hitSlop={8}>
          <Ionicons name="backspace-outline" size={22} color={colors.subtext} />
          <Text style={[styles.callDeleteText, { color: colors.subtext }]}>Effacer</Text>
        </Pressable>

        <TextInput
          style={styles.callAmountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder={t('amount')}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Pressable onPress={recharge} style={styles.callRechargeBtn}>
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.callRechargeText}>{t('recharge')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}