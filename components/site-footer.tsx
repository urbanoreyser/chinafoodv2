import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-fuyao.jpg"
              alt="Chifa Fuyao"
              width={60}
              height={60}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="font-serif text-xl font-bold text-foreground">FU YAO</p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-gold-dark">
                CHIFA
              </p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cocina chino-peruana auténtica al wok. Sabores tradicionales preparados con
            ingredientes frescos cada día.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-brand-red">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/carta" className="hover:text-brand-red">
                Carta
              </Link>
            </li>
            <li>
              <Link href="/locales" className="hover:text-brand-red">
                Locales
              </Link>
            </li>
            <li>
              <Link href="/pedido" className="hover:text-brand-red">
                Pedido
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>Yahuar Huaca 102, Independencia 15332</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a href="tel:+51916638889" className="hover:text-brand-red">
                +51 916 638 889
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>Lun a Dom · 11:30 am — 11:00 pm</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Síguenos
          </h3>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-5 text-xs text-muted-foreground text-center">
          <p>© 2026 Chifa Fuyao. All rights reserved - Developed by Digital Solutions & AI</p>
        </div>
      </div>
    </footer>
  )
}
