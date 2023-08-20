import api from './api';
import jwtDecode from 'jwt-decode'

// call api authentication endpoint to get token.
export function login(form_data) {
    return api.post('/token', form_data);
}

// "logout" delete jwt from browser's local storage.
export function logout() {
   localStorage.removeItem('token');
}

// Decode user from jwt
export function getCurrentUser() {
   try {
      const jwt = localStorage.getItem('token');
      return jwtDecode(jwt);
    } 
    catch (ex) {
      return null;
    }
}

// get user role from jwt
export function getRole() {
   const user = getCurrentUser();
   if (user !== null) {
      return user.scopes;
   }
}

// get user id from jwt
export function getUserId() {
   const user = getCurrentUser();
   return user.user_id;
}

// get token from local storage.
export function getJwt() {
   return localStorage.getItem('token');
}