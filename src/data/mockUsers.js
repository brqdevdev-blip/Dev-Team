import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_BALANCE = 12500;

const DEMO_USERS = [
  { name: 'Test User', phone: '0000', password: '1234', balance: INITIAL_BALANCE },
  { name: 'Sam', phone: '0001', password: 'test', balance: INITIAL_BALANCE },
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
  const u = all.find((x) => x.phone === phone);
  return u ? { ...u, balance: u.balance ?? INITIAL_BALANCE } : undefined;
}

export function registerUser(name, phone, password) {
  const newUser = { name, phone, password, balance: INITIAL_BALANCE };
  sessionUsers.push(newUser);
  return newUser;
}

export function updateUserBalance(phone, newBalance) {
  const target =
    sessionUsers.find((x) => x.phone === phone) || DEMO_USERS.find((x) => x.phone === phone);
  if (target) target.balance = newBalance;
  saveUsers();
  return target;
}

export async function saveSession(user) {
  await AsyncStorage.setItem('user', JSON.stringify({ name: user.name, phone: user.phone }));
}

export async function clearSession() {
  await AsyncStorage.removeItem('user');
}
