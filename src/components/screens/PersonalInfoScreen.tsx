import { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import ProfileCard from '../ui/ProfileCard';
import { useApp } from '../../context/AppContext';
import { User, updateUserProfile } from '../../data/mockUsers';

type Props = {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
};

export default function PersonalInfoScreen({ user, onBack, onUserUpdate }: Props) {
  const { colors, t } = useApp();
  const [name, setName] = useState(user.name);

  const save = () => {
    const value = name.trim();
    if (!value) {
      Alert.alert('Champ requis', 'Le nom ne peut pas être vide.');
      return;
    }
    updateUserProfile(user.phone, { name: value });
    onUserUpdate({ ...user, name: value });
    Alert.alert('Succès', 'Informations mises à jour.');
  };

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('personalInfo')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <ProfileCard user={{ ...user, name }} />
        <Text style={styles.paySectionLabel}>{t('name')}</Text>
        <TextInput
          style={styles.payFormInput}
          value={name}
          onChangeText={setName}
          placeholder={t('name')}
          placeholderTextColor="#999"
        />
        <Text style={styles.paySectionLabel}>{t('phone')}</Text>
        <TextInput
          style={styles.payFormInput}
          value={user.phone}
          editable={false}
          placeholderTextColor="#999"
        />
        <Pressable onPress={save} style={styles.payFormSave}>
          <Text style={styles.payFormSaveText}>{t('save')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}