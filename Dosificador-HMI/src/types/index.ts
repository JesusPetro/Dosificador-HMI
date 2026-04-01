/**
 * @fileoverview Tipos del dominio compartidos entre la vista de usuario y la de operario.
 * Las props de componentes se definen localmente en cada componente.
 */

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

/** Vistas disponibles en la aplicación. */
type AppView = 'user' | 'operator' | 'logs'

/**
 * El flujo siempre avanza en este orden, nunca retrocede.
 * queue → dosing → on-belt → packing → done
 */
type OrderStatus = 'queue' | 'dosing' | 'on-belt' | 'packing' | 'done'

type OrderPriority = 'standard' | 'express'

interface OrderComponents {
  screws: number
  nuts: number
}

interface Order {
  id: string
  priority: OrderPriority
  status: OrderStatus
  components: OrderComponents
  quantity: number
  createdAt: string
  completedAt?: string
  duration?: string
  /** Undefined mientras el pedido no haya terminado. */
  successful?: boolean
}

interface SensorData {
  totalCount: number
  beltSpeed: number
  beltActive: boolean
  sealTemp: number
  sealTempMin: number
  sealTempMax: number
}

/**
 * La eficiencia se mide como el porcentaje de pedidos
 * completados sin fallos de dosificación sobre el total del turno.
 */
interface EfficiencyMetrics {
  totalCompleted: number
  successfulCompleted: number
  /** Calculado en el backend. No derivar en el cliente. */
  successRate: number
}

type AlertSeverity = 'error' | 'warning' | 'info'

interface Alert {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
}

type LogLevel = 'ERROR' | 'WARNING' | 'INFO'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  node: string
}

interface SystemHealth {
  /** Ventana de 24 horas. */
  totalEvents: number
  criticalErrors: number
  warnings: number
  healthPercent: number
}

export type {
  ConnectionStatus,
  AppView,
  OrderStatus,
  OrderPriority,
  OrderComponents,
  Order,
  SensorData,
  EfficiencyMetrics,
  Alert,
  AlertSeverity,
  LogLevel,
  LogEntry,
  SystemHealth,
}
