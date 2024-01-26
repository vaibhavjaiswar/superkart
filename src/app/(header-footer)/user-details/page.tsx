import UserDetailsForm from "@/app/(header-footer)/user-details/form"

export default function UserDetailsPage() {
  return (
    <section className="px-16 xl:px-36 py-8 xl:py-10">
      <div className="max-w-md xl:max-w-xl w-full">
        <h1 className="mb-6 text-2xl xl:text-3xl">User Details</h1>
        <UserDetailsForm />
      </div>
    </section>
  )
}