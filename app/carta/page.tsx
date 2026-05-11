import { MenuBrowser } from "@/components/menu-browser"

export const metadata = {
  title: "Carta — Chifa Fuyao",
  description:
    "Explora nuestra carta completa de arroces chaufa, tallarines, platos al wok y sopas. Pide directo desde aquí.",
}

export default function CartaPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Nuestra carta
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            +40 platos preparados al estilo oriental
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">

          </p>
        </div>
      </section>

      <MenuBrowser />
    </>
  )
}
