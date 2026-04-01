import { useState } from 'react'
import type { Order } from '../types'

const STORAGE_KEY = 'recent_orders'
const MAX_ORDERS = 3

function loadFromStorage(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    // Si el JSON está corrupto, empezamos limpio
    return []
  }
}

function saveToStorage(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function useRecentOrders() {
  const [orders, setOrders] = useState<Order[]>(loadFromStorage)

  function addOrder(order: Order): void {
    const updated = [order, ...orders].slice(0, MAX_ORDERS)
    saveToStorage(updated)
    setOrders(updated)
  }

  return { orders, addOrder }
}
