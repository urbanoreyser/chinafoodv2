// Google Sheets configuration
// Uses Google Apps Script Web App as a proxy to write to the spreadsheet
// The SPREADSHEET_ID is used by the Apps Script deployed as a Web App
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: "1Lqg8IaniAf1qxtnJf3OhtWbN9OPyn7a88OI-A6ayQMA",
  SHEET_NAME: "Pedidos",
}

export type OrderData = {
  orderId: string
  date: string
  customer: string
  phone: string
  address: string
  products: string
  paymentMethod: string
  delivery: string
  total: number
}

/**
 * Appends an order to Google Sheets via the server-side API route.
 * Called from client-side components.
 */
export async function appendOrderToSheet(order: OrderData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { success: false, error: errorData.error || "Error al guardar el pedido" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving order:", error)
    return { success: false, error: "Error de conexion" }
  }
}

/**
 * Server-side function: Appends a row to Google Sheets using the Apps Script Web App.
 * The GOOGLE_SHEETS_API_KEY env var should contain the deployed Apps Script Web App URL.
 */
export async function appendToGoogleSheet(order: OrderData): Promise<{ success: boolean; error?: string }> {
  const webAppUrl = process.env.GOOGLE_SHEETS_API_KEY

  if (!webAppUrl) {
    return { success: false, error: "GOOGLE_SHEETS_API_KEY (Apps Script Web App URL) not configured" }
  }

  const row = [
    order.orderId,
    order.date,
    order.customer,
    order.phone,
    order.address,
    order.products,
    order.paymentMethod,
    order.delivery,
    `S/. ${order.total.toFixed(2)}`,
  ]

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        sheetName: GOOGLE_SHEETS_CONFIG.SHEET_NAME,
        row,
      }),
    })

    // Google Apps Script redirects (302) on success, follow it
    if (response.ok || response.redirected) {
      return { success: true }
    }

    const text = await response.text()
    return { success: false, error: `Google Sheets error: ${text}` }
  } catch (error) {
    console.error("Error appending to Google Sheets:", error)
    return { success: false, error: "Error de conexion con Google Sheets" }
  }
}
