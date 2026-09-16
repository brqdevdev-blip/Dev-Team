import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const GIFT_CARDS = [
  { name: 'Valo point Djezzy', amount: '500 DA', icon: 'game-controller-outline', image: require('../../../assets/valorant-gift-card-gbp-v2.webp') },
  { name: 'Carte Google Play', amount: '1 000 DA', icon: 'logo-google', image: require('../../../assets/images.jpg') },
  { name: 'Carte iTunes', amount: '2 000 DA', icon: 'musical-notes-outline', image: require('../../../assets/images (1).jpg') },
  { name: 'Carte PUBG UC', amount: '1 500 DA', icon: 'game-controller-outline', image: require('../../../assets/images (2).jpg') },
  { name: 'Carte Netflix', amount: '3 000 DA', icon: 'tv-outline', image: require('../../../assets/images (3).jpg') },
  { name: 'Carte Spotify', amount: '2 500 DA', icon: 'musical-notes-outline', image: require('../../../assets/images (4).jpg') },
  { name: 'Carte Amazon', amount: '4 000 DA', icon: 'cart-outline', image: require('../../../assets/images (5).jpg') },
  { name: 'Carte Xbox', amount: '3 500 DA', icon: 'logo-xbox', image: require('../../../assets/images.png') },
];

export default function GiftCardsScreen() {
  return (
    <View style={styles.shopRoot}>
      <View style={styles.dasheader}>
        <Text style={styles.textpay}>Cartes cadeaux</Text>
      </View>
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <View style={styles.gpGrid}>
          {GIFT_CARDS.map((g) => (
            <View key={g.name} style={styles.gcCardBig}>
              <Image source={g.image} style={styles.gcCardImg} />

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
