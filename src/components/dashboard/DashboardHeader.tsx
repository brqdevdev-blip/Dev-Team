import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LogoLight from '../ui/LogoLight';
import styles from '../../styles';
import { formatBalance } from '../../utils/format';
import { User } from '../../data/mockUsers';

export default function DashboardHeader({ user }: { user: User }) {
  return (
  <>
      <View style={styles.dashHeroTop}>
        <View style={styles.dashBrand}>
          <LogoLight width={30} height={26} />
          <Text style={styles.dashBrandName}>
            Recharge <Text style={styles.dashBrandLight}>Express</Text>
          </Text>
        </View>
        <View style={styles.dashHeroAvatar}>
          <LogoLight width={34} height={34} />
        </View>
      </View>
      <View style={styles.dshSheetContent}>
        <Text style={styles.dashSoldeLabel}>votre solde</Text>
        <Text style={styles.dashSoldeValue}>{formatBalance(user?.balance)} DZD</Text>
      </View>
  </>
  );
}
