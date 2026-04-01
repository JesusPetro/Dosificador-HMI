import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import OrderForm from '../components/user/OrderForm'
import ProcessLegend from '../components/user/ProcessLegend'
import QueueStatus from '../components/user/QueueStatus'
import RecentOrders from '../components/user/RecentOrders'
import { useRecentOrders } from '../hooks/useRecentOrders'

export default function UserView() {
  const { orders, addOrder } = useRecentOrders()

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Header view="user" connectionStatus="connected" />

      <main className="mt-14 grow flex flex-col items-center p-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
          <div className="lg:col-span-7 space-y-8">
            <OrderForm onOrderSubmit={addOrder} />
            <ProcessLegend />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <QueueStatus />
            <RecentOrders orders={orders} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
