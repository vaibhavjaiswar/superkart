import { Metadata } from "next"
import AdminLoginForm from "@/app/(none)/admin/login/form"

export const metadata: Metadata = {
  title: 'Admin Login | SuperKart 🛒',
  description: 'Admin Login page for SuperKart a personal practice project for shopping web app',
}

export default function AdminLoginPage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        <h1 className="mb-8 text-3xl text-center">SuperKart 🛒</h1>
        <section>
          <div className='m-6 px-8 py-6 border-2 border-neutral-800 rounded'>
            <h2 className='text-2xl text-center'>Administrator Login</h2>
            <AdminLoginForm />
          </div>
        </section>
      </div>
    </main >
  )
}