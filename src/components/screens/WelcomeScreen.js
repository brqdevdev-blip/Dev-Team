import { View, Text, Image } from 'react-native';
import SubmitButton from '../ui/SubmitButton';
import styles from '../../styles';

export default function WelcomeScreen({ user, onContinue }) {
  return (
    <View style={styles.homeContainer}>
      <Image source={require('../../../assets/Frame 2.png')} />
      <Text style={styles.homeTitle}>Bienvenue, {user?.name || 'utilisateur'} !</Text>
      <Text style={styles.homeSubtitle}>Votre compte a été créé avec succès.</Text>
      <Text style={styles.homeSubtitle}>Connectez-vous pour continuer.</Text>
      <View style={styles.bu}>
        <SubmitButton label="Se connecter" onPress={onContinue} />
      </View>
    </View>
  );
}