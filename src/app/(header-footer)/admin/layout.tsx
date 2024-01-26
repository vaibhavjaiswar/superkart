'use client'

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ParallelRouteStringType = 'dashboard' | 'addnewproduct' | 'trendingproducts' | 'bestsellerproducts'

type AdminRootLayoutPropType = {
  [index in ParallelRouteStringType]: React.ReactNode;
}

type MenuItemsType = { label: string, page: ParallelRouteStringType }[]

export default function AdminRootLayout({ dashboard, addnewproduct, trendingproducts, bestsellerproducts }: AdminRootLayoutPropType) {

  const components: AdminRootLayoutPropType = useMemo(() => ({
    dashboard,
    addnewproduct,
    trendingproducts,
    bestsellerproducts,
  }), [dashboard, addnewproduct, trendingproducts, bestsellerproducts])

  const menuItems: MenuItemsType = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Add New Product', page: 'addnewproduct' },
    { label: 'Update Trending Products', page: 'trendingproducts' },
    { label: 'Update Best Seller Products', page: 'bestsellerproducts' },
  ]

  const [page, setPage] = useState<ParallelRouteStringType>('dashboard')
  const [component, setComponent] = useState<React.ReactNode>(components['dashboard'])

  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage?.accessToken,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.ok) {
          console.log('Admin is verified.')
        } else {
          alert('Authentication failed!\nPlease login again.')
          router.replace('/')
        }
      })
      .catch(error => console.log(error))
    setComponent(components[page])
  }, [page, components, router])

  return (
    <div className="min-h-[75vh] flex items-stretch">
      <div className="bg-neutral-100">
        <h2 className="px-8 py-8 text-lg">Menu</h2>
        <ul>
          {
            menuItems.map(menuItem => (
              <li
                key={menuItem.page}
                className={`max-w-[288px] truncate block px-8 py-2 ${page === menuItem.page ? 'bg-neutral-300' : 'hover:bg-neutral-200'}`}
                title={menuItem.label}
                onClick={e => setPage(menuItem.page)}
              >
                {menuItem.label}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="flex-grow bg-white">
        {component}
      </div>
    </div>
  )
}