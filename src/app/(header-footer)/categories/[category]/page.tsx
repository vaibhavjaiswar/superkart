import { redirect } from "next/navigation"
import { CategoryMap } from "@/constants"
import ProductsGrid from "@/components/product/ProductsGrid"

type CategoryPageType = {
  params: { category: string }
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

export function generateMetadata({ params }: CategoryPageType) {
  return {
    title: `${CategoryMap.get(params.category)} | SuperKart 🛒`
  }
}

export default async function CategoryPage({ params }: CategoryPageType) {

  if (!CategoryMap.has(params.category)) {
    return redirect('/categories')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${params.category}`)
  const json = await response.json()

  let error = null

  if (!json.ok) {
    error = json.message
  }

  const products = json.ok ? json.data.map((product: ProductType) => ({
    id: product._id,
    image: {
      src: product.imageURL,
      alt: product.name
    },
    name: product.name,
    price: product.price,
    discountPrice: product.discountprice,
  })) : []

  return (
    <>
      <ProductsGrid title={`All ${CategoryMap.get(params.category)} Products`} items={products} />
    </>
  )
}