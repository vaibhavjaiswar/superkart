'use client'

import { useState } from "react"
import Button from "@/components/button"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/reducers/userSlice"

export default function LoginForm() {

  const [email, setEmail] = useState('vaibhavjaiswar@superkart.com')
  const [password, setPassword] = useState('vaibhavjaiswar')
  const [emailFieldInfo, setEmailFieldInfo] = useState('')
  const [passwordFieldInfo, setPasswordFieldInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formInfo, setFormInfo] = useState('')

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateFields()
    if (isFormValid) {
      setIsSubmitting(true)
      const newUser = { email, password }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      const json = await response.json()
      setIsSubmitting(false)
      if (json.ok) {
        setFormInfo('')
        localStorage.setItem('accessToken', json?.accessToken)
        dispatch(setUser({ name: json.user.name, email: json.user.email }))
        router.push('/')
      } else {
        setFormInfo(json.message)
        console.log('Login Fail:', json.message)
      }
    }
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    setFormInfo('')
  }

  const validateFields = () => {
    let isEmailValid = true
    if (email == '') {
      setEmailFieldInfo('Email is required.')
      isEmailValid = false
    }
    else if (!/[a-zA-Z0-9]+@[a-zA-Z0-9]+[.][a-zA-Z]+/.test(email)) {
      setEmailFieldInfo('Enter email in proper format.')
      isEmailValid = false
    } else {
      setEmailFieldInfo('')
      isEmailValid = true
    }

    let isPasswordValid = true
    if (password.length < 8 || password.length > 16) {
      setPasswordFieldInfo('Password length should be 8 to 16 characters.')
      isPasswordValid = false

    } else {
      setPasswordFieldInfo('')
      isPasswordValid = true
    }

    return isEmailValid && isPasswordValid
  }

  return (
    <form onSubmit={e => handleSubmit(e)} onReset={e => handleReset(e)} noValidate className="my-4">
      <div className='my-4'>
        <label className="block text-sm" htmlFor="email">Email</label>
        <input
          className='w-full py-1 border-b-2'
          id='email'
          type="email"
          placeholder='Enter your email...'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailFieldInfo !== '' && (
          <span className="pt-1 block text-sm text-red-600">{emailFieldInfo}</span>
        )}
      </div>
      <div className='my-4'>
        <label className="block text-sm" htmlFor="password">Password</label>
        <input
          className='w-full py-1 border-b-2'
          id='password'
          type="password"
          placeholder='Enter your password...'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {passwordFieldInfo !== '' && (
          <span className="pt-1 block text-sm text-red-600">{passwordFieldInfo}</span>
        )}
      </div>
      {
        formInfo !== '' && (
          <span className="pb-2 block text-sm text-red-600">{formInfo}</span>
        )
      }
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className='flex-1' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </Button>
        <Button variant="solid" className='flex-1' type="reset" disabled={isSubmitting}>
          Reset
        </Button>
      </div>
    </form>
  )
}