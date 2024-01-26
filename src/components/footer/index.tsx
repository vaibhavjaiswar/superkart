import Link from "next/link"

export default function Footer() {

  const links = [
    {
      title: 'Useful Links',
      links: [
        { href: '/admin/login', label: 'Admin Login' },
      ]
    },
    {
      title: 'Contacts',
      links: [
        { href: 'https://www.linkedin.com/in/vaibhavjaiswar/', label: 'LinkedIn' },
        { href: 'https://github.com/vaibhavjaiswar/', label: 'GitHub' },
      ]
    },
  ]

  return (
    <footer className="px-6 sm:px-12 md:px-16 xl:px-36 pt-6 pb-2 bg-neutral-900 text-neutral-100">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="max-w-md">
          <h4 className="mb-2 text-2xl font-bold">SuperKart 🛒</h4>
          <p className="text-xs">This is personal project website for learning purpose only. Porro provident, suscipit minima error nulla exercitationem quia tempore dignissimos illo cupiditate. At, nisi facere magni voluptas dolores nam dolore nemo quae.</p>
        </div>
        <div className="w-1/3 flex flex-col md:flex-row gap-4">
          {
            links.map(item => (
              <div key={item.title} className="flex-1 min-w-max">
                <h4 className="text-lg">{item.title}</h4>
                <ul>
                  {
                    item.links.map(link => (
                      <li key={link.label} className="text-sm">
                        <Link href={link.href} target="_blank" className="hover:underline">{link.label}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </div>
      <p className="mt-4 pt-2 text-xs sm:text-sm text-center border-t">&copy; Design & developed by <Link href="https://www.linkedin.com/in/vaibhavjaiswar/" target="_blank" className="hover:underline">Vaibhav Jaiswar</Link></p>
    </footer>
  )
}