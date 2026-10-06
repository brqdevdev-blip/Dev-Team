import { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import QuickActions from '../dashboard/QuickActions';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '../../data/mockUsers';

type Props = {
  user: User;
  onRecharge: () => void;
  onViewAll: () => void;
  onEmergency: () => void;
  onPayment: () => void;
  onGiftCards: () => void;
  onShop: () => void;
  onHistory: () => void;
  onEnvoie: () => void;
};

export default function HomeScreen({
  user,
  onRecharge,
  onViewAll,
  onEmergency,
  onPayment,
  onGiftCards,
  onShop,
  onHistory,
  onEnvoie,
}: Props) {
  const [heroHeight, setHeroHeight] = useState(220);

  const handleService = (s: { key: string; label: string; icon: string; color: string }) => {
    if (s.key === 'cartes' && onRecharge) onRecharge();
    else if (s.key === 'voucher' && onGiftCards) onGiftCards();
    else if ((s.key === 'mobile' || s.key === 'sim') && onPayment) onPayment();
    else if ((s.key === 'chargeur' || s.key === 'plus') && onShop) onShop();
    else if (s.key === 'iptv' || s.key === 'code') {
      Alert.alert('Bientôt disponible', 'Ce service arrive bientôt.');
    }
  };

  return (
    <>
    <LinearGradient
      colors={['#549DD4', '#0B4A8F'  ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.dashHero}
      onLayout={(e) => setHeroHeight(e.nativeEvent.layout.height)}
    >
      <DashboardHeader user={user} />
    </LinearGradient>
    <ScrollView
        style={styles.dashSheet}
        contentContainerStyle={styles.dashSheetContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.svcSectionTitle}>Services</Text>
        <ServiceGrid onSelect={handleService} />
        <PromoCard onViewAll={onViewAll} />

      </ScrollView>
      <View style={[styles.quickFloat, { top: heroHeight + 8 }]}>
        <QuickActions onRecharge={onRecharge} onHistory={onHistory} onContact={onEmergency} onEnvoie={onEnvoie} />
      </View>
    </>
  );
}
