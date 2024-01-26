'use client'

import { FaBars } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeNav, openNav } from "@/redux/reducers/navSlice";

export default function MenuToggleButton() {

  const isNavOpen = useAppSelector(state => state.nav.isNavOpen)
  const dispatch = useAppDispatch()

  const handleToggleOptions = () => {
    dispatch(isNavOpen ? closeNav() : openNav())
  }

  return (
    <div onClick={e => handleToggleOptions()} className="px-2 py-1 text-2xl border-2 border-neutral-800 rounded cursor-pointer md:hidden hover:bg-neutral-200">
      <FaBars />
    </div>
  )
}
