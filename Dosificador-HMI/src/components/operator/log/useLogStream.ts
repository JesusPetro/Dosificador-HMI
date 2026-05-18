import { useState, useEffect, useCallback, useMemo } from 'react'
import { BASE_LOGS, LIVE_POOL } from './logData'
import type { LogEntry, LogLevel } from './logData'

function makeLiveEntry(base: Omit<LogEntry, 'id' | 'timestamp' | 'ts'>): LogEntry {
  const ts = Date.now()
  return {
    ...base,
    id: `${ts}-${Math.random().toString(36).slice(2, 7)}`,
    ts,
    timestamp: new Date(ts).toLocaleTimeString('es-CO', { hour12: false }),
  }
}

export type LevelFilter = LogLevel | 'all'

export function useLogStream() {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    [...BASE_LOGS].sort((a, b) => a.ts - b.ts),
  )
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all')
  const [search, setSearch] = useState('')
  const [streaming, setStreaming] = useState(true)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (!streaming) return
    const id = setInterval(() => {
      const base = LIVE_POOL[Math.floor(Math.random() * LIVE_POOL.length)]
      setLogs(prev => [...prev, makeLiveEntry(base)])
    }, 3500)
    return () => clearInterval(id)
  }, [streaming])

  const clearLogs = useCallback(() => setLogs([]), [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return logs.filter(e => {
      if (levelFilter !== 'all' && e.level !== levelFilter) return false
      if (q && !e.message.toLowerCase().includes(q) && !e.source.toLowerCase().includes(q)) return false
      return true
    })
  }, [logs, levelFilter, search])

  const counts = useMemo(() => {
    const c = { info: 0, warn: 0, error: 0, debug: 0, success: 0 }
    for (const e of logs) c[e.level]++
    return c
  }, [logs])

  return {
    logs: filtered,
    totalCount: logs.length,
    counts,
    levelFilter,
    setLevelFilter,
    search,
    setSearch,
    streaming,
    setStreaming,
    autoScroll,
    setAutoScroll,
    clearLogs,
  }
}
