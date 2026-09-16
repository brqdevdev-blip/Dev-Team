import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SignUpScreen from './src/components/screens/SignUpScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import WelcomeScreen from './src/components/screens/WelcomeScreen';
import MainScreen from './src/components/screens/MainScreen';
import styles from './src/styles';
import { AppProvider } from './src/context/AppContext';
import { loadSavedUsers, clearSession } from './src/data/mockUsers';

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

function AppInner() {
  const [screen, setScreen] = useState('signup');
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadSavedUsers();
  }, []);

  const handleLogout = async () => {
    await clearSession();
    setUser(null);
    setScreen('login');
  };

  const handleUserUpdate = (updatedUser) => setUser(updatedUser);

  if (screen === 'welcome') {
    return (
      <View style={styles.container}>
        <WelcomeScreen user={user} onContinue={() => setScreen('login')} />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <MainScreen user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'signup' ? (
        <SignUpScreen
          onGoToLogin={() => setScreen('login')}
          onSignUpSuccess={(newUser) => {
            setUser(newUser);
            setScreen('welcome');
          }}
        />
      ) : (
        <LoginScreen onGoToSignUp={() => setScreen('signup')} onLoginSuccess={setUser} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
