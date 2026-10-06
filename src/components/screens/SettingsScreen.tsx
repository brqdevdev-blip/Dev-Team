import { ScrollView } from 'react-native';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';
import SettingsRow from '../ui/SettingsRow';
import { User } from '../../data/mockUsers';
import { useApp } from '../../context/AppContext';

const SETTINGS_ROWS = [
  { icon: 'person-outline', titleKey: 'personalInfo', sub: 'Nom, numéro, email' },
  { icon: 'lock-closed-outline', titleKey: 'security', sub: 'Mot de passe, PIN' },
  { icon: 'notifications-outline', titleKey: 'notifications', sub: 'Alertes et SMS' },
  { icon: 'card-outline', titleKey: 'paymentMethods', sub: 'Cartes et comptes' },
  { icon: 'help-circle-outline', titleKey: 'help', sub: 'FAQ, contact' },
  { icon: 'information-circle-outline', titleKey: 'about', sub: 'Version de l’application' },
] as const;

type Props = {
  user: User;
  onLogout: () => void;
  onBack?: () => void;
  onOpenPayment?: () => void;
};

export default function SettingsScreen({ user, onLogout, onBack, onOpenPayment }: Props) {
  const { t } = useApp();
  const handleRowPress = (title: string) => {
    if (title === t('paymentMethods') && onOpenPayment) {
      onOpenPayment();
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.container}>
      <ProfileCard user={user} />

      {SETTINGS_ROWS.map((row) => (
        <SettingsRow
          key={row.titleKey}
          icon={row.icon}
          title={t(row.titleKey)}
          sub={row.sub}
          onPress={() => handleRowPress(t(row.titleKey))}
          chevron="chevron-forward-outline"
        />
      ))}

      <SettingsRow
        icon="log-out-outline"
        title={t('logout')}
        sub=""
        onPress={onLogout}
        iconColor="#E3282C"
        iconBg="#FDE8E8"
        titleColor="#E3282C"
      />
    </ScrollView>
  );
}