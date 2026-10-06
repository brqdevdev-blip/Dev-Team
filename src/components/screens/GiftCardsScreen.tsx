import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';
import valorantImg from '../../../assets/shop/valorant-gift-card-gbp-v2.webp';
import googlePlayImg from '../../../assets/shop/images.jpg';
import itunesImg from '../../../assets/shop/images (1).jpg';
import pubgImg from '../../../assets/shop/images (2).jpg';
import netflixImg from '../../../assets/shop/images (3).jpg';
import spotifyImg from '../../../assets/shop/images (4).jpg';
import amazonImg from '../../../assets/shop/images (5).jpg';
import xboxImg from '../../../assets/shop/images.png';

const GIFT_CARDS = [
  { name: 'Valo point Djezzy', amount: '500 DA', icon: 'game-controller-outline', image: valorantImg },
  { name: 'Carte Google Play', amount: '1 000 DA', icon: 'logo-google', image: googlePlayImg },
  { name: 'Carte iTunes', amount: '2 000 DA', icon: 'musical-notes-outline', image: itunesImg },
  { name: 'Carte PUBG UC', amount: '1 500 DA', icon: 'game-controller-outline', image: pubgImg },
  { name: 'Carte Netflix', amount: '3 000 DA', icon: 'tv-outline', image: netflixImg },
  { name: 'Carte Spotify', amount: '2 500 DA', icon: 'musical-notes-outline', image: spotifyImg },
  { name: 'Carte Amazon', amount: '4 000 DA', icon: 'cart-outline', image: amazonImg },
  { name: 'Carte Xbox', amount: '3 500 DA', icon: 'logo-xbox', image: xboxImg },
] as const;

export default function GiftCardsScreen() {
  const { t } = useApp();
  return (
    <View style={styles.shopRoot}>
      <ScreenHeader title={t('giftCards')} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <View style={styles.gpGrid}>
          {GIFT_CARDS.map((g) => (
            <View key={g.name} style={styles.gcCardBig}>
              <Image source={g.image} style={styles.gcCardImg as any} />

              <View style={styles.gcCardBar}>
                <Text style={styles.gcCardName} numberOfLines={1}>{g.name}</Text>
                <Text style={styles.gcCardAmount}>{g.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}