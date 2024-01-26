import ProductsGrid from "@/components/product/ProductsGrid";

// const trendingItems = [
//   { id: '#1', image: { src: '/images/wristwatch1.png', alt: 'Wrist watch image' }, name: 'Levi\'s Wrist Watch', discountPrice: 540, price: 600 },
//   { id: '#2', image: { src: '/images/mobile1.png', alt: 'Mobile image' }, name: 'Redmi Note 11 Pro', discountPrice: 14000, price: 15000 },
//   { id: '#3', image: { src: '/images/fan1.png', alt: 'Fan image' }, name: 'Ceiling Fan with Inbuilt Light', discountPrice: 1540, price: 1600 },
//   { id: '#4', image: { src: '/images/headphone1.png', alt: 'Headphone image' }, name: 'Wireless Bluetooth Headphone', discountPrice: 2200, price: 2500 },
//   { id: '#5', image: { src: '/images/shoe2.png', alt: 'Formal shoe image' }, name: 'Loake Black Formal Shoe', discountPrice: 1600, price: 1800 },
//   { id: '#6', image: { src: '/images/laptop2.png', alt: 'samsung 15.6" multi touch laptop image' }, name: 'Samsung 15.6" Laptop 9 Pro Multi-Touch Laptop', discountPrice: 1600, price: 1800 },
// ]

export default async function TrendingProductsSection() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/all-trending-items`)
  const json = await response.json()
  const productIDs = json.data as string[]
  const responses = await Promise.all(productIDs.map((productID) => (
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${productID}`)
      .then(res => res.json())
      .then(json => json.data)
  )))
  const data = responses as unknown as { _id: string, name: string, category: string, subcategory: string, price: number, discountprice: number, imageURL: string }[]
  const trendingItems = data.map(item => (
    {
      id: item._id,
      image: {
        src: item.imageURL,
        alt: item.name,
      },
      name: item.name,
      discountPrice: item.discountprice,
      price: item.price,
    }
  ))

  return <ProductsGrid className="bg-neutral-800 text-neutral-100" title="Trending Products" items={trendingItems} />
}