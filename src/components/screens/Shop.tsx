import { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { formatBalance } from '../../utils/format';
import { useApp } from '../../context/AppContext';

import iphoneImg from '../../../assets/shop/iphone.jpg';
import galaxyImg from '../../../assets/shop/s8.jpg';
import redmiImg from '../../../assets/shop/ipo.jpg';
import earbudsImg from '../../../assets/shop/ipoh.jpg';
import coqueImg from '../../../assets/shop/qss.jpg';
import chargeurImg from '../../../assets/shop/qsssjpg.jpg';
import powerbankImg from '../../../assets/shop/sqdsa.jpg';
import montreImg from '../../../assets/shop/sss.jpg';
import pcImg from '../../../assets/shop/933.jpg';
import clavierImg from '../../../assets/shop/412273180_2ba1e609-0d69-4c91-b599-74bda5bcc324.jpg';

type CategoryId = 'all' | 'phones' | 'accessories' | 'computing';

type CategoryIcon = 'grid-outline' | 'phone-portrait-sharp' | 'headset-outline' | 'pricetag-outline';

type ProductIcon = 'phone-portrait-sharp' | 'headset-outline' | 'cube-outline';

type ProductCategory = 'phones' | 'accessories' | 'computing';

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: ProductCategory;
  image?: number;
  tint: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: { kind: 'discount' | 'new'; label: string };
};

type CartItem = {
  product: Product;
  qty: number;
};

const CATEGORIES: { id: CategoryId; label: string; icon: CategoryIcon }[] = [
  { id: 'all', label: 'Tous', icon: 'grid-outline' },
  { id: 'phones', label: 'Téléphones', icon: 'phone-portrait-sharp' },
  { id: 'accessories', label: 'Accessoires', icon: 'headset-outline' },
  { id: 'computing', label: 'Informatique', icon: 'pricetag-outline' },
];

// Fallback icon shown when a product has no photo.
const PLACEHOLDER_ICONS: Record<ProductCategory, ProductIcon> = {
  phones: 'phone-portrait-sharp',
  accessories: 'headset-outline',
  computing: 'cube-outline',
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', price: 145000, oldPrice: 155000, category: 'phones', image: iphoneImg, tint: '#0B0B0D', rating: 4.8, reviews: 124, description: 'Puce A17 Pro, écran Super Retina XDR 6,1", appareil photo 48 Mpx. Livré avec câble USB-C.', badge: { kind: 'new', label: 'Nouveau' } },
  { id: '2', name: 'Samsung Galaxy S24', price: 120000, category: 'phones', image: galaxyImg, tint: '#00496A', rating: 4.6, reviews: 98, description: 'Écran Dynamic AMOLED 6,2", processeur Exynos 2400, triple capteur 50 Mpx.' },
  { id: '3', name: 'Xiaomi Redmi Note 13', price: 45000, oldPrice: 52000, category: 'phones', image: redmiImg, tint: '#E3282C', rating: 4.3, reviews: 210, description: 'Écran AMOLED 120 Hz, batterie 5000 mAh, charge rapide 33W.', badge: { kind: 'discount', label: '-13%' } },
  { id: '4', name: 'Coque de protection', price: 8500, oldPrice: 9900, category: 'accessories', image: earbudsImg, tint: '#31744C', rating: 4.5, reviews: 340, description: 'Réduction de bruit active, autonomie 30h avec le boîtier, Bluetooth 5.3.', badge: { kind: 'discount', label: '-14%' } },
  { id: '5', name: 'Coque de protection', price: 1500, category: 'accessories', image: coqueImg, tint: '#BA1A1A', rating: 4.1, reviews: 56, description: 'Coque antichoc en silicone, protection renforcée des coins.' },
  { id: '6', name: 'Coque de protection', price: 3000, category: 'accessories', image: chargeurImg, tint: '#E4A57B', rating: 4.4, reviews: 180, description: 'Charge rapide GaN 65W, compatible USB-C et USB-A, format compact.' },
  { id: '7', name: 's26 ult', price: 6500, oldPrice: 7500, category: 'phones', image: powerbankImg, tint: '#003527', rating: 4.7, reviews: 95, description: 'Batterie externe 20000 mAh, charge rapide 22,5W, double sortie USB.', badge: { kind: 'discount', label: '-13%' } },
  { id: '8', name: 's25 ult', price: 18000, category: 'phones', image: montreImg, tint: '#1A72B6', rating: 4.2, reviews: 77, description: 'Suivi cardiaque, GPS intégré, autonomie 7 jours, étanche 5 ATM.' },
  { id: '9', name: 'Coque de protection pink', price: 95000, category: 'computing', image: pcImg, tint: '#2E4B7A', rating: 4.6, reviews: 42, description: 'Processeur Intel Core i7, 16 Go RAM, SSD 512 Go, écran 15,6" Full HD.', badge: { kind: 'new', label: 'Nouveau' } },
  { id: '10', name: 'cassque', price: 12000, category: 'computing', image: clavierImg, tint: '#C9A227', rating: 4.8, reviews: 150, description: 'Clavier mécanique rétroéclairé RGB, switches bleus, format compact.' },
];

