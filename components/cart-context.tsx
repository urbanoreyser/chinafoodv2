"use client"

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react"
import { getDishById, type Dish } from "@/lib/menu-data"

export type CartItem = {
  id: string
  quantity: number
}

export type CartLine = CartItem & { dish: Dish }

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: "add"; id: string; quantity?: number }
  | { type: "remove"; id: string }
  | { type: "set"; id: string; quantity: number }
  | { type: "increment"; id: string }
  | { type: "decrement"; id: string }
  | { type: "clear" }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const qty = action.quantity ?? 1
      const existing = state.items.find((i) => i.id === action.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
        }
      }
      return { items: [...state.items, { id: action.id, quantity: qty }] }
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) }
    case "set":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      }
    case "increment":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      }
    case "decrement": {
      const next = state.items
        .map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0)
      return { items: next }
    }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  lines: CartLine[]
  totalItems: number
  subtotal: number
  add: (id: string, quantity?: number) => void
  remove: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
  getQuantity: (id: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = state.items
      .map((i) => {
        const dish = getDishById(i.id)
        return dish ? { ...i, dish } : null
      })
      .filter(Boolean) as CartLine[]

    const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0)
    const subtotal = lines.reduce(
      (sum, l) => sum + l.quantity * l.dish.price,
      0,
    )

    return {
      items: state.items,
      lines,
      totalItems,
      subtotal,
      add: (id, quantity) => dispatch({ type: "add", id, quantity }),
      remove: (id) => dispatch({ type: "remove", id }),
      setQuantity: (id, quantity) => dispatch({ type: "set", id, quantity }),
      increment: (id) => dispatch({ type: "increment", id }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      clear: () => dispatch({ type: "clear" }),
      getQuantity: (id) =>
        state.items.find((i) => i.id === id)?.quantity ?? 0,
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
