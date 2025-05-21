import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext"

function ProtectedRoute() {
const {isAuthenticated} = useAuth();

return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />;
}

export default ProtectedRoute