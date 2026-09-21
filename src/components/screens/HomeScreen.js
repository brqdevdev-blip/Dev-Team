import { ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

export default function HomeScreen({ user, onRecharge, onViewAll, onEmergency }) {
  const { colors } = useApp();
  const handleService = (service) => {
    if (service.labelKey === 'svcRecharge' && onRecharge) {
      onRecharge();
    }
    if (service.labelKey === 'svcEmergency' && onEmergency) {
      onEmergency();
    }
  };

  return (
    <>
      <DashboardHeader user={user} />
      <ScrollView style={styles.dashScroll} contentContainerStyle={[styles.dashScrollContent, { backgroundColor: colors.bgAlt }]}>
        <HeroCard user={user} />
        <ServiceGrid onSelect={handleService} />
        <PromoCard onViewAll={onViewAll} />
        <TransactionList />
      </ScrollView>
    </>
  );
}