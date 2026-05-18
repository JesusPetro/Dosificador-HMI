import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Order } from '../../types'

gsap.registerPlugin(useGSAP)

const PER_PAGE = 3

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
    <div
      className={`flex items-center justify-between p-4 bg-surface rounded-lg transition-opacity ${faded ? 'opacity-50' : ''}`}
    >
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
  const [page, setPage] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const dirRef = useRef(0)

  const totalPages = Math.max(1, Math.ceil(orders.length / PER_PAGE))
  const slice = orders.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  // Volver a la primera página cuando llega un pedido nuevo
  useEffect(() => {
    setPage(0)
  }, [orders.length])

  function navigate(dir: 1 | -1) {
    const next = page + dir
    if (next < 0 || next >= totalPages) return
    dirRef.current = dir
    gsap.to(listRef.current, {
      x: dir * -20,
      opacity: 0,
      duration: 0.16,
      ease: 'power1.in',
      onComplete: () => setPage(next),
    })
  }

  useGSAP(() => {
    const dir = dirRef.current
    gsap.fromTo(
      listRef.current,
      { x: dir * 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }
    )
    dirRef.current = 0
  }, { dependencies: [page] })

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Mis pedidos recientes
        </h3>
        {orders.length > 0 && (
          <span className="text-[10px] font-semibold text-on-surface-variant/60 tabular-nums">
            {orders.length} pedido{orders.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Lista */}
      {orders.length === 0 ? (
        <p className="text-center text-sm text-neutral-400 py-6">
          Aún no has realizado ningún pedido.
        </p>
      ) : (
        <>
          <div ref={listRef} className="space-y-3">
            {slice.map((order, index) => (
              <OrderItem
                key={order.id}
                order={order}
                faded={page === 0 && index > 0}
              />
            ))}
            {/* Filas fantasma para mantener altura fija con menos de 3 items */}
            {slice.length < PER_PAGE && Array.from({ length: PER_PAGE - slice.length }).map((_, i) => (
              <div key={`ghost-${i}`} className="h-[60px]" />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-outline-variant/10">
              <button
                onClick={() => navigate(-1)}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i === page) return
                      dirRef.current = i > page ? 1 : -1
                      gsap.to(listRef.current, {
                        x: (i > page ? -1 : 1) * -20,
                        opacity: 0,
                        duration: 0.16,
                        ease: 'power1.in',
                        onComplete: () => setPage(i),
                      })
                    }}
                    className={`rounded-full transition-all ${
                      i === page
                        ? 'w-4 h-2 bg-primary'
                        : 'w-2 h-2 bg-outline-variant/50 hover:bg-outline-variant'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                disabled={page === totalPages - 1}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
