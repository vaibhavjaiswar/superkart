'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderSearchComponent from "@/components/header/search";
import UserInfo from "@/components/UserAccountInfo";
import { useAppSelector } from "@/redux/hooks";

export default function NavOptionsComponent() {

  const navLinks = [
    { href: '/categories', label: 'Categories' },
  ]

  const [showNavFlag, setShowNavFlag] = useState(false)
  const isNavOpen = useAppSelector(state => state.nav.isNavOpen)


  useEffect(() => {
    const screenFun = (e: any) => {
      setShowNavFlag(window.screen.width > 768)
    }
    setShowNavFlag(window.screen.width > 768)
    window.addEventListener("resize", screenFun)
    return () => window.removeEventListener("resize", screenFun)
  }, [])

  return (
    <>{
      (showNavFlag || isNavOpen) ? (
        <nav className="md:block" >
          <ul className="flex flex-col justify-start items-stretch gap-1 sm:items-center md:flex-row md:items-center md:gap-4">
            {
              navLinks.map(navLink => (
                <li key={navLink.label} className="py-2 md:py-0 text-center hover:underline">
                  <Link href={navLink.href}>{navLink.label}</Link>
                </li>
              ))
            }
            <HeaderSearchComponent />
            <UserInfo />
          </ul>
        </nav>
      ) : ''
    }</>
  )
}