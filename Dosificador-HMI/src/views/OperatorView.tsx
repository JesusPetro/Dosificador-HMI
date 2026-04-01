import { useState } from 'react'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProcessDashboard from '../components/operator/ProcessDashboard'
import ProductionPipeline from '../components/operator/ProductionPipeline'
import RecentCompletions from '../components/operator/RecentCompletions'
import EfficiencyPanel from '../components/operator/EfficiencyPanel'
import type { Order, SensorData, EfficiencyMetrics, Alert } from '../types'

type OperatorTab = 'dashboard' | 'logs'

const TAB_ITEMS: { tab: OperatorTab; label: string; icon: string }[] = [
  { tab: 'dashboard', label: 'Panel de control',         icon: 'dashboard' },
  { tab: 'logs',      label: 'Registros del sistema',    icon: 'list_alt' },
]

const MOCK_SENSORS: SensorData = {
  totalCount:  48291,
  beltSpeed:   0.85,
  beltActive:  true,
  sealTemp:    184.5,
  sealTempMin: 180,
  sealTempMax: 195,
}

const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-9021', priority: 'standard', status: 'queue',
    components: { screws: 200, nuts: 100 }, quantity: 300,
    createdAt: '2026-03-31T14:00:00',
  },
  {
    id: '#ORD-9022', priority: 'express', status: 'queue',
    components: { screws: 150, nuts: 100 }, quantity: 250,
    createdAt: '2026-03-31T14:05:00',
  },
  {
    id: '#ORD-8995', priority: 'standard', status: 'dosing',
    components: { screws: 300, nuts: 200 }, quantity: 500,
    createdAt: '2026-03-31T13:50:00',
  },
  {
    id: '#ORD-8996', priority: 'express', status: 'dosing',
    components: { screws: 100, nuts: 150 }, quantity: 250,
    createdAt: '2026-03-31T13:55:00',
  },
  {
    id: '#ORD-8992', priority: 'standard', status: 'on-belt',
    components: { screws: 400, nuts: 100 }, quantity: 500,
    createdAt: '2026-03-31T13:45:00',
  },
  {
    id: '#ORD-8993', priority: 'standard', status: 'on-belt',
    components: { screws: 200, nuts: 200 }, quantity: 400,
    createdAt: '2026-03-31T13:47:00',
  },
  {
    id: '#ORD-8994', priority: 'express', status: 'on-belt',
    components: { screws: 100, nuts: 50 }, quantity: 150,
    createdAt: '2026-03-31T13:48:00',
  },
  {
    id: '#ORD-8991', priority: 'standard', status: 'on-belt',
    components: { screws: 300, nuts: 200 }, quantity: 500,
    createdAt: '2026-03-31T13:49:00',
  },
  {
    id: '#ORD-8997', priority: 'express', status: 'on-belt',
    components: { screws: 200, nuts: 100 }, quantity: 300,
    createdAt: '2026-03-31T13:51:00',
  },
  {
    id: '#ORD-8990', priority: 'standard', status: 'packing',
    components: { screws: 300, nuts: 200 }, quantity: 500,
    createdAt: '2026-03-31T13:30:00',
  },
  {
    id: '#ORD-8989', priority: 'express', status: 'packing',
    components: { screws: 100, nuts: 150 }, quantity: 250,
    createdAt: '2026-03-31T13:32:00',
  },
  {
    id: '#ORD-8988', priority: 'standard', status: 'packing',
    components: { screws: 400, nuts: 100 }, quantity: 500,
    createdAt: '2026-03-31T13:35:00',
  },
  {
    id: '#ORD-8987', priority: 'standard', status: 'done',
    components: { screws: 300, nuts: 200 }, quantity: 500,
    createdAt: '2026-03-31T13:10:00',
    completedAt: '2026-03-31T14:22:10', duration: '12m 45s', successful: true,
  },
  {
    id: '#ORD-8986', priority: 'standard', status: 'done',
    components: { screws: 150, nuts: 100 }, quantity: 250,
    createdAt: '2026-03-31T13:00:00',
    completedAt: '2026-03-31T14:10:05', duration: '08m 12s', successful: true,
  },
  {
    id: '#ORD-8985', priority: 'express', status: 'done',
    components: { screws: 500, nuts: 250 }, quantity: 750,
    createdAt: '2026-03-31T12:50:00',
    completedAt: '2026-03-31T13:52:18', duration: '15m 55s', successful: false,
  },
  {
    id: '#ORD-8984', priority: 'standard', status: 'done',
    components: { screws: 300, nuts: 200 }, quantity: 500,
    createdAt: '2026-03-31T12:40:00',
    completedAt: '2026-03-31T13:30:44', duration: '11m 30s', successful: true,
  },
  {
    id: '#ORD-8983', priority: 'standard', status: 'done',
    components: { screws: 250, nuts: 150 }, quantity: 400,
    createdAt: '2026-03-31T12:30:00',
    completedAt: '2026-03-31T13:18:22', duration: '10m 05s', successful: true,
  },
]

const MOCK_METRICS: EfficiencyMetrics = {
  totalCompleted:      44,
  successfulCompleted: 42,
  successRate:         94.2,
}

const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    severity: 'warning',
    message: 'Tolva nivel bajo — vaciado estimado en 14 min',
    timestamp: 'Hace 2 min',
  },
  {
    id: 'a2',
    severity: 'info',
    message: 'Mantenimiento programado en 4h 22m',
    timestamp: 'Hace 1 h',
  },
]

interface SidebarItemProps {
  icon: string
  label: string
  active: boolean
  onClick: () => void
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
        active
          ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold'
          : 'text-on-surface-variant hover:bg-surface-container hover:text-primary font-medium'
      }`}
    >
      <span
        className="material-symbols-outlined text-xl"
        style={{ fontVariationSettings: `"FILL" ${active ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" 24` }}
      >
        {icon}
      </span>
      <span className="text-xs uppercase tracking-wider">{label}</span>
    </button>
  )
}

interface BottomNavItemProps {
  icon: string
  active: boolean
  onClick: () => void
}

function BottomNavItem({ icon, active, onClick }: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${
        active ? 'text-primary' : 'text-on-surface-variant'
      }`}
    >
      <span
        className="material-symbols-outlined text-2xl"
        style={{ fontVariationSettings: `"FILL" ${active ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" 24` }}
      >
        {icon}
      </span>
    </button>
  )
}

export default function OperatorView() {
  const [activeTab, setActiveTab] = useState<OperatorTab>('dashboard')

  return (
    <div className="bg-surface text-on-surface min-h-dvh flex flex-col overflow-hidden">
      <Header view="operator" connectionStatus="connected" />

      <div className="mt-14 flex grow overflow-hidden">
        {/* Sidebar — solo visible en pantallas grandes */}
        <aside className="hidden lg:flex fixed left-0 top-14 h-[calc(100dvh-3.5rem)] w-56 flex-col pt-4 bg-neutral-50 border-r border-outline-variant/20 z-40">
          <nav className="flex-1 space-y-1 mt-4">
            {TAB_ITEMS.map(({ tab, label, icon }) => (
              <SidebarItem
                key={tab}
                icon={icon}
                label={label}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </nav>

        </aside>

        {/* Contenido desplazable */}
        <main className="lg:ml-56 grow p-4 lg:p-6 overflow-y-auto min-h-[calc(100dvh-3.5rem)] pb-16 lg:pb-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Sensores */}
              <section className="col-span-12">
                <ProcessDashboard sensors={MOCK_SENSORS} />
              </section>

              {/* Pipeline */}
              <section className="col-span-12">
                <ProductionPipeline orders={MOCK_ORDERS} />
              </section>

              {/* Tabla + DEE */}
              <section className="col-span-12 grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <RecentCompletions orders={MOCK_ORDERS} />
                </div>
                <div className="col-span-4">
                  <EfficiencyPanel
                    metrics={MOCK_METRICS}
                    alerts={MOCK_ALERTS}
                    shiftDelta={2.4}
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-8 text-center text-on-surface-variant text-sm">
              {/* TODO: implementar vista de registros del sistema */}
              Vista de registros del sistema — pendiente de implementacion
            </div>
          )}

          <Footer />
        </main>
      </div>

      {/* Barra de navegación inferior — solo en mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex bg-surface-container-lowest border-t border-outline-variant/20">
        {TAB_ITEMS.map(({ tab, icon }) => (
          <BottomNavItem
            key={tab}
            icon={icon}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </nav>
    </div>
  )
}
