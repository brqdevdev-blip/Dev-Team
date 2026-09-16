import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

const PLATFORMS = [
  { name: 'Steam', icon: 'logo-steam', image: require('../../../assets/steam-622x800.webp') },
  { name: 'Valorant', icon: 'crosshair-outline', image: require('../../../assets/valorant-gift-card-gbp-v2.webp') },
  { name: 'Steam Wallet', icon: 'card-outline', image: require('../../../assets/carte-de-recharge-credit-pour-steam-wallet-5-dollar-steam-5usd.jpg') },
  { name: 'PUBG', icon: 'game-controller-outline', image: require('../../../assets/LRRFtDi1WRCkkJEEYtpjrSpIGvInelpJOBGONqTR.jpg') },
  { name: 'PlayStation', icon: 'logo-playstation', image: require('../../../assets/images.jpg') },
  { name: 'Xbox', icon: 'logo-xbox', image: require('../../../assets/images.png') },
  { name: 'Free Fire', icon: 'flame-outline', image: require('../../../assets/images (1).jpg') },
  { name: 'FIFA', icon: 'football-outline', image: require('../../../assets/images (2).jpg') },
];

export default function PromoCard({ onViewAll }) {
  const { t, colors } = useApp();
  return (
    <>
      <View style={styles.gcHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('gamingPlatforms')}</Text>
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text style={[styles.gcViewAll, { color: colors.primary }]}>{t('viewAll')}</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gpRow}>
        {PLATFORMS.map((p) => (
          <View key={p.name} style={[styles.gpCard, { backgroundColor: colors.glass }]}>
            <Image source={p.image} style={styles.gpBg} />

            <View style={styles.gpNameBar}>
              <Text style={[styles.gpName, { color: colors.text }]} numberOfLines={1}>{p.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
