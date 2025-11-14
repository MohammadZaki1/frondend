import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={product.image_url && product.image_url.startsWith('http') ? product.image_url : 'https://i.imgur.com/GUeGJ2Q.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
        onError={(e) => { e.target.src = 'https://i.imgur.com/GUeGJ2Q.jpg' }} // fallback image
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.short_desc}</p>
      <div className="mt-2 flex justify-between items-center">
        <div className="font-bold">${(product.price_cents / 100).toFixed(2)}</div>
        <Link to={`/product/${product.id}`} className="text-indigo-600">View</Link>
      </div>
    </div>
  )
}

