import type { Order } from '../../types'

interface RecentOrdersProps {
  orders: Order[]
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function OrderItem({ order, faded }: { order: Order; faded: boolean }) {
  const isSuccessful = order.successful !== false

  return (
    <div className={`flex items-center justify-between p-4 bg-surface rounded-lg transition-opacity ${faded ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`shrink-0 p-2 rounded-lg ${isSuccessful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24' }}
          >
            {isSuccessful ? 'check_circle' : 'cancel'}
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold truncate">Pedido {order.id}</div>
          <div className="text-[10px] text-on-surface-variant font-medium">
            {isSuccessful ? 'Completado' : 'Con fallos'} • {formatTime(order.createdAt)}
          </div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-xs font-bold font-mono">
          {order.components.screws} T / {order.components.nuts} N
        </div>
      </div>
    </div>
  )
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
        Mis pedidos recientes
      </h3>

      {orders.length === 0 ? (
        <p className="text-center text-sm text-neutral-400 py-6">
          Aún no has realizado ningún pedido.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderItem key={order.id} order={order} faded={index > 0} />
          ))}
        </div>
      )}
    </section>
  )
}
