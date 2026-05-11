"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CartButton } from "@/components/cart-button"

const navLinks = [
  { href: "#filosofia", label: "Filosofía" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#mercado", label: "Mercado" },
  { href: "#historia", label: "Historia" },
]

export function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"
      >
        <a
          href="#"
          className="font-serif text-2xl font-medium tracking-wide text-background"
        >
          Marea
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-light tracking-wide text-background/80 transition-colors hover:text-background"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#reservar"
            className="hidden rounded-full border border-background/30 px-5 py-2 text-sm font-light tracking-wide text-background transition-colors hover:bg-background hover:text-foreground md:inline-block"
          >
            Reservar
          </a>
          <CartButton variant="light" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex items-center justify-center text-background md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden bg-foreground/95 backdrop-blur md:hidden",
          open ? "max-h-96" : "max-h-0",
          "transition-[max-height] duration-300 ease-in-out",
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-serif text-xl text-background"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full border border-background/40 px-5 py-2 text-sm text-background"
            >
              Reservar
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
