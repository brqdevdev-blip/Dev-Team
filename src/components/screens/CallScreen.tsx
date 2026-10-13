import { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { User, updateUserBalance } from '../../data/mockUsers';
import { formatBalance, formatPhone } from '../../utils/format';
import { Contact, loadContacts, saveContacts, AVATAR_EMOJIS, AVATAR_COLORS } from '../../data/contacts';
import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale } from '../../utils/responsive';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'] as const;
const QUICK_AMOUNTS = [500, 1000, 2000, 3000] as const;
const PHONE_LENGTH = 10;
const PHONE_REGEX = /^0[567]\d{8}$/; // Algerian mobile numbers: 05 / 06 / 07
const HISTORY_KEY = 'callHistory';

type HistoryItem = { operator: string; number: string; amount: number; date: string };

type Props = {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
  onOpenContacts?: () => void;
  initialNumber?: string;
};

/** "0612345678" -> ["06", "12", "34", "56", "78"], padded with "--" */
const phoneGroups = (digits: string): string[] =>
  Array.from({ length: 5 }, (_, i) => digits.slice(i * 2, i * 2 + 2).padEnd(2, '-'));

export default function CallScreen({ user, onBack, onUserUpdate, onOpenContacts, initialNumber }: Props) {
  const { colors, t } = useApp();
  const [digits, setDigits] = useState(initialNumber ?? '');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmoji, setNewEmoji] = useState('👤');
  const [newColor, setNewColor] = useState('#1A72B6');

  const balance = Number(user?.balance) || 0;
  const amountValue = Number(amount) || 0;
  const phoneValid = PHONE_REGEX.test(digits);
  const canSubmit = phoneValid && amountValue > 0 && amountValue <= balance;
  const groups = phoneGroups(digits);

  const loadHistory = useCallback(() => {
    AsyncStorage.getItem(HISTORY_KEY)
      .then((raw) => setHistory(raw ? JSON.parse(raw) : []))
      .catch(() => setHistory([]));
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const pressKey = (key: string) => {
    if (!/^\d$/.test(key)) return; // * and # are ignored for phone entry
    setError(null);
    setDigits((d) => (d.length < PHONE_LENGTH ? d + key : d));
  };

  const clearLast = () => {
    setError(null);
    setDigits((d) => d.slice(0, -1));
  };

  const handleAmountChange = (value: string) => {
    setError(null);
    setAmount(value.replace(/\D/g, '').slice(0, 6));
  };

  const openAddContact = () => {
    setNewName('');
    setNewPhone(digits);
    setNewEmoji('👤');
    setNewColor('#1A72B6');
    setShowAddContact(true);
  };

  const saveNewContact = async () => {
    const name = newName.trim();
    const phone = newPhone.replace(/\D/g, '');
    if (!name || !phone) {
      Alert.alert('Champs requis', 'Entrez un nom et un numéro.');
      return;
    }
    const existing = await loadContacts();
    const contact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
      emoji: newEmoji,
      color: newColor,
    };
    await saveContacts([...existing, contact]);
    setShowAddContact(false);
    Alert.alert('Succès', 'Contact enregistré.');
  };

  const submit = () => {
    if (!phoneValid) {
      setError('Numéro invalide. Exemple : 06 12 34 56 78');
      return;
    }
    if (amountValue <= 0) {
      setError('Entrez un montant à recharger.');
      return;
    }
    if (amountValue > balance) {
      setError(`Solde insuffisant. Votre solde est de ${formatBalance(balance)} DA.`);
      return;
    }
    Alert.alert(
      'Confirmation',
      `Recharger ${formatBalance(amountValue)} DA sur le numéro ${formatPhone(digits)} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            const newBalance = balance - amountValue;
            updateUserBalance(user.phone, newBalance);
            if (onUserUpdate) onUserUpdate({ ...user, balance: newBalance });
            const entry: HistoryItem = {
              operator: 'Manuel',
              number: digits,
              amount: amountValue,
              date: new Date().toLocaleDateString('fr-FR'),
            };
            AsyncStorage.getItem(HISTORY_KEY)
              .then((raw) => {
                const next = [entry, ...(raw ? JSON.parse(raw) : [])];
                AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next)).catch(() => {});
                setHistory(next);
              })
              .catch(() => {});
            setAmount('');
            setDigits('');
            setError(null);
            Alert.alert('Succès', 'Recharge effectuée avec succès.');
          },
        },
      ]
    );
  };

  return (<>

        {/* Header */}

        <LinearGradient
          colors={['#549DD4', '#0B4A8F'  ]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.dashHero, { paddingTop: verticalScale(20), paddingBottom: verticalScale(60) }]}
        >
        {/* Balance */}
        <Text style={styles.callBalanceText}>
          <Text style={styles.callBalanceLabel}>{t('solde')}: </Text>
          <Text style={styles.callBalanceValue}>{formatBalance(balance)} DA</Text>
          </Text>
        </LinearGradient>
        <View style={styles.callRoot}>
          <ScrollView contentContainerStyle={styles.callContent} showsVerticalScrollIndicator={false}>
        {/* Phone display */}
        <Text style={styles.callLabel}>{t('enterNumber')}</Text>
        <View style={[styles.callPhone, error && !phoneValid && styles.callPhoneError]}>
          <View style={styles.callCountry}>
            <Text style={styles.callCountryText}>DZ</Text>
          </View>
          <View style={styles.callDigits}>
            {groups.map((g, i) => (
              <Text key={i} style={[styles.callDigit, digits.length > i * 2 && styles.callDigitFilled]}>
                {g}
              </Text>
            ))}
          </View>
          <Pressable onPress={openAddContact} hitSlop={8}>
            <Ionicons name="people-outline" size={24} color="#1877D6" />
          </Pressable>
        </View>

        {/* Shortcuts */}
        <View style={styles.callShortcuts}>
          <Pressable
            style={[styles.callPill, styles.callPillActive]}
            onPress={() => Alert.alert('Offres & Forfaits', 'Bientôt disponible.')}
          >
            <Ionicons name="pricetag-outline" size={16} color="#1877D6" />
            <Text style={[styles.callPillText, { color: '#1877D6' }]}>Offres &amp; Forfaits</Text>
          </Pressable>
          <Pressable style={styles.callPill} onPress={onOpenContacts}>
            <Ionicons name="person-outline" size={16} color="#111A2E" />
            <Text style={styles.callPillText}>Répertoire</Text>
          </Pressable>
        </View>

        {/* Keypad */}
        <View style={styles.callPad}>
          {KEYS.map((k) => (
            <Pressable
              key={k}
              onPress={() => pressKey(k)}
              style={({ pressed }: { pressed: boolean }) => [styles.callKey, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.callKeyText}>{k}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={clearLast}
          style={[styles.callDeleteBtn, !digits && styles.callDeleteDisabled]}
          disabled={!digits}
        >
          <Ionicons name="backspace-outline" size={20} color="#2A3550" />
          <Text style={styles.callDeleteText}>Effacer</Text>
        </Pressable>

        {/* Amount */}
        <TextInput
          style={styles.callAmountInput}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="Montant à recharger (DA)"
          keyboardType="numeric"
          placeholderTextColor="#8A97AB"
        />

        <View style={styles.callQuick}>
          {QUICK_AMOUNTS.map((v) => (
            <Pressable
              key={v}
              onPress={() => handleAmountChange(String(v))}
              style={[styles.callQuickBtn, amountValue === v && styles.callQuickBtnActive]}
            >
              <Text style={[styles.callQuickText, amountValue === v && styles.callQuickTextActive]}>
                {formatBalance(v)} DA
              </Text>
            </Pressable>
          ))}
        </View>

        {error && (
          <Text style={styles.callError} role="alert">
            {error}
          </Text>
        )}

        <Pressable
          onPress={submit}
          disabled={!canSubmit}
          style={[styles.callRechargeBtn, !canSubmit && styles.callRechargeDisabled]}
        >
          <Ionicons name="card-outline" size={24} color="#fff" />
          <Text style={styles.callRechargeText}>{t('recharge')}</Text>
        </Pressable>

        {/* History */}
        <View style={styles.callHistory}>
          <View style={styles.callHistoryHead}>
            <Text style={styles.callHistoryTitle}>{t('history')}</Text>
            <Text style={styles.callHistoryLink}>Tout voir</Text>
          </View>
          <View style={styles.callHistoryBox}>
            {history.length === 0 ? (
              <View style={styles.callEmpty}>
                <View style={styles.callEmptyIcon}>
                  <Ionicons name="time-outline" size={26} color="#7B8799" />
                </View>
                <Text style={styles.callEmptyText}>{t('noHistory')}</Text>
              </View>
            ) : (
              history.map((h, index) => (
                <View key={`${h.date}-${h.number}-${index}`} style={styles.callHistoryRow}>
                  <View>
                    <Text style={styles.callHistoryPhone}>{formatPhone(h.number)}</Text>
                    <Text style={styles.callHistoryDate}>{h.date}</Text>
                  </View>
                  <Text style={styles.callHistoryAmount}>{formatBalance(h.amount)} DA</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>

      {/* Save contact modal */}
      <Modal
        visible={showAddContact}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddContact(false)}
      >
        <View style={styles.contactModalOverlay}>
          <View style={styles.contactModal}>
            <Text style={styles.contactModalTitle}>Enregistrer le contact</Text>

            <View style={[styles.contactAvatarPreview, { backgroundColor: newColor }]}>
              <Text style={styles.contactAvatarPreviewText}>{newEmoji}</Text>
            </View>

            <Text style={styles.paySectionLabel}>Photo / Avatar</Text>
            <View style={styles.contactEmojiRow}>
              {AVATAR_EMOJIS.map((e) => (
                <Pressable
                  key={e}
                  onPress={() => setNewEmoji(e)}
                  style={[styles.contactEmojiOption, newEmoji === e && styles.contactEmojiOptionActive]}
                >
                  <Text style={styles.contactEmojiText}>{e}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.contactColorRow}>
              {AVATAR_COLORS.map((col) => (
                <Pressable
                  key={col}
                  onPress={() => setNewColor(col)}
                  style={[
                    styles.contactColorOption,
                    { backgroundColor: col },
                    newColor === col && styles.contactColorOptionActive,
                  ]}
                />
              ))}
            </View>

            <Text style={styles.paySectionLabel}>Nom</Text>
            <TextInput
              style={styles.payFormInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Nom du contact"
              placeholderTextColor="#999"
            />

            <Text style={styles.paySectionLabel}>Numéro</Text>
            <TextInput
              style={styles.payFormInput}
              value={newPhone}
              onChangeText={(v) => setNewPhone(v.replace(/\D/g, '').slice(0, 10))}
              placeholder="06 12 34 56 78"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <View style={styles.contactModalActions}>
              <Pressable onPress={() => setShowAddContact(false)} style={styles.contactCancelBtn}>
                <Text style={styles.contactCancelText}>Annuler</Text>
              </Pressable>
              <Pressable onPress={saveNewContact} style={styles.payFormSave}>
                <Text style={styles.payFormSaveText}>Enregistrer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
