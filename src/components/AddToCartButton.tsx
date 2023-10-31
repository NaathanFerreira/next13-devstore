'use client'

import { useCartContext } from '@/contexts/CartContext'

export interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCartContext()

  function handleAddProductToCard() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={handleAddProductToCard}
    >
      Add to Cart
    </button>
  )
}
