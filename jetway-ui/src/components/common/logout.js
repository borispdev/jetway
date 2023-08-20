import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authentication";

// Component refreshing page and redirects to home page after user logs out.
const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        logout();
        // refresh
        window.location = '/';
    })
    // navigate home.
    navigate('/');
    return null;
}
export default Logout;