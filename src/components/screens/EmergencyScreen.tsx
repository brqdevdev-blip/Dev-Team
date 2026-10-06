import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import SettingsRow from '../ui/SettingsRow';
import OperatorPicker from '../ui/OperatorPicker';
import { OPERATORS } from '../../data/operators';
import { useApp } from '../../context/AppContext';

type CodeItem = { code: string; desc: string };

const OPERATOR_CODES: Record<string, CodeItem[]> = {
  djezzy: [
    { code: '*710#', desc: 'Vérifier le solde' },
    { code: '*720#', desc: 'Offres / abonnements' },
    { code: '*707#', desc: 'Offres Internet' },
    { code: '*787#', desc: 'Forfait / facture' },
    { code: '*777#', desc: 'Services' },
    { code: '*700*RECHARGE#', desc: 'Recharger' },
    { code: '*701*RECHARGE#', desc: 'Payer la facture Control' },
    { code: '700', desc: 'Menu client' },
    { code: '710', desc: 'Solde par appel' },
    { code: '777', desc: 'Service client' },
    { code: '788', desc: 'Service client entreprises' },
  ],
  ooredoo: [
    { code: '*200#', desc: 'Consommation / solde' },
    { code: '*151#', desc: 'Forfaits / options Internet' },
    { code: '*500#', desc: 'Forfaits / options Internet' },
  ],
  mobilis: [
    { code: '*101#', desc: 'Vérifier votre numéro' },
    { code: '*222#', desc: 'Vérifier le solde Internet' },
    { code: '*600#', desc: 'Offres / forfaits Internet' },
    { code: '*610#', desc: 'Menu Sellekni' },
    { code: '*661#', desc: 'Sellekni+' },
    { code: '*606*NUMÉRO#', desc: 'Appelez-moi' },
    { code: '*618#', desc: 'Men3andi' },
    { code: '*620#', desc: 'Informations / abonnements' },
    { code: '*154#', desc: 'Annuler MobSound' },
  ],
};

const CALL_FORWARDING: CodeItem[] = [
  { code: '**21*644#', desc: 'Activer le renvoi inconditionnel' },
  { code: '##21#', desc: 'Annuler le renvoi inconditionnel' },
  { code: '**62*644#', desc: 'Renvoi si injoignable' },
  { code: '##62#', desc: 'Annuler renvoi injoignable' },
  { code: '**67*644#', desc: 'Renvoi si occupé' },
  { code: '##67#', desc: 'Annuler renvoi si occupé' },
  { code: '**61*644#', desc: 'Renvoi si pas de réponse' },
  { code: '##61#', desc: 'Annuler renvoi pas de réponse' },
  { code: '##002#', desc: 'Annuler tous les renvois' },
];

export default function EmergencyScreen({ onBack }: { onBack: () => void }) {
  const { t, colors } = useApp();
  const [selectedOp, setSelectedOp] = useState<string | null>(null);

  const dialCode = (code: string, desc: string) => {
    Alert.alert(desc, `Composer le code ${code} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Composer', onPress: () => Alert.alert('Appel', `Composition de ${code}...`) },
    ]);
  };

  const codes = selectedOp ? OPERATOR_CODES[selectedOp] : [];

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title={t('emergencyTitle')} onBack={onBack} />

      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        <OperatorPicker
          selectedId={selectedOp}
          onSelect={(id) => setSelectedOp(selectedOp === id ? null : id)}
        />

        {!selectedOp ? (
          <Text style={[styles.payEmpty, { color: colors.muted }]}>
            Choisissez un opérateur pour voir ses codes
          </Text>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {OPERATORS.find((o) => o.id === selectedOp)?.name}
            </Text>
            {codes.map((c) => (
              <SettingsRow
                key={`${c.code}-${c.desc}`}
                icon="keypad-outline"
                title={c.code}
                sub={c.desc}
                onPress={() => dialCode(c.code, c.desc)}
                chevron="call-outline"
              />
            ))}

            {selectedOp === 'mobilis' && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Renvoi d'appels</Text>
                {CALL_FORWARDING.map((c) => (
                  <SettingsRow
                    key={`${c.code}-${c.desc}`}
                    icon="swap-horizontal-outline"
                    title={c.code}
                    sub={c.desc}
                    onPress={() => dialCode(c.code, c.desc)}
                    chevron="call-outline"
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}