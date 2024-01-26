import { FaSpinner } from "react-icons/fa6";

export default function SearchPageLoading() {
  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center gap-4">
      <FaSpinner className="text-4xl animate-spin" />
      <p>Searching for related products...</p>
    </section>
  )
}