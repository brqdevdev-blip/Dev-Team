import { useState } from 'react';
import {SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import RechargeScreen from './RechargeScreen';
import OrdersScreen from './OrdersScreen';
import SettingsScreen from './SettingsScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import BottomNav from '../dashboard/BottomNav';
import styles from '../../styles';

export default function MainScreen({ user, onLogout, onUserUpdate }) {
  const [tab, setTab] = useState('home');
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return (
      <SafeAreaView style={styles.dashRoot}>
        <PaymentMethodsScreen user={user} onBack={() => setShowPayment(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.dashRoot}>
      {tab === 'home' && <HomeScreen user={user} onLogout={onLogout} onRecharge={() => setTab('recharge')} />}
      {tab === 'recharge' && <RechargeScreen user={user} onManagePuces={() => setShowPayment(true)} onUserUpdate={onUserUpdate} />}
      {tab === 'orders' && <OrdersScreen />}
      {tab === 'profile' && <SettingsScreen user={user} onLogout={onLogout} onOpenPayment={() => setShowPayment(true)} />}

      <BottomNav active={tab} onNavigate={setTab} />
    </SafeAreaView>
  );
}
