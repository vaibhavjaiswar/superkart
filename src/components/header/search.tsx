'use client'

import { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "../button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeaderSearchComponent() {

  const [showSearchBox, setShowSearchBox] = useState(false)
  const [searchText, setSearchText] = useState('')
  const box = useRef<HTMLDivElement | null>(null)
  const searchInput = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const handleSearch = () => {
    const text = searchText.trim().toLowerCase()
    if (/[^a-z0-9 ]/.test(text)) {
      alert('Only letters & numbers are allowed.')
      return
    }
    if (text) {
      router.push(`/search?q=${text.replaceAll(' ', '+')}`)
    } else {
      alert('Enter something before searching.')
    }
  }

  const handleOpen = () => {
    setShowSearchBox(true)
    setTimeout(() => searchInput.current?.focus())
  }

  const handleClose = () => {
    setShowSearchBox(false)
  }

  return (
    <>
      <li className="py-2 md:p-0 flex justify-center items-center gap-2 select-none cursor-pointer" onClick={e => handleOpen()}><FaMagnifyingGlass />Search</li>
      {
        showSearchBox ? (
          <div ref={box} className="w-full h-full p-12 md:px-16 xl:px-36 py-4 flex flex-col md:flex-row justify-start items-stretch md:items-center gap-6 md:gap-12 xl:gap-24 bg-neutral-100 absolute top-0 left-0">
            <Link href="/"><h1 className="my-1 text-2xl font-bold">SuperKart 🛒</h1></Link>
            <div className="flex flex-col md:flex-row items-center gap-4 flex-grow">
              <input className="w-full px-4 py-2 border-b-2 rounded"
                ref={searchInput}
                type="text"
                placeholder="Enter product keywords (camera, earphones, etc.)"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Button className="w-full md:w-auto" variant="outline" onClick={e => handleSearch()}>Search</Button>
              <button onClick={e => handleClose()} tabIndex={0}>Close</button>
            </div>
          </div>
        ) : ''
      }
    </>
  )
}