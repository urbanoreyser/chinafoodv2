import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/components/cart-context"
import { FloatingCart } from "@/components/floating-cart"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Chifa Fuyao — Cocina Chino-Peruana Auténtica",
  description:
    "Disfruta de los sabores tradicionales del Chifa Fuyao. Arroces chaufa, tallarines, platos al wok y sopas preparadas al estilo cantonés. Pide delivery o recoge en tienda.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <CartProvider>
          <Suspense fallback={null}>
            <SiteHeader />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <SiteFooter />
            <FloatingCart />
          </Suspense>
        </CartProvider>
        <Toaster richColors position="top-center" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
