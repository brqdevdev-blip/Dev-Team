import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

type Props = {
  title: string;
  onBack?: () => void;
};

export default function ScreenHeader({ title, onBack }: Props) {
  const { colors } = useApp();
  return (
    <View style={styles.dasheader}>
      {onBack && (
        <Pressable onPress={onBack} style={styles.payBackBtn}>
          <Ionicons name="arrow-back-outline" size={22} color={colors.primary} />
        </Pressable>
      )}
      <Text style={[styles.textpay, { color: colors.primary }]}>{title}</Text>
    </View>
  );
}