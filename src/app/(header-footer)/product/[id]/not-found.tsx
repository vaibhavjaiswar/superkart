import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-[75vh] flex flex-col justify-center items-center'>
      <h2 className='text-2xl sm:text-4xl'>Product Not Found</h2>
      <p className='my-2 text-sm'>Could not find requested resource</p>
      <Link className='hover:underline' href="/">Return to Home</Link>
    </div>
  )
}