import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import OperatorButton from '../ui/OperatorButton';
import { OPERATORS } from '../../data/operators';
import { useApp } from '../../context/AppContext';

const OPERATOR_CODES = {
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

const CALL_FORWARDING = [
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

export default function EmergencyScreen({ onBack }) {
  const { t, colors } = useApp();
  const [selectedOp, setSelectedOp] = useState(null);

  const dialCode = (code, desc) => {
    Alert.alert(desc, `Composer le code ${code} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Composer', onPress: () => Alert.alert('Appel', `Composition de ${code}...`) },
    ]);
  };

  const codes = selectedOp ? OPERATOR_CODES[selectedOp] : [];

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <View style={styles.dasheader}>
        <Pressable onPress={onBack} style={styles.payBackBtn}>
          <Ionicons name="arrow-back-outline" size={22} color={colors.primary} />
        </Pressable>
        <Text style={[styles.textpay, { color: colors.primary }]}>طوارئ</Text>
      </View>

      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
      <View style={styles.payOpRow}>
          {OPERATORS.map((op) => (
            <OperatorButton
              key={op.id}
              op={op}
              selected={selectedOp === op.id}
              onPress={() => setSelectedOp(selectedOp === op.id ? null : op.id)}
            />
          ))}
        </View>

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
              <Pressable
                key={`${c.code}-${c.desc}`}
                onPress={() => dialCode(c.code, c.desc)}
                style={[styles.settingsRow, { backgroundColor: colors.card }]}
              >
                <View style={[styles.settingsRowIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="keypad-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.settingsRowText}>
                  <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{c.code}</Text>
                  <Text style={[styles.settingsRowSub, { color: colors.muted }]}>{c.desc}</Text>
                </View>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
              </Pressable>
            ))}

            {selectedOp === 'mobilis' && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Renvoi d'appels</Text>
                {CALL_FORWARDING.map((c) => (
                  <Pressable
                    key={`${c.code}-${c.desc}`}
                    onPress={() => dialCode(c.code, c.desc)}
                    style={[styles.settingsRow, { backgroundColor: colors.card }]}
                  >
                    <View style={[styles.settingsRowIcon, { backgroundColor: colors.primarySoft }]}>
                      <Ionicons name="swap-horizontal-outline" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.settingsRowText}>
                      <Text style={[styles.settingsRowTitle, { color: colors.text }]}>{c.code}</Text>
                      <Text style={[styles.settingsRowSub, { color: colors.muted }]}>{c.desc}</Text>
                    </View>
                    <Ionicons name="call-outline" size={20} color={colors.primary} />
                  </Pressable>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
