import { useState } from 'react';
<<<<<<< HEAD
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import Field from '../ui/Field';
import PasswordInput from '../ui/PasswordInput';
import SubmitButton from '../ui/SubmitButton';
=======
import { ScrollView, View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../ui/Logo';
>>>>>>> 0107044 (Initial commit)
import styles from '../../styles';
import { findUser, registerUser, saveUsers } from '../../data/mockUsers';

export default function SignUpScreen({ onGoToLogin, onSignUpSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
<<<<<<< HEAD
=======
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState(null);
>>>>>>> 0107044 (Initial commit)
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
<<<<<<< HEAD
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
=======
    <View style={styles.lgRoot}>
      <ScrollView contentContainerStyle={styles.lgScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.lgForm}>
          <Logo width={72} height={62} />

          <Text style={styles.lgTitle}>Créer un compte</Text>
          <Text style={styles.lgSub}>Rejoignez Recharge Express pour un traitement numérique instantané.</Text>

          {/* Name input */}
          <View style={[styles.lgInputWrap, focused === 'name' && styles.lgInputWrapFocused]}>
            <Ionicons name="person-outline" size={20} color={focused === 'name' ? '#1A72B6' : '#999'} />
            <TextInput
              style={styles.lgInput}
              value={name}
              onChangeText={setName}
              placeholder="Nom"
              placeholderTextColor="#999"
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Phone input */}
          <View style={[styles.lgInputWrap, focused === 'phone' && styles.lgInputWrapFocused]}>
            <Ionicons name="call-outline" size={20} color={focused === 'phone' ? '#1A72B6' : '#999'} />
            <TextInput
              style={styles.lgInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Numéro"
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Password input */}
          <View style={[styles.lgInputWrap, focused === 'password' && styles.lgInputWrapFocused]}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={focused === 'password' ? '#1A72B6' : '#999'}
            />
            <TextInput
              style={styles.lgInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </Pressable>
          </View>

          {/* Confirm password input */}
          <View style={[styles.lgInputWrap, focused === 'confirm' && styles.lgInputWrapFocused]}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={focused === 'confirm' ? '#1A72B6' : '#999'}
            />
            <TextInput
              style={styles.lgInput}
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirmer le mot de passe"
              secureTextEntry={!showConfirm}
              placeholderTextColor="#999"
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
            />
            <Pressable onPress={() => setShowConfirm(!showConfirm)} hitSlop={8}>
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={handleSignUp}
            disabled={loading}
            style={({ pressed }) => [styles.lgBtn, pressed && styles.lgBtnPressed]}
          >
            {loading ? (
              <ActivityIndicator color="#1A72B6" />
            ) : (
              <Text style={styles.lgBtnText}>Créer un compte</Text>
            )}
          </Pressable>

          <View style={styles.lgFooter}>
            <Text style={styles.lgFooterText}>Déjà un compte ? </Text>
            <Pressable onPress={onGoToLogin} hitSlop={8}>
              <Text style={styles.lgLink}>Se connecter</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
>>>>>>> 0107044 (Initial commit)
  );
}