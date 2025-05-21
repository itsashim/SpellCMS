import { Route, Routes } from 'react-router'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'

import CreatePost from '../pages/CreatePost'
import CreateCategory from '../pages/category/CreateCategory'
import CreateAuthor from '../pages/author/CreateAuthor'
import Authors from '../pages/author/Authors'
import Category from '../pages/category/Category'
import Login from '../pages/auth/Login'
import EditCategory from '../pages/category/EditCategory'
import EditAuthor from '../pages/author/EditAuthor'

function AppRoutes() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost/>} />
            <Route path="/authors" element={<Authors/>} />
            <Route path="/authors/create" element={<CreateAuthor/>} />
            <Route path="/authors/edit/:id" element={<EditAuthor/>} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/create" element={<CreateCategory />} />
            <Route path="/category/edit/:id" element={<EditCategory />} />
          </Route>
        </Routes>
  )
}

export default AppRoutes