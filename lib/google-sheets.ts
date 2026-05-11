// Google Sheets configuration
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
    return { success: false, error: "Error de conexión" }
  }
}

export function formatOrderForSheet(order: OrderData): string[][] {
  return [
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
}
