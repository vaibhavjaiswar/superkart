import ProductsGrid from "@/components/product/ProductsGrid";

// const bestSellerItems = [
//   { id: '#1', image: { src: '/images/tshirt2.png', alt: 'Grey T shirt image' }, name: 'Grey Round Neck T-Shirt', discountPrice: 340, price: 400 },
//   { id: '#2', image: { src: '/images/mobile2.png', alt: 'Samsung mobile image' }, name: 'Samsung Galaxy S10', discountPrice: 18000, price: 21000 },
//   { id: '#3', image: { src: '/images/spectacle2.png', alt: 'ROYAL SON Spectacle Frames Black image' }, name: 'ROYAL SON Men Women Round Blue Light Block Spectacle Frames Black', discountPrice: 1200, price: 1500 },
//   { id: '#4', image: { src: '/images/headphone2.png', alt: 'Samsung Bluetooth Wireless Headphones image' }, name: 'Samsung U Flex Bluetooth Wireless Headphones', discountPrice: 18000, price: 21000 },
//   { id: '#5', image: { src: '/images/fan2.png', alt: 'Cooler Master Exhaust Fan image' }, name: 'Cooler Master Exhaust Fan', discountPrice: 2100, price: 2250 },
//   { id: '#6', image: { src: '/images/camera2.png', alt: 'Sony Cyber-Shot Digital Camera (Red)image' }, name: 'Sony Cyber-Shot Digital Camera (Red)', discountPrice: 9200, price: 12250 },
// ]

export default async function BestSellerProductsSection() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/all-bestseller-items`)
  const json = await response.json()
  const productIDs = json.data as string[]
  const responses = await Promise.all(productIDs.map((productID) => (
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/${productID}`)
      .then(res => res.json())
      .then(json => json.data)
  )))
  const data = responses as unknown as { _id: string, name: string, category: string, subcategory: string, price: number, discountprice: number, imageURL: string }[]
  const bestSellerItems = data.map(item => (
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

  return <ProductsGrid className="bg-neutral-100 text-neutral-800" title="Best Seller Products" items={bestSellerItems} />
}