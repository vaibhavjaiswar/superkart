import { Metadata } from "next"
import { Inter } from "next/font/google"
import '@/app/globals.css'
import SuperKartProvider from "@/redux/provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperKart 🛒',
  description: 'SuperKart a personal practice project for shopping web app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuperKartProvider>
          {children}
        </SuperKartProvider>
      </body>
    </html>
  )
}