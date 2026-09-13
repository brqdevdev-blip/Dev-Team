import { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import Field from '../ui/Field';
import PasswordInput from '../ui/PasswordInput';
import SubmitButton from '../ui/SubmitButton';
import styles from '../../styles';
import { findUser, registerUser, saveUsers } from '../../data/mockUsers';

export default function SignUpScreen({ onGoToLogin, onSignUpSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    if (!name || !phone || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (findUser(phone)) {
      setError('Ce numéro est déjà utilisé');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const newUser = registerUser(name, phone, password);
    await saveUsers();

    setLoading(false);
    onSignUpSuccess(newUser);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Image source={require('../../../assets/Frame 2.png')} />
      <View style={styles.Texter}>
        <Text style={styles.te}>Créer un compte</Text>
        <Text style={styles.t}>Rejoignez Recharge Express pour un traitement numérique instantané.</Text>
      </View>
      <Field value={name} onChangeText={setName} placeholder="Nom" />
      <Field value={phone} onChangeText={setPhone} placeholder="Numéro" keyboardType="phone-pad" />
      <View style={styles.pa}>
        <PasswordInput value={password} onChangeText={setPassword} />
        <PasswordInput value={confirm} onChangeText={setConfirm} placeholder="Confirmer le mot de passe" />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.bu}>
        <SubmitButton label="Créer un compte" onPress={handleSignUp} loading={loading} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.textSectionTitle}>Déjà un compte ?</Text>
        <Pressable onPress={onGoToLogin}>
          <Text style={styles.link}>Se connecter</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}