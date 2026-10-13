import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import Logo from '../ui/Logo';
import { useApp } from '../../context/AppContext';

type Props = {
  onBack: () => void;
};

export default function AboutScreen({ onBack }: Props) {
  const { colors, t } = useApp();
  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('about')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <View style={[styles.settingsProfileCard, { backgroundColor: colors.card }]}>
          <View style={[styles.settingsAvatar, { backgroundColor: '#fff' }]}>
            <Logo width={80} height={80} />
          </View>
          <Text style={[styles.settingsName, { color: colors.text }]}>{t('appName')}</Text>
          <Text style={[styles.settingsPhone, { color: colors.subtext }]}>Version 1.0.0</Text>
          <Text style={[styles.settingsRowSub, { color: colors.muted, textAlign: 'center', marginTop: 12 }]}>
            Recharge Express est une application de recharge mobile rapide et sécurisée.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}