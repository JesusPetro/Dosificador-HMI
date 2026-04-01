interface LegendItem {
  icon: string
  label: string
  color: string
  bg: string
}

const STAGES: LegendItem[] = [
  { icon: 'inventory',               label: 'Verificación', color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { icon: 'precision_manufacturing', label: 'Recolección',  color: 'text-amber-600',  bg: 'bg-amber-50'  },
  { icon: 'package_2',               label: 'Empaque',      color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: 'local_shipping',          label: 'Listo',        color: 'text-green-600',  bg: 'bg-green-50'  },
]

export default function ProcessLegend() {
  return (
    <section className="bg-surface-container-low rounded-xl p-6">
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-4">
        Referencia de Proceso
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {STAGES.map(({ icon, label, color, bg }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/5"
          >
            <span
              className={`material-symbols-outlined ${color} ${bg} p-2 rounded`}
              style={{ fontVariationSettings: '"FILL" 1, "wght" 600, "GRAD" 0, "opsz" 24' }}
            >
              {icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
