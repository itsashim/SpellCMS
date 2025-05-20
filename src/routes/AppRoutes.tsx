import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import Category from '../pages/Category'

function AppRoutes() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/authors" element={<Category />} />
          </Route>
        </Routes>
  )
}

export default AppRoutes