'use client'

import Button from "@/components/button"
import { CategoryMap, SubCategoryMap } from "@/constants"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { FaSpinner, FaTrash } from "react-icons/fa6"

export default function TrendingProductComponents() {

  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrendingItems()
  }, [])

  const fetchTrendingItems = async () => {
    setLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/all-trending-items`)
    const json = await response.json()
    if (json.ok) {
      setItems(json.data)
    } else {
      console.error(json.message)
    }
    setLoading(false)
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-start gap-2">
        <h2 className="mb-4 text-2xl">Trending items list...</h2>
        <Button variant="outline" onClick={fetchTrendingItems} disabled={loading}>Refresh List</Button>
      </div>
      {
        loading ? (
          <div>
            <span className="flex items-center gap-2"><FaSpinner className="animate-spin" /> Loading...</span>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {
              items.map(item => <Item key={item} item={item} />)
            }
          </ul>
        )
      }
    </div>
  )
}

type ProductType = {
  _id: string
  name: string
  category: string
  subcategory: string
  price: number
  discountprice: number
  imageURL: string
}

function Item({ item }: { item: string }) {

  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const handleRemove = async () => {
    console.log('remove', product?._id)
    setDeleting(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/remove-trending-item`, {
      method: 'DELETE',
      body: JSON.stringify({ productID: product?._id })
    })
    const json = await response.json()
    if (json.ok) {
      alert(json.message)
    } else {
      console.error(json.message)
      alert(json.message)
    }
    setDeleting(false)
    fetchProduct()
  }

  const fetchProduct = useCallback(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${item}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json?.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [item])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (loading)
    return (
      <div className="p-4 text-transparent rounded-xl shadow-lg select-none">
        <div className="w-full h-52 rounded bg-neutral-300 animate-pulse"></div>
        <p className="my-1 line-clamp-1 rounded bg-neutral-300 animate-pulse">Product name</p>
        <p className="my-1 w-2/3 text-xs rounded bg-neutral-300 animate-pulse">Product ID</p>
        <p className="text-sm">
          <span className="inline-block px-4 py-1 bg-neutral-300 animate-pulse rounded-full mr-2">Category</span>
          <span className="inline-block px-4 py-1 bg-neutral-300 animate-pulse rounded-full">Sub Category</span>
        </p>
      </div>
    )

  return (
    <div className={`p-4 rounded-xl shadow-lg${deleting ? ' opacity-50' : ''}`}>
      <Image className="mx-auto" src={product?.imageURL || '/'} alt={product?._id || 'Product image'} width={208} height={208} />
      <p className="mt-2 line-clamp-1">{product?.name}</p>
      <p className="mb-2 text-xs text-neutral-500">{product?._id}</p>
      <p className="text-sm">
        <span className="inline-block max-w-[46%] my-1 px-4 py-1 bg-neutral-800 text-neutral-100 rounded-full mr-1">{CategoryMap.get(product?.category ?? '')}</span>
        <span className="inline-block max-w-[46%] my-1 px-4 py-1 bg-neutral-800 text-neutral-100 rounded-full">{SubCategoryMap.get(product?.subcategory ?? '')}</span>
      </p>
      <button onClick={e => handleRemove()} className="mt-2 py-1.5 w-full text-sm flex justify-center items-center text-red-600 border-2 border-red-500 hover:text-neutral-100 hover:bg-red-500 rounded transition">
        <FaTrash /> Delete from trending
      </button>
    </div>
  )
}