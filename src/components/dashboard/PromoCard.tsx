import { View, Text, Pressable } from 'react-native';
import styles from '../../styles';
import Frame4582 from '../../../assets/logos/Frame 4582.svg';

type Props = {
  onViewAll?: () => void;
};

export default function PromoCard({ onViewAll }: Props) {
  return (
    <>
      <View style={styles.promoHeaderRow}>
        <Text style={styles.promoSectionTitle}>Promotions</Text>
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text style={styles.voirPlus}>voir plus</Text>
        </Pressable>
      </View>
      <Pressable onPress={onViewAll} style={styles.promoBannerWrap}>
        <View style={styles.promoBanner}>
          <Frame4582 width="100%" height={174} />
        </View>
      </Pressable>
    </>
  );
}