import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dash" element={<Dashboard />} />
        </Route>
  
      </Routes>
    </AuthProvider>
  )
}

export default App
