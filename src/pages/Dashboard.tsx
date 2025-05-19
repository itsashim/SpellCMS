import { useAuth } from "../context/AuthContext"

function Dashboard() {
    const {logout,isAuthenticated} = useAuth()
  return (
    <div>Dashboard
        <button onClick={logout}>logout</button>
        <p>{isAuthenticated? "Online": "offline"}</p>
    </div>
  )
}

export default Dashboard