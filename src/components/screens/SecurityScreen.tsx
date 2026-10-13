import { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';
import { User, updateUserProfile } from '../../data/mockUsers';

type Props = {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
};

export default function SecurityScreen({ user, onBack, onUserUpdate }: Props) {
  const { colors, t } = useApp();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  const save = () => {
    if (current !== user.password) {
      Alert.alert('Erreur', 'Mot de passe actuel incorrect.');
      return;
    }
    if (next.length < 4) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 4 caractères.');
      return;
    }
    if (next !== confirm) {
      Alert.alert('Erreur', 'La confirmation ne correspond pas.');
      return;
    }
    updateUserProfile(user.phone, { password: next });
    onUserUpdate({ ...user, password: next });
    setCurrent('');
    setNext('');
    setConfirm('');
    Alert.alert('Succès', 'Mot de passe modifié.');
  };

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('security')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <Text style={styles.paySectionLabel}>Mot de passe actuel</Text>
        <TextInput
          style={styles.payFormInput}
          value={current}
          onChangeText={setCurrent}
          secureTextEntry
          placeholder="••••••"
          placeholderTextColor="#999"
        />
        <Text style={styles.paySectionLabel}>Nouveau mot de passe</Text>
        <TextInput
          style={styles.payFormInput}
          value={next}
          onChangeText={setNext}
          secureTextEntry
          placeholder="••••••"
          placeholderTextColor="#999"
        />
        <Text style={styles.paySectionLabel}>Confirmer le nouveau mot de passe</Text>
        <TextInput
          style={styles.payFormInput}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          placeholder="••••••"
          placeholderTextColor="#999"
        />
        <Pressable onPress={save} style={styles.payFormSave}>
          <Text style={styles.payFormSaveText}>Modifier le mot de passe</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}