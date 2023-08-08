import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/authentication";

const ProtectedRoute = ({role}) => {
    const user = getCurrentUser();
        
    return (user !== null && user.scopes === role ? <Outlet/> : <Navigate to={'/login'} />);
}
 
export default ProtectedRoute;