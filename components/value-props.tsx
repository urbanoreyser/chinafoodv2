import { Bike, ChefHat, Clock4, Sparkles } from "lucide-react"

const ITEMS = [
  {
    icon: ChefHat,
    title: "Sazón al Wok",
    desc: "Recetas tradicionales preparadas en wok a fuego alto, como manda la cocina cantonesa.",
  },
  {
    icon: Bike,
    title: "Delivery rápido",
    desc: "Pedidos a domicilio en 30 minutos o menos dentro de la zona de cobertura.",
  },
  {
    icon: Clock4,
    title: "Abierto todos los días",
    desc: "Lun a Dom, de 11:30 am a 11:00 pm. También recojo en tienda sin costo adicional.",
  },
  {
    icon: Sparkles,
    title: "Ingredientes frescos",
    desc: "Trabajamos con verduras de mercado, carnes seleccionadas y especias importadas.",
  },
]

export function ValueProps() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
