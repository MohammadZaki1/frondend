const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });
  const hashed = await bcrypt.hash(password, 10);
  const { rows } = await db.query('INSERT INTO users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING id, email, is_admin', [email, hashed, name || null]);
  const user = rows[0];
  const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const { rows } = await db.query('SELECT id, email, password_hash, is_admin FROM users WHERE email=$1', [email]);
  const user = rows[0];
  if (!user) return res.status(400).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: 'invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
