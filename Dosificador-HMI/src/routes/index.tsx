import { Route, Routes } from 'react-router-dom'
import UserView from '../views/UserView'
import OperatorView from '../views/OperatorView'
import NotFound from '../views/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserView />} />
      <Route path="/operator" element={<OperatorView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
