const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'users.json');

function readUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

function findByPhone(phone) {
  return readUsers().find((u) => u.phone === phone);
}

function createUser({ name, phone, passwordHash }) {
  const users = readUsers();
  const user = {
    id: Date.now().toString(),
    name,
    phone,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

module.exports = { findByPhone, createUser };