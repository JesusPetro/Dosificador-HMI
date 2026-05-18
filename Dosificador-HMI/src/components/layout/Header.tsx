import { useEffect, useState } from 'react'
import type { AppView, ConnectionStatus } from '../../types'
import { useInfo } from '../../context/InfoContext'

const VIEW_LABELS: Record<AppView, string> = {
  user:     'Pedidos',
  operator: 'Operario',
  logs:     'Registros del sistema',
}

interface HeaderProps {
  view: AppView
  connectionStatus: ConnectionStatus
}

function useClockWithConnection(connectionStatus: ConnectionStatus) {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    if (connectionStatus !== 'connected') return

    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [connectionStatus])

  return time.toLocaleTimeString('es-CO', { hour12: false })
}

function ConnectionIndicator({ status }: { status: ConnectionStatus }) {
  const styles: Record<ConnectionStatus, { dot: string; label: string }> = {
    connected:    { dot: 'bg-green-500',  label: 'Conectado' },
    connecting:   { dot: 'bg-yellow-400', label: 'Conectando...' },
    disconnected: { dot: 'bg-neutral-400', label: 'Desconectado' },
    error:        { dot: 'bg-red-500',    label: 'Error de conexión' },
  }

  const { dot, label } = styles[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </span>
    </div>
  )
}

export default function Header({ view, connectionStatus }: HeaderProps) {
  const time = useClockWithConnection(connectionStatus)
  const { open } = useInfo()

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-14 bg-white border-b border-outline-variant/20">
      <div className="flex items-center gap-4">
        <span className="font-display text-lg font-extrabold tracking-tighter text-primary uppercase">
          Dosificador
        </span>
        <div className="h-4 w-px bg-outline-variant/40" />
        <span className="text-base font-semibold text-on-surface-variant">
          {VIEW_LABELS[view]}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <ConnectionIndicator status={connectionStatus} />
        <span className="tabular-nums text-xs font-medium uppercase tracking-wider text-neutral-600">
          {time}
        </span>
        <div className="h-4 w-px bg-outline-variant/40" />
        <button
          onClick={open}
          title="Documentación del proyecto"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            info
          </span>
        </button>
      </div>
    </header>
  )
}
