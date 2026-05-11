"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, type FormEvent } from "react"
import {
  Banknote,
  Bike,
  CheckCircle2,
  Minus,
  Plus,
  Store,
  Trash2,
  Wallet,
} from "lucide-react"
import { toast } from "sonner"
import { useCart, type CartLine } from "@/components/cart-context"
import { OrderSuccess } from "@/components/order-success"
import { QrModal, type WalletKind } from "@/components/qr-modal"
import { formatPrice } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

type DeliveryType = "delivery" | "pickup"
type Payment = "yape" | "plin" | "cash"
type DeliveryZone = "1" | "2" | "3" | "4"

const DELIVERY_ZONE_FEES: Record<DeliveryZone, number> = {
  "1": 3.0,
  "2": 5.0,
  "3": 7.0,
  "4": 9.0,
}

const DELIVERY_ZONE_LABELS: Record<DeliveryZone, string> = {
  "1": "1ra Zona - S/. 3.00",
  "2": "2da Zona - S/. 5.00",
  "3": "3ra Zona - S/. 7.00",
  "4": "4ta Zona - S/. 9.00",
}

type Confirmed = {
  orderNumber: string
  customerName: string
  deliveryType: DeliveryType
  payment: Payment
  total: number
  lines: CartLine[]
  address?: string
  phone: string
  deliveryFee: number
}

function generateOrderNumber() {
  const ts = Date.now().toString(36).slice(-4).toUpperCase()
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `FY-${rand}-${ts}`
}

