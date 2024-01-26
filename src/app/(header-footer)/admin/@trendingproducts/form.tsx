'use client'

import Button from "@/components/button";
import { useState } from "react";

export default function AddTrendingProductForm() {

  const [productID, setProductID] = useState('')
  const [info, setInfo] = useState('')
  const [info1, setInfo1] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddToTrending = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    console.log('Product ID:', productID)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/add-to-trending`, {
      method: 'GET',
      headers: {
        'product-id': productID
      }
    })
    const json = await response.json()
    if (json.ok) {
      console.log('Product added to trending.')
      setProductID('')
      setInfo1('(Product added!)')
      setTimeout(() => setInfo1(''), 2000)
    } else {
      setInfo(json.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={e => handleAddToTrending(e)}>
      <label className="text-sm" htmlFor="product-id">Enter Product ID to add into Trending Section: {info1}</label><br />
      <div className="flex gap-4">
        <input
          className="max-w-md w-full py-1 border-b-2"
          id="product-id"
          name="product-id"
          type="text"
          placeholder="Enter product ID..."
          value={productID}
          onChange={e => { setProductID(e.target.value); setInfo('') }}
          required
        />
        <Button type="submit" disabled={loading}>Add</Button>
      </div>
      {
        info !== '' ? <span className="text-sm text-red-600">{info}</span> : ''
      }
    </form>
  )
}