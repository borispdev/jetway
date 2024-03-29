import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import logo from '../img/logo.png'

// App navbar
const NavBar = ({ user }) => {
  // user - user info decoded from jwt token.
  // Items rendered based on user role (scopes) and state (loged in or not).
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} height="60" width="60" alt="JetWay"/>
        </NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/flights">
              Flights
            </NavLink>
            {user && user.scopes === "admin" ? (
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            ) : null}
            {user && user.scopes === "customer" ? (
              <NavLink className="nav-link" to="/tickets">
                My tickets
              </NavLink>
            ) : null}
            {user && user.scopes === "airline" ? (
              <NavLink className="nav-link" to="/airline/flights">
                My Flights
              </NavLink>
            ) : null}
          </div>
        {user === null ? (
          <div className="nav justify-content-end">
            <div className="navbar-nav">
            <NavLink className="nav-link active me-2" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link me-4" to="/register">
              Register
            </NavLink>
            </div>
          </div>
        ) : (
          <div className="nav justify-content-end">
            {user.scopes === 'customer' ? (
              <div className="navbar-nav">
                <NavLink className="nav-link me-2" to="/customer">
                  <FontAwesomeIcon icon={faUser} />&nbsp;{user.sub}
                </NavLink>
          </div>
            ) : (
            <div className="navbar-nav">
              <div className="nav-link me-2">
                <FontAwesomeIcon icon={faUser} />&nbsp;{user.sub}
              </div>
            </div>
              )
            }
            <div className="navbar-nav">
              <NavLink className="nav-link me-4" to="/logout">
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
