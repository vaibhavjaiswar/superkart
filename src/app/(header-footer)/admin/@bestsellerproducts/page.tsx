import AddBestSellerProductsForm from "./form";
import BestSellerProductsComponents from "./items";

export default async function AdminBestSellerProductsPage() {
  return (
    <section className="min-h-[75vh] px-16 py-8">
      <h1 className="mb-6 text-2xl">Edit Best Seller Products</h1>
      <AddBestSellerProductsForm />
      <BestSellerProductsComponents />
    </section>
  )
}