import { useState } from 'react';
import { ScrollView } from 'react-native';
import styles from '../../styles';
import ProfileCard from '../ui/ProfileCard';
import SettingsRow from '../ui/SettingsRow';
import PersonalInfoScreen from './PersonalInfoScreen';
import SecurityScreen from './SecurityScreen';
import NotificationsScreen from './NotificationsScreen';
import HelpScreen from './HelpScreen';
import AboutScreen from './AboutScreen';
import { User } from '../../data/mockUsers';
import { useApp } from '../../context/AppContext';

const SETTINGS_ROWS = [
  { icon: 'person-outline', titleKey: 'personalInfo', sub: 'Nom, numéro, email', page: 'personal' },
  { icon: 'lock-closed-outline', titleKey: 'security', sub: 'Mot de passe, PIN', page: 'security' },
  { icon: 'notifications-outline', titleKey: 'notifications', sub: 'Alertes et SMS', page: 'notifications' },
  { icon: 'card-outline', titleKey: 'paymentMethods', sub: 'Cartes et comptes', page: 'payment' },
  { icon: 'help-circle-outline', titleKey: 'help', sub: 'FAQ, contact', page: 'help' },
  { icon: 'information-circle-outline', titleKey: 'about', sub: 'Version de l’application', page: 'about' },
] as const;

type Page = 'main' | 'personal' | 'security' | 'notifications' | 'help' | 'about';

type Props = {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
  onOpenPayment?: () => void;
};

export default function SettingsScreen({ user, onLogout, onUserUpdate, onOpenPayment }: Props) {
  const { t } = useApp();
  const [page, setPage] = useState<Page>('main');

  if (page === 'personal') {
    return <PersonalInfoScreen user={user} onBack={() => setPage('main')} onUserUpdate={onUserUpdate} />;
  }
  if (page === 'security') {
    return <SecurityScreen user={user} onBack={() => setPage('main')} onUserUpdate={onUserUpdate} />;
  }
  if (page === 'notifications') {
    return <NotificationsScreen onBack={() => setPage('main')} />;
  }
  if (page === 'help') {
    return <HelpScreen onBack={() => setPage('main')} />;
  }
  if (page === 'about') {
    return <AboutScreen onBack={() => setPage('main')} />;
  }

  const handleRowPress = (rowPage: string) => {
    if (rowPage === 'payment') {
      if (onOpenPayment) onOpenPayment();
    } else {
      setPage(rowPage as Page);
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
      <ProfileCard user={user} />

      {SETTINGS_ROWS.map((row) => (
        <SettingsRow
          key={row.titleKey}
          icon={row.icon}
          title={t(row.titleKey)}
          sub={row.sub}
          onPress={() => handleRowPress(row.page)}
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