import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedNumbers';

export type NumbersMap = Record<string, string[]>;

export async function loadNumbers(): Promise<NumbersMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveNumbers(numbers: NumbersMap) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  } catch {}
}