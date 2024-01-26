import AddTrendingProductForm from "./form";
import TrendingProductComponents from "./items";

export default async function AdminTrendingProductsPage() {
  return (
    <section className="min-h-[75vh] px-16 py-8">
      <h1 className="mb-6 text-2xl">Edit Trending Products</h1>
      <AddTrendingProductForm />
      <TrendingProductComponents />
    </section>
  )
}