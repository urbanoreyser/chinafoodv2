"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

type CartButtonProps = {
  variant?: "light" | "dark"
  className?: string
}

export function CartButton({ variant = "light", className }: CartButtonProps) {
  const { itemCount, openCart } = useCart()

  const isLight = variant === "light"

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito · ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full border transition-colors",
        isLight
          ? "border-background/30 text-background hover:bg-background hover:text-foreground"
          : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background",
        className,
      )}
    >
      <ShoppingBag className="size-4" />
      {itemCount > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-medium text-accent-foreground"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </button>
  )
}
