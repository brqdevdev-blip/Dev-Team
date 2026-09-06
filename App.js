import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend port (must match backend/.env PORT)
const API_PORT = 4000;

// Manual override: set this to your computer's LAN IP if auto-detection fails.
// Find your IP: run 'ipconfig' in Windows CMD — look for IPv4 under your active adapter.
// Example: '[IP_ADDRESS]'
const MANUAL_HOST = '';

// Auto-detect the backend host from Expo's bundler URL.
// On a physical device, 'localhost' points to the phone, so we use the computer's LAN IP.
function getApiUrl() {
  if (MANUAL_HOST) return `http://${MANUAL_HOST}:${API_PORT}`;
  const hostUri = Constants.expoConfig?.hostUri;
  const debuggerHost = Constants.expoConfig?.debuggerHost;
  const source = hostUri || debuggerHost || '';
  // source is typically '192.168.x.x:19006' (no protocol)
  const host = source.split(':')[0];
  return `http://${host || 'localhost'}:${API_PORT}`;
}

const API_URL = getApiUrl();
console.log('[API] URL:', API_URL);

function Field({ value, onChangeText, placeholder, keyboardType, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
    />
  );
}

function PasswordInput({ value, onChangeText, placeholder = 'Mot de passe' }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.passwordContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.lockIcon} />
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        placeholderTextColor="#999"
      />
      <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999" />
      </Pressable>
    </View>
  );
}

function SubmitButton({ label, onPress, loading }) {
  return (
    <Pressable onPress={onPress} disabled={loading}>
      <LinearGradient
        colors={['#3F6BCD', '#57DFFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

// Prominent banner showing the API URL the app is trying to reach.
function ApiBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>API: {API_URL}</Text>
    </View>
  );
}

function SignUpScreen({ onGoToLogin }) {
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
    setLoading(true);
    try {
      console.log('[API] POST', `${API_URL}/api/signup`);
      const res = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'inscription');
      alert('Compte créé avec succès !');
      onGoToLogin();
    } catch (e) {
      console.error('[API] Signup error:', e);
      setError(e.message || 'Échec de la connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      <Image source={require('./assets/Frame 2.png')} />
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

function LoginScreen({ onGoToSignUp, onLoginSuccess }) {
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
    try {
      console.log('[API] POST', `${API_URL}/api/login`);
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de connexion');
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (e) {
      console.error('[API] Login error:', e);
      setError(e.message || 'Échec de la connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>

      <Image source={require('./assets/Frame 2.png')} />
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

function HomeScreen({ user, onLogout }) {
  return (
    <View style={styles.homeContainer}>
      <Image source={require('./assets/Frame 2.png')} />
      <Text style={styles.homeTitle}>Bienvenue, {user?.name || 'utilisateur'} !</Text>
      <Text style={styles.homeSubtitle}>Vous êtes connecté à Recharge Express.</Text>
      <View style={styles.bu}>
        <SubmitButton label="Se déconnecter" onPress={onLogout} />
      </View>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('signup');
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    setScreen('login');
  };

  if (user) {
    return (
      <View style={styles.container}>
        <HomeScreen user={user} onLogout={handleLogout} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'signup' ? (
        <SignUpScreen onGoToLogin={() => setScreen('login')} />
      ) : (
        <LoginScreen onGoToSignUp={() => setScreen('signup')} onLoginSuccess={setUser} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  scrollContent: { alignItems: 'center', paddingVertical: 40 },
  banner: { backgroundColor: '#0B1C30', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, marginBottom: 16, alignSelf: 'stretch', marginHorizontal: 20 },
  bannerText: { color: '#fff', fontSize: 12, textAlign: 'center' },
  homeContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  homeTitle: { color: '#0B1C30', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  homeSubtitle: { color: '#434655', fontSize: 15, textAlign: 'center', marginTop: 10, marginBottom: 20 },
  Texter: { alignItems: 'center', padding: '10%' },
  te: { color: '#0B1C30', textAlign: 'center', fontSize: 29, fontWeight: 'bold' },
  t: { color: '#434655', textAlign: 'center', fontSize: 14 },
  input: { width: '80%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, marginTop: 16, fontSize: 16 },
  pa: { paddingHorizontal: 0, width: '80%', fontSize: 16 },
  bu: { width: '80%' },
  passwordContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 16, paddingHorizontal: 11 },
  icon: { fontSize: 18, marginRight: 50 },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  button: { width: '100%', paddingVertical: 14, borderRadius: 8, alignItems: 'center', textAlign: 'center', marginTop: 14 },
  buttonText: { width: '80%', color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  textSection: { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
  textSectionTitle: { color: '#666', fontSize: 14, marginRight: 4 },
  link: { color: '#0B1C30', fontSize: 14, fontWeight: '600' },
  forgot: { color: '#3F6BCD', fontSize: 14, fontWeight: '600', marginTop: 16, alignSelf: 'center', marginRight: '0' },
  error: { color: '#E3282C', fontSize: 14, marginTop: 12, textAlign: 'center' },
});
