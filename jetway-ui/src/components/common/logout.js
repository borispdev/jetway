import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authentication";
const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        logout();
        window.location = '/';
    })
    navigate('/');
    return null;
}
export default Logout;