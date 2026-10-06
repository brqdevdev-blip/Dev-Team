import { View, ScrollView } from 'react-native';
import styles from '../../styles';
import TransactionList from '../dashboard/TransactionList';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';

type Props = {
  onBack: () => void;
};

export default function HistoryScreen({ onBack }: Props) {
  const { colors, t } = useApp();
  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('history')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <TransactionList />
      </ScrollView>
    </View>
  );
}