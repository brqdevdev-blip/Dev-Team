import AsyncStorage from '@react-native-async-storage/async-storage';

const DEMO_USERS = [
  { name: 'Test User', phone: '0000', password: '1234' },
  { name: 'Sam', phone: '0001', password: 'test' },
];

let sessionUsers = [];

export async function loadSavedUsers() {
  try {
    const raw = await AsyncStorage.getItem('users');
    if (raw) sessionUsers = JSON.parse(raw);
  } catch (e) {
    sessionUsers = [];
  }
}

export async function saveUsers() {
  try {
    await AsyncStorage.setItem('users', JSON.stringify(sessionUsers));
  } catch (e) {}
}

export function findUser(phone) {
  const all = [...sessionUsers, ...DEMO_USERS];
  return all.find((u) => u.phone === phone);
}

export function registerUser(name, phone, password) {
  const newUser = { name, phone, password };
  sessionUsers.push(newUser);
  return newUser;
}

export async function saveSession(user) {
  await AsyncStorage.setItem('user', JSON.stringify({ name: user.name, phone: user.phone }));
}

export async function clearSession() {
  await AsyncStorage.removeItem('user');
}