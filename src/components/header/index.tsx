import Link from "next/link";
import MenuToggleButton from "@/components/header/MenuToogleButton";
import NavOptionsComponent from "@/components/header/NavOptions";

export default function Header() {
  return (
    <header className="bg-neutral-100 text-neutral-800 shadow-md z-10 sticky top-0">
      <div className="p-6 sm:px-12 md:px-16 xl:px-36 py-4 flex flex-col items-stretch gap-4 md:flex-row md:justify-between md:items-center md:gap-0 relative">
        <div className="w-full md:w-max flex justify-between items-center">
          <Link href='/'><h1 className="py-1 text-xl sm:text-2xl font-bold">SuperKart 🛒</h1></Link>
          <MenuToggleButton />
        </div>
        <NavOptionsComponent />
      </div>
    </header>
  )
}