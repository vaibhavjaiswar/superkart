import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Product | SuperKart',
  description: 'Product page of SuperKart',
}

type ProductPageLayout = {
  children: React.ReactNode
}

export default function CategoriesLayout({ children }: ProductPageLayout) {
  return (
    <>
      {children}
    </>
  )
}