import { Route, Routes } from 'react-router'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import Category from '../pages/Category'
import Authors from '../pages/Authors'
import CreatePost from '../pages/CreatePost'
import CreateCategory from '../pages/CreateCategory'
import CreateAuthor from '../pages/CreateAuthor'

function AppRoutes() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost/>} />
            <Route path="/authors" element={<Authors/>} />
            <Route path="/authors/create" element={<CreateAuthor/>} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CreateCategory />} />
          </Route>
        </Routes>
  )
}

export default AppRoutes