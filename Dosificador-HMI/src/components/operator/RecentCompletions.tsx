import type { Order } from '../../types'

interface RecentCompletionsProps {
  orders: Order[]
  onDownloadCSV?: () => void
}

interface CompletedRow {
  id: string
  duration: string
  quantity: number
  accuracy: number
  timestamp: string
  isLow: boolean
}

// Accuracy derivada del estado del pedido — solo para mock
function toAccuracy(order: Order): number {
  if (!order.successful) return 70 + Math.random() * 20
  return 99 + Math.random() * 0.9
}

function AccuracyBadge({ value, isLow }: { value: number; isLow: boolean }) {
  const style = isLow
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-green-100 text-green-800'

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${style}`}>
      {value.toFixed(1)}%
    </span>
  )
}

export default function RecentCompletions({ orders, onDownloadCSV }: RecentCompletionsProps) {
  const rows: CompletedRow[] = orders
    .filter(o => o.status === 'done')
    .slice(-5)
    .reverse()
    .map(o => {
      const acc = toAccuracy(o)
      return {
        id: o.id,
        duration: o.duration ?? '—',
        quantity: o.quantity,
        accuracy: acc,
        timestamp: o.completedAt
          ? new Date(o.completedAt).toLocaleTimeString('es-CO', { hour12: false })
          : '—',
        isLow: acc < 99,
      }
    })

  return (
    <div className="bg-surface-container-low rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest">
          Completados recientes
        </h3>
        {onDownloadCSV && (
          <button
            onClick={onDownloadCSV}
            className="text-[10px] font-bold text-primary uppercase hover:underline"
          >
            Descargar CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-highest">
            <tr>
              {['ID Pedido', 'Duracion', 'Cantidad', 'Precision', 'Hora'].map(col => (
                <th
                  key={col}
                  className="px-4 py-3 text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-4 py-3 text-xs font-bold text-on-surface">{row.id}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-on-surface-variant">{row.duration}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-on-surface-variant">
                  {row.quantity.toLocaleString('es-CO')} unidades
                </td>
                <td className="px-4 py-3">
                  <AccuracyBadge value={row.accuracy} isLow={row.isLow} />
                </td>
                <td className="px-4 py-3 text-[10px] tabular-nums text-on-surface-variant text-right">
                  {row.timestamp}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-xs text-on-surface-variant">
                  Sin pedidos completados aun
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
