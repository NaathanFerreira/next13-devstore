'use client'

import { useCartContext } from '@/contexts/CartContext'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const { items } = useCartContext()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4 " />
      <span className="text-sm">Cart ({items.length})</span>
    </div>
  )
}
