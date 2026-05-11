"use client"

import { Plus } from "lucide-react"
import { useCart, formatPrice } from "@/components/cart-provider"

const marketItems = [
  {
    id: "pescado-entero-kg",
    name: "Pescado entero",
    unit: "1 kg",
    price: 12,
    image: "/fresh-catch.jpg",
  },
  {
    id: "filete-corvina",
    name: "Filete de corvina",
    unit: "500 g",
    price: 18,
    image: "/ceviche.jpg",
  },
  {
    id: "langostinos-frescos",
    name: "Langostinos frescos",
    unit: "500 g",
    price: 24,
    image: "/shrimp-dish.jpg",
  },
  {
    id: "ostras-docena",
    name: "Ostras vivas",
    unit: "Docena",
    price: 32,
    image: "/oysters.jpg",
  },
  {
    id: "conserva-atun",
    name: "Conserva de atún",
    unit: "200 g",
    price: 9,
    image: "/seafood-platter.jpg",
  },
]

export function MarketSection() {
  const { addItem } = useCart()

  return (
    <section
      id="mercado"
      className="relative overflow-hidden bg-foreground text-background"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-square w-full lg:aspect-auto">
          <img
            src="/fresh-catch.jpg"
            alt="Pescados frescos en hielo en el mercado de Marea"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-8 px-6 py-20 md:px-12 lg:px-16 lg:py-28">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/60">
            Mercado Marea
          </span>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            Llévate el mar a casa.
          </h2>
          <p className="max-w-md font-light leading-relaxed text-background/80 text-pretty">
            Nuestro mercado abre cada mañana con la pesca del día. Pescados
            enteros, fileteados al momento, mariscos vivos y conservas
            artesanales preparadas en casa.
          </p>

          <ul className="flex flex-col divide-y divide-background/15 border-y border-background/15">
            {marketItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-lg md:text-xl">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/60">
                    {item.unit} · {formatPrice(item.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      unit: item.unit,
                      image: item.image,
                    })
                  }
                  aria-label={`Agregar ${item.name} al carrito`}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 font-light text-background/70">
            <p>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/50">
                Horario ·{" "}
              </span>
              Martes a sábado · 09:00 a 14:00
            </p>
            <p>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/50">
                Encargos ·{" "}
              </span>
              +56 9 1234 5678
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
