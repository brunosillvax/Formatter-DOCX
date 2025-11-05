import { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  chunkyShadow?: boolean
  thickBorder?: boolean
}

export default function Card({ chunkyShadow, thickBorder, className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'bg-white/80 backdrop-blur rounded-xl border border-gray-200',
        chunkyShadow ? 'shadow-chunky' : 'shadow-soft',
        thickBorder ? 'border-2' : '',
        className
      ].join(' ')}
    />
  )
}


