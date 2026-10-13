import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
import ScreenHeader from '../ui/ScreenHeader';
import { useApp } from '../../context/AppContext';
import {
  Contact,
  loadContacts,
  saveContacts,
  AVATAR_EMOJIS,
  AVATAR_COLORS,
} from '../../data/contacts';
import { formatPhone } from '../../utils/format';

type Props = {
  onBack: () => void;
  onSelect: (contact: Contact) => void;
};

export default function ContactsScreen({ onBack, onSelect }: Props) {
  const { colors } = useApp();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftPhone, setDraftPhone] = useState('');
  const [draftEmoji, setDraftEmoji] = useState('👤');
  const [draftColor, setDraftColor] = useState('#1A72B6');

  useEffect(() => {
    loadContacts().then(setContacts);
  }, []);

  const persist = (next: Contact[]) => {
    setContacts(next);
    saveContacts(next);
  };

  const startEdit = (c: Contact) => {
    setEditing(c);
    setDraftName(c.name);
    setDraftPhone(c.phone);
    setDraftEmoji(c.emoji);
    setDraftColor(c.color);
  };

  const saveEdit = () => {
    if (!editing) return;
    const name = draftName.trim();
    const phone = draftPhone.replace(/\D/g, '');
    if (!name || !phone) return;
    const next = contacts.map((c) =>
      c.id === editing.id ? { ...c, name, phone, emoji: draftEmoji, color: draftColor } : c
    );
    persist(next);
    setEditing(null);
  };

  return (
    <View style={[styles.shopRoot, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Contacts" onBack={onBack} />
      <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenScrollContent}>
        {contacts.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onSelect(c)}
            style={({ pressed }: { pressed: boolean }) => [styles.payNumRow, pressed && { opacity: 0.6 }]}
          >
            <View style={[styles.payNumBadge, { backgroundColor: c.color }]}>
              <Text style={styles.contactBadgeEmoji}>{c.emoji}</Text>
            </View>
            <View style={styles.payRowTextWrap}>
              <Text style={styles.payRowTitle}>{c.name}</Text>
              <Text style={styles.payRowSub}>{formatPhone(c.phone)}</Text>
            </View>
            <Pressable onPress={() => startEdit(c)} hitSlop={8} style={styles.contactEditBtn}>
              <Ionicons name="pencil" size={18} color="#1A72B6" />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={!!editing}
        transparent
        animationType="slide"
        onRequestClose={() => setEditing(null)}
      >
        <View style={styles.contactModalOverlay}>
          <View style={styles.contactModal}>
            <Text style={styles.contactModalTitle}>Modifier le contact</Text>

            <View style={[styles.contactAvatarPreview, { backgroundColor: draftColor }]}>
              <Text style={styles.contactAvatarPreviewText}>{draftEmoji}</Text>
            </View>

            <Text style={styles.paySectionLabel}>Photo / Avatar</Text>
            <View style={styles.contactEmojiRow}>
              {AVATAR_EMOJIS.map((e) => (
                <Pressable
                  key={e}
                  onPress={() => setDraftEmoji(e)}
                  style={[styles.contactEmojiOption, draftEmoji === e && styles.contactEmojiOptionActive]}
                >
                  <Text style={styles.contactEmojiText}>{e}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.contactColorRow}>
              {AVATAR_COLORS.map((col) => (
                <Pressable
                  key={col}
                  onPress={() => setDraftColor(col)}
                  style={[
                    styles.contactColorOption,
                    { backgroundColor: col },
                    draftColor === col && styles.contactColorOptionActive,
                  ]}
                />
              ))}
            </View>

            <Text style={styles.paySectionLabel}>Nom</Text>
            <TextInput
              style={styles.payFormInput}
              value={draftName}
              onChangeText={setDraftName}
              placeholder="Nom du contact"
              placeholderTextColor="#999"
            />

            <Text style={styles.paySectionLabel}>Numéro</Text>
            <TextInput
              style={styles.payFormInput}
              value={draftPhone}
              onChangeText={(v) => setDraftPhone(v.replace(/\D/g, '').slice(0, 10))}
              placeholder="06 12 34 56 78"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <View style={styles.contactModalActions}>
              <Pressable onPress={() => setEditing(null)} style={styles.contactCancelBtn}>
                <Text style={styles.contactCancelText}>Annuler</Text>
              </Pressable>
              <Pressable onPress={saveEdit} style={styles.payFormSave}>
                <Text style={styles.payFormSaveText}>Enregistrer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}