require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

app.use(cors());
app.use(express.json());

// Root + health check
app.get('/', (req, res) => {
  res.json({
    message: 'Recharge Express API',
    endpoints: ['/api/signup', '/api/login', '/api/me'],
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sign up
app.post('/api/signup', async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'name, phone et password sont requis' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    if (db.findByPhone(phone)) {
      return res.status(409).json({ message: 'Ce numéro est déjà enregistré' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = db.createUser({ name, phone, passwordHash });

    const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: { id: user.id, name: user.name, phone: user.phone },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'phone et password sont requis' });
    }

    const user = db.findByPhone(phone);
    if (!user) {
      return res.status(401).json({ message: 'Numéro ou mot de passe incorrect' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Numéro ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, name: user.name, phone: user.phone },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Protected example route (optional)
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    res.json({ user: payload });
  } catch {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Backend accessible from other devices on port ${PORT}`);
});
