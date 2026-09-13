import { SafeAreaView, ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import BottomNav from '../dashboard/BottomNav';
import styles from '../../styles';

export default function DashboardScreen({ user, onLogout }) {
  return (
    <SafeAreaView style={styles.dashRoot}>
      <DashboardHeader user={user} onLogout={onLogout} />

      <ScrollView style={styles.dashScroll} contentContainerStyle={styles.dashScrollContent}>
        <HeroCard user={user} />
        <ServiceGrid />
        <PromoCard />
        <TransactionList />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}