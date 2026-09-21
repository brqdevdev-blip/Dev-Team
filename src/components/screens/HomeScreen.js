import { ScrollView } from 'react-native';
import DashboardHeader from '../dashboard/DashboardHeader';
import HeroCard from '../dashboard/HeroCard';
import ServiceGrid from '../dashboard/ServiceGrid';
import PromoCard from '../dashboard/PromoCard';
import TransactionList from '../dashboard/TransactionList';
import styles from '../../styles';

<<<<<<< HEAD
export default function HomeScreen({ user, onLogout, onRecharge }) {
=======
export default function HomeScreen({ user, onRecharge, onViewAll }) {
>>>>>>> 0107044 (Initial commit)
  const handleService = (service) => {
    if (service.label === 'تعبئة الرصيد' && onRecharge) {
      onRecharge();
    }
  };

  return (
    <>
<<<<<<< HEAD
      <DashboardHeader user={user} onLogout={onLogout} />
      <ScrollView style={styles.dashScroll} contentContainerStyle={styles.dashScrollContent}>
        <HeroCard user={user} />
        <ServiceGrid onSelect={handleService} />
        <PromoCard />
=======
      <DashboardHeader user={user} />
      <ScrollView style={styles.dashScroll} contentContainerStyle={styles.dashScrollContent}>
        <HeroCard user={user} />
        <ServiceGrid onSelect={handleService} />
        <PromoCard onViewAll={onViewAll} />
>>>>>>> 0107044 (Initial commit)
        <TransactionList />
      </ScrollView>
    </>
  );
}
