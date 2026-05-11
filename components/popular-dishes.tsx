import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DishCard } from "@/components/dish-card"
import { MENU } from "@/lib/menu-data"

export function PopularDishes() {
  const popular = MENU.filter((d) => d.popular).slice(0, 4)

  // Fallback to first 4 if not enough flagged
  const dishes = popular.length >= 4 ? popular : MENU.slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Los Favoritos
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Platos Más Pedidos
          </h2>
        </div>
        <Link
          href="/carta"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold-dark transition-colors hover:text-brand-red"
        >
          Ver carta completa
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} variant="popular" />
        ))}
      </div>
    </section>
  )
}
