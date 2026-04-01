import type { Order, OrderStatus } from '../../types'

interface ProductionPipelineProps {
  orders: Order[]
}

const STAGES: { status: OrderStatus; label: string }[] = [
  { status: 'queue',    label: 'Cola' },
  { status: 'dosing',   label: 'Dosificando' },
  { status: 'on-belt',  label: 'En banda' },
  { status: 'packing',  label: 'Empaquetando' },
  { status: 'done',     label: 'Finalizado' },
]

const STAGE_HEADER: Record<OrderStatus, string> = {
  queue:     'bg-surface-container text-on-surface-variant',
  dosing:    'bg-primary/10 text-primary',
  'on-belt': 'bg-surface-container text-on-surface-variant',
  packing:   'bg-surface-container text-on-surface-variant',
  done:      'bg-green-50 text-green-700',
}

const STAGE_BADGE: Record<OrderStatus, string> = {
  queue:     'bg-white text-on-surface shadow-sm',
  dosing:    'bg-primary text-on-primary',
  'on-belt': 'bg-white text-on-surface shadow-sm',
  packing:   'bg-white text-on-surface shadow-sm',
  done:      'bg-green-600 text-white',
}

const CARD_BORDER: Record<OrderStatus, string> = {
  queue:     'border-neutral-300',
  dosing:    'border-primary',
  'on-belt': 'border-blue-400',
  packing:   'border-blue-300',
  done:      'border-green-500',
}

const BAR_COLOR: Record<OrderStatus, string> = {
  queue:     'bg-surface-variant',
  dosing:    'bg-primary',
  'on-belt': 'bg-blue-400',
  packing:   'bg-blue-300',
  done:      'bg-green-500',
}

// Porcentaje fijo por etapa para el mock
const STAGE_PROGRESS: Partial<Record<OrderStatus, number>> = {
  queue:     0,
  dosing:    65,
  'on-belt': 90,
  packing:   40,
  done:      100,
}

interface OrderCardProps {
  order: Order
  status: OrderStatus
}

function OrderCard({ order, status }: OrderCardProps) {
  const progress = STAGE_PROGRESS[status] ?? 50
  const isQueue = status === 'queue'

  return (
    <div className={`bg-white p-3 rounded-lg border-l-2 ${CARD_BORDER[status]} ${status === 'dosing' ? 'shadow-sm' : ''}`}>
      <p className="text-[10px] font-bold text-on-surface">{order.id}</p>
      {!isQueue && (
        <div className="mt-2 w-full bg-surface-container h-1 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${BAR_COLOR[status]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="flex justify-between items-end mt-1">
        <span className="text-[9px] text-on-surface-variant uppercase">
          {order.priority === 'express' ? 'Express' : 'Standard'}
        </span>
        <span className={`text-[10px] font-bold ${status === 'done' ? 'text-green-600' : 'text-primary'}`}>
          {progress}%
        </span>
      </div>
    </div>
  )
}

export default function ProductionPipeline({ orders }: ProductionPipelineProps) {
  return (
    <section>
      <h2 className="text-xs font-extrabold text-on-surface uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <span className="w-1 h-4 bg-primary inline-block" />
        Pipeline de produccion
      </h2>

      <div className="grid grid-cols-5 gap-4">
        {STAGES.map(({ status, label }) => {
          const stageOrders = orders.filter(o => o.status === status)
          // Muestra máximo 2 tarjetas por columna para no saturar la UI
          const visible = stageOrders.slice(0, 2)

          return (
            <div key={status} className="space-y-3">
              <div className={`px-3 py-2 rounded-lg flex justify-between items-center ${STAGE_HEADER[status]}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${STAGE_BADGE[status]}`}>
                  {stageOrders.length}
                </span>
              </div>

              {visible.map(order => (
                <OrderCard key={order.id} order={order} status={status} />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
