<<<<<<< HEAD
import { View, Text, Image } from 'react-native';
import SubmitButton from '../ui/SubmitButton';
=======
import { View, Text } from 'react-native';
import SubmitButton from '../ui/SubmitButton';
import Logo from '../ui/Logo';
>>>>>>> 0107044 (Initial commit)
import styles from '../../styles';

export default function WelcomeScreen({ user, onContinue }) {
  return (
    <View style={styles.homeContainer}>
<<<<<<< HEAD
      <Image source={require('../../../assets/Frame 2.png')} />
=======
      <Logo />
>>>>>>> 0107044 (Initial commit)
      <Text style={styles.homeTitle}>Bienvenue, {user?.name || 'utilisateur'} !</Text>
      <Text style={styles.homeSubtitle}>Votre compte a été créé avec succès.</Text>
      <Text style={styles.homeSubtitle}>Connectez-vous pour continuer.</Text>
      <View style={styles.bu}>
        <SubmitButton label="Se connecter" onPress={onContinue} />
      </View>
    </View>
  );
}