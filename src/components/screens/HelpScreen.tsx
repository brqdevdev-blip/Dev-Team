import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';

const FAQS = [
  {
    q: 'Comment recharger un numéro ?',
    a: 'Ouvrez l’écran Envoie, composez le numéro, entrez le montant puis appuyez sur Recharger.',
  },
  {
    q: 'Comment ajouter une puce ?',
    a: 'Allez dans Moyens de paiement, choisissez l’opérateur puis appuyez sur Ajouter un numéro.',
  },
  {
    q: 'Le solde est-il mis à jour immédiatement ?',
    a: 'Oui, le solde est débité dès la confirmation de la recharge.',
  },
  {
    q: 'Comment contacter le support ?',
    a: 'Par email à support@recharge-express.dz ou par téléphone au 0800 123 456.',
  },
];

type Props = {
  onBack: () => void;
};

export default function HelpScreen({ onBack }: Props) {
  const { colors, t } = useApp();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('help')} onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        {FAQS.map((f, i) => (
          <Pressable
            key={i}
            onPress={() => setOpen(open === i ? null : i)}
            style={[styles.settingsRow, { backgroundColor: colors.card }]}
          >
            <View style={styles.settingsRowText}>
              <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{f.q}</Text>
              {open === i && (
                <Text style={[styles.settingsRowSub, { color: colors.subtext, marginTop: 6 }]}>{f.a}</Text>
              )}
            </View>
            <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={18} color="#9AA3AE" />
          </Pressable>
        ))}

        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View style={styles.settingsRowText}>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>Support</Text>
            <Text style={[styles.settingsRowSub, { color: colors.muted }]}>support@recharge-express.dz</Text>
            <Text style={[styles.settingsRowSub, { color: colors.muted }]}>0800 123 456</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}