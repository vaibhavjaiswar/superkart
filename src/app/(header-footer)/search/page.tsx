import ProductsGrid from "@/components/product/ProductsGrid"

type SearchPageType = {
  params: {}
  searchParams: { q: string }
}

type ResponseType = {
  ok: boolean,
  data: undefined | {
    _id: string
    name: string
    category: string
    subcategory: string
    price: number
    discountprice: number
    imageURL: string
  }[]
  message: string
}

export function generateMetadata({ searchParams }: SearchPageType) {
  return {
    title: `Search results for "${searchParams.q}" | SuperKart 🛒`
  }
}

export default async function SearchPage({ searchParams }: SearchPageType) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/search?q=${searchParams.q}`)
  const json = await response.json()
  const { ok, data, message } = json as ResponseType

  if (!ok) {
    <section className="px-16 xl:px-36 py-8 xl:py-10">
      <h1 className="mb-4 text-2xl xl:text-3xl">Search results for &ldquo;{searchParams.q}&rdquo;</h1>
      <p>Some error occured while fetching search results.</p>
    </section>
  }

  if (!data) {
    return (
      <section className="px-16 xl:px-36 py-8 xl:py-10">
        <h1 className="mb-4 text-2xl xl:text-3xl">Search results for &ldquo;{searchParams.q}&rdquo;</h1>
        <p>{message}</p>
      </section>
    )
  }

  const items = data.map(item => ({
    id: item._id,
    image: {
      src: item.imageURL,
      alt: item.name,
    },
    name: item.name,
    price: item.price,
    discountPrice: item.discountprice,
  }))

  return (
    <ProductsGrid title={`Search results for "${searchParams.q}"`} items={items} />
  )
}