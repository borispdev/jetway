import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/authentication";

// Protected route component checking user role
// and redirecting to login page in case of insufficient permissions.
const ProtectedRoute = ({role}) => {
    const user = getCurrentUser();
        
    return (user !== null && user.scopes === role ? <Outlet/> : <Navigate to={'/login'} />);
}
 
export default ProtectedRoute;