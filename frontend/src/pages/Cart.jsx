import React, { useEffect, useState } from 'react'
import { getCart, createCheckout } from '../api'

export default function Cart(){
  const [items, setItems] = useState([])
  useEffect(()=>{ getCart().then(setItems) },[])
  const handleCheckout = async ()=>{
    const payload = items.map(i=>({ product_id: i.product_id, quantity: i.quantity }));
    const { url } = await createCheckout(payload);
    window.location.href = url;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.map(i => (
        <div key={i.product_id} className="bg-white p-4 rounded shadow mb-2 flex items-center">
          <img src={i.image_url} className="w-20 h-20 object-cover rounded mr-4" />
          <div className="flex-1">
            <div className="font-semibold">{i.name}</div>
            <div>${(i.price_cents/100).toFixed(2)} x {i.quantity}</div>
          </div>
        </div>
      ))}
      <button onClick={handleCheckout} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Checkout</button>
    </div>
  )
}
