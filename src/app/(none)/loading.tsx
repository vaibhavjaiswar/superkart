import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <FaSpinner className="text-4xl animate-spin" />
    </section>
  )
}