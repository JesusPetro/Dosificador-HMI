import type { Alert, EfficiencyMetrics } from '../../types'

interface EfficiencyPanelProps {
  metrics: EfficiencyMetrics
  alerts: Alert[]
  shiftDelta?: number
}

const ALERT_ICON: Record<string, string> = {
  warning: 'warning',
  error:   'error',
  info:    'info',
}

const ALERT_COLOR: Record<string, string> = {
  warning: 'text-yellow-600',
  error:   'text-error',
  info:    'text-blue-600',
}

export default function EfficiencyPanel({ metrics, alerts, shiftDelta }: EfficiencyPanelProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Bloque DEE */}
      <div className="bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Eficiencia DEE
          </span>
          <div className="font-mono text-4xl font-extrabold mt-1">
            {metrics.successRate.toFixed(1)}%
          </div>
        </div>
        {shiftDelta !== undefined && (
          <div className="flex items-center gap-2 text-xs mt-4">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 20' }}
            >
              {shiftDelta >= 0 ? 'trending_up' : 'trending_down'}
            </span>
            <span>
              {shiftDelta >= 0 ? '+' : ''}{shiftDelta.toFixed(1)}% vs turno anterior
            </span>
          </div>
        )}
      </div>

      {/* Alertas activas */}
      <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant/20 flex-1">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Alertas activas
        </span>

        <div className="mt-4 space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-3">
              <span
                className={`material-symbols-outlined text-lg ${ALERT_COLOR[alert.severity]}`}
                style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 20' }}
              >
                {ALERT_ICON[alert.severity]}
              </span>
              <div>
                <p className="text-[10px] font-bold text-on-surface">{alert.message}</p>
                <p className="text-[9px] text-on-surface-variant">{alert.timestamp}</p>
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <p className="text-[10px] text-on-surface-variant">Sin alertas activas</p>
          )}
        </div>
      </div>
    </div>
  )
}
