import { useState } from 'react'
import type { Order, OrderComponents } from '../../types'

interface OrderFormProps {
  onOrderSubmit: (order: Order) => void
}

interface ComponentFieldProps {
  id: keyof OrderComponents
  label: string
  icon: string
  value: number
  onChange: (id: keyof OrderComponents, value: number) => void
}

function ComponentField({ id, label, icon, value, onChange }: ComponentFieldProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span
            className="material-symbols-outlined text-primary/50"
            style={{ fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24' }}
          >
            {icon}
          </span>
        </div>
        <input
          id={id}
          type="number"
          min={0}
          value={value}
          onChange={e => onChange(id, Math.max(0, parseInt(e.target.value) || 0))}
          className="block w-full pl-12 pr-16 py-4 bg-surface-container-highest border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all text-xl font-mono font-bold rounded-t-lg"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
            unidades
          </span>
        </div>
      </div>
    </div>
  )
}

const FIELDS: { id: keyof OrderComponents; label: string; icon: string }[] = [
  { id: 'screws', label: 'Tornillos', icon: 'build' },
  { id: 'nuts',   label: 'Tuercas',  icon: 'settings_input_component' },
]

export default function OrderForm({ onOrderSubmit }: OrderFormProps) {
  const [components, setComponents] = useState<OrderComponents>({ screws: 0, nuts: 0 })
  const [submitted, setSubmitted] = useState(false)

  const isEmpty = components.screws === 0 && components.nuts === 0

  function handleChange(id: keyof OrderComponents, value: number) {
    setComponents(prev => ({ ...prev, [id]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (isEmpty) return
    onOrderSubmit({
      id: `#ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      priority: 'standard',
      status: 'queue',
      components,
      quantity: components.screws + components.nuts,
      createdAt: new Date().toISOString(),
    })
    setComponents({ screws: 0, nuts: 0 })
    setSubmitted(false)
    // TODO: enviar pedido al backend/PLC
  }

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary mb-2">
          Nuevo Pedido
        </h1>
        <p className="text-neutral-500 text-sm font-medium">
          Configure la cantidad de componentes industriales requeridos para su ensamblaje.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIELDS.map(f => (
            <ComponentField
              key={f.id}
              {...f}
              value={components[f.id]}
              onChange={handleChange}
            />
          ))}
        </div>

        {submitted && isEmpty && (
          <p className="text-xs text-red-500 font-medium">
            * Debes ingresar al menos una unidad de algún componente.
          </p>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-on-primary py-5 rounded-xl font-bold text-lg tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
            Generar Pedido
          </button>
        </div>
      </form>
    </section>
  )
}
