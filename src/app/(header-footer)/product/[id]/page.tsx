import Image from "next/image"
import Link from "next/link"
import { CategoryMap, SubCategoryMap } from "@/constants"
import ProductPageButtons from "./buttons"
import { notFound } from "next/navigation"

type ProductPageType = {
  params: { id: string }
}

type ProductResponseType = {
  ok: boolean
  message: string
  data: {
    _id: string
    name: string
    category: string
    subcategory: string
    price: number
    discountprice: number
    imageURL: string
  }
}

export default async function ProductPage({ params }: ProductPageType) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${params.id}`)
  const json: ProductResponseType = await response.json()
  const { data } = json

  if (!data) {
    notFound()
  }

  return (
    <section className="p-6 sm:px-12 md:px-16 xl:px-36 py-8 xl:py-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 xl:gap-8">
        <div className="flex-1 flex flex-col items-center gap-4">
          <h1 className="hidden md:block mb-4 text-2xl xl:text-3xl text-transparent">SuperKart Product</h1>
          <Image className="m-auto" src={data.imageURL} alt={data.name} width={300} height={300} />
          <div>
            <span className="mr-2">₹{(data?.discountprice ? data.discountprice : data.price).toLocaleString('en-IN')}</span>
            {data?.discountprice ? <span className="text-sm text-neutral-500 line-through">₹{data.price}</span> : ''}
          </div>
          <ProductPageButtons productID={params.id} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="mb-4 text-2xl xl:text-3xl">{data.name}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi libero consequatur error molestiae incidunt nihil atque provident eos recusandae asperiores reiciendis praesentium non omnis reprehenderit, similique itaque veniam quos?</p>
          <p>Ut ipsam nulla eos ab fugit iste sequi facere libero. Officia explicabo, non sit voluptatem nihil debitis sequi nisi officiis amet quibusdam.</p>
          <p>Category : <Link href={`/categories/${data.category}`}>
            <span className="px-3 py-1 text-neutral-100 bg-neutral-800 rounded-full">
              {CategoryMap.get(data.category)}
            </span>
          </Link>
          </p>
          <p>Sub Category : <Link href={`/categories/${data.category}/${data.subcategory}`}>
            <span className="px-3 py-1 text-neutral-100 bg-neutral-800 rounded-full">
              {SubCategoryMap.get(data.subcategory)}
            </span>
          </Link>
          </p>
        </div>
      </div>
    </section>
  )
}