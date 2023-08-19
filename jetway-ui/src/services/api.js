import axios from "axios";
import {getJwt} from './authentication'
const api = axios.create({baseURL: window.__RUNTIME_CONFIG__.API_URL})

// `${process.env.REACT_APP_BASE_URL}`
api.defaults.headers.common['Authorization'] = 'Bearer ' + getJwt();
api.defaults.headers.common['Content-Type'] = 'aplication/json';
// api.interceptors.response.use(null, error => {
//     const expectedError = 
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;

//     if (!expectedError) {
//         toast.error('An unexpected error occured');
//     }
//     return Promise.reject(error);
// });


export default api;