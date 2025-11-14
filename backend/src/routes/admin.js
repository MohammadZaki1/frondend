const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const slugify = require('slugify');

router.post('/products', auth(true), async (req,res) => {
  const { name, short_desc, description, price_cents, image_url, stock } = req.body;
  const slug = slugify(name, { lower: true });
  const { rows } = await db.query('INSERT INTO products (name, slug, short_desc, description, price_cents, image_url, stock) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [name, slug, short_desc, description, price_cents, image_url, stock || 0]);
  res.status(201).json(rows[0]);
});

module.exports = router;
