import { CheckoutFlow } from "@/components/checkout-flow"

export const metadata = {
  title: "Pedido — Chifa Fuyao",
  description:
    "Confirma tu pedido en Chifa Fuyao. Elige delivery o recojo en tienda y paga con Yape, Plin o efectivo.",
}

export default function PedidoPage() {
  return <CheckoutFlow />
}
