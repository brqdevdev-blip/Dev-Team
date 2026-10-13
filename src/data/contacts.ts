import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'contacts';

export type Contact = {
  id: string;
  name: string;
  phone: string;
  emoji: string;
  color: string;
};

export const AVATAR_EMOJIS = [
  '👤', '😀', '😎', '👩', '👨', '🧑', '👧', '👦', '👵', '👴', '🐱', '🐶', '🦁', '🐼', '🌟', '🔥',
];

export const AVATAR_COLORS = [
  '#1A72B6', '#31744C', '#E3282C', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#64748B',
];

const DEFAULT_CONTACTS: Contact[] = [
  { id: '1', name: 'Ahmed Benali', phone: '0551234567', emoji: '👤', color: '#1A72B6' },
  { id: '2', name: 'Fatima Zohra', phone: '0662345678', emoji: '👩', color: '#EC4899' },
  { id: '3', name: 'Mohamed Khelifi', phone: '0773456789', emoji: '👨', color: '#31744C' },
  { id: '4', name: 'Yasmine Cherif', phone: '0554567890', emoji: '👧', color: '#8B5CF6' },
  { id: '5', name: 'Karim Bouzid', phone: '0665678901', emoji: '😎', color: '#F59E0B' },
  { id: '6', name: 'Lina Haddad', phone: '0776789012', emoji: '👩', color: '#14B8A6' },
  { id: '7', name: 'Sofiane Merabet', phone: '0557890123', emoji: '👨', color: '#64748B' },
  { id: '8', name: 'Nadia Belkacem', phone: '0668901234', emoji: '👧', color: '#E3282C' },
];

export async function loadContacts(): Promise<Contact[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Backfill avatar fields for contacts saved before they existed
        return parsed.map((c: Partial<Contact>) => ({
          emoji: '👤',
          color: '#1A72B6',
          ...c,
        })) as Contact[];
      }
    }
  } catch {}
  return DEFAULT_CONTACTS;
}

export async function saveContacts(contacts: Contact[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {}
}