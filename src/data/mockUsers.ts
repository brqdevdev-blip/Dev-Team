import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name: string;
  phone: string;
  password: string;
  balance: number;
};

const INITIAL_BALANCE = 12500;

const DEMO_USERS: User[] = [
  { name: 'Test User', phone: '0000', password: '1234', balance: INITIAL_BALANCE },
  { name: 'Sam', phone: '0001', password: 'test', balance: INITIAL_BALANCE },
];

let sessionUsers: User[] = [];

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

export function findUser(phone: string) {
  const all = [...sessionUsers, ...DEMO_USERS];
  const u = all.find((x) => x.phone === phone);
  return u ? { ...u, balance: u.balance ?? INITIAL_BALANCE } : undefined;
}

export function registerUser(name: string, phone: string, password: string): User {
  const newUser: User = { name, phone, password, balance: INITIAL_BALANCE };
  sessionUsers.push(newUser);
  return newUser;
}

export function updateUserBalance(phone: string, newBalance: number) {
  const target =
    sessionUsers.find((x) => x.phone === phone) || DEMO_USERS.find((x) => x.phone === phone);
  if (target) target.balance = newBalance;
  saveUsers();
  return target;
}

export async function saveSession(user: User) {
  await AsyncStorage.setItem('user', JSON.stringify({ name: user.name, phone: user.phone }));
}

export async function clearSession() {
  await AsyncStorage.removeItem('user');
}