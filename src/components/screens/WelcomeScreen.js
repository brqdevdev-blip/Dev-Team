import { View, Text } from 'react-native';
import SubmitButton from '../ui/SubmitButton';
import Logo from '../ui/Logo';
import styles from '../../styles';

export default function WelcomeScreen({ user, onContinue }) {
  return (
    <View style={styles.homeContainer}>
      <Logo />
      <Text style={styles.homeTitle}>Bienvenue, {user?.name || 'utilisateur'} !</Text>
      <Text style={styles.homeSubtitle}>Votre compte a été créé avec succès.</Text>
      <Text style={styles.homeSubtitle}>Connectez-vous pour continuer.</Text>
      <View style={styles.bu}>
        <SubmitButton label="Se connecter" onPress={onContinue} />
      </View>
    </View>
  );
}