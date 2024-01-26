import { redirect } from "next/navigation"
import { CategoryMap, SubCategoryMap } from "@/constants"
import ProductsGrid from "@/components/product/ProductsGrid"

type SubCategoryPageType = {
  params: {
    category: string
    subcategory: string
  }
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

export function generateMetadata({ params }: SubCategoryPageType) {
  return {
    title: `${SubCategoryMap.get(params.subcategory)} | ${CategoryMap.get(params.category)} | SuperKart 🛒`
  }
}

export default async function CategoryPage({ params }: SubCategoryPageType) {

  if (!(CategoryMap.has(params.category) && SubCategoryMap.has(params.subcategory))) {
    return redirect('/categories')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${params.category}/${params.subcategory}`)
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
      <ProductsGrid title={`All ${SubCategoryMap.get(params.subcategory)} Products`} items={products} />
    </>
  )
}