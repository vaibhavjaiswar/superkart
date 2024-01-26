'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { CategoryMap, SubCategoryMap } from "@/constants"
import Link from "next/link"
import { FaMinus, FaPlus, FaSpinner, FaTrash } from "react-icons/fa6"

type CartItemType = {
  item: {
    productID: string
    quantity: number
  }
}

type ProductType = {
  _id: string
  name: string
  category: string
  subcategory: string
  price: number
  discountprice: number | undefined
  imageURL: string
}

export default function CartItem({ item }: CartItemType) {

  const [product, setProduct] = useState<null | ProductType>(null)
  const [quantity, setQuantity] = useState(item.quantity)
  const [updatingQuantity, setUpdatingQuantity] = useState(false)
  const [deletingItem, setDeletingItem] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${item.productID}`)
      const json = await response.json()
      if (json.ok) {
        const productJSON = json.data as ProductType
        setProduct(productJSON)
      }
    }
    fetchProduct()
  }, [item.productID])

  const handleQuantityChange = (type: '-' | '+') => {
    if (type === '-' && 1 < quantity) {
      setQuantity(quantity - 1)
    } else if (type === '+' && quantity < 10) {
      setQuantity(quantity + 1)
    } else {
      alert('Quantity should be between 1 to 10.')
    }
  }

  const handleQuantityUpdate = async () => {
    setUpdatingQuantity(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/set-product-quantity`, {
      method: 'POST',
      headers: {
        'access-token': localStorage?.accessToken || '',
        'product-id': item.productID,
        'quantity': quantity.toString(),
      },
    })
    const json = await response.json()

    if (json.ok) {
      window.location.reload()
    } else {
      console.log(json.message)
      console.log(json?.error ?? 'Some error occured on the server...')
      alert('Some issue occured.')
    }
    setUpdatingQuantity(false)
  }

  const handleRemoveItem = async () => {
    setDeletingItem(true)
    const deleteIt = confirm('Delete this from cart!')
    if (deleteIt) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/delete-product`, {
        method: 'POST',
        headers: {
          'access-token': localStorage?.accessToken || '',
          'product-id': item.productID,
        },
      })
      const json = await response.json()

      if (json.ok) {
        window.location.reload()
      } else {
        console.log(json.message)
        console.log(json?.error ?? 'Some error occured on the server...')
        alert('Some issue occured.')
      }
    }
    setDeletingItem(false)
  }

  if (!product) {
    return (
      <div className="min-h-[240px] p-4 xl:p-6 bg-neutral-50 text-transparent flex gap-6 xl:gap-8 items-start rounded shadow-md select-none">
        <div className="min-w-[208px] h-52 bg-neutral-300 rounded animate-pulse"></div>
        <div className="flex-grow  animate-pulse">
          <h4 className="max-w-md text-2xl bg-neutral-300 rounded">Loading...</h4>
          <p className="my-4 bg-neutral-300 rounded line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error et vel at architecto, voluptatem nemo. Quia, accusamus. Cupiditate atque quisquam praesentium nihil quam dolorum a, placeat accusantium rerum assumenda.</p>
          <p>
            <span className="mr-2 text-xl bg-neutral-300 rounded">Category</span>
            <span className="text-xl bg-neutral-300 rounded">Sub Category</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-[240px] p-4 xl:p-6 bg-neutral-50 flex flex-col sm:flex-row gap-6 xl:gap-8 items-center rounded shadow-md transition hover:shadow-lg${deletingItem ? ' opacity-50 pointer-events-none' : ''}`}>
      <Image className="min-w-full sm:min-w-[200px] xl:min-w-[240px] rounded overflow-hidden" src={product?.imageURL} alt={product?.name} width={200} height={200} />
      <div className="relative">
        <Link href={`/product/${product._id}`}>
          <h4 className="mb-2 text-xl sm:text-2xl xl:text-3xl">{product.name}</h4>
        </Link>
        <p className="my-2 text-sm line-clamp-2" title="Product description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat accusantium inventore doloremque magni exercitationem! In dolor quis, enim delectus ducimus vitae vel! Asperiores expedita, tempore reiciendis nemo eius maxime porro.</p>
        <p className="my-2 text-sm sm:text-base">
          <Link href={`/categories/${product.category}`}>
            <span className="mb-1 mr-1 px-3 py-1 text-neutral-100 bg-neutral-800 rounded-full inline-block">
              {CategoryMap.get(product.category)}
            </span>
          </Link>
          <Link href={`/categories/${product.category}/${product.subcategory}`}>
            <span className="mb-1 px-3 py-1 text-neutral-100 bg-neutral-800 rounded-full inline-block">
              {SubCategoryMap.get(product.subcategory)}
            </span>
          </Link>
        </p>
        <p className="mt-2">
          <span className="mr-1">₹{(product?.discountprice ? product.discountprice : product.price).toLocaleString('en-IN')}</span>
          {product?.discountprice ? <span className="text-sm text-neutral-500 line-through">₹{product.price}</span> : ''}
        </p>
        <p className="text-sm flex items-center gap-2">
          <span>Quantity: </span>
          <span className="text-base flex items-center gap-1">
            <CustomButton forQuantity onClick={e => handleQuantityChange('-')} disabled={quantity === 1}><FaMinus /></CustomButton>
            {quantity}
            <CustomButton forQuantity onClick={e => handleQuantityChange('+')} disabled={quantity === 10}><FaPlus /></CustomButton>
          </span>
          {quantity !== item.quantity ? <CustomButton onClick={e => handleQuantityUpdate()} disabled={updatingQuantity}>Update changes</CustomButton> : ''}
        </p>
        <p className="text-sm">
          <span>Total for this item: </span>
          <span className="text-base">₹{(item.quantity * (product?.discountprice ? product.discountprice : product.price)).toLocaleString('en-IN')}</span>
        </p>
        <span className={`p-1 text-base flex items-center gap-1 ${deletingItem ? '' : 'hover:text-red-600'} absolute bottom-0 right-0 cursor-pointer`} onClick={e => handleRemoveItem()}>
          {deletingItem ? <><FaSpinner />Deleting...</> : <FaTrash />}
        </span>
      </div>
    </div>
  )
}

interface QuantityButtonType extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean
  forQuantity?: boolean
}

function CustomButton({ children, disabled, forQuantity = false, ...rest }: QuantityButtonType) {
  return (
    <button className={`${forQuantity ? 'w-5 h-5 ' : 'px-2 py-0.5 '}text-xs flex justify-center items-center bg-neutral-100 text-neutral-800 border-2 border-neutral-800 rounded-full hover:bg-neutral-200 active:outline-2 active:outline active:outline-neutral-400 disabled:opacity-50`} disabled={disabled} {...rest} >
      {children}
    </button>
  )
}