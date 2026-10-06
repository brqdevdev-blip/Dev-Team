import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

const ACTIONS = [
  { key: 'recharge', label: 'Recharge', icon: 'card-outline' },
  { key: 'envoie', label: 'Envoie', icon: 'send-outline' },
  { key: 'historique', label: 'Historique', icon: 'time-outline' },
  { key: 'contact', label: 'contact', icon: 'person-outline' },
] as const;

type Props = {
  onRecharge?: () => void;
  onHistory?: () => void;
  onContact?: () => void;
  onEnvoie?: () => void;
};

export default function QuickActions({ onRecharge, onHistory, onContact, onEnvoie }: Props) {
  const handle = (key: string) => {
    if (key === 'recharge' && onRecharge) onRecharge();
    else if (key === 'historique' && onHistory) onHistory();
    else if (key === 'contact' && onContact) onContact();
    else if (key === 'envoie' && onEnvoie) onEnvoie();
  };

  return (
    <View style={styles.quickPill}>
      {ACTIONS.map((a) => (
        <Pressable
          key={a.key}
          onPress={() => handle(a.key)}
          style={({ pressed }: { pressed: boolean }) => [styles.quickItem, pressed && { opacity: 0.5 }]}
        >
          <Ionicons name={a.icon} size={26} color="#1A72B6" />
          <Text style={styles.quickItemLabel}>{a.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}