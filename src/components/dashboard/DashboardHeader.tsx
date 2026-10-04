import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { formatBalance } from '../../utils/format';
import { User } from '../../data/mockUsers';
import Cat03 from '../../../assets/shop/Cat03.png';

export default function DashboardHeader({ user }: { user: User }) {
  return (
  <>
      <View style={styles.dashHeroTop}>
        <View style={styles.dashBrand}>
          <Logo width={30} height={26} />
          <Text style={styles.dashBrandName}>
            Recharge <Text style={styles.dashBrandLight}>Express</Text>
          </Text>
        </View>
        <View style={styles.dashHeroAvatar}>
          <Image source={Cat03} style={styles.dashHeroAvatarImg as any} />
        </View>
      </View>
      <View style={styles.dshSheetContent}>
        <Text style={styles.dashSoldeLabel}>votre solde</Text>
        <Text style={styles.dashSoldeValue}>{formatBalance(user?.balance)} DZD</Text>
      </View>
  </>
  );
}
