import './App.css'
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';


const queryClient = new QueryClient();

function App() {

  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppRoutes/>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