export default function Shop() {
  const { t } = useApp();
  const [category, setCategory] = useState<CategoryId>('all');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showCart, setShowCart] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (q === '' || p.name.toLowerCase().includes(q))
    );
  }, [category, query]);

  const toggleFavorite = (id: string) => {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFavorites(next);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    Alert.alert(
      'Confirmation',
      `Commander ${cartCount} article(s) pour ${formatBalance(cartTotal)} da ?`,
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
    <View style={styles.shopRoot}>
      {/* Header */}
      <View style={styles.dasheader}>
        <View style={styles.shopBrand}>
          <Ionicons name="bag-outline" size={28} color="#1A72B6" />
          <View style={styles.shopBrandText}>
            <Text style={styles.textpay}>{t('shopHeader')}</Text>
            <Text style={styles.shopSubtitle}>Les meilleures offres, juste pour vous</Text>
          </View>
        </View>
        <Pressable onPress={() => setShowCart(true)} style={styles.shopCartBtn}>
          <Ionicons name="cart-outline" size={24} color="#1A72B6" />
          {cartCount > 0 && (
            <View style={styles.shopCartBadge}>
              <Text style={styles.shopCartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {showCart ? (
        /* ---------------- Cart view ---------------- */
        <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
          <View style={styles.shopCartHeader}>
            <Text style={styles.sectionTitle}>{t('cart')}</Text>
            <Pressable onPress={() => setShowCart(false)}>
              <Text style={styles.shopBackLink}>{t('continueShopping')}</Text>
            </Pressable>
          </View>

          {cart.length === 0 ? (
            <Text style={styles.payEmpty}>{t('emptyCart')}</Text>
          ) : (
            <>
              {cart.map((item) => (
                <View key={item.product.id} style={styles.shopCartRow}>
                  <View style={styles.shopCartThumb}>
                    {item.product.image ? (
                      <Image source={item.product.image} style={styles.shopCartThumbImg} />
                    ) : (
                      <Ionicons name={PLACEHOLDER_ICONS[item.product.category]} size={24} color="#1A72B6" />
                    )}
                  </View>
                  <View style={styles.shopCartInfo}>
                    <Text style={styles.txTitle}>{item.product.name}</Text>
                    <Text style={styles.txDetail}>{formatBalance(item.product.price)} da</Text>
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
                <Text style={styles.shopTotalLabel}>{t('total')}</Text>
                <Text style={styles.shopTotalValue}>{formatBalance(cartTotal)} da</Text>
              </View>

              <Pressable onPress={checkout} style={styles.rcConfirmBtn}>
                <Text style={styles.rcConfirmText}>{t('order')} ({cartCount})</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      ) : (
        /* ---------------- Shop view ---------------- */
        <>
          <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
            {/* Search */}
            <View style={styles.shopSearch}>
              <Ionicons name="search-outline" size={20} color="#9AA3AE" />
              <TextInput
                style={styles.shopSearchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Rechercher un produit..."
                placeholderTextColor="#9AA3AE"
              />
            </View>

            {/* Category chips */}
            <View style={styles.shopCats}>
              {CATEGORIES.map((c) => {
                const active = category === c.id;
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => setCategory(c.id)}
                    style={[styles.shopCatChip, active && styles.shopCatChipActive]}
                  >
                    <Ionicons name={c.icon} size={16} color={active ? '#fff' : '#434655'} />
                    <Text style={[styles.shopCatText, active && styles.shopCatTextActive]}>{c.label}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Products */}
            {visible.length > 0 ? (
              <View style={styles.shopGrid}>
                {visible.map((p) => (
                  <View key={p.id} style={styles.shopCard}>
                    <Pressable onPress={() => setSelected(p)}>
                      <View style={styles.shopCardImgWrap}>
                        {p.image ? (
                          <Image source={p.image} style={styles.shopCardImg} />
                        ) : (
                          <Ionicons name={PLACEHOLDER_ICONS[p.category]} size={56} color="#fff" />
                        )}
                        {p.badge && (
                          <View style={[styles.shopBadge, p.badge.kind === 'new' && styles.shopBadgeNew]}>
                            <Text style={styles.shopBadgeText}>{p.badge.label}</Text>
                          </View>
                        )}
                      </View>
                    </Pressable>

                    <Pressable onPress={() => toggleFavorite(p.id)} style={styles.shopFav}>
                      <Ionicons
                        name={favorites.has(p.id) ? 'heart' : 'heart-outline'}
                        size={18}
                        color={favorites.has(p.id) ? '#E5334B' : '#0B1C30'}
                      />
                    </Pressable>

                    <View style={styles.shopCardBody}>
                      <Pressable onPress={() => setSelected(p)}>
                        <Text style={styles.shopCardName} numberOfLines={1}>{p.name}</Text>
                        <View style={styles.shopRating}>
                          <Ionicons name="star" size={14} color="#FFB400" />
                          <Text style={styles.shopRatingValue}>{p.rating.toFixed(1)}</Text>
                          <Text style={styles.shopRatingReviews}>({p.reviews} avis)</Text>
                        </View>
                        <View style={styles.shopPrices}>
                          {p.oldPrice && (
                            <Text style={styles.shopOldPrice}>{formatBalance(p.oldPrice)}</Text>
                          )}
                          <Text style={[styles.shopCardPrice, !p.oldPrice && styles.shopPriceSolo]}>
                            {formatBalance(p.price)}
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable onPress={() => addToCart(p)} style={styles.shopCardAddBtn}>
                        <Ionicons name="cart-outline" size={16} color="#fff" />
                        <Text style={styles.shopCardAddText}>{t('add')}</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.payEmpty}>
                Aucun produit trouvé. Essayez une autre recherche ou catégorie.
              </Text>
            )}
          </ScrollView>

          {/* Floating cart bar */}
          {cartCount > 0 && (
            <Pressable onPress={() => setShowCart(true)} style={styles.shopBar}>
              <View style={styles.shopBarLeft}>
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.shopBarCount}>{cartCount} article(s)</Text>
              </View>
              <Text style={styles.shopBarTotal}>{formatBalance(cartTotal)} da</Text>
            </Pressable>
          )}
        </>
      )}

      {/* ---------------- Product detail modal ---------------- */}
      <Modal
        visible={!!selected}
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={styles.shopDetailRoot}>
            <View style={styles.shopDetailHeader}>
              <Pressable onPress={() => setSelected(null)} style={styles.payBackBtn}>
                <Ionicons name="arrow-back-outline" size={24} color="#16294A" />
              </Pressable>
              <Pressable onPress={() => toggleFavorite(selected.id)} style={styles.shopDetailFav}>
                <Ionicons
                  name={favorites.has(selected.id) ? 'heart' : 'heart-outline'}
                  size={22}
                  color={favorites.has(selected.id) ? '#E5334B' : '#0B1C30'}
                />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.shopDetailContent}>
              <View style={[styles.shopDetailImgWrap, { backgroundColor: selected.tint }]}>
                {selected.image ? (
                  <Image source={selected.image} style={styles.shopDetailImg} />
                ) : (
                  <Ionicons name={PLACEHOLDER_ICONS[selected.category]} size={120} color="#fff" />
                )}
                {selected.badge && (
                  <View style={[styles.shopBadge, selected.badge.kind === 'new' && styles.shopBadgeNew]}>
                    <Text style={styles.shopBadgeText}>{selected.badge.label}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.shopDetailName}>{selected.name}</Text>

              <View style={styles.shopRating}>
                <Ionicons name="star" size={16} color="#FFB400" />
                <Text style={styles.shopRatingValue}>{selected.rating.toFixed(1)}</Text>
                <Text style={styles.shopRatingReviews}>({selected.reviews} avis)</Text>
              </View>

              <View style={styles.shopDetailPrices}>
                {selected.oldPrice && (
                  <Text style={styles.shopOldPrice}>{formatBalance(selected.oldPrice)} da</Text>
                )}
                <Text style={styles.shopDetailPrice}>{formatBalance(selected.price)} da</Text>
              </View>

              <Text style={styles.shopDetailSectionTitle}>Description</Text>
              <Text style={styles.shopDetailDesc}>{selected.description}</Text>

              <Pressable onPress={() => addToCart(selected)} style={styles.shopDetailAddBtn}>
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.shopDetailAddText}>{t('add')} au panier</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}
