import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { Suspense } from 'react'
import '@/app/globals.css'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SuperKartProvider from '@/redux/provider'
// import GTMAnalytics from '@/components/GTMComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperKart 🛒',
  description: 'SuperKart a personal practice project for shopping web app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto max-w-[1556px] bg-neutral-50`}>
        {/* <Suspense>
          <GTMAnalytics />
        </Suspense> */}
        <SuperKartProvider>
          <Header />
          <main className="min-h-[75vh]">
            {children}
          </main>
          <Footer />
        </SuperKartProvider>
      </body>
    </html>
  )
}