const principles = [
  {
    n: "01",
    title: "Frescura diaria",
    body: "Recibimos la pesca cada mañana directamente de las caletas. Lo que no es del día, no llega a tu plato.",
  },
  {
    n: "02",
    title: "Pesca responsable",
    body: "Trabajamos con pescadores artesanales que respetan vedas, tallas mínimas y el equilibrio del ecosistema marino.",
  },
  {
    n: "03",
    title: "Trazabilidad total",
    body: "Cada pieza tiene origen conocido. Sabemos quién, dónde y cuándo capturó lo que servimos.",
  },
]

export function PhilosophySection() {
  return (
    <section
      id="filosofia"
      className="border-b border-border bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Nuestra filosofía
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
              El sabor del mar empieza con respeto por el mar.
            </h2>
          </div>
          <p className="max-w-sm font-light leading-relaxed text-muted-foreground text-pretty">
            Llevamos más de veinte años trabajando con las mismas familias de
            pescadores. Una relación construida sobre la confianza y el oficio.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md bg-border md:grid-cols-3">
          {principles.map((p) => (
            <li
              key={p.n}
              className="flex flex-col gap-6 bg-background p-8 md:p-10"
            >
              <span className="font-mono text-sm tracking-widest text-accent">
                {p.n}
              </span>
              <h3 className="font-serif text-2xl font-medium leading-tight md:text-3xl">
                {p.title}
              </h3>
              <p className="font-light leading-relaxed text-muted-foreground text-pretty">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
