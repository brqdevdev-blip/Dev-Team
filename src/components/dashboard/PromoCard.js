import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../ui/Logo';
import styles from '../../styles';

export default function PromoCard({ onViewAll }) {
  return (
    <>
      <View style={styles.promoHeaderRow}>
        <Text style={styles.promoSectionTitle}>Promotions</Text>
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text style={styles.voirPlus}>voir plus</Text>
        </Pressable>
      </View>
      <Pressable onPress={onViewAll} style={styles.promoBannerWrap}>
        <LinearGradient
          colors={['#0A4D8C', '#1A72B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promoBanner}
        >
          <View style={styles.promoStarRow} pointerEvents="none">
            <Ionicons name="star" size={16} color="#F5C542" />
            <Ionicons name="star" size={10} color="#F5C542" style={{ marginLeft: 6 }} />
            <Ionicons name="star" size={13} color="#F5C542" style={{ marginLeft: 12 }} />
          </View>
          <LinearGradient
            colors={['#F9DE8B', '#D4A437']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoGoldCard}
          >
            <View style={styles.promoGoldBrand}>
              <Logo width={16} height={14} />
              <Text style={styles.promoGoldBrandText}>Recharge Express</Text>
            </View>
            <Text style={styles.promoGoldTitle}>CARTE</Text>
            <Text style={styles.promoGoldTitle}>PROMOTIONNELLE</Text>
          </LinearGradient>
        </LinearGradient>
      </Pressable>
    </>
  );
}