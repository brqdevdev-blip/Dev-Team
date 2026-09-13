import { View, Text, Image } from 'react-native';
import styles from '../../styles';

export default function PromoCard() {
  return (
    <View style={styles.promoCard}>
      <Image source={require('../../../assets/Frame 2.png')} style={styles.promoImg} />
      <View style={styles.promoTextWrap}>
        <Text style={styles.promoTitle}>Offre spéciale</Text>
        <Text style={styles.promoSub}>-10% sur vos recharges ce week-end</Text>
      </View>
    </View>
  );
}