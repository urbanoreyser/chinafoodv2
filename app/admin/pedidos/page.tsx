"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  LogOut, 
  RefreshCw, 
  Package, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  CreditCard,
  Truck,
  ChefHat,
  Search,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import type { OrderData } from "@/lib/google-sheets"
import { formatPrice } from "@/lib/menu-data"

export default function AdminPedidosPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/verify")
      if (response.ok) {
        setAuthenticated(true)
        fetchOrders()
      } else {
        router.push("/admin")
      }
    } catch {
      router.push("/admin")
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error al cargar los pedidos")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchOrders()
    setRefreshing(false)
    toast.success("Pedidos actualizados")
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin")
    } catch {
      router.push("/admin")
    }
  }

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase()
    return (
      order.orderId.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.phone.includes(term)
    )
  })

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-red border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-red text-white flex items-center justify-center">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">
                Panel de Pedidos
              </h1>
              <p className="text-xs text-muted-foreground">Chifa Fuyao</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-red text-white hover:bg-brand-red-dark transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Package className="h-5 w-5" />}
            label="Total Pedidos"
            value={orders.length.toString()}
            color="bg-brand-red"
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Hoy"
            value={orders.filter(o => {
              const today = new Date().toLocaleDateString("es-PE")
              return o.date.includes(today)
            }).length.toString()}
            color="bg-brand-gold-dark"
          />
          <StatCard
            icon={<Truck className="h-5 w-5" />}
            label="Delivery"
            value={orders.filter(o => o.delivery.toLowerCase().includes("delivery")).length.toString()}
            color="bg-plin-blue"
          />
          <StatCard
            icon={<CreditCard className="h-5 w-5" />}
            label="Total Ventas"
            value={formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}
            color="bg-emerald-600"
          />
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por ID, cliente o telefono..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-red border-t-transparent" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-muted-foreground mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {searchTerm ? "No se encontraron pedidos" : "Sin pedidos"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {searchTerm
                ? "Intenta con otro termino de busqueda"
                : "Los pedidos apareceran aqui cuando los clientes confirmen sus ordenes"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order, index) => (
              <OrderCard key={`${order.orderId}-${index}`} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
      <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg ${color} text-white mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function OrderCard({ order }: { order: OrderData }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-brand-red">
                {order.orderId}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-gold/20 text-brand-gold-dark">
                {order.paymentMethod}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-2xl font-bold text-foreground">
              S/. {order.total.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{order.delivery}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">{order.customer}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{order.phone}</span>
            </div>
            {order.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-foreground">{order.address}</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Productos
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {order.products}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
