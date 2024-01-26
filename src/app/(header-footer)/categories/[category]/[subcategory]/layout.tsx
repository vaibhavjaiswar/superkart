import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sub Categories | SuperKart 🛒',
  description: 'Sub Categories page of SuperKart',
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