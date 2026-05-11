"use client"

import { Plus } from "lucide-react"
import { useCart, formatPrice } from "@/components/cart-provider"

const dishes = [
  {
    id: "ostras-bahia",
    name: "Ostras de la bahía",
    origin: "Caleta Tongoy",
    price: 18,
    note: "Media docena · limón y mignonette",
    image: "/oysters.jpg",
  },
  {
    id: "ceviche-dia",
    name: "Ceviche del día",
    origin: "Pesca diaria",
    price: 22,
    note: "Corvina, leche de tigre, ají amarillo",
    image: "/ceviche.jpg",
  },
  {
    id: "langostinos-brasa",
    name: "Langostinos a la brasa",
    origin: "Costa Pacífico",
    price: 28,
    note: "Carbón de espino, ajo confitado, sal de mar",
    image: "/shrimp-dish.jpg",
  },
  {
    id: "plateau-marea",
    name: "Plateau Marea",
    origin: "Selección del chef",
    price: 96,
    note: "Para compartir · ostras, almejas, langosta, camarones",
    image: "/seafood-platter.jpg",
  },
]

export function SpecialtiesSection() {
  const { addItem } = useCart()

  return (
    <section
      id="especialidades"
      className="border-b border-border bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-4 text-center md:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Carta del día — Lunes a sábado
          </span>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            Especialidades de la casa
          </h2>
          <p className="mx-auto max-w-xl font-light leading-relaxed text-muted-foreground text-pretty">
            Una carta breve que cambia con la marea. Cada plato refleja lo que
            el mar nos entregó esa misma mañana.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish) => (
            <li key={dish.id} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: dish.id,
                      name: dish.name,
                      price: dish.price,
                      image: dish.image,
                    })
                  }
                  aria-label={`Agregar ${dish.name} al carrito`}
                  className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-background/95 text-foreground shadow-sm transition-all hover:bg-foreground hover:text-background"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl font-medium leading-tight">
                  {dish.name}
                </h3>
                <span className="font-mono text-sm text-accent">
                  {formatPrice(dish.price)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-light leading-relaxed text-muted-foreground text-pretty">
                  {dish.note}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {dish.origin}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    image: dish.image,
                  })
                }
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 py-2.5 text-sm font-light tracking-wide text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Agregar a la canasta
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <a
            href="#reservar"
            className="rounded-full border border-foreground px-8 py-3 text-sm font-light tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Ver carta completa
          </a>
        </div>
      </div>
    </section>
  )
}
