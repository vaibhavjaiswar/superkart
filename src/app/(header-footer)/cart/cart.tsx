'use client'

import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa6"
import CartItem from "@/app/(header-footer)/cart/CartItem"
import Button from "@/components/button"

export default function CartComponent() {

  const [cartItems, setCartItems] = useState<[] | { productID: string, quantity: number }[]>([])
  const [totalAmount, setTotalAmount] = useState<number | null>(null)
  const [totalQuantity, setTotalQuantity] = useState<number | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isTotalLoading, setTotalLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserCart = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/get-items`, {
        method: 'GET',
        headers: {
          'access-token': localStorage?.accessToken ?? '',
        }
      })
      const json = await response.json() as { ok: boolean, message: string, cart: any[] }
      if (json.ok) {
        setCartItems(json.cart || [])
      } else {
        setError(json.message)
      }
      setLoading(false)
      getItems(json.cart)
    }
    setLoading(true)
    fetchUserCart()
  }, [])

  const getItems = async (cartItems: { productID: string, quantity: number }[]) => {
    if (!cartItems) {
      return
    }
    setTotalLoading(true)
    const jsonArray = await Promise.all(
      cartItems.map(async (product) => (
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${product.productID}`)
          .then(res => res.json())
      ))
    )
    const { amount, quantity } = jsonArray.reduce((sum: { amount: number, quantity: number }, item, index) => {
      const { price, discountprice } = item.data as { price: number, discountprice: number }
      const quantity = cartItems[index].quantity
      return {
        amount: sum.amount + (discountprice ? discountprice : price) * cartItems[index].quantity,
        quantity: sum.quantity + quantity,
      }
    }, { amount: 0, quantity: 0 })
    setTotalAmount(amount)
    setTotalQuantity(quantity)
    setTotalLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <span className="flex items-center gap-2"><FaSpinner className="animate-spin" /> Loading cart items...</span>
      </div>
    )
  }

  if (error !== '') {
    return (
      <div>
        <p>Error while fetching cart items.</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className={`flex ${cartItems.length === 0 ? 'min-h-[50vh] flex-col justify-center items-center' : 'flex-col md:flex-row justify-between items-start'} gap-6`}>
        {
          cartItems.length !== 0 ? (
            <div className={`min-h-[50vh] max-w-2xl xl:max-w-3xl flex flex-col gap-4 xl:gap-6`}>
              {cartItems.map(item => <CartItem key={item.productID} item={item} />)}
            </div>
          ) : (
            <>
              <p className="text-2xl">Your cart is empty!</p>
              <p className="text-neutral-400">Add products to cart & buy at once.</p>
            </>
          )
        }
        {
          cartItems.length !== 0 ? (
            <div className="md:min-w-[164px] sticky top-28">
              {
                isTotalLoading ? (
                  <div className="py-4 flex flex-col justify-center items-center gap-2">
                    <FaSpinner className="animate-spin" />
                    <p>Loading total</p>
                  </div>
                ) : (
                  <div className="text-left md:text-right">
                    <h4 className="text-2xl mb-2">Cart Info</h4>
                    <p className="text-sm">Total Items</p>
                    <p className="mb-2 text-base">{cartItems.length}</p>
                    <p className="text-sm">Total Quantity</p>
                    <p className="mb-2 text-base">{totalQuantity}</p>
                    <p className="text-sm">Total Amount</p>
                    <p className="mb-2 text-base">₹{totalAmount?.toLocaleString('en-IN')}</p>
                    <Button className="text-base">Buy All Now</Button>
                  </div>
                )
              }
            </div>
          ) : ''
        }
      </div>
    </>
  )
}