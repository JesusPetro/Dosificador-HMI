interface QueueStatusProps {
  position?: number
  estimatedMinutes?: number
  // progreso de 0 a 1, calculado en el backend
  progress?: number
}

export default function QueueStatus({
  position = 0,
  estimatedMinutes = 0,
  progress = 0,
}: QueueStatusProps) {
  return (
    <section className="bg-primary text-on-primary rounded-xl p-8 overflow-hidden relative min-h-80 flex flex-col justify-between">
      {/* Elemento decorativo de fondo */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container opacity-20 rounded-full blur-3xl" />

      <div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-on-primary/10 text-[10px] font-bold uppercase tracking-widest mb-6 border border-on-primary/20">
          Estado del pedido
        </div>
        <p className="text-sm font-medium opacity-80 mb-1">
          Su pedido está en la posición
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-8xl font-black tracking-tighter">
            [{position}]
          </span>
          <span className="text-2xl font-bold opacity-60">de la cola</span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-70">
          <span>Tiempo estimado</span>
          <span className="font-mono">{estimatedMinutes} min</span>
        </div>
        <div className="h-2 w-full bg-on-primary/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-on-primary rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </div>
    </section>
  )
}
