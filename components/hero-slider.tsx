"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/components/cart-context"
import { formatPrice, MENU } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

const HERO_DISH_IDS = ["arroz-chaufa-especial", "kam-lu-wantan", "tallarin-carne"]

const HERO_SLIDES = HERO_DISH_IDS
  .map((id) => MENU.find((d) => d.id === id))
  .filter(Boolean)
  .map((d) => d!)

export function HeroSlider() {
  const { add } = useCart()
  const [index, setIndex] = useState(0)
  const total = HERO_SLIDES.length

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] w-full sm:h-[620px] md:h-[680px]">
        {HERO_SLIDES.map((dish, i) => (
          <div
            key={dish.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="max-w-xl text-white">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-1.5 text-xs font-semibold sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
                Cocina Chino-Peruana Auténtica
              </span>
              {HERO_SLIDES[index].badge && (
                <span className="inline-flex items-center rounded-full bg-brand-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
                  {HERO_SLIDES[index].badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {HERO_SLIDES[index].name}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              {HERO_SLIDES[index].description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <p className="font-serif text-3xl font-bold text-brand-gold sm:text-4xl">
                {formatPrice(HERO_SLIDES[index].price)}
              </p>
              <div
                className="flex items-center gap-1 text-brand-gold"
                aria-label={`Calificación ${HERO_SLIDES[index].rating} de 5`}
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  />
                ))}
                <span className="ml-1 text-sm font-medium text-white/85">
                  ({HERO_SLIDES[index].rating.toFixed(1)})
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add(HERO_SLIDES[index].id)
                  toast.success(`${HERO_SLIDES[index].name} añadido al carrito`)
                }}
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-red-dark sm:text-base"
              >
                <Plus className="h-4 w-4" />
                Agregar al carrito
              </button>
              <a
                href="/carta"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:text-base"
              >
                Ver carta completa
              </a>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Slide anterior"
          className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          aria-label="Slide siguiente"
          className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
