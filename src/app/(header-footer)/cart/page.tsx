import type { Metadata } from "next";
import CartComponent from "@/app/(header-footer)/cart/cart"

export const metadata: Metadata = {
  title: 'My Cart | SuperKart',
  description: 'My Cart page of SuperKart',
}

export default function CartPage() {
  return (
    <section className="px-12 md:px-16 xl:px-36 py-8 xl:py-10">
      <h1 className="mb-6 text-2xl xl:text-3xl">My Cart Items</h1>
      <CartComponent />
    </section>
  )
}