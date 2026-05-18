import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import OrderForm from '../components/user/OrderForm'
import ProcessLegend from '../components/user/ProcessLegend'
import QueueStatus from '../components/user/QueueStatus'
import RecentOrders from '../components/user/RecentOrders'
import Toaster from '../components/ui/Toaster'
import { useRecentOrders } from '../hooks/useRecentOrders'
import { useToast } from '../hooks/useToast'

gsap.registerPlugin(useGSAP)

export default function UserView() {
  const { orders, addOrder } = useRecentOrders()
  const { toasts, toast, dismiss } = useToast()
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.user-col', {
      y: 18,
      opacity: 0,
      duration: 0.45,
      stagger: 0.1,
      ease: 'power2.out',
    })
  }, { scope: mainRef })

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Header view="user" connectionStatus="connected" />

      <main ref={mainRef} className="mt-14 grow flex flex-col items-center p-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
          <div className="user-col lg:col-span-7 space-y-8">
            <OrderForm onOrderSubmit={addOrder} onToast={toast} />
            <ProcessLegend />
          </div>
          <div className="user-col lg:col-span-5 space-y-8">
            <QueueStatus />
            <RecentOrders orders={orders} />
          </div>
        </div>
      </main>

      <Footer />
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
