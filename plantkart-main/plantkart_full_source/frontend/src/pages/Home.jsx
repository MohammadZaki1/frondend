import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetchProducts().then(setProducts) },[])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Plants for your home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
