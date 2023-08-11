import api from './api';
import jwtDecode from 'jwt-decode'


export function login(form_data) {
    return api.post('/token', form_data);
}

export function logout() {
   localStorage.removeItem('token');
}

export function getCurrentUser() {
   try {
      const jwt = localStorage.getItem('token');
      return jwtDecode(jwt);
    } 
    catch (ex) {
      return null;
    }
}

export function getRole() {
   const user = getCurrentUser();
   if (user !== null) {
      return user.scopes;
   }
}

export function getUserId() {
   const user = getCurrentUser();
   return user.user_id;
}

export function getJwt() {
   return localStorage.getItem('token');
}