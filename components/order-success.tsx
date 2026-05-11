"use client"

import Link from "next/link"
import { CheckCircle2, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { formatPrice } from "@/lib/menu-data"
import type { CartLine } from "@/components/cart-context"

type Props = {
  orderNumber: string
  customerName: string
  deliveryType: "delivery" | "pickup"
  payment: "yape" | "plin" | "cash"
  total: number
  lines: CartLine[]
  address?: string
  phone?: string
  deliveryFee?: number
}

const PAYMENT_LABEL: Record<Props["payment"], string> = {
  yape: "Yape",
  plin: "Plin",
  cash: "Efectivo al recibir",
}

export function OrderSuccess({
  orderNumber,
  customerName,
  deliveryType,
  payment,
  total,
  lines,
  address,
  phone,
  deliveryFee = 0,
}: Props) {
  const handleDownloadPDF = () => {
    const date = new Date().toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    const time = new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const deliveryText = deliveryType === "delivery" ? "Delivery a domicilio" : "Recojo en tienda"
    const paymentText = PAYMENT_LABEL[payment]

       // Create PDF
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    
    let y = 20
    
    // Title
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
       doc.text("FUYAO CHIFA - ORDEN DE PEDIDO", pageWidth / 2, y, { align: "center" })
   "-------------------------------------------------------"
    y += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
     
    // Order info section
    doc.text(`ID de Pedido: ${orderNumber}`, 20, y)
    y += 7
    doc.text(`Fecha: ${date}`, 20, y)
    y += 7
    doc.text(`Hora: ${time}`, 20, y)
    
    y += 12
    
    // Customer info
    doc.setFont("helvetica", "bold")
    doc.text("Datos de Cliente", 20, y)
    y += 7
    doc.setFont("helvetica", "normal")
    doc.text(`Cliente: ${customerName}`, 20, y)
    y += 7
    doc.text(`Telefono: ${phone || "—"}`, 20, y)
    y += 7
    if (address) {
      doc.text(`Direccion: ${address}`, 20, y)
      y += 7
    }
      
    y += 12
    "--------------------------------------"
    // Products
    doc.setFont("helvetica", "bold")
    doc.text("Productos", 20, y)
    y += 7
    doc.setFont("helvetica", "normal")
    
    lines.forEach((line) => {
      const productLine = `${line.dish.name} x${line.quantity} = ${formatPrice(line.dish.price * line.quantity)}`
      doc.text(productLine, 20, y)
      y += 7
    })
    
    y += 5
    "--------------------------------------"
    // Payment summary
    doc.setFont("helvetica", "bold")
    doc.text("Resumen de Pago", 20, y)
    y += 7
    doc.setFont("helvetica", "normal")
    doc.text(`Metodo de Pago: ${paymentText}`, 20, y)
    y += 7
    doc.setFont("helvetica", "normal")
    doc.text(`Delivery: ${deliveryFee > 0 ? formatPrice(deliveryFee) : "Gratis (Recojo en tienda)"}`, 20, y)
    y += 7
    doc.setFont("helvetica", "bold")
    doc.text(`Total: ${formatPrice(total)}`, 20, y)
    
    y += 15
    
    // Footer
    doc.setFont("helvetica", "italic")
    doc.setFontSize(10)
    doc.text("Gracias por tu compra en Fuyao Chifa", pageWidth / 2, y, { align: "center" })

    // Save PDF
    doc.save(`Pedido-${orderNumber}.pdf`)
  }

  const handleWhatsApp = () => {
    const date = new Date().toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })

    const productsText = lines
      .map(
        (line) =>
          `${line.dish.name} x${line.quantity} = ${formatPrice(line.dish.price * line.quantity)}`
      )
      .join("\n")

    const deliveryText = deliveryType === "delivery" ? "Delivery a domicilio" : "Recojo en tienda"

    const paymentText = PAYMENT_LABEL[payment]

    const message = `*NOTA DE PEDIDO - FU YAO CHIFA*
    
*-------------------------------------------*
ID: ${orderNumber}
Fecha: ${date}
*Cliente:* ${customerName}
*Telefono:* ${phone}
${address ? `*Direccion:* ${address}` : ""}
*-------------------------------------------*
*Productos:*
${productsText}
*-------------------------------------------*
*Delivery:* ${deliveryFee > 0 ? formatPrice(deliveryFee) : "Gratis (Recojo en tienda)"}
*Pago:* ${paymentText}
*Total:* ${formatPrice(total)}

Gracias por tu compra`


    // Open WhatsApp Web/App in browser with the message
    const whatsappUrl = `https://wa.me/51916638889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-50">
          <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        </div>

        {/* Title */}
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Pedido Confirmado
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tu pedido ha sido recibido. Pronto nos pondremos en contacto contigo.
        </p>

        {/* Order Number */}
        <div className="mt-8 w-full rounded-2xl border border-border bg-secondary/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Numero de pedido
          </p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground sm:text-3xl">
            {orderNumber}
          </p>
        </div>

        {/* Buttons - Stacked vertically and centered */}
        <div className="mt-8 flex w-full flex-col gap-3">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-800 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            <Download className="h-4 w-4" />
            Descargar Orden Pedido
          </button>
          
          <button
            onClick={handleWhatsApp}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar por WhatsApp
          </button>
          
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}