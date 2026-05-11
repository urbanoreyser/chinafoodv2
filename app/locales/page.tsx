import { Clock, ExternalLink, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Locales — Chifa Fuyao",
  description:
    "Visita nuestro local en Independencia, Lima. Atendemos todos los días con servicio en mesa, recojo en tienda y delivery.",
}

const MAIN_ADDRESS = "Yahuar Huaca 102, Independencia 15332"
const BRANCH_ADDRESS = "Av. Chinchaysuyo 694, Independencia 15332"

const MAIN_MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAIN_ADDRESS)}`
const MAIN_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAIN_ADDRESS)}&output=embed`

const BRANCH_MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(BRANCH_ADDRESS)}`
const BRANCH_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(BRANCH_ADDRESS)}&output=embed`

export default function LocalesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Visítanos
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            Nuestros locales en Lima
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Te esperamos en nuestros locales de Independencia. Salón amplio, atención cordial
            y la mejor sazón al wok del distrito.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Local Principal */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
                Local principal
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Abierto ahora
              </span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Chifa Fuyao
            </h2>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Dirección
                  </p>
                  <p className="mt-0.5 text-base font-medium text-foreground">{MAIN_ADDRESS}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Teléfono
                  </p>
                  <a
                    href="tel:+51916638889"
                    className="mt-0.5 block text-base font-medium text-foreground hover:text-brand-red"
                  >
                    +51 916 638 889
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Horario de atención
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex justify-between gap-4 text-foreground">
                      <span className="font-medium">Lunes a Domingo</span>
                      <span className="text-muted-foreground">11:30 am - 11:00 pm</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAIN_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                <ExternalLink className="h-4 w-4" />
                Ver en Google Maps
              </a>
              <Link
                href="/pedido"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
              >
                Pedir delivery
              </Link>
            </div>
          </div>

          {/* Map Principal */}
          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            <div className="relative aspect-[4/5] w-full sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <iframe
                title="Mapa de Chifa Fuyao Principal"
                src={MAIN_MAPS_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Sucursal */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-brand-gold/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
                Sucursal
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Abierto ahora
              </span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Chifa Fuyao - Sucursal
            </h2>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Dirección
                  </p>
                  <p className="mt-0.5 text-base font-medium text-foreground">{BRANCH_ADDRESS}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Teléfono
                  </p>
                  <a
                    href="tel:+51916638889"
                    className="mt-0.5 block text-base font-medium text-foreground hover:text-brand-red"
                  >
                    +51 916 638 889
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Horario de atención
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex justify-between gap-4 text-foreground">
                      <span className="font-medium">Lunes a Domingo</span>
                      <span className="text-muted-foreground">11:30 am - 11:00 pm</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BRANCH_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                <ExternalLink className="h-4 w-4" />
                Ver en Google Maps
              </a>
              <Link
                href="/pedido"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
              >
                Pedir delivery
              </Link>
            </div>
          </div>

          {/* Map Sucursal */}
          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            <div className="relative aspect-[4/5] w-full sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <iframe
                title="Mapa de Chifa Fuyao Sucursal"
                src={BRANCH_MAPS_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
