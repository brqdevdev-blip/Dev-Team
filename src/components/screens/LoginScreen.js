import { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import Field from '../ui/Field';
import PasswordInput from '../ui/PasswordInput';
import SubmitButton from '../ui/SubmitButton';
import styles from '../../styles';
import { findUser, saveSession } from '../../data/mockUsers';

export default function LoginScreen({ onGoToSignUp, onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!phone || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const user = findUser(phone);
    if (!user || user.password !== password) {
      setLoading(false);
      setError('Numéro ou mot de passe incorrect');
      return;
    }

    await saveSession(user);
    setLoading(false);
    onLoginSuccess(user);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Image source={require('../../../assets/Frame 2.png')} />
      <View style={styles.Texter}>
        <Text style={styles.te}>Connexion</Text>
        <Text style={styles.t}>Heureux de vous revoir sur Recharge Express.</Text>
      </View>
      <Field value={phone} onChangeText={setPhone} placeholder="Numéro" keyboardType="phone-pad" />
      <View style={styles.pa}>
        <PasswordInput value={password} onChangeText={setPassword} />
      </View>
      <Pressable onPress={() => {}}>
        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.bu}>
        <SubmitButton label="Se connecter" onPress={handleLogin} loading={loading} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.textSectionTitle}>Pas encore de compte ?</Text>
        <Pressable onPress={onGoToSignUp}>
          <Text style={styles.link}>Créer un compte</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}