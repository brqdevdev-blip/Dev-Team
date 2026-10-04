import { Text, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
};

export default function SubmitButton({ label, onPress, loading = false }: Props) {
  return (
    <Pressable onPress={onPress} disabled={loading}>
      <LinearGradient
        colors={['#3F6BCD', '#57DFFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}