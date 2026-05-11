"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, Check } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { useCart, formatPrice } from "@/components/cart-provider"

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clear,
  } = useCart()
  const [confirmed, setConfirmed] = useState(false)

  const handleCheckout = () => {
    setConfirmed(true)
    setTimeout(() => {
      clear()
      setConfirmed(false)
      closeCart()
    }, 2200)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-serif text-2xl font-light tracking-tight">
            Tu canasta
          </SheetTitle>
          <SheetDescription className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {itemCount === 0
              ? "Sin productos"
              : `${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
          </SheetDescription>
        </SheetHeader>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="size-6" />
            </div>
            <h3 className="font-serif text-2xl font-light tracking-tight">
              Pedido recibido
            </h3>
            <p className="max-w-xs font-light leading-relaxed text-muted-foreground text-pretty">
              Te contactaremos para coordinar la entrega o retiro en nuestro
              mercado.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-6">
            <Empty className="border-none">
              <EmptyHeader>
                <EmptyTitle className="font-serif text-2xl font-light tracking-tight">
                  Canasta vacía
                </EmptyTitle>
                <EmptyDescription className="font-light leading-relaxed">
                  Agrega productos del mercado o platos de nuestra carta del
                  día.
                </EmptyDescription>
              </EmptyHeader>
              <Button
                variant="outline"
                onClick={closeCart}
                className="mt-2 rounded-full border-foreground px-6 font-light tracking-wide"
              >
                Seguir explorando
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 px-6 py-5"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col">
                        <h4 className="font-serif text-lg leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {formatPrice(item.price)}
                          {item.unit ? ` · ${item.unit}` : ""}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="Disminuir cantidad"
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center font-mono text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Aumentar cantidad"
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-serif text-base">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="border-t border-border bg-secondary/40 px-6 py-5">
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl font-light">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80">
                  Envío calculado al confirmar el pedido
                </p>
                <Button
                  onClick={handleCheckout}
                  className="h-12 rounded-full bg-foreground font-light tracking-wide text-background hover:bg-foreground/90"
                >
                  Finalizar pedido
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="self-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Vaciar canasta
                </button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
