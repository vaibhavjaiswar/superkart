import React from "react"

interface ButtonPropType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string
  className?: string
  variant?: 'solid' | 'outline'
}

export default function Button({ children, className, variant = 'solid', ...rest }: ButtonPropType) {
  let colors = ''

  switch (variant) {
    case 'outline':
      colors = 'bg-neutral-100 text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-200'
      break
    default:
      colors = 'bg-neutral-800 text-neutral-100 border-2 border-neutral-800 hover:bg-neutral-900'
      break
  }

  return (
    <button
      className={`w-full sm:w-auto active:outline-2 active:outline active:outline-neutral-400 min-w-max px-4 py-1.5 rounded disabled:opacity-50 ${colors} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}