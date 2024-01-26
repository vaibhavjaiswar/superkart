import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search Page | SuperKart',
  description: 'Search Page page of SuperKart',
}

type SearchPageLayout = {
  children: React.ReactNode
}

export default function SearchLayout({ children }: SearchPageLayout) {
  return (
    <>
      {children}
    </>
  )
}