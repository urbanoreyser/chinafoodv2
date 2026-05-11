"use client"

import { useState } from "react"
import { DishCard } from "@/components/dish-card"
import { CATEGORIES, DISHES, type DishCategory } from "@/lib/dishes"
import { cn } from "@/lib/utils"

type Filter = DishCategory | "todos"

export function MenuList() {
  const [filter, setFilter] = useState<Filter>("todos")

  const filtered =
    filter === "todos" ? DISHES : DISHES.filter((d) => d.category === filter)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-32 pt-10">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
            Carta
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Nuestra cocina al wok
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Explora nuestros 12 platos clásicos preparados con ingredientes
            frescos cada día. Filtra por categoría y agrega lo que más te
            antoje.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Categorías de platos"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:overflow-visible"
        >
          {CATEGORIES.map((c) => {
            const active = filter === c.value
            return (
              <button
                key={c.value}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(c.value as Filter)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand-red bg-brand-red text-primary-foreground"
                    : "border-border bg-background text-foreground/70 hover:border-brand-red hover:text-brand-red",
                )}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((dish) => (
          <DishCard key={dish.id} dish={dish} variant="menu" />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No hay platos en esta categoría todavía.
        </p>
      )}
    </div>
  )
}
