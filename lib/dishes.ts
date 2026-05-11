export type DishCategory = "arroces" | "tallarines" | "wok" | "sopas"

export type Dish = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: DishCategory
  badge?: string
  rating?: number
  popular?: boolean
  featured?: boolean
}

export const CATEGORIES: { value: DishCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "arroces", label: "Arroces" },
  { value: "tallarines", label: "Tallarines" },
  { value: "wok", label: "Platos al wok" },
  { value: "sopas", label: "Sopas" },
]

export const DISHES: Dish[] = [
  // Arroces
  {
    id: "arroz-chaufa-especial",
    name: "Arroz Chaufa Especial",
    description:
      "Arroz frito al wok con pollo, cerdo, huevo, cebolla china, kion y salsa de soya al estilo tradicional.",
    price: 18.0,
    image: "/dishes/arroz-chaufa.jpg",
    category: "arroces",
    badge: "Tradicional",
    rating: 4.9,
    popular: true,
    featured: true,
  },
  {
    id: "arroz-chaufa-pollo",
    name: "Arroz Chaufa de Pollo",
    description: "Arroz frito al wok con trozos de pollo, huevo, cebolla china y salsa de soya.",
    price: 16.0,
    image: "/dishes/arroz-chaufa.jpg",
    category: "arroces",
    rating: 4.8,
  },
  {
    id: "aeropuerto",
    name: "Aeropuerto",
    description: "Combinado de arroz chaufa y tallarín saltado al wok con pollo, cerdo, langostinos y verduras.",
    price: 22.0,
    image: "/dishes/aeropuerto.jpg",
    category: "arroces",
    badge: "Generoso",
    rating: 4.8,
  },
  // Tallarines
  {
    id: "tallarin-saltado-pollo",
    name: "Tallarín Saltado con Pollo",
    description: "Tallarín salteado al wok con pollo, pimiento, cebolla china y brotes de soya.",
    price: 16.5,
    image: "/dishes/tallarin-saltado-pollo.jpg",
    category: "tallarines",
    badge: "Clásico",
    rating: 4.7,
    popular: true,
  },
  {
    id: "tallarin-saltado-especial",
    name: "Tallarín Saltado Especial",
    description: "Tallarín al wok con pollo, cerdo, langostinos, verduras y nuestra salsa de la casa.",
    price: 19.0,
    image: "/dishes/tallarin-saltado-pollo.jpg",
    category: "tallarines",
    rating: 4.8,
  },
  {
    id: "combinado-tallarines-chaufa",
    name: "Combinado Tallarines con Chaufa",
    description: "Media porción de chaufa especial acompañada de pollo al wok con verduras y salsa de la casa.",
    price: 22.0,
    image: "/dishes/combinado-tallarines-chaufa.jpg",
    category: "tallarines",
    badge: "Recomendado",
    rating: 4.9,
    featured: true,
  },
  // Wok
  {
    id: "kam-lu-wantan",
    name: "Kam Lu Wantan",
    description: "Wantanes fritos cubiertos con salsa agridulce, pollo, langostinos, piña y verduras al wok.",
    price: 24.0,
    image: "/dishes/kam-lu-wantan.jpg",
    category: "wok",
    badge: "Favorito",
    rating: 5.0,
    popular: true,
    featured: true,
  },
  {
    id: "pollo-tipakay",
    name: "Pollo Tipakay",
    description: "Trozos de pollo apanados bañados en salsa agridulce con piña y pimientos.",
    price: 18.5,
    image: "/dishes/pollo-tipakay.jpg",
    category: "wok",
    rating: 4.7,
  },
  {
    id: "pollo-chi-jau-kay",
    name: "Pollo Chi Jau Kay",
    description: "Pollo crocante en salsa Chi Jau Kay, ligeramente picante, terminado con ajonjolí.",
    price: 19.0,
    image: "/dishes/pollo-chi-jau-kay.jpg",
    category: "wok",
    badge: "Picante",
    rating: 4.8,
  },
  // Sopas
  {
    id: "sopa-wantan",
    name: "Sopa Wantán",
    description: "Caldo claro con wantanes rellenos de cerdo, kion, cebolla china y verduras frescas.",
    price: 15.0,
    image: "/dishes/sopa-wantan.jpg",
    category: "sopas",
    rating: 4.6,
    popular: true,
  },
  {
    id: "sopa-fuchifu",
    name: "Sopa Fuchifú",
    description: "Sopa con fideos de huevo, pollo, langostinos y huevo batido en caldo de gallina.",
    price: 16.5,
    image: "/dishes/sopa-fuchifu.jpg",
    category: "sopas",
    rating: 4.7,
  },
  {
    id: "sopa-pollo-choclo",
    name: "Sopa de Pollo con Choclo",
    description: "Caldo dorado con pollo deshilachado, choclo, huevo y cebollita china.",
    price: 13.5,
    image: "/dishes/sopa-pollo-choclo.jpg",
    category: "sopas",
    rating: 4.5,
  },
]

export const FEATURED_DISHES = DISHES.filter((d) => d.featured)
export const POPULAR_DISHES = DISHES.filter((d) => d.popular)

export function formatPrice(value: number) {
  return `S/. ${value.toFixed(2)}`
}

export function getDishById(id: string) {
  return DISHES.find((d) => d.id === id)
}
