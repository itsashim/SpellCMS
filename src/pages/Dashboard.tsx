import DashboardLayout from "../components/DashboardLayout"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
    const {logout,isAuthenticated} = useAuth()
  return (
    <DashboardLayout>
      <div>Dashboard
          <button onClick={logout}>logout</button>
          <p>{isAuthenticated? "Online": "offline"}</p>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard