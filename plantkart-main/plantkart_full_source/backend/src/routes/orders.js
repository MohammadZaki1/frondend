const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db');

const DEMO_USER_ID = 1;

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body; // [{product_id, quantity}]
  const ids = items.map(i => i.product_id);
  const { rows } = await db.query('SELECT id, name, price_cents FROM products WHERE id = ANY($1)', [ids]);
  const priceMap = Object.fromEntries(rows.map(r=>[r.id, r]));
  const line_items = items.map(i => ({
    price_data: {
      currency: 'usd',
      product_data: { name: priceMap[i.product_id].name },
      unit_amount: priceMap[i.product_id].price_cents
    },
    quantity: i.quantity
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    success_url: process.env.CLIENT_BASE_URL + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: process.env.CLIENT_BASE_URL + '/cart'
  });
  await db.query(
    'INSERT INTO orders (user_id, total_cents, stripe_session_id, status) VALUES ($1,$2,$3,$4)',
    [DEMO_USER_ID, line_items.reduce((s,i)=>s + i.price_data.unit_amount*i.quantity, 0), session.id, 'created']
  );
  res.json({ url: session.url });
});

module.exports = router;
