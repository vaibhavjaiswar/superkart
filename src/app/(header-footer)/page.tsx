import Image from "next/image"
import Button from "@/components/button"
import SuggestionForm from "@/components/form/SuggestionForm"
import Link from "next/link"
import TrendingProductsSection from "./trending-items"
import BestSellerProductsSection from "./bestseller-items"

export default async function Home() {
  return (
    <>
      <section className="bg-white flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center md:gap-4 xl:gap-12">
        <div className="max-w-xl p-6 sm:p-12 pl-6 sm:pl-12 md:pl-16 xl:pl-36 py-8 md:py-6 xl:py-8 flex flex-col gap-4 lg:gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Best deals on 5G mobiles!</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Link href="/categories/electronics/mobiles" tabIndex={-1}><Button>Explore Now</Button></Link>
        </div>
        <div className="md:min-h-[64vh] md:max-h-[84vh] flex-grow aspect-[4/3] relative">
          <Image src='/images/mobile-banner1.png' fill alt="Mobile banner" />
        </div>
      </section>
      {/* <TrendingProductsSection /> */}
      {/* <BestSellerProductsSection /> */}
      <section className="flex flex-col md:flex-row items-stretch md:gap-6 xl:gap-10 bg-neutral-200">
        <div className="pl-6 sm:pl-12 md:pl-16 xl:pl-36 pr-6 sm:pr-12 md:pr-0 pt-8 md:py-8 xl:py-12 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl">Have a suggestion?</h2>
          <p className="mt-2 text-xs">Voluptates possimus aperiam molestias dolores est iure aliquid qui voluptas, laborum eligendi? Adipisci quia non eligendi consectetur fugit corrupti et quisquam vel?</p>
        </div>
        <div className="pl-6 sm:pl-12 md:pl-0 pr-6 sm:pr-12 md:pr-16 xl:pr-36 py-6 md:py-8 xl:py-12 min-h-[320px] flex-1">
          <h3 className="text-xl xl:text-2xl">Fill this form...</h3>
          <SuggestionForm />
        </div>
      </section>
    </>
  )
}