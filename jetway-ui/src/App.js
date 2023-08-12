import React, { useEffect, useState, createContext} from "react";
import "./App.css";
import Logout from "./components/common/logout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import { getCurrentUser } from "./services/authentication";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
import FlightEditForm from "./components/airline/flightEditForm";
import RegisterForm from "./components/registerForm";
import Flights from "./components/flights";
import Tickets from "./components/customer/tickets";
import AdminPanel from "./components/admin/adminPanel";
import RootLayout from "./components/rootLayout";
import DataAdmin from "./components/admin/DataAdmin";
import CustomerForm from "./components/common/customerForm";
import AdminForm from "./components/common/adminForm";
import AirlineForm from "./components/airlineForm";
import NotFound from "./components/notFound";
import Home from "./components/home";
import api from "./services/api";
import ProtectedRoute from './components/common/protectedRoute';
export const CountriesContext = createContext('');
export const ProfileContext = createContext('');

function App() {
  const [countries, setCountries] = useState([]);
  const [profile, setProfile] = useState({});
  
  const getCountries = async () => {
    const response = await api.get('/countries/');
    setCountries(response.data);
  }

  const getCustomerProfile = async () => {
    const user = getCurrentUser();
    if (user !== null && user.scopes === 'customer') {
       const response = await api.get('/customers/me');
       setProfile(response.data);
    }
 }
  
  useEffect(() => {
    getCountries();
  }, []);
  
  useEffect(() => {
    getCustomerProfile();
  },[])
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        
        {/* == ADMIN ROUTES == */}
          <Route element={< ProtectedRoute role={'admin'}/>}>
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="users" element=
                {
                  <DataAdmin dataSource='/users/' 
                    sortColumn={{ path: "id", order: "asc" }}
                    entity='User'
                  />
                } 
              />
              <Route path="customers" element=
                {
                  <DataAdmin dataSource='/customers/' 
                    sortColumn={{ path: "first_name", order: "asc" }} 
                    entity='Customer' 
                  />
                } 
              />
              <Route path="airlines" element=
                {
                  <DataAdmin dataSource='/airlines/' 
                    sortColumn={{ path: "name", order: "asc" }} 
                    entity='Airline' 
                  />
                } 
              />
              <Route path="admins" element=
                {
                  <DataAdmin dataSource='/admin/' 
                    sortColumn={{ path: "first_name", order: "asc" }} 
                    entity='Admin'
                  />
                } 
              />
              <Route path="newcustomer" element={<CustomerForm title='New customer' />} />
              <Route path="newadmin" element={<AdminForm />} />
              <Route path="newairline" element=
                {
                  <CountriesContext.Provider value={countries}>
                    <AirlineForm />
                  </CountriesContext.Provider>
                }/>
            </Route>
          </Route>
        
         {/* == AIRLINE ROUTES == */}
          <Route element={< ProtectedRoute role={'airline'}/>}>
            <Route path="/airline/flights" element={
                <Flights airline={true} dataSource="/flights/my" search={false} />
              }
            />
            <Route path="/airlines/addflight" element={
              <CountriesContext.Provider value={countries}>
                <FlightEditForm title='Add new flight' isEdit={false}/>
              </CountriesContext.Provider>
              } 
            />
            <Route path="/airlines/editflight" element={
              <CountriesContext.Provider value={countries}>  
                <FlightEditForm title='Change flight' isEdit={true}/>
              </CountriesContext.Provider>
            } 
            />
          </Route>
          {/* == CUSTOMER ROUTES == */}
          <Route element={< ProtectedRoute role={'customer'}/>}>
            <Route path="/tickets" Component={Tickets} />
            <Route path="/customer" element={
              <CustomerForm title='Update profile' profile={profile}/>
            } />
          </Route>
          
          {/* == ANONYMOUS ROUTES == */}
            <Route index element={<Home/>}/>
            <Route path="/flights"
              element={
                <CountriesContext.Provider value={countries}>
                  <ProfileContext.Provider value={profile}>
                    <Flights airline={false} dataSource="/flights/" search={true} />
                  </ProfileContext.Provider>
                </CountriesContext.Provider>
              
              }
            />
          <Route path="/logout" Component={Logout} />
          <Route path="/register" Component={RegisterForm} />
          <Route path="/login" Component={LoginForm} />
          {/* <Route path="*" Component={NotFound} /> */}
      </Route>
    )
  )

  return (
    <React.Fragment>
        <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
