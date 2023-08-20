import api  from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from './input';
import { registerUserSchema } from '../../services/validations';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// User register form.
const NewUserForm = () => {
    const navigate = useNavigate();
    // useForm initialization with "yup" validations.
    const {register, handleSubmit, formState } = useForm({resolver: yupResolver(registerUserSchema)});
    const {errors} = formState; // errors object of user form.

    // Query API and add new user on form submit
    const handleAdd = async (data) => {
        delete data.confirmPassword;
        await api.post('/users/', data)
            .then((response) => {
                // redirect user to login page on success
                navigate('/login');
                toast.success('Registration successful, you can now login.');
            })
            .catch((error) => {
                // Display API error.
                toast.error(`${error.message} \n\n ${error.response.data.detail}`); 
            });
    }

    return (
        <div className="row justify-content-center">
            <fieldset className="col-6 mt-2">
                <legend>Sign-up</legend>
                    <form onSubmit={handleSubmit(handleAdd)}>
                        <div className="form-group">
                            <Input 
                                label='Username:'
                                type='text'
                                name='username'
                                register={register}
                                errors={errors.username?.message}
                            />
                        </div>
                        <div className="form-group">
                            <Input 
                                label='Email:'
                                type='text'
                                name='email'
                                register={register}
                                errors={errors.email?.message}
                            />
                        </div>
                        <div className="row">
                            <div className="col form-group">
                                <Input 
                                    label='Password:'
                                    type='password'
                                    name='password'
                                    register={register}
                                    errors={errors.password?.message}
                                />
                            </div>
                            <div className="col form-group">
                                <Input 
                                    label='Confirm Password:'
                                    type='password'
                                    name='confirmPassword'
                                    register={register}
                                    errors={errors.confirmPassword?.message}
                                />
                            </div>
                        </div>
                            <div className='d-grid mt-2 gap-2 d-md-flex justify-content-md-end'>
                                <button className="btn btn-primary mt-2">Register</button>
                            </div>
                            <div className='col'>
                                <span className='form-text'>
                                    Already have an account?&nbsp; 
                                    <Link to='/login'>
                                        Login
                                    </Link>
                                </span>
                            </div>
                    </form>
            </fieldset>
        </div>
     );
}
 
export default NewUserForm;