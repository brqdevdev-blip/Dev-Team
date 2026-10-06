import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import RechargeScreen from './RechargeScreen';
import ShopScreen from './ShopScreen';
import GiftCardsScreen from './GiftCardsScreen';
import EmergencyScreen from './EmergencyScreen';
import HistoryScreen from './HistoryScreen';
import SettingsScreen from './SettingsScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import CallScreen from './CallScreen';
import BottomNav from '../dashboard/BottomNav';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';
import { User } from '../../data/mockUsers';

type Props = {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
};

export default function MainScreen({ user, onLogout, onUserUpdate }: Props) {
  const { colors } = useApp();
  const [tab, setTab] = useState('home');
  const [showPayment, setShowPayment] = useState(false);
  const [showCall, setShowCall] = useState(false);

  if (showCall) {
    return (
      <SafeAreaView style={[styles.dashRoot, { backgroundColor: colors.bg }]}>
        <CallScreen user={user} onBack={() => setShowCall(false)} onUserUpdate={onUserUpdate} />
        <BottomNav
          active={tab}
          onNavigate={(key) => {
            setShowCall(false);
            setTab(key);
          }}
        />
      </SafeAreaView>
    );
  }

  if (showPayment) {
    return (
      <SafeAreaView style={[styles.dashRoot, { backgroundColor: colors.bg }]}>
        <PaymentMethodsScreen user={user} onBack={() => setShowPayment(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.dashRoot, { backgroundColor: colors.bg }]}>
      {tab === 'home' && (
        <HomeScreen
          user={user}
          onRecharge={() => setTab('recharge')}
          onViewAll={() => setTab('first')}
          onEmergency={() => setTab('emergency')}
          onPayment={() => setShowPayment(true)}
          onGiftCards={() => setTab('first')}
          onShop={() => setTab('orders')}
          onHistory={() => setTab('history')}
          onEnvoie={() => setShowCall(true)}
        />
      )}
      {tab === 'recharge' && <RechargeScreen user={user} onBack={() => setTab('home')} onManagePuces={() => setShowPayment(true)} onUserUpdate={onUserUpdate} />}
      {tab === 'first' && <GiftCardsScreen />}
      {tab === 'emergency' && <EmergencyScreen onBack={() => setTab('home')} />}
      {tab === 'orders' && <ShopScreen />}
      {tab === 'history' && <HistoryScreen onBack={() => setTab('home')} />}
      {tab === 'profile' && <SettingsScreen user={user} onLogout={onLogout} onOpenPayment={() => setShowPayment(true)} />}

      <BottomNav active={tab} onNavigate={setTab} />
    </SafeAreaView>
  );
}