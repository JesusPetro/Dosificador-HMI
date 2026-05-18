import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { InfoProvider } from './context/InfoContext'
import InfoPanel from './components/layout/InfoPanel'

export default function App() {
  return (
    <BrowserRouter>
      <InfoProvider>
        <AppRoutes />
        <InfoPanel />
      </InfoProvider>
    </BrowserRouter>
  )
}
