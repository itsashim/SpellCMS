import { Route, Routes } from 'react-router'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import Category from '../pages/Category'
import Authors from '../pages/Authors'

function AppRoutes() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/authors" element={<Authors/>} />
          </Route>
        </Routes>
  )
}

export default AppRoutes