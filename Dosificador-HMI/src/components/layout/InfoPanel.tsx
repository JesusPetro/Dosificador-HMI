import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInfo } from '../../context/InfoContext'

const SECTIONS = [
  {
    icon: 'info',
    title: 'Resumen del Proyecto',
    content: `Este sistema HMI (Interfaz Humano-Máquina) fue desarrollado para gestionar y visualizar en tiempo real el proceso de dosificación y empaque de componentes industriales —tornillos y tuercas— en una línea de producción automatizada. La interfaz permite a operarios y usuarios finales interactuar con el sistema de forma intuitiva, sin necesidad de conocimientos técnicos avanzados, reduciendo la curva de aprendizaje y los errores humanos en el proceso.`,
  },
  {
    icon: 'crisis_alert',
    title: 'Planteamiento del Problema',
    content: `En entornos industriales de manufactura de mediana escala, la gestión manual del proceso de dosificación de piezas pequeñas genera cuellos de botella, errores de conteo y dificultades de trazabilidad. La ausencia de una interfaz centralizada obliga a los operarios a registrar pedidos en sistemas aislados, lo que incrementa el tiempo de ciclo y dificulta la supervisión del estado de producción en tiempo real. Este proyecto responde a la necesidad de digitalizar y unificar dicha gestión mediante una HMI moderna y accesible.`,
  },
  {
    icon: 'school',
    title: 'Marco Teórico',
    body: [
      {
        subtitle: 'Interfaz Humano-Máquina (HMI)',
        text: `Una HMI es el punto de interacción entre el operador humano y el sistema de control de una máquina o proceso. Según la norma IEC 61131-3, las HMI deben proveer visualización de estado, control de parámetros y retroalimentación en tiempo real. Las HMI modernas se implementan sobre tecnologías web para aprovechar capacidades multiplataforma y facilitar el despliegue sin instalación de software adicional.`,
      },
      {
        subtitle: 'Dosificación Industrial',
        text: `La dosificación es el proceso de medir y distribuir cantidades precisas de componentes hacia un punto de empaque o ensamblaje. En sistemas automatizados, se apoya en sensores de conteo (encoders, fotoceldas o sensores inductivos), actuadores (motores paso a paso, vibradores) y controladores lógicos programables (PLC). La precisión del proceso depende de la calibración del sistema mecánico y la velocidad de respuesta del lazo de control.`,
      },
      {
        subtitle: 'Sistemas de Cola y Pipeline de Producción',
        text: `La gestión de pedidos mediante estructuras de cola (FIFO — First In, First Out) garantiza equidad en el procesamiento y evita la inanición de tareas. El pipeline de producción modela las etapas secuenciales que atraviesa cada pedido: verificación → recolección → empaque → listo para despacho. Este modelo permite estimar tiempos de entrega y detectar cuellos de botella por etapa.`,
      },
      {
        subtitle: 'Eficiencia y Métricas OEE',
        text: `La Efectividad Global del Equipo (OEE, por sus siglas en inglés) es el indicador estándar de la industria para medir el rendimiento de una línea de producción. Se calcula como el producto de Disponibilidad × Rendimiento × Calidad. El sistema HMI expone una métrica simplificada de tasa de éxito (pedidos completados sin fallos / total de pedidos), análoga al componente de Calidad del OEE.`,
      },
    ],
  },
  {
    icon: 'account_tree',
    title: 'Arquitectura del Sistema',
    content: `El sistema está compuesto por tres capas: (1) Capa de presentación — esta interfaz web desarrollada en React + TypeScript con Tailwind CSS, que se comunica vía WebSocket con el backend; (2) Capa de control — un servidor Node.js que gestiona la cola de pedidos, traduce comandos de la interfaz a instrucciones para el PLC, y retransmite telemetría de sensores; (3) Capa de campo — el PLC (Controlador Lógico Programable) que ejecuta los movimientos físicos del dosificador, la cinta transportadora y la selladora.`,
  },
  {
    icon: 'route',
    title: 'Flujo del Proceso',
    steps: [
      { label: 'Verificación', desc: 'El sistema valida que haya stock suficiente en las tolvas antes de aceptar el pedido.' },
      { label: 'Dosificación', desc: 'El PLC activa los vibradores y controla el conteo de piezas mediante sensores ópticos.' },
      { label: 'Cinta transportadora', desc: 'Los componentes dosificados se desplazan hacia la estación de empaque.' },
      { label: 'Empaque y sellado', desc: 'La selladora termo-fusiona la bolsa a temperatura controlada (180–195 °C).' },
      { label: 'Listo para despacho', desc: 'El pedido se marca como completado y se notifica al usuario.' },
    ],
  },
  {
    icon: 'verified',
    title: 'Justificación del Diseño de la Interfaz',
    content: `Se adoptó Material Design 3 como sistema de diseño de referencia por su énfasis en la accesibilidad, la jerarquía visual clara y la coherencia cross-plataforma. La paleta de color primario en azul profundo (#0027A3) sigue convenciones industriales de interfaces de control (IEC 60073 — colores indicadores en mandos de máquinas), donde el azul denota estado informativo y operación normal. La tipografía DM Sans garantiza legibilidad en pantallas de baja resolución típicas de entornos industriales (paneles HMI de 10–15").`,
  },
  {
    icon: 'menu_book',
    title: 'Referencias',
    refs: [
      'IEC 61131-3:2013 — Controladores programables. Lenguajes de programación.',
      'IEC 60073:2002 — Principios básicos y de seguridad para interfaces hombre-máquina.',
      'Groover, M. P. (2015). Fundamentals of Modern Manufacturing. Wiley.',
      'Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann.',
      'Google Material Design 3. material.io/design (2023).',
      'GSAP (GreenSock Animation Platform). gsap.com (2024).',
    ],
  },
]

