"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Banknote,
  Bike,
  CheckCircle2,
  ChevronLeft,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Store,
  Trash2,
} from "lucide-react"
import { useCart } from "@/components/cart-context"
import { QrModal } from "@/components/qr-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/dishes"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type DeliveryType = "delivery" | "pickup"
type PaymentType = "yape" | "plin" | "cash"

type FormState = {
  name: string
  phone: string
  address: string
  reference: string
  notes: string
}

const DELIVERY_FEE = 0 // free delivery as per spec ("sin costo")

function generateOrderNumber() {
  const ts = Date.now().toString().slice(-5)
  const rand = Math.floor(Math.random() * 900 + 100)
  return `FY-${ts}${rand}`
}

export function CheckoutForm() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clear } = useCart()

  const [delivery, setDelivery] = useState<DeliveryType>("delivery")
  const [payment, setPayment] = useState<PaymentType>("yape")
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    reference: "",
    notes: "",
  })
  const [qrOpen, setQrOpen] = useState(false)
  const [confirmation, setConfirmation] = useState<{
    orderNumber: string
    payment: PaymentType
    delivery: DeliveryType
    total: number
    name: string
  } | null>(null)

  const subtotal = totalPrice
  const total = subtotal + (delivery === "delivery" ? DELIVERY_FEE : 0)

  const formValid = useMemo(() => {
    if (!form.name.trim() || !form.phone.trim()) return false
    if (delivery === "delivery" && !form.address.trim()) return false
    return items.length > 0
  }, [form, delivery, items.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValid) {
      toast.error("Completa los datos requeridos para continuar")
      return
    }
    const orderNumber = generateOrderNumber()
    setConfirmation({
      orderNumber,
      payment,
      delivery,
      total,
      name: form.name,
    })
    clear()
  }

  if (confirmation) {
    return <Confirmation data={confirmation} />
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingBag className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">
          Agrega platos desde nuestra carta para continuar con tu pedido.
        </p>
        <Button asChild className="mt-6 bg-brand-red text-primary-foreground hover:bg-brand-red-dark">
          <Link href="/carta">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Ver la carta
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-2">
        <Link
          href="/carta"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground hover:text-brand-red"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Seguir agregando
        </Link>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Finaliza tu pedido
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Confirma tus datos, tipo de entrega y método de pago. Generaremos un
          número único para tu pedido.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]"
      >
        <div className="flex flex-col gap-8">
          {/* Customer data */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-bold">Datos de entrega</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Necesitamos estos datos para coordinar tu pedido.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  placeholder="Ej. Luis Lopez"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Celular *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="999 999 999"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              {delivery === "delivery" && (
                <>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      placeholder="Yahuar Huaca 102, Independencia 15332"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="reference">Referencia</Label>
                    <Input
                      id="reference"
                      placeholder="Frente al parque, edificio azul…"
                      value={form.reference}
                      onChange={(e) => setForm({ ...form, reference: e.target.value })}
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="notes">Notas para la cocina</Label>
                <Textarea
                  id="notes"
                  placeholder="Sin kion, salsa aparte, etc."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Delivery type */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-bold">Tipo de entrega</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DeliveryOption
                active={delivery === "delivery"}
                onClick={() => setDelivery("delivery")}
                icon={<Bike className="h-5 w-5" aria-hidden />}
                title="Delivery a domicilio"
                description="Entregamos en Independencia y zonas cercanas."
                tag="Sin costo"
              />
              <DeliveryOption
                active={delivery === "pickup"}
                onClick={() => setDelivery("pickup")}
                icon={<Store className="h-5 w-5" aria-hidden />}
                title="Recojo en tienda"
                description="Pasa por nuestro local Yahuar Huaca 102, Independencia"
                tag="Sin costo"
              />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-bold">Método de pago</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PaymentOption
                active={payment === "yape"}
                onClick={() => setPayment("yape")}
                title="Yape"
                description="Pago con QR"
                color="bg-yape-purple"
                icon={<QrCode className="h-5 w-5" aria-hidden />}
              />
              <PaymentOption
                active={payment === "plin"}
                onClick={() => setPayment("plin")}
                title="Plin"
                description="Pago con QR"
                color="bg-plin-blue"
                icon={<QrCode className="h-5 w-5" aria-hidden />}
              />
              <PaymentOption
                active={payment === "cash"}
                onClick={() => setPayment("cash")}
                title="Efectivo"
                description="Pago al recibir"
                color="bg-foreground"
                icon={<Banknote className="h-5 w-5" aria-hidden />}
              />
            </div>

            {(payment === "yape" || payment === "plin") && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary p-4">
                <p className="text-sm text-muted-foreground">
                  Escanea el QR de {payment === "yape" ? "Yape" : "Plin"} para
                  pagar {formatPrice(total)}.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setQrOpen(true)}
                  className="border-border"
                >
                  <QrCode className="h-4 w-4" aria-hidden />
                  Ver código QR
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="font-serif text-2xl font-bold">Tu pedido</h2>
              <p className="text-sm text-muted-foreground">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </p>
            </div>

            <ul className="flex max-h-80 flex-col gap-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-1 text-sm font-semibold">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatPrice(item.price)}
                    </span>
                    <div className="mt-1 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => decrement(item.id)}
                        className="grid h-6 w-6 place-items-center rounded-full border border-border text-foreground/70 hover:border-brand-red hover:text-brand-red"
                        aria-label={`Quitar uno de ${item.name}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-5 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(item.id)}
                        className="grid h-6 w-6 place-items-center rounded-full bg-brand-red text-primary-foreground hover:bg-brand-red-dark"
                        aria-label={`Agregar uno más de ${item.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-1 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:text-brand-red"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-bold tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {delivery === "delivery" ? "Delivery" : "Recojo en tienda"}
                </span>
                <span className="font-semibold text-brand-gold-dark">
                  Sin costo
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-2xl font-bold text-brand-red">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!formValid}
              className="w-full bg-brand-red text-primary-foreground hover:bg-brand-red-dark disabled:opacity-50"
            >
              Confirmar pedido
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Al confirmar generaremos un número único para tu pedido.
            </p>
          </div>
        </aside>
      </form>

      <QrModal
        open={qrOpen}
        onOpenChange={setQrOpen}
        provider={payment === "plin" ? "plin" : "yape"}
        amount={total}
      />
    </div>
  )
}

