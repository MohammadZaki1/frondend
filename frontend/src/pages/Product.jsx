import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct, addToCart } from '../api'

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null)
  useEffect(()=>{ fetchProduct(id).then(setProduct) }, [id])
  if (!product) return <div>Loading...</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image_url} alt="" className="w-full h-96 object-cover rounded"/>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <div className="mt-4 font-bold">${(product.price_cents/100).toFixed(2)}</div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={()=>{ addToCart(product.id,1).then(()=>alert('added')) }}>Add to cart</button>
      </div>
    </div>
  )
}