export default function InfoPanel() {
  const { isOpen, close } = useInfo()
  const backdropRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const backdrop = backdropRef.current
    const card = cardRef.current
    if (!backdrop || !card) return

    if (isOpen) {
      gsap.set(backdrop, { display: 'flex' })
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' })
      gsap.fromTo(card, { opacity: 0, scale: 0.96, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(card, { opacity: 0, scale: 0.97, y: 10, duration: 0.22, ease: 'power1.in' })
      gsap.to(backdrop, {
        opacity: 0, duration: 0.25, ease: 'power1.in',
        onComplete: () => gsap.set(backdrop, { display: 'none' }),
      })
    }
  }, [isOpen])

  return (
    <div
      ref={backdropRef}
      className="hidden fixed inset-0 z-[100] items-center justify-center p-4 lg:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === backdropRef.current) close() }}
    >
      <div
        ref={cardRef}
        className="bg-surface w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/20"
      >
        {/* Header del panel */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24' }}
            >
              info
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-on-surface">
                Documentación del Proyecto
              </h2>
              <p className="text-xs text-on-surface-variant font-medium">
                Sistema HMI — Dosificador de Componentes Industriales
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto grow px-8 py-8">
          <div className="max-w-3xl mx-auto space-y-10">
            {SECTIONS.map((section) => (
              <article key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24' }}
                  >
                    {section.icon}
                  </span>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-on-surface">
                    {section.title}
                  </h3>
                </div>

                {section.content && (
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {section.content}
                  </p>
                )}

                {section.body && (
                  <div className="space-y-6">
                    {section.body.map(item => (
                      <div key={item.subtitle}>
                        <h4 className="text-sm font-bold text-on-surface mb-2">{item.subtitle}</h4>
                        <p className="text-sm leading-relaxed text-on-surface-variant">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.steps && (
                  <ol className="space-y-3">
                    {section.steps.map((step, i) => (
                      <li key={step.label} className="flex items-start gap-4">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <span className="text-sm font-bold text-on-surface">{step.label} — </span>
                          <span className="text-sm text-on-surface-variant">{step.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {section.refs && (
                  <ul className="space-y-2">
                    {section.refs.map(ref => (
                      <li key={ref} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <span className="shrink-0 text-primary mt-0.5">—</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-10 h-px bg-outline-variant/20" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
