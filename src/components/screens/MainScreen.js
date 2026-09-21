import { useState } from 'react';
import {SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import RechargeScreen from './RechargeScreen';
<<<<<<< HEAD
import OrdersScreen from './OrdersScreen';
=======
import ShopScreen from './ShopScreen';
import GiftCardsScreen from './GiftCardsScreen';
>>>>>>> 0107044 (Initial commit)
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
<<<<<<< HEAD
      {tab === 'home' && <HomeScreen user={user} onLogout={onLogout} onRecharge={() => setTab('recharge')} />}
      {tab === 'recharge' && <RechargeScreen user={user} onManagePuces={() => setShowPayment(true)} onUserUpdate={onUserUpdate} />}
      {tab === 'orders' && <OrdersScreen />}
=======
      {tab === 'home' && <HomeScreen user={user} onRecharge={() => setTab('recharge')} onViewAll={() => setTab('first')} />}
      {tab === 'recharge' && <RechargeScreen user={user} onManagePuces={() => setShowPayment(true)} onUserUpdate={onUserUpdate} />}
      {tab === 'first' && <GiftCardsScreen />}
      {tab === 'orders' && <ShopScreen />}
>>>>>>> 0107044 (Initial commit)
      {tab === 'profile' && <SettingsScreen user={user} onLogout={onLogout} onOpenPayment={() => setShowPayment(true)} />}

      <BottomNav active={tab} onNavigate={setTab} />
    </SafeAreaView>
  );
}
