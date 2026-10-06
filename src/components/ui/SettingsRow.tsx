import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import { useApp } from '../../context/AppContext';

type Props = {
  icon: any;
  title: string;
  sub: string;
  onPress: () => void;
  iconColor?: string;
  iconBg?: string;
  chevron?: any;
  titleColor?: string;
};

export default function SettingsRow({ icon, title, sub, onPress, iconColor, iconBg, chevron, titleColor }: Props) {
  const { colors } = useApp();
  return (
    <Pressable onPress={onPress} style={[styles.settingsRow, { backgroundColor: colors.card }]}>
      <View style={[styles.settingsRowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={20} color={iconColor ?? colors.primary} />
      </View>
      <View style={styles.settingsRowText}>
        <Text style={[styles.settingsRowTitle, { color: titleColor ?? colors.text }]}>{title}</Text>
        {sub ? <Text style={[styles.settingsRowSub, { color: colors.muted }]}>{sub}</Text> : null}
      </View>
      {chevron && <Ionicons name={chevron} size={18} color="#9AA3AE" />}
    </Pressable>
  );
}