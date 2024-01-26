import { Metadata } from "next"
import Link from "next/link"
import SignUpForm from "@/app/(none)/signup/form"

export const metadata: Metadata = {
  title: 'Sign Up | SuperKart 🛒',
  description: 'Sign Up page for SuperKart a personal practice project for shopping web app',
}

export default function SignUpPage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="p-6 md:p-10 max-w-lg w-full">
        <h1 className="mb-8 text-3xl text-center">Welcome to <span className=" inline-block min-w-max">SuperKart 🛒</span></h1>
        <section>
          <div className='px-8 py-6 border-2 border-neutral-800 rounded'>
            <h2 className='text-2xl text-center'>Sign Up</h2>
            <SignUpForm />
            <div className="text-center">
              <Link href='/login' className='text-sm text-neutral-500'>Already signed up? Log in here...</Link>
            </div>
          </div>
        </section>
      </div>
    </main >
  )
}