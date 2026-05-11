import { NextRequest, NextResponse } from "next/server"
import { GOOGLE_SHEETS_CONFIG, type OrderData } from "@/lib/google-sheets"

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

    // Attempt to save to Google Sheets
    try {
      const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.SHEET_NAME}:append?valueInputOption=USER_ENTERED&key=${process.env.GOOGLE_SHEETS_API_KEY}`

      const values = [
        [
          order.orderId,
          order.date,
          order.customer,
          order.phone,
          order.address,
          order.products,
          order.paymentMethod,
          order.delivery,
          `S/. ${order.total.toFixed(2)}`,
        ],
      ]

      const sheetResponse = await fetch(sheetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })

      if (!sheetResponse.ok) {
        console.error("Google Sheets API error:", await sheetResponse.text())
      }
    } catch (sheetError) {
      console.error("Error saving to Google Sheets:", sheetError)
      // Continue even if Google Sheets fails - order is saved in memory
    }

    return NextResponse.json({ success: true, orderId: order.orderId })
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
