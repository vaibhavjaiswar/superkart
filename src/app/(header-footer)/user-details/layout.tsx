import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User Details | SuperKart',
  description: 'User Details page of SuperKart',
}

type ProductPageLayout = {
  children: React.ReactNode
}

export default function UserDetailsLayout({ children }: ProductPageLayout) {
  return (
    <>
      {children}
    </>
  )
}