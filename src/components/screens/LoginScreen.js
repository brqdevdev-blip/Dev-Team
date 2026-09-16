import { useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { findUser, saveSession } from '../../data/mockUsers';

export default function LoginScreen({ onGoToSignUp, onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
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
    <View style={styles.lgRoot}>
      <ScrollView contentContainerStyle={styles.lgScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.lgForm}>
          <Logo width={72} height={62} />

          <Text style={styles.lgTitle}>Connexion</Text>
          <Text style={styles.lgSub}>Heureux de vous revoir sur Recharge Express</Text>

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

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [styles.lgBtn, pressed && styles.lgBtnPressed]}
          >
            {loading ? (
              <ActivityIndicator color="#1A72B6" />
            ) : (
              <Text style={styles.lgBtnText}>Se connecter</Text>
            )}
          </Pressable>

          <Pressable onPress={() => {}} hitSlop={8}>
            <Text style={styles.lgForgot}>Mot de passe oublié ?</Text>
          </Pressable>

          <View style={styles.lgFooter}>
            <Text style={styles.lgFooterText}>Pas encore de compte ? </Text>
            <Pressable onPress={onGoToSignUp} hitSlop={8}>
              <Text style={styles.lgLink}>Créer un compte</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
