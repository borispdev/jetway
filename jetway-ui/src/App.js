import React, { useEffect, useState, createContext} from "react";
import "./App.css";
import Logout from "./components/common/logout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import { getCurrentUser } from "./services/authentication";
import { toast } from 'react-toastify';
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
import AirlineForm from "./components/common/airlineForm";
import Home from "./components/home";
import api from "./services/api";
import ProtectedRoute from './components/common/protectedRoute';
// Contexts creation
export const CountriesContext = createContext('');
export const ProfileContext = createContext('');

function App() {
  const [countries, setCountries] = useState([]); // countries list state.
  const [profile, setProfile] = useState({}); // current profile state.

  // call api to get countries list.
  const getCountries = async () => {
    await api.get('/countries/')
    .then((response) => {
      setCountries(response.data);
    })
    .catch((error) => {
      toast.error(`${error.message} \n\n ${error.response.data.detail}`);
     });
  }

  // get current customer profile from api
  const getCustomerProfile = async () => {
    const user = getCurrentUser();
    if (user !== null && user.scopes === 'customer') {
       await api.get('/customers/me/')
       .then((response) => {
         setProfile(response.data);
       })
       .catch((error) => {
        if (error.response.status === 400) {
          toast.warning('Please update your profile to book flights.')
        } else {
          toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        }
       });
    }
 }
  
  // get countries on render.
  useEffect(() => {
    getCountries();
  }, []);
  
  // get profile on render.
  useEffect(() => {
    getCustomerProfile();
  },[])
  
  // create router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        
        {/* == ADMIN ROUTES == */}
          <Route element={< ProtectedRoute role={'admin'}/>}>
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="users" element=
                {
                  <DataAdmin dataSource='/users/' 
                    dataSortColumn={{ path: "id", order: "asc" }}
                    entity='User'
                  />
                } 
              />
              <Route path="customers" element=
                {
                  <DataAdmin dataSource='/customers/' 
                    dataSortColumn={{ path: "first_name", order: "asc" }} 
                    entity='Customer' 
                  />
                } 
              />
              <Route path="airlines" element=
                {
                  <DataAdmin dataSource='/airlines/' 
                    dataSortColumn={{ path: "name", order: "asc" }} 
                    entity='Airline' 
                  />
                } 
              />
              <Route path="admins" element=
                {
                  <DataAdmin dataSource='/admin/' 
                    dataSortColumn={{ path: "first_name", order: "asc" }} 
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
                <CountriesContext.Provider value={countries}>
                  <Flights airline={true} dataSource="/flights/my/" search={false} />
                </CountriesContext.Provider>
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
            <Route path="/tickets" element={
              <Tickets dataSource={'/tickets/'}/>
            } />
            <Route path="/customer" element={
                <CustomerForm title='Update profile' profile={profile}/>
            } />
          </Route>
          
          {/* == ANONYMOUS ROUTES == */}
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
