import { login } from '../services/authentication'
import Input from './common/input';
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema } from '../services/validations';
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {yupResolver} from '@hookform/resolvers/yup'

const LoginForm
 = () => {
   
   const {register, handleSubmit, formState } = useForm({resolver: yupResolver(loginSchema)});
   const {errors} = formState;
   const navigate = useNavigate();
   
   const handleLogin = async (data) => {
      try {
         const form_data = new FormData();
         form_data.append('username', data.username);
         form_data.append('password', data.password);
         const {data: jwt } = await login(form_data);
         localStorage.setItem('token', jwt.access_token);
         navigate('/');
         window.location.reload();
      } catch (error) {
            toast.error(`${error.message} \n\n ${error.response.data.detail}`);
      }
   };

   return ( 
        <div className="row justify-content-center">
           <fieldset className="col-4 mt-2">
            <legend>Login</legend>
              <form onSubmit={handleSubmit(handleLogin)}>
               <div className="col">
                  <Input 
                     label="Username"
                     type="text"
                     name="username"
                     errors={errors.username?.message}
                     register={register}
                  />
               </div>
               <div className="col">
               <Input 
                     label="Password"
                     type="password"
                     name="password"
                     errors={errors.password?.message}
                     register={register}
                  />
               </div>
                  <div className='d-grid mt-2 gap-2 d-md-flex justify-content-md-end'>
                     <button className="btn btn-primary">Login</button>
                  </div>
                  <div className='col'>
                     <span className='form-text'>
                        Don't have an account?&nbsp; 
                        <Link to='/register'>
                           Sign-up
                        </Link>
                     </span>
                  </div>
              </form>
           </fieldset>
        </div>
     );
}
 
export default LoginForm
;