import { ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';

export default function HomeScreen({ user, onRecharge, onViewAll }) {
  const handleService = (service) => {
    if (service.label === 'تعبئة الرصيد' && onRecharge) {
      onRecharge();
    }
  };

  return (
    <>
      <DashboardHeader user={user} />
      <ScrollView style={styles.dashScroll} contentContainerStyle={styles.dashScrollContent}>
        <HeroCard user={user} />
        <ServiceGrid onSelect={handleService} />
        <PromoCard onViewAll={onViewAll} />
        <TransactionList />
      </ScrollView>
    </>
  );
}
