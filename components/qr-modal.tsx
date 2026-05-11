"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect } from "react"
import { formatPrice } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

export type WalletKind = "yape" | "plin"

const WALLET_CONFIG: Record<
  WalletKind,
  {
    name: string
    bg: string
    text: string
    accent: string
    qrImage: string
  }
> = {
  yape: {
    name: "Yape",
    bg: "bg-yape-purple",
    text: "text-white",
    accent: "bg-white text-yape-purple",
    qrImage: "/qr-yape.png",
  },
  plin: {
    name: "Plin",
    bg: "bg-plin-blue",
    text: "text-white",
    accent: "bg-white text-plin-blue",
    qrImage: "/qr-plin.jpeg",
  },
}

export function QrModal({
  kind,
  amount,
  onClose,
}: {
  kind: WalletKind
  amount: number
  onClose: () => void
}) {
  const cfg = WALLET_CONFIG[kind]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className={cn("relative px-6 pb-12 pt-6", cfg.bg, cfg.text)}>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold",
                cfg.accent,
              )}
            >
              {kind === "yape" ? "Y" : "P"}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Pagar con
              </p>
              <h2 id="qr-modal-title" className="text-2xl font-bold leading-tight">
                {cfg.name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm opacity-90">Monto a pagar</p>
          <p className="font-serif text-4xl font-bold">{formatPrice(amount)}</p>
        </div>

        <div className="-mt-8 px-6 pb-6">
          <div className="mx-auto w-full rounded-2xl border border-border bg-white p-4 shadow-md">
            <div className="relative aspect-square w-full">
              <Image
                src={cfg.qrImage}
                alt={`QR code para pagar con ${cfg.name}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            Pagar con QR o mediante el número +51 916 638 889
          </p>

          <button
            onClick={onClose}
            className={cn(
              "mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90",
              cfg.bg,
            )}
          >
            Ya pagué, continuar
          </button>
        </div>
      </div>
    </div>
  )
}
