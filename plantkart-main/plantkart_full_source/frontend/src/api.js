import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000' });
export const setToken = (t) => { API.defaults.headers.common['Authorization'] = t ? `Bearer ${t}` : undefined };
export const fetchProducts = () => API.get('/products').then(r=>r.data);
export const fetchProduct = (id) => API.get('/products/'+id).then(r=>r.data);
export const addToCart = (product_id, qty=1) => API.post('/cart', { product_id, quantity: qty }).then(r=>r.data);
export const getCart = () => API.get('/cart').then(r=>r.data);
export const createCheckout = (items) => API.post('/orders/create-checkout-session', { items }).then(r=>r.data);
