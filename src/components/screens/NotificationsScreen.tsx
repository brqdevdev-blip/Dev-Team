import { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';

type Props = {
  onBack: () => void;
};

export default function NotificationsScreen({ onBack }: Props) {
  const { colors, t } = useApp();
  const [rechargeAlerts, setRechargeAlerts] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [push, setPush] = useState(true);

  const rows = [
    {
      label: 'Alertes de recharge',
      sub: 'Recevoir un SMS après chaque recharge',
      value: rechargeAlerts,
      onChange: setRechargeAlerts,
    },
    {
      label: 'Promotions et offres',
      sub: 'Recevoir les nouveautés et réductions',
      value: promotions,
      onChange: setPromotions,
    },
    {
      label: 'Notifications push',
      sub: 'Alertes en temps réel dans l’application',
      value: push,
      onChange: setPush,
    },
  ];

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('notifications')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        {rows.map((r) => (
          <View key={r.label} style={[styles.settingsRow, { backgroundColor: colors.card }]}>
            <View style={styles.settingsRowText}>
              <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{r.label}</Text>
              <Text style={[styles.settingsRowSub, { color: colors.muted }]}>{r.sub}</Text>
            </View>
            <Switch
              value={r.value}
              onValueChange={r.onChange}
              trackColor={{ false: '#D5DFEC', true: '#1A72B6' }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}