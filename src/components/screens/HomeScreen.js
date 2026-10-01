import { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import QuickActions from '../dashboard/QuickActions';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({
  user,
  onRecharge,
  onViewAll,
  onEmergency,
  onPayment,
  onGiftCards,
  onShop,
  onHistory,
}) {
  const [heroHeight, setHeroHeight] = useState(220);

  const handleService = (s) => {
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
      colors={['#1A72B6', '#0B4A8F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
        <TransactionList />
      </ScrollView>
      <View style={[styles.quickFloat, { top: heroHeight + 8 }]}>
        <QuickActions onRecharge={onRecharge} onHistory={onHistory} onContact={onEmergency} />
      </View>
    </>
  );
}
