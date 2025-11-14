const express = require('express');
const router = express.Router();
const db = require('../db');

// Demo user id
const DEMO_USER_ID = 1;

router.get('/', async (req,res)=>{
  const { rows } = await db.query(
    'SELECT c.product_id, p.name, p.price_cents, c.quantity, p.image_url FROM cart_items c JOIN products p ON p.id=c.product_id WHERE c.user_id=$1',
    [DEMO_USER_ID]
  );
  res.json(rows);
});

router.post('/', async (req,res)=>{
  const { product_id, quantity } = req.body;
  await db.query(
    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1,$2,$3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity',
    [DEMO_USER_ID, product_id, quantity || 1]
  );
  res.json({ ok: true });
});

module.exports = router;
