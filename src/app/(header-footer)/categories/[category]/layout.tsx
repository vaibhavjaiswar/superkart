import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories | SuperKart 🛒',
  description: 'Categories page of SuperKart',
}

type CategoriesLayoutPropType = {
  children: React.ReactNode
}

export default function CategoriesLayout({ children }: CategoriesLayoutPropType) {
  return (
    <>
      {children}
    </>
  )
}