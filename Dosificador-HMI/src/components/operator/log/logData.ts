export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success'

export interface LogEntry {
  id: string
  level: LogLevel
  message: string
  source: string
  timestamp: string
  ts: number
}

export const LEVEL_CFG: Record<LogLevel, { label: string; text: string; bg: string; dot: string }> = {
  info:    { label: 'INFO',  text: 'text-blue-600',    bg: 'bg-blue-50',    dot: 'bg-blue-500'    },
  warn:    { label: 'WARN',  text: 'text-amber-600',   bg: 'bg-amber-50',   dot: 'bg-amber-500'   },
  error:   { label: 'ERROR', text: 'text-red-600',     bg: 'bg-red-50',     dot: 'bg-red-500'     },
  debug:   { label: 'DEBUG', text: 'text-neutral-400', bg: 'bg-neutral-100',dot: 'bg-neutral-400' },
  success: { label: 'OK',    text: 'text-green-600',   bg: 'bg-green-50',   dot: 'bg-green-500'   },
}

export const ALL_LEVELS: LogLevel[] = ['info', 'warn', 'error', 'debug', 'success']

function mkLog(
  level: LogLevel,
  message: string,
  source: string,
  minutesAgo: number,
): LogEntry {
  const ts = Date.now() - minutesAgo * 60 * 1000
  return {
    id: `${ts}-${Math.random().toString(36).slice(2, 7)}`,
    level,
    message,
    source,
    ts,
    timestamp: new Date(ts).toLocaleTimeString('es-CO', { hour12: false }),
  }
}

export const BASE_LOGS: LogEntry[] = [
  mkLog('info',    'Sistema iniciado correctamente',                    'SYS',    60),
  mkLog('info',    'Conexión con PLC establecida — puerto COM3',         'PLC',    58),
  mkLog('success', 'Calibración de tolva completada',                   'TOLVA',  55),
  mkLog('info',    'Pedido #ORD-8983 ingresado a la cola',              'ORDEN',  50),
  mkLog('info',    'Pedido #ORD-8983 — dosificación iniciada',          'DOSIF',  48),
  mkLog('debug',   'Velocidad banda: 0.85 m/s — dentro del rango',      'BANDA',  45),
  mkLog('success', 'Pedido #ORD-8983 completado — 400 unidades',        'ORDEN',  42),
  mkLog('warn',    'Tolva: nivel bajo — 23% de capacidad',              'TOLVA',  35),
  mkLog('info',    'Pedido #ORD-8984 — dosificación iniciada',          'DOSIF',  30),
  mkLog('debug',   'Temperatura sello: 184.2°C',                        'SELLO',  28),
  mkLog('error',   'Sensor S4 sin respuesta — timeout 3000ms',          'SENSOR', 25),
  mkLog('warn',    'Reintentando conexión con sensor S4 (intento 1/3)', 'SENSOR', 24),
  mkLog('success', 'Sensor S4 reconectado correctamente',               'SENSOR', 23),
  mkLog('success', 'Pedido #ORD-8984 completado — 500 unidades',        'ORDEN',  20),
  mkLog('info',    'Mantenimiento programado en 4h 22m',                'SYS',    15),
  mkLog('info',    'Pedido #ORD-8985 — dosificación iniciada (express)', 'DOSIF',  12),
  mkLog('warn',    'Temperatura sello fuera de rango: 196.1°C',         'SELLO',  10),
  mkLog('error',   'Pedido #ORD-8985 fallido — parada de emergencia',   'ORDEN',   8),
  mkLog('info',    'Sistema reanudado tras parada de emergencia',        'SYS',     7),
  mkLog('info',    'Pedido #ORD-8986 — dosificación iniciada',          'DOSIF',   5),
  mkLog('debug',   'Velocidad banda ajustada: 0.90 m/s',                'BANDA',   3),
  mkLog('success', 'Pedido #ORD-8986 completado — 250 unidades',        'ORDEN',   1),
]

export const LIVE_POOL: Omit<LogEntry, 'id' | 'timestamp' | 'ts'>[] = [
  { level: 'debug',   message: 'Heartbeat PLC — latencia 4ms',             source: 'PLC'   },
  { level: 'debug',   message: 'Temperatura sello estable: 184.5°C',       source: 'SELLO' },
  { level: 'info',    message: 'Nuevo pedido recibido desde interfaz web',  source: 'ORDEN' },
  { level: 'debug',   message: 'Velocidad banda estable: 0.85 m/s',        source: 'BANDA' },
  { level: 'success', message: 'Ciclo de dosificación completado',          source: 'DOSIF' },
  { level: 'info',    message: 'Sincronización con servidor — OK',          source: 'NET'   },
  { level: 'warn',    message: 'Buffer de órdenes al 80% de capacidad',     source: 'SYS'   },
  { level: 'error',   message: 'Paquete perdido — reintentando (1/3)...',   source: 'NET'   },
  { level: 'info',    message: 'Snapshot de estado guardado',               source: 'SYS'   },
  { level: 'debug',   message: 'GC completado — heap 42MB liberado',        source: 'RT'    },
]
