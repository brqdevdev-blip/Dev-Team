import { SafeAreaView, ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import BottomNav from '../dashboard/BottomNav';
import styles from '../../styles';
import { User } from '../../data/mockUsers';

export default function DashboardScreen({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <SafeAreaView style={styles.dashRoot}>
      <DashboardHeader user={user} />

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