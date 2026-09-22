import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import RechargeScreen from './RechargeScreen';
import ShopScreen from './ShopScreen';
import GiftCardsScreen from './GiftCardsScreen';
import EmergencyScreen from './EmergencyScreen';
import SettingsScreen from './SettingsScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import BottomNav from '../dashboard/BottomNav';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

export default function MainScreen({ user, onLogout, onUserUpdate }) {
  const { colors } = useApp();
  const [tab, setTab] = useState('home');
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return (
      <SafeAreaView style={[styles.dashRoot, { backgroundColor: colors.bg }]}>
        <PaymentMethodsScreen user={user} onBack={() => setShowPayment(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.dashRoot, { backgroundColor: colors.bg }]}>
      {tab === 'home' && <HomeScreen user={user} onRecharge={() => setTab('recharge')} onViewAll={() => setTab('first')} onEmergency={() => setTab('emergency')} onPhones={() => setShowPayment(true)} />}
      {tab === 'recharge' && <RechargeScreen user={user} onManagePuces={() => setShowPayment(true)} onUserUpdate={onUserUpdate} />}
      {tab === 'first' && <GiftCardsScreen />}
      {tab === 'emergency' && <EmergencyScreen onBack={() => setTab('home')} />}
      {tab === 'orders' && <ShopScreen />}
      {tab === 'profile' && <SettingsScreen user={user} onLogout={onLogout} onOpenPayment={() => setShowPayment(true)} />}

      <BottomNav active={tab} onNavigate={setTab} />
    </SafeAreaView>
  );
}