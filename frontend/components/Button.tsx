"use client"
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function sizeClasses(size: Size) {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm rounded-md'
    case 'lg':
      return 'px-6 py-3 text-base rounded-xl'
    default:
      return 'px-4 py-2 text-sm rounded-lg'
  }
}

function variantClasses(variant: Variant) {
  if (variant === 'secondary') {
    return 'border border-gray-300 bg-white/90 hover:bg-gray-50 text-gray-900'
  }
  // primary usa a paleta atual (cinza escuro e accent nos estados)
  return 'bg-gray-900 text-white hover:bg-gray-800'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, className = '', leftIcon, rightIcon, children, disabled, ...props },
  ref
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 select-none transition-[transform,box-shadow,background-color] duration-200 ease-friendly',
        'active:translate-y-[1px] focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent))]/40',
        'shadow-soft hover:shadow-lg',
        sizeClasses(size),
        variantClasses(variant),
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      ].join(' ')}
    >
      {leftIcon}
      {loading && (
        <span className="relative inline-block h-4 w-4 before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-gray-200 before:border-t-[rgb(var(--accent))] before:animate-spin" />
      )}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
})


