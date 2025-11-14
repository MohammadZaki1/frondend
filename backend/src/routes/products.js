const express = require('express');
const router = express.Router();
const db = require('../db');
const slugify = require('slugify');

router.get('/', async (req,res) => {
  const { rows } = await db.query('SELECT id, name, slug, price_cents, short_desc, image_url, stock FROM products ORDER BY created_at DESC');
  res.json(rows);
});

router.get('/:id', async (req,res) => {
  const { rows } = await db.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'not found' });
  res.json(rows[0]);
});

module.exports = router;
