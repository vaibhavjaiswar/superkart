'use client'

import { useState } from "react"
import Button from "@/components/button"

export default function SuggestionForm() {

  const [email, setEmail] = useState('')
  const [emailFieldInfo, setEmailFieldInfo] = useState('')
  const [message, setMessage] = useState('')
  const [messageFieldInfo, setMessageFieldInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const isValid = validation()
    if (isValid) {
      console.log('Submit suggestion data...')
      // fetch('')
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1000)
    } else {
      setIsSubmitting(false)
    }
  }

  const validation = () => {
    let isEmailValid = true
    if (email.trim() === '') {
      setEmailFieldInfo('Email is required.')
      isEmailValid = false
    } else if (!/[a-zA-Z0-9]+@[a-zA-Z0-9]+[.][a-zA-Z]+/.test(email)) {
      setEmailFieldInfo('Enter email in proper format.')
      isEmailValid = false
    } else {
      setEmailFieldInfo('')
    }

    let isMessageValid = true
    if (message.trim() === '') {
      setMessageFieldInfo('Message is required.')
      isMessageValid = false
    } else if (message.length < 10) {
      setMessageFieldInfo('Message should be atleast 10 characters long.')
      isMessageValid = false
    } else {
      setMessageFieldInfo('')
    }

    return isEmailValid && isMessageValid
  }

  return (
    isSubmitted
      ? <div className="h-3/4 flex justify-center items-center"><p>Thank you for your feedback!</p></div>
      : <form onSubmit={e => handleSubmit(e)} noValidate>
        <div className='my-4'>
          <label className="block text-sm" htmlFor="email">
            Email :
          </label>
          <input
            className='w-full py-1 border-b-2'
            id='email'
            type="email"
            placeholder='Enter your email...'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {emailFieldInfo !== '' && (
            <span className="pt-1 text-xs text-red-600"> {emailFieldInfo}</span>
          )}
        </div>
        <div className='my-4'>
          <label className="block text-sm" htmlFor="email">
            Message :</label>
          <textarea
            className='w-full py-1 border-b-2'
            id='message'
            placeholder='Enter your message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          {messageFieldInfo !== '' && (
            <span className="pt-1 text-xs text-red-600"> {messageFieldInfo}</span>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
      </form>
  )
}