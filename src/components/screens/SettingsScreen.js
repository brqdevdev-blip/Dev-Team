import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';
import { useApp } from '../../context/AppContext';

const SETTINGS_ROWS = [
  { icon: 'person-outline', titleKey: 'personalInfo', subKey: 'personalInfo' },
  { icon: 'lock-closed-outline', titleKey: 'security', subKey: 'security' },
  { icon: 'notifications-outline', titleKey: 'notifications', subKey: 'notifications' },
  { icon: 'card-outline', titleKey: 'paymentMethods', subKey: 'paymentMethods' },
  { icon: 'help-circle-outline', titleKey: 'help', subKey: 'help' },
  { icon: 'information-circle-outline', titleKey: 'about', subKey: 'about' },
];

export default function SettingsScreen({ user, onLogout, onOpenPayment }) {
  const { t, colors, lang, changeLang } = useApp();

  const handleRowPress = (titleKey) => {
    if (titleKey === 'paymentMethods' && onOpenPayment) {
      onOpenPayment();
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.dasheader}>
        <Text style={[styles.textpay, { color: colors.primary }]}>{t('settingsTitle')}</Text>
      </View>

      <ProfileCard user={user} />

      {/* Language */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('language')}</Text>

      <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
        <View style={[styles.settingsRowIcon, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name="language-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.settingsRowText}>
          <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{t('language')}</Text>
        </View>
        <Pressable onPress={() => changeLang(lang === 'fr' ? 'ar' : 'fr')} hitSlop={8}>
          <Text style={[styles.settingsRowTitle, { color: colors.primary }]}>
            {lang === 'fr' ? t('arabic') : t('french')}
          </Text>
        </Pressable>
      </View>

      {/* Settings rows */}
      {SETTINGS_ROWS.map((row) => (
        <Pressable key={row.titleKey} onPress={() => handleRowPress(row.titleKey)} style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View style={[styles.settingsRowIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name={row.icon} size={20} color={colors.primary} />
          </View>
          <View style={styles.settingsRowText}>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{t(row.titleKey)}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={18} color={colors.muted} />
        </Pressable>
      ))}

      <Pressable onPress={onLogout} style={[styles.settingsRow, { backgroundColor: colors.card }]}>
        <View style={[styles.settingsRowIcon, { backgroundColor: '#FDE8E8' }]}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        </View>
        <View style={styles.settingsRowText}>
          <Text style={[styles.settingsRowTitle, { color: colors.danger }]}>{t('logout')}</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}