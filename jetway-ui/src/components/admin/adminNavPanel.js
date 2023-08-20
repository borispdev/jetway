import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faCartShopping, faPlane } from "@fortawesome/free-solid-svg-icons";


// Admin page left side menu panel
const AdminNavPanel = () => {
    const [currentItem, setCurrentItem] = useState(0)
    
    // reference array to determine the active choice.
    const id = ['0','1','2','3'];

    const handleClick = e => {
        setCurrentItem(e.target.id)
    }
    
    return ( 
        <div className="list-group">
            <Link className={currentItem === id[0] ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={e => handleClick(e)} to={'/admin/users'} id={id[0]}>
                <FontAwesomeIcon icon={faUser} size="lg" className="me-2"/>
                Users
            </Link>
            <Link className={currentItem === id[1] ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={e => handleClick(e)} to={'/admin/customers'} id={id[1]}>
                <FontAwesomeIcon icon={faCartShopping} size="lg" className="me-2"/>
                Customers
            </Link>
            <Link className={currentItem === id[2] ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={e => handleClick(e)} to={'/admin/airlines'} id={id[2]}>
                <FontAwesomeIcon icon={faPlane} size="lg" className="me-2"/>
                Airlines
            </Link>
            <Link className={currentItem === id[3] ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={e => handleClick(e)} to={'/admin/admins'} id={id[3]}>
                <FontAwesomeIcon icon={faBriefcase} size="lg" className="me-2"/>
                Administrators
            </Link>
        </div>
     );
}
 
export default AdminNavPanel;