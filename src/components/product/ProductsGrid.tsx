import ProductCard from "@/components/product/ProductCard"

type ProductsGridPropType = {
  title: string
  items: {
    id: string,
    image: {
      src: string
      alt: string
    }
    name: string
    price: number
    discountPrice?: number
  }[]
  className?: string
}

export default function ProductsGrid({ title, items, className }: ProductsGridPropType) {
  return (
    <section className={`px-6 sm:px-12 md:px-16 xl:px-36 py-8 xl:py-12 ${className}`}>
      <h3 className="text-2xl md:text-3xl xl:text-4xl mb-6 xl:mb-8">{title}</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {
          items.map(item => <ProductCard key={item.id} item={item} />)
        }
      </div>
    </section>
  )
}