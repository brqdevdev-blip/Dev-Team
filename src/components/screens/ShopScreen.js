import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'phones', label: 'Téléphones' },
  { key: 'accessories', label: 'Accessoires' },
];

const PRODUCTS = [
  { id: '1', name: 'iPhone 15 Pro', price: 145000, category: 'phones', image: require('../../../assets/51z76AuUYlL._AC_UF1000,1000_QL80_.jpg'), color: '#1A72B6' },
  { id: '2', name: 'Samsung Galaxy S24', price: 120000, category: 'phones', image: require('../../../assets/images.jpg'), color: '#00496A' },
  { id: '3', name: 'Xiaomi Redmi Note 13', price: 45000, category: 'phones', image: require('../../../assets/images (1).jpg'), color: '#E3282C' },
  { id: '4', name: 'Écouteurs sans fil', price: 8500, category: 'accessories', image: require('../../../assets/images (2).jpg'), color: '#31744C' },
  { id: '5', name: 'Coque de protection', price: 1500, category: 'accessories', image: require('../../../assets/images (3).jpg'), color: '#BA1A1A' },
  { id: '6', name: 'Chargeur rapide 65W', price: 3000, category: 'accessories', image: require('../../../assets/images (4).jpg'), color: '#E4A57B' },
  { id: '7', name: 'Power bank 20000mAh', price: 6500, category: 'accessories', image: require('../../../assets/images (5).jpg'), color: '#003527' },
  { id: '8', name: 'Montre connectée', price: 18000, category: 'accessories', image: require('../../../assets/images (1).jpg'), color: '#1A72B6' },
];

function formatPrice(value) {
  return Math.round(Number(value) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function ShopScreen() {
  const { t, colors } = useApp();
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = PRODUCTS.filter((p) => category === 'all' || p.category === category);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    Alert.alert(
      'Confirmation',
      `Commander ${cartCount} article(s) pour ${formatPrice(cartTotal)} da ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            setCart([]);
            setShowCart(false);
            Alert.alert('Succès', 'Commande envoyée avec succès.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <View style={styles.dasheader}>
        <Text style={[styles.textpay, { color: colors.primary }]}>{t('shopHeader')}</Text>
        <Pressable onPress={() => setShowCart(true)} style={styles.shopCartBtn}>
          <Ionicons name="cart-outline" size={24} color={colors.primary} />
          {cartCount > 0 && (
            <View style={styles.shopCartBadge}>
              <Text style={styles.shopCartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {showCart ? (
        <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
          <View style={styles.shopCartHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('cart')}</Text>
            <Pressable onPress={() => setShowCart(false)}>
              <Text style={[styles.shopBackLink, { color: colors.primary }]}>{t('continueShopping')}</Text>
            </Pressable>
          </View>

          {cart.length === 0 ? (
            <Text style={[styles.payEmpty, { color: colors.muted }]}>{t('emptyCart')}</Text>
          ) : (
            <>
              {cart.map((item) => (
                <View key={item.product.id} style={styles.shopCartRow}>
                  <View style={styles.shopCartThumb}>
                    <Image source={item.product.image} style={styles.shopCartThumbImg} />
                  </View>
                  <View style={styles.shopCartInfo}>
                    <Text style={styles.txTitle}>{item.product.name}</Text>
                    <Text style={styles.txDetail}>{formatPrice(item.product.price)} da</Text>
                  </View>
                  <View style={styles.shopQtyWrap}>
                    <Pressable onPress={() => changeQty(item.product.id, -1)} style={styles.shopQtyBtn}>
                      <Ionicons name="remove" size={16} color="#1A72B6" />
                    </Pressable>
                    <Text style={styles.shopQtyText}>{item.qty}</Text>
                    <Pressable onPress={() => changeQty(item.product.id, 1)} style={styles.shopQtyBtn}>
                      <Ionicons name="add" size={16} color="#1A72B6" />
                    </Pressable>
                  </View>
                  <Pressable onPress={() => removeItem(item.product.id)} style={styles.shopRemoveBtn}>
                    <Ionicons name="trash-outline" size={18} color="#E3282C" />
                  </Pressable>
                </View>
              ))}

              <View style={styles.shopTotalRow}>
                <Text style={[styles.shopTotalLabel, { color: colors.subtext }]}>{t('total')}</Text>
                <Text style={[styles.shopTotalValue, { color: colors.text }]}>{formatPrice(cartTotal)} da</Text>
              </View>

              <Pressable onPress={checkout} style={styles.rcConfirmBtn}>
                <Text style={styles.rcConfirmText}>{t('order')} ({cartCount})</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      ) : (
        <>
          <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
            <View style={styles.shopCats}>
              {CATEGORIES.map((c) => (
                <Pressable
                  key={c.key}
                  onPress={() => setCategory(c.key)}
                  style={[styles.shopCatChip, category === c.key && styles.shopCatChipActive]}
                >
                  <Text style={[styles.shopCatText, category === c.key && styles.shopCatTextActive]}>
                    {c.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.shopGrid}>
              {filtered.map((p) => (
                <View key={p.id} style={styles.shopCard}>
                  <View style={styles.shopCardImgWrap}>
                    <Image source={p.image} style={styles.shopCardImg} />
                  </View>
                  <View style={styles.shopCardBody}>
                    <Text style={styles.shopCardName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.shopCardPrice}>{formatPrice(p.price)} da</Text>
                    <Pressable onPress={() => addToCart(p)} style={styles.shopCardAddBtn}>
                      <Ionicons name="add" size={16} color="#fff" />
                      <Text style={styles.shopCardAddText}>{t('add')}</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {cartCount > 0 && (
            <Pressable onPress={() => setShowCart(true)} style={styles.shopBar}>
              <View style={styles.shopBarLeft}>
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.shopBarCount}>{cartCount} article(s)</Text>
              </View>
              <Text style={styles.shopBarTotal}>{formatPrice(cartTotal)} da</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}
