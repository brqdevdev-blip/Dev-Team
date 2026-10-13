import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';
import ScreenHeader from '../ui/ScreenHeader';
import OperatorPicker from '../ui/OperatorPicker';
import { OPERATORS } from '../../data/operators';
import { User } from '../../data/mockUsers';
import { loadNumbers, saveNumbers, NumbersMap } from '../../data/numbers';
import { useApp } from '../../context/AppContext';

// Pressable operator card: drop shadow when idle, inner shadow when pressed.

export default function PayementMethodsScreen({ user, onBack }: { user: User; onBack: () => void }) {
  const { t } = useApp();
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const [numbers, setNumbers] = useState<NumbersMap>({});
  const [editingIndex, setEditingIndex] = useState<string | number | null>(null); // null = list, 'new' = adding, number = editing
  const [draft, setDraft] = useState('');

  useEffect(() => {
    loadNumbers().then(setNumbers);
  }, []);

  const operator = OPERATORS.find((o) => o.id === operatorId);
  const list = operator ? numbers[operator.id] || [] : [];

  const persist = (next: NumbersMap) => {
    setNumbers(next);
    saveNumbers(next);
  };

  const startAdd = () => {
    setDraft('');
    setEditingIndex('new');
  };

  const startEdit = (index: number) => {
    setDraft(list[index]);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setDraft('');
    setEditingIndex(null);
  };

  const saveNumber = () => {
    if (!operator) return;
    const value = draft.trim();
    if (!value) return;
    const next = { ...numbers };
    const arr = [...(next[operator.id] || [])];
    if (editingIndex === 'new') {
      arr.push(value);
    } else {
      arr[editingIndex as number] = value;
    }
    next[operator.id] = arr;
    persist(next);
    setDraft('');
    setEditingIndex(null);
  };

  const removeNumber = (index: number) => {
    if (!operator) return;
    const next = { ...numbers };
    const arr = [...(next[operator.id] || [])];
    arr.splice(index, 1);
    next[operator.id] = arr;
    persist(next);
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.payContent}>
      <ScreenHeader title={t('servicesHeader')} onBack={onBack} />
      <ProfileCard user={user} />

      <Text style={styles.paySectionLabel}>{t('chooseOperator')}</Text>
      <OperatorPicker selectedId={operatorId} onSelect={setOperatorId} />

      {operator && (
        <>
          <Text style={styles.paySectionLabel}>{t('myNumbers')} {operator.name}</Text>

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
                <Text style={styles.payFormSaveText}>{t('save')}</Text>
              </Pressable>
              <Pressable onPress={cancelEdit} style={styles.payFormCancel}>
                <Text style={styles.payFormCancelText}>{t('cancel')}</Text>
              </Pressable>
            </>
          ) : (
            // ---- Numbers list ----
            <>
              {list.length === 0 ? (
                <Text style={styles.payEmpty}>{t('noNumbers')}</Text>
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
                <Text style={styles.payAddText}>{t('addNumber')}</Text>
              </Pressable>
            </>
          )}
        </>
      )}


    </ScrollView>
  );
}