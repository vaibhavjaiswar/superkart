'use client'

import Button from "@/components/button"
import { useAppDispatch } from "@/redux/hooks"
import { useState } from "react"

type ProductPageButtonsType = {
  productID: string
}

export default function ProductPageButtons({ productID }: ProductPageButtonsType) {

  const [quantity, setQuantity] = useState('1')
  const [addingProduct, setAddingProduct] = useState(false)

  const dispatch = useAppDispatch()

  const handleAddToCart = async () => {
    const q = parseInt(quantity)
    if (!quantity || isNaN(q)) {
      alert('Enter quantity properly!')
      return
    }
    if (q < 1 || 10 < q) {
      alert('Quantity should be between 1 to 10.')
      return
    }
    setAddingProduct(true)

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/add-product`, {
      method: 'POST',
      headers: {
        'access-token': localStorage?.accessToken || '',
        'product-id': productID,
        'quantity': quantity,
      },
    })
    const json = await response.json()

    if (json.ok) {
      alert('Product added to your cart!')
    } else {
      console.log(json.message)
      console.log(json?.error ?? 'Some error occured on the server...')
      alert(json.message ?? 'Some issue occured.')
    }
    setAddingProduct(false)
  }

  return (
    <div>
      <div className="mb-4 text-center">
        <span>Quantity: </span>
        <input
          className='max-w-[112px] py-1 border-b-2'
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          min={1}
          max={10}
        />
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={e => handleAddToCart()} disabled={addingProduct}>Add To Cart</Button>
        <Button>Buy Now</Button>
      </div>
    </div>
  )
}