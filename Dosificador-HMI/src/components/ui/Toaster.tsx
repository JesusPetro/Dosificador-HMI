import { useEffect, useState } from 'react'
import type { Toast } from '../../hooks/useToast'

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: number) => void
}

const DURATION = 4000

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false)
  const [shrink, setShrink] = useState(false)

  useEffect(() => {
    const show = requestAnimationFrame(() => {
      setVisible(true)
      // next frame so the browser paints width:100% before transitioning
      requestAnimationFrame(() => setShrink(true))
    })
    return () => cancelAnimationFrame(show)
  }, [])

  const isSuccess = toast.type === 'success'

  return (
    <div
      className={`overflow-hidden rounded-xl shadow-lg border text-sm font-medium max-w-sm w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${
        isSuccess
          ? 'bg-surface-container-lowest border-outline-variant/20 text-on-surface'
          : 'bg-error-container border-error/20 text-on-error-container'
      }`}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <span
          className={`material-symbols-outlined text-base mt-px shrink-0 ${isSuccess ? 'text-primary' : 'text-error'}`}
          style={{ fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 20' }}
        >
          {isSuccess ? 'check_circle' : 'error'}
        </span>
        <span className="grow">{toast.message}</span>
        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 opacity-40 hover:opacity-100 transition-opacity"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 20' }}>
            close
          </span>
        </button>
      </div>
      <div
        className={`h-0.5 ${isSuccess ? 'bg-primary' : 'bg-error'}`}
        style={{
          width: shrink ? '0%' : '100%',
          transition: shrink ? `width ${DURATION}ms linear` : 'none',
        }}
      />
    </div>
  )
}

interface ToasterProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

export default function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  )
}
