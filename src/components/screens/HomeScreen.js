import { ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';

export default function HomeScreen({ user, onLogout, onRecharge }) {
  const handleService = (service) => {
    if (service.label === 'تعبئة الرصيد' && onRecharge) {
      onRecharge();
    }
  };

  return (
    <>
      <DashboardHeader user={user} onLogout={onLogout} />
      <ScrollView style={styles.dashScroll} contentContainerStyle={styles.dashScrollContent}>
        <HeroCard user={user} />
        <ServiceGrid onSelect={handleService} />
        <PromoCard />
        <TransactionList />
      </ScrollView>
    </>
  );
}
