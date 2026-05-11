"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  unit?: string
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.quantity ?? 1
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        }
      }
      return {
        items: [...state.items, { ...action.item, quantity: qty }],
      }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      }
    }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((v) => !v), [])

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      dispatch({ type: "ADD", item, quantity })
      setIsOpen(true)
    },
    [],
  )

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE", id }),
    [],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
    [],
  )

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), [])

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  )

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [
      state.items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
  return ctx
}

export function formatPrice(amount: number) {
  return `$ ${amount.toFixed(0)}`
}
