import type { SensorData } from '../../types'

interface ProcessDashboardProps {
  sensors: SensorData
}

export default function ProcessDashboard({ sensors }: ProcessDashboardProps) {
  const beltPercent = Math.min((sensors.beltSpeed / 1.2) * 100, 100)
  const tempRange = sensors.sealTempMax - sensors.sealTempMin
  const tempPercent = Math.min(
    Math.max(((sensors.sealTemp - sensors.sealTempMin) / tempRange) * 100, 0),
    100,
  )

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Conteo total */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border-b-2 border-primary/20">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Conteo total
          </span>
          <span
            className="material-symbols-outlined text-primary text-xl"
            style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            counter_1
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-extrabold tracking-tighter text-on-surface">
            {sensors.totalCount.toLocaleString('es-CO')}
          </span>
          <span className="text-xs font-medium text-on-surface-variant">Unidades</span>
        </div>
        <div className="mt-4 w-full bg-surface-container h-1 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-full" />
        </div>
      </div>

      {/* Banda transportadora */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border-b-2 border-primary/20">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Banda transportadora
          </span>
          <span
            className="material-symbols-outlined text-green-600 text-xl"
            style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            conveyor_belt
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              sensors.beltActive
                ? 'bg-green-100 text-green-800'
                : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            {sensors.beltActive ? 'Activa' : 'Detenida'}
          </span>
          <span className="font-mono text-2xl font-bold text-on-surface">
            {sensors.beltSpeed.toFixed(2)}{' '}
            <span className="text-xs font-normal text-on-surface-variant">m/s</span>
          </span>
        </div>
        <div className="mt-4 flex gap-1">
          {[25, 50, 70, 95].map((w, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${beltPercent >= w ? 'bg-green-500' : 'bg-green-500/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Sello térmico */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border-b-2 border-primary/20">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Sello termico
          </span>
          <span
            className="material-symbols-outlined text-error text-xl"
            style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            thermostat
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-extrabold tracking-tighter text-on-surface">
            {sensors.sealTemp.toFixed(1)}
          </span>
          <span className="text-xs font-medium text-on-surface-variant">&deg;C</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] text-green-600 font-bold">Min {sensors.sealTempMin}</span>
          <div className="flex-1 h-2 bg-surface-container rounded-full relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full shadow"
              style={{ left: `calc(${tempPercent}% - 6px)` }}
            />
          </div>
          <span className="text-[10px] text-error font-bold">Max {sensors.sealTempMax}</span>
        </div>
      </div>
    </div>
  )
}
