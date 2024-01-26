import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
  return (
    <section className="min-h-[75vh] flex justify-center items-center">
      <FaSpinner className="text-4xl animate-spin" />
    </section>
  )
}