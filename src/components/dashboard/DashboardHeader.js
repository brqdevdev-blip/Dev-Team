import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../ui/Logo';
import styles from '../../styles';
import { formatBalance } from '../../utils/format';

export default function DashboardHeader({ user }) {
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
          <Image source={require('../../../assets/shop/Cat03.png')} style={styles.dashHeroAvatarImg} />
        </View>
      </View>
      <Text style={styles.dashSoldeLabel}>votre solde</Text>
      <Text style={styles.dashSoldeValue}>{formatBalance(user?.balance)} DZD</Text>
  </>
  );
}