export function CheckoutFlow() {
  const { lines, totalItems, subtotal, increment, decrement, remove, clear } = useCart()

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery")
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>("1")
  const [payment, setPayment] = useState<Payment>("yape")
  const [openWallet, setOpenWallet] = useState<WalletKind | null>(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")

  const [confirmed, setConfirmed] = useState<Confirmed | null>(null)

  const deliveryFee = deliveryType === "delivery" ? DELIVERY_ZONE_FEES[deliveryZone] : 0
  const total = useMemo(() => {
    return subtotal + deliveryFee
  }, [subtotal, deliveryFee])

  if (confirmed) {
    return (
      <OrderSuccess
        orderNumber={confirmed.orderNumber}
        customerName={confirmed.customerName}
        deliveryType={confirmed.deliveryType}
        payment={confirmed.payment}
        total={confirmed.total}
        lines={confirmed.lines}
        address={confirmed.address}
        phone={confirmed.phone}
        deliveryFee={confirmed.deliveryFee}
      />
    )
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
          <Wallet className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          Tu carrito está vacío
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Agrega platos desde la carta para empezar tu pedido. Te esperan arroces chaufa,
          tallarines al wok y nuestras famosas sopas.
        </p>
        <Link
          href="/carta"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          Ir a la carta
        </Link>
      </section>
    )
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      toast.error("Completa tu nombre y teléfono")
      return
    }
    if (deliveryType === "delivery" && !address.trim()) {
      toast.error("Ingresa la dirección de entrega")
      return
    }

    const orderNumber = generateOrderNumber()
    const snapshot: Confirmed = {
      orderNumber,
      customerName: name.trim(),
      deliveryType,
      payment,
      total,
      lines: lines.map((l) => ({ ...l })),
      address: deliveryType === "delivery" ? address.trim() : undefined,
      phone: phone.trim(),
      deliveryFee,
    }

    setConfirmed(snapshot)
    clear()
    toast.success(`Pedido #${orderNumber} confirmado`)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Finaliza tu pedido
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Tu pedido en Chifa Fuyao
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Revisa tus platos, completa los datos de entrega y elige tu método de pago. Al
            confirmar te daremos un número único para hacer seguimiento.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Cart items */}
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Tu carrito
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    ({totalItems} {totalItems === 1 ? "plato" : "platos"})
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    clear()
                    toast("Carrito vaciado")
                  }}
                  className="text-xs font-semibold text-muted-foreground hover:text-brand-red"
                >
                  Vaciar
                </button>
              </header>

              <ul className="divide-y divide-border">
                {lines.map((line) => (
                  <li
                    key={line.id}
                    className="flex items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-24 sm:w-24">
                      <Image
                        src={line.dish.image || "/placeholder.svg"}
                        alt={line.dish.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-base font-bold text-foreground sm:text-lg">
                        {line.dish.name}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-brand-gold-dark">
                        {formatPrice(line.dish.price)}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand-red bg-white p-1">
                        <button
                          type="button"
                          onClick={() => decrement(line.id)}
                          aria-label={`Disminuir ${line.dish.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 px-1 text-center text-sm font-bold">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(line.id)}
                          aria-label={`Aumentar ${line.dish.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white transition-colors hover:bg-brand-red-dark"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-serif text-lg font-bold text-foreground">
                        {formatPrice(line.dish.price * line.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        aria-label={`Quitar ${line.dish.name}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-brand-red"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery type */}
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Tipo de entrega
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <DeliveryOption
                  active={deliveryType === "delivery"}
                  onClick={() => setDeliveryType("delivery")}
                  icon={<Bike className="h-5 w-5" />}
                  title="Delivery a domicilio"
                >
                  {deliveryType === "delivery" && (
                    <select
                      value={deliveryZone}
                      onChange={(e) => setDeliveryZone(e.target.value as DeliveryZone)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-brand-red"
                    >
                      {(Object.keys(DELIVERY_ZONE_LABELS) as DeliveryZone[]).map((zone) => (
                        <option key={zone} value={zone}>
                          {DELIVERY_ZONE_LABELS[zone]}
                        </option>
                      ))}
                    </select>
                  )}
                </DeliveryOption>
                <DeliveryOption
                  active={deliveryType === "pickup"}
                  onClick={() => setDeliveryType("pickup")}
                  icon={<Store className="h-5 w-5" />}
                  title="Recojo en tienda"
                />
              </div>
            </div>

            {/* Customer info */}
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">
                {deliveryType === "delivery" ? "Datos de entrega" : "Datos de recojo"}
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Nombre completo" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej. Luis Lopez"
                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-red"
                  />
                </Field>
                <Field label="Teléfono / WhatsApp" required>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    inputMode="tel"
                    placeholder="+51 9XX XXX XXX"
                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-red"
                  />
                </Field>

                {deliveryType === "delivery" && (
                  <>
                    <Field label="Dirección de entrega" required className="sm:col-span-2">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Av. Ejemplo 123, dpto 4B, Independencia"
                        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-red"
                      />
                    </Field>
                  </>
                )}

                <Field label="Notas para la cocina (opcional)" className="sm:col-span-2">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Sin kion, extra picante, sin cebolla, etc."
                    className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-red"
                  />
                </Field>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Método de pago
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <PaymentOption
                  active={payment === "yape"}
                  onClick={() => setPayment("yape")}
                  badge="Yape"
                  badgeClass="bg-yape-purple text-white"
                  title="Yape"
                  desc="Pago con QR"
                />
                <PaymentOption
                  active={payment === "plin"}
                  onClick={() => setPayment("plin")}
                  badge="Plin"
                  badgeClass="bg-plin-blue text-white"
                  title="Plin"
                  desc="Pago con QR"
                />
                <PaymentOption
                  active={payment === "cash"}
                  onClick={() => setPayment("cash")}
                  icon={<Banknote className="h-5 w-5" />}
                  title="Efectivo"
                  desc="Pagas al recibir"
                />
              </div>

              {payment !== "cash" && (
                <button
                  type="button"
                  onClick={() => setOpenWallet(payment as WalletKind)}
                  className={cn(
                    "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90",
                    payment === "yape" ? "bg-yape-purple" : "bg-plin-blue",
                  )}
                >
                  Mostrar QR de {payment === "yape" ? "Yape" : "Plin"}
                </button>
              )}
              {payment === "cash" && (
                <div className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
                  <p>
                    Prepara el monto exacto si es posible. El repartidor llevará vuelto hasta
                    S/. 50.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">Resumen</h2>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium text-foreground">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">
                    {deliveryType === "delivery" 
                      ? `Delivery (${deliveryZone === "4" ? "4ta" : deliveryZone === "3" ? "3ra" : deliveryZone === "2" ? "2da" : "1ra"} Zona)` 
                      : "Recojo en tienda"}
                  </dt>
                  <dd className={cn("font-medium", deliveryFee > 0 ? "text-foreground" : "text-emerald-600")}>
                    {deliveryFee > 0 ? formatPrice(deliveryFee) : "Gratis"}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4">
                <span className="font-semibold text-foreground">Total a pagar</span>
                <span className="font-serif text-3xl font-bold text-brand-gold-dark">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-red-dark"
              >
                <CheckCircle2 className="h-5 w-5" />
                Confirmar pedido
              </button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Al confirmar aceptas que te contactemos para coordinar la entrega de tu
                pedido.
              </p>
            </div>
          </aside>
        </form>
      </section>

      {openWallet && (
        <QrModal
          kind={openWallet}
          amount={total}
          onClose={() => setOpenWallet(null)}
        />
      )}
    </>
  )
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      {children}
    </label>
  )
}

function DeliveryOption({
  active,
  onClick,
  icon,
  title,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  children?: React.ReactNode
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(
        "flex flex-col rounded-2xl border p-4 text-left transition-all cursor-pointer",
        active
          ? "border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20"
          : "border-border bg-white hover:border-brand-red/60",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            active ? "bg-brand-red text-white" : "bg-secondary text-foreground/70",
          )}
        >
          {icon}
        </span>
        <span className="flex-1">
          <span className="block font-semibold text-foreground">{title}</span>
        </span>
        <span
          className={cn(
            "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            active ? "border-brand-red bg-brand-red" : "border-border bg-white",
          )}
          aria-hidden
        >
          {active && <span className="h-2 w-2 rounded-full bg-white" />}
        </span>
      </div>
      {children}
    </div>
  )
}

function PaymentOption({
  active,
  onClick,
  badge,
  badgeClass,
  icon,
  title,
  desc,
}: {
  active: boolean
  onClick: () => void
  badge?: string
  badgeClass?: string
  icon?: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20"
          : "border-border bg-white hover:border-brand-red/60",
      )}
    >
      {badge ? (
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
            badgeClass,
          )}
        >
          {badge[0]}
        </span>
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground/70">
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{desc}</span>
      </span>
    </button>
  )
}