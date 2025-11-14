import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">PlantKart</Link>
        <nav>
          <Link to="/cart" className="mr-4">Cart</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
