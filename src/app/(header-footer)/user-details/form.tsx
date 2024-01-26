'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa6"
import Button from "@/components/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { removeUser } from "@/redux/reducers/userSlice"

export default function UserDetailsForm() {

  const [isLoading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordFieldInfo, setPasswordFieldInfo] = useState('')
  const [formInfo, setFormInfo] = useState('')

  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateFields()
    if (isFormValid) {
      setIsSubmitting(true)
      const newUserPassword = { name, email, password }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/change-password`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUserPassword),
      })
      const json = await response.json()
      setIsSubmitting(false)
      if (json.ok) {
        setFormInfo('')
        alert('Password updated successfully!')
      } else {
        setFormInfo(json.message)
      }
    }
  }

  const validateFields = () => {
    let isPasswordValid = true
    if (password === '') {
      setPasswordFieldInfo('Password is required.')
      isPasswordValid = false
    } else if (password.length < 8 || password.length > 16) {
      setPasswordFieldInfo('Password length should be 8 to 16 characters.')
      isPasswordValid = false
    } else {
      setPasswordFieldInfo('')
      isPasswordValid = true
    }

    return isPasswordValid
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage?.accessToken,
          'user-name': user?.name ?? '',
          'user-email': user?.email ?? '',
        },
      })

      const json = await response.json()

      if (json.ok) {
        const userData = json.user as { name: string, email: string }
        setName(userData.name)
        setEmail(userData.email)
      } else {
        console.log('Some issue occurred.')
        localStorage.removeItem('accessToken')
        alert('Please login again.')
        dispatch(removeUser())
        router.replace('/login')
      }
      setLoading(false)
    }
    fetchUserDetails()
  }, [dispatch, router, user.email, user.name])

  if (isLoading) {
    return (
      <div>
        <span className="flex items-center gap-2"><FaSpinner className="animate-spin" /> Loading</span>
      </div>
    )
  }

  return (
    <form onSubmit={e => handleSubmit(e)} noValidate className="my-4">
      <div className='my-4'>
        <label className="block text-sm" htmlFor="name">Name</label>
        <input
          className='w-full py-1 border-b-2'
          id='text'
          type="text"
          placeholder='Enter your name...'
          value={name}
          onChange={e => e.target.value}
          disabled
        />
      </div>
      <div className='my-4'>
        <label className="block text-sm" htmlFor="name">Email</label>
        <input
          className='w-full py-1 border-b-2'
          id='email'
          type="email"
          placeholder='Enter your email...'
          value={email}
          onChange={e => e.target.value}
          disabled
        />
      </div>
      <div className='my-4'>
        <label className="block text-sm" htmlFor="name">Change Password</label>
        <input
          className='w-full py-1 border-b-2'
          id='email'
          type="password"
          placeholder='Enter your new password...'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {passwordFieldInfo !== '' && (
          <span className="pt-1 block text-sm text-red-600">{passwordFieldInfo}</span>
        )}
      </div>
      {formInfo !== '' && (
        <span className="pb-2 block text-sm text-red-600">{formInfo}</span>
      )}
      <Button variant="outline" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}