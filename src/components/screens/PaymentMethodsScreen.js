import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';
import OperatorButton from '../ui/OperatorButton';
import BottomNav from '../dashboard/BottomNav';
import { OPERATORS } from '../../data/operators';

const STORAGE_KEY = 'savedNumbers';

async function loadNumbers() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveNumbers(numbers) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  } catch {}
}

// Pressable operator card: drop shadow when idle, inner shadow when pressed.

export default function PayementMethodsScreen({ user, onBack }) {
  const [operatorId, setOperatorId] = useState(null);
  const [numbers, setNumbers] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // null = list, 'new' = adding, number = editing
  const [draft, setDraft] = useState('');

  useEffect(() => {
    loadNumbers().then(setNumbers);
  }, []);

  const operator = OPERATORS.find((o) => o.id === operatorId);
  const list = operator ? numbers[operator.id] || [] : [];

  const persist = (next) => {
    setNumbers(next);
    saveNumbers(next);
  };

  const startAdd = () => {
    setDraft('');
    setEditingIndex('new');
  };

  const startEdit = (index) => {
    setDraft(list[index]);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setDraft('');
    setEditingIndex(null);
  };

  const saveNumber = () => {
    const value = draft.trim();
    if (!value) return;
    const next = { ...numbers };
    const arr = [...(next[operator.id] || [])];
    if (editingIndex === 'new') {
      arr.push(value);
    } else {
      arr[editingIndex] = value;
    }
    next[operator.id] = arr;
    persist(next);
    setDraft('');
    setEditingIndex(null);
  };

  const removeNumber = (index) => {
    const next = { ...numbers };
    const arr = [...(next[operator.id] || [])];
    arr.splice(index, 1);
    next[operator.id] = arr;
    persist(next);
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.payContent}>
      <View style={styles.dasheader}>
        <Pressable onPress={onBack} style={styles.payBackBtn}>
          <Ionicons name="arrow-back-outline" size={'2%'} color="#1A72B6" />
        </Pressable>
        <Text style={styles.textpay}>الخدمات</Text>
      </View>
      <ProfileCard user={user} />

      <Text style={styles.paySectionLabel}>Choisissez un opérateur</Text>
      <View style={styles.payOpRow}>
        {OPERATORS.map((op) => (
          <OperatorButton
            key={op.id}
            op={op}
            selected={operatorId === op.id}
            onPress={() => setOperatorId(op.id)}
          />
        ))}
      </View>

      {operator && (
        <>
          <Text style={styles.paySectionLabel}>Mes numéros {operator.name}</Text>

          {editingIndex !== null ? (
            // ---- Inline add / edit form ----
            <>
              <TextInput
                style={styles.payFormInput}
                value={draft}
                onChangeText={setDraft}
                placeholder="Ex : 0550 12 34 56"
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
              <Pressable onPress={saveNumber} style={styles.payFormSave}>
                <Text style={styles.payFormSaveText}>Enregistrer</Text>
              </Pressable>
              <Pressable onPress={cancelEdit} style={styles.payFormCancel}>
                <Text style={styles.payFormCancelText}>Annuler</Text>
              </Pressable>
            </>
          ) : (
            // ---- Numbers list ----
            <>
              {list.length === 0 ? (
                <Text style={styles.payEmpty}>Aucun numéro enregistré{'\n'}Appuyez sur "Ajouter" ci-dessous</Text>
              ) : (
                list.map((num, index) => (
                  <View key={`${num}-${index}`} style={styles.payNumRow}>
                    <View style={[styles.payNumBadge, { backgroundColor: operator.color }]}>
                      <Text style={styles.payNumBadgeText}>{operator.name[0]}</Text>
                    </View>
                    <Text style={styles.payNumText}>{num}</Text>
                    <Pressable onPress={() => startEdit(index)} style={styles.payNumEdit}>
                      <Ionicons name="create-outline" size={18} color="#1A72B6" />
                    </Pressable>
                    <Pressable onPress={() => removeNumber(index)} style={styles.payNumDelete}>
                      <Ionicons name="trash-outline" size={18} color="#E3282C" />
                    </Pressable>
                  </View>
                ))
              )}

              <Pressable onPress={startAdd} style={styles.payAddNumBtn}>
                <Ionicons name="add-outline" size={20} color="#fff" />
                <Text style={styles.payAddText}>Ajouter un numéro</Text>
              </Pressable>
            </>
          )}
        </>
      )}


    </ScrollView>
  );
}
