import { Outlet } from "react-router-dom";
import AdminNavPanel from "./adminNavPanel";

// Admin panel layout page
const AdminPanel = () => {
    return ( 
            <div className="row mt-2">
                <div className="col-2">
                    {/* Left side admin menu */}
                    <AdminNavPanel />
                </div>
                <div className="col">
                    {/* Admin routes "Outlet" component */}
                    <Outlet />
                </div>
            </div>
     );
}
 
export default AdminPanel;