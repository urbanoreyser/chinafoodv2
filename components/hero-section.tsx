export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-foreground text-background">
      <img
        src="/hero-ocean.jpg"
        alt="Superficie del océano al atardecer con ondulaciones suaves"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/80"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-32 text-center lg:py-40">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/70">
          Pesca artesanal · Pacífico Sur
        </span>
        <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl">
          Del mar a la mesa, sin escalas.
        </h1>
        <p className="max-w-xl font-light leading-relaxed text-background/85 text-pretty md:text-lg">
          Mariscos capturados al amanecer por pescadores locales y servidos el
          mismo día en nuestro restaurante y mercado.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#reservar"
            className="rounded-full bg-background px-8 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-background/90"
          >
            Reservar mesa
          </a>
          <a
            href="#especialidades"
            className="rounded-full border border-background/40 px-8 py-3 text-sm font-light tracking-wide text-background transition-colors hover:border-background"
          >
            Ver carta del día
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-background/60">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Desliza
          </span>
          <span className="h-10 w-px bg-background/40" aria-hidden />
        </div>
      </div>
    </section>
  )
}