function DeliveryOption({
  active,
  onClick,
  icon,
  title,
  description,
  tag,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  description: string
  tag?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-colors",
        active
          ? "border-brand-red bg-brand-red/5"
          : "border-border bg-background hover:border-brand-red/50",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={cn(
            "grid h-9 w-9 place-items-center rounded-lg",
            active ? "bg-brand-red text-primary-foreground" : "bg-secondary text-foreground/70",
          )}
        >
          {icon}
        </span>
        {tag && (
          <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark">
            {tag}
          </span>
        )}
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

function PaymentOption({
  active,
  onClick,
  title,
  description,
  color,
  icon,
}: {
  active: boolean
  onClick: () => void
  title: string
  description: string
  color: string
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors",
        active
          ? "border-brand-red bg-brand-red/5"
          : "border-border bg-background hover:border-brand-red/50",
      )}
    >
      <span
        className={cn("grid h-10 w-10 place-items-center rounded-lg text-primary-foreground", color)}
      >
        {icon}
      </span>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

function Confirmation({
  data,
}: {
  data: {
    orderNumber: string
    payment: PaymentType
    delivery: DeliveryType
    total: number
    name: string
  }
}) {
  const paymentLabel =
    data.payment === "yape" ? "Yape" : data.payment === "plin" ? "Plin" : "Efectivo"
  const deliveryLabel =
    data.delivery === "delivery" ? "Delivery a domicilio" : "Recojo en tienda"

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-gold/20 text-brand-gold-dark">
          <CheckCircle2 className="h-9 w-9" aria-hidden />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
          Pedido confirmado
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          ¡Gracias, {data.name.split(" ")[0]}!
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Recibimos tu pedido y nuestro equipo está empezando a prepararlo. Te
          contactaremos al celular registrado para coordinar.
        </p>

        <div className="mt-8 rounded-2xl bg-secondary p-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Número de pedido
            </span>
            <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-red">
              {paymentLabel}
            </span>
          </div>
          <p className="mt-1 font-serif text-3xl font-bold tracking-wider text-foreground">
            {data.orderNumber}
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tipo de entrega</span>
              <span className="font-semibold">{deliveryLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-brand-red">
                {formatPrice(data.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-brand-red text-primary-foreground hover:bg-brand-red-dark">
            <Link href="/carta">Hacer otro pedido</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/locales">Ver locales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
