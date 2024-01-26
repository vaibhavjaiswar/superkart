'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartShopping, FaCircleInfo, FaRightFromBracket, FaSpinner, FaUser } from "react-icons/fa6";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser, setUser } from "@/redux/reducers/userSlice";

export default function UserInfo() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isValidatingUser, setIsValidatingUser] = useState(true)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const router = useRouter()
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleVerifyToken = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage?.accessToken,
        },
      })
      const json = await response.json()

      if (json.ok) {
        setIsUserLoggedIn(true)
        const userData = json.user as { name: string, email: string }
        dispatch(setUser({ name: userData.name, email: userData.email }))
      } else {
        setIsUserLoggedIn(false)
      }
      setIsValidatingUser(false)
    }
    setIsValidatingUser(true)
    handleVerifyToken()
  }, [dispatch, user.name])

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(removeUser())
    router.push('/')
  }

  if (isValidatingUser) {
    return (
      <li className="flex gap-2 justify-center items-center"><FaSpinner className='animate-spin' /> Fetching user..</li>
    )
  }

  if (isUserLoggedIn) {
    return (
      <>
        <li className="flex justify-center items-center">
          <Button variant="outline" className="sm:w-1/3 md:w-auto flex gap-2 justify-center items-center" onClick={e => router.push('/cart')}>
            <FaCartShopping />
            <span>Cart</span>
          </Button>
        </li>
        <li className="flex justify-center relative">
          <Button className="sm:w-1/3 md:w-auto flex gap-2 justify-center items-center" title={user.name ?? ''} onClick={e => setIsDropDownOpen(isDropDownOpen => !isDropDownOpen)}>
            <FaUser />
            <span className="max-w-[80px] truncate">{user.name}</span>
          </Button>
          {
            isDropDownOpen
              ? (
                <ul className="w-max bg-neutral-100 text-neutral-800 border-2 shadow flex flex-col rounded absolute top-full right-0">
                  {user.name !== 'Administrator' && user.email !== 'admin@superkart.com'
                    ? <Link href={'/user-details'} onClick={e => setIsDropDownOpen(isDropDownOpen => !isDropDownOpen)}>
                      <li className="px-4 py-1.5 flex gap-2 items-center hover:bg-neutral-200">
                        <FaCircleInfo />
                        <span>Your Account</span>
                      </li>
                    </Link> : ''}
                  <div className="cursor-pointer" onClick={e => handleLogOut()}>
                    <li className="px-4 py-2 flex gap-2 items-center hover:bg-neutral-200">
                      <FaRightFromBracket />
                      <span>Log Out</span>
                    </li>
                  </div>
                </ul>
              )
              : ''
          }
        </li >
      </>
    )
  } else {
    return (
      <li className="flex flex-col items-center gap-2 md:flex-row">
        <Link href='/login' tabIndex={-1} className="w-full md:w-auto">
          <Button variant='outline' className="sm:w-full md:w-auto">Login</Button>
        </Link>
        <Link href='/signup' tabIndex={-1} className="w-full md:w-auto">
          <Button className="sm:w-full md:w-auto">Sign Up</Button>
        </Link>
      </li>
    )
  }
}