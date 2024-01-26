import { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/app/(none)/login/form"

export const metadata: Metadata = {
  title: 'Login | SuperKart 🛒',
  description: 'Login page for SuperKart a personal practice project for shopping web app',
}

export default function LoginPage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="p-6 md:p-10 max-w-lg w-full">
        <h1 className="mb-8 text-3xl text-center">Welcome to <span className=" inline-block min-w-max">SuperKart 🛒</span></h1>
        <section>
          <div className='px-8 py-6 border-2 border-neutral-800 rounded'>
            <h2 className='text-2xl text-center'>Log In</h2>
            <LoginForm />
            <div className="text-center">
              <Link href='/signup' className='text-sm text-neutral-500'>New user? Sign up here...</Link>
            </div>
          </div>
        </section>
      </div>
    </main >
  )
}