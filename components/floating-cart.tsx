"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { formatPrice } from "@/lib/menu-data"

export function FloatingCart() {
  const pathname = usePathname()
  const { totalItems, subtotal } = useCart()

  // Hide on the order page (cart is the page itself there)
  if (pathname?.startsWith("/pedido")) return null
  if (totalItems === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
      <Link
        href="/pedido"
        className="pointer-events-auto group flex w-full max-w-md items-center justify-between gap-4 rounded-full bg-brand-red px-5 py-3 text-white shadow-2xl shadow-black/20 ring-1 ring-black/5 transition-all hover:bg-brand-red-dark sm:max-w-lg"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[11px] font-bold text-foreground">
              {totalItems}
            </span>
          </span>
          <div className="leading-tight">
            <p className="text-xs font-medium opacity-90">Tu pedido</p>
            <p className="text-sm font-semibold">
              {totalItems} {totalItems === 1 ? "plato" : "platos"} · {formatPrice(subtotal)}
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold tracking-wide group-hover:translate-x-0.5 transition-transform">
          Ver pedido →
        </span>
      </Link>
    </div>
  )
}
