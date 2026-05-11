"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone, ShoppingCart, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/locales", label: "Locales" },
  { href: "/pedido", label: "Pedido" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top promo bar */}
      <div className="bg-brand-red text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-sm">
          <Phone className="h-4 w-4" aria-hidden />
          <span>
            Delivery disponible — Llama al{" "}
            <a href="tel:+51916638889" className="font-semibold underline underline-offset-2">
              +51 916 638 889
            </a>
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-fuyao.jpg"
              alt="Chifa Fuyao"
              width={60}
              height={60}
              className="h-14 w-14 rounded-full object-cover"
              priority
            />
            <div className="leading-tight">
              <p className="font-serif text-xl font-bold text-foreground">FU YAO</p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-gold-dark">
                CHIFA
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-brand-red",
                    active ? "text-brand-red" : "text-foreground/80",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-brand-red" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="tel:+51916638889"
              className="hidden items-center gap-2 text-sm font-medium text-foreground/80 lg:flex"
            >
              <Phone className="h-4 w-4 text-brand-red" />
              +51 916 638 889
            </a>

            <Button asChild className="hidden bg-brand-red text-white hover:bg-brand-red-dark sm:inline-flex">
              <Link href="/carta">Pedir Ahora</Link>
            </Button>

            <Link
              href="/pedido"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-brand-red hover:text-brand-red"
              aria-label="Ver carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3" aria-label="Menú móvil">
              {NAV.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-red/10 text-brand-red"
                        : "text-foreground/80 hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
