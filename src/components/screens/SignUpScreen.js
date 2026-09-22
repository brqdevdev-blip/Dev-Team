import { useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { findUser, registerUser, saveUsers } from '../../data/mockUsers';

export default function SignUpScreen({ onGoToLogin, onSignUpSuccess }) {
  const { t, colors } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState(null);
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
    <View style={[styles.lgRoot, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.lgScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.lgForm}>
          <Logo width={72} height={62} />

          <Text style={[styles.lgTitle, { color: colors.primary }]}>{t('signupTitle')}</Text>
          <Text style={[styles.lgSub, { color: colors.subtext }]}>{t('signupSubtitle')}</Text>

          {/* Name input */}
          <View style={[styles.lgInputWrap, focused === 'name' && styles.lgInputWrapFocused]}>
            <Ionicons name="person-outline" size={20} color={focused === 'name' ? '#1A72B6' : '#999'} />
            <TextInput
              style={styles.lgInput}
              value={name}
              onChangeText={setName}
              placeholder={t('name')}
              placeholderTextColor={colors.muted}
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
              placeholder={t('phone')}
              keyboardType="phone-pad"
              placeholderTextColor={colors.muted}
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
              placeholder={t('password')}
              secureTextEntry={!showPassword}
              placeholderTextColor={colors.muted}
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
              placeholder={t('confirmPassword')}
              secureTextEntry={!showConfirm}
              placeholderTextColor={colors.muted}
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
              <Text style={[styles.lgBtnText, { color: colors.primary }]}>{t('signupBtn')}</Text>
            )}
          </Pressable>

          <View style={styles.lgFooter}>
            <Text style={[styles.lgFooterText, { color: colors.subtext }]}>{t('haveAccount')}</Text>
            <Pressable onPress={onGoToLogin} hitSlop={8}>
              <Text style={[styles.lgLink, { color: colors.primary }]}>{t('loginBtn')}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}