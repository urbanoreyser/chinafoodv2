import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-border shadow-sm">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Combinado%20Tallarines%20con%20Chaufa-N7qhhngN5XHJT87aOAbGuT04aLuIEf.jpg"
            alt="Plato combinado de tallarín saltado con arroz chaufa"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white" aria-hidden>
              <span className="font-serif text-2xl leading-none">福</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">
                Desde 1998
              </p>
              <p className="font-serif text-lg font-bold leading-tight">
                Tradición de tres generaciones
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Nuestra historia
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl text-pretty">
            Sabor cantonés con corazón peruano
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            En Chifa Fuyao mantenemos viva la tradición del wok familiar. Cada chaufa, cada
            tallarín y cada sopa lleva el equilibrio justo entre el sabor cantonés y los
            ingredientes peruanos que tanto amamos. Lo preparamos al momento, como lo hacían
            los abuelos al llegar a Lima hace más de 25 años.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div>
              <p className="font-serif text-3xl font-bold text-brand-red">25+</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Años de sazón
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-brand-red">12</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Platos en carta
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-brand-red">4.9★</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                En reseñas
              </p>
            </div>
          </div>

          <Link
            href="/carta"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-brand-red-dark"
          >
            Explorar la carta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
