"use client"

import { useMemo, useState } from "react"
import { DishCard } from "@/components/dish-card"
import { CATEGORIES, MENU, type Category } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

type Filter = Category | "todos"

export function MenuBrowser() {
  const [filter, setFilter] = useState<Filter>("todos")

  const filtered = useMemo(() => {
    if (filter === "todos") return MENU
    return MENU.filter((d) => d.category === filter)
  }, [filter])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14 pb-32">
      {/* Categories */}
      <div className="sticky top-20 z-30 -mx-4 mb-8 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const active = filter === cat.value
            const count =
              cat.value === "todos"
                ? MENU.length
                : MENU.filter((d) => d.category === cat.value).length
            return (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value as Filter)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-border bg-white text-foreground/80 hover:border-brand-red hover:text-brand-red",
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                    active ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
