import { useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import NavBar from "./NavBar";
import { getCurrentUser } from "../services/authentication";
const RootLayout = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(getCurrentUser());
    }, []);
    
    return ( 
        <div className="container">
                
            <div className="row">
                <header>
                    <ToastContainer />
                    <NavBar user={user} />
                </header>
            </div>
            <div className="row">
                <main className="container">
                    <Outlet />
                </main>
            </div>
        </div>
     );
}
 
export default RootLayout;