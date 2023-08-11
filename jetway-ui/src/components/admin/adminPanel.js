import { Outlet } from "react-router-dom";
import AdminNavPanel from "./adminNavPanel";
const AdminPanel = () => {
    return ( 
            <div className="row mt-2">
                <div className="col-2">
                    <AdminNavPanel />
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
     );
}
 
export default AdminPanel;