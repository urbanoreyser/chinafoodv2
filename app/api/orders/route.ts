import { NextRequest, NextResponse } from "next/server"
import { appendToGoogleSheet, type OrderData } from "@/lib/google-sheets"

// In-memory storage for orders (persists during server lifetime)
const orders: OrderData[] = []

export async function POST(request: NextRequest) {
  try {
    const order: OrderData = await request.json()

    // Validate required fields
    if (!order.orderId || !order.customer || !order.phone || !order.total) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Store order in memory
    orders.push(order)

    // Attempt to save to Google Sheets via Apps Script Web App
    const sheetResult = await appendToGoogleSheet(order)

    if (!sheetResult.success) {
      console.error("Google Sheets save error:", sheetResult.error)
      // Continue even if Google Sheets fails - order is saved in memory
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      sheetSaved: sheetResult.success,
    })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json(
      { error: "Error al procesar el pedido" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ orders })
}
