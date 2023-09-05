import {useNavigate, useLocation} from 'react-router-dom';
import { getRole } from '../../services/authentication';
import {toast} from 'react-toastify';
import api from '../../services/api';
import Input from "./input";
import { customerSchema } from '../../services/validations';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { getUserId } from "../../services/authentication";

// Customer profile form used for creating new or updating existing customer profile.
const CustomerForm = ({title, profile}) => {
    // title - Form <legend> caption.
    // profile - existing customer profile in case of updating.
    const loc = useLocation();
    const user = loc.state; // user data passed through React router in useLocation hook.
    const navigate = useNavigate();
    // useForm initialization with "yup" validations.
    const {register, handleSubmit, formState } = useForm({resolver: yupResolver(customerSchema), 
        // Populating form with existing profile data.
        defaultValues: {
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'address': profile.address,
            'phone_no': profile.phone_no,
            'credit_card': profile.credit_card
        }});
    const {errors} = formState;
    // Query API and add new customer or update existing on form submit
    const handleAdd = async (data) => {
        // Create new if admin.
        if (getRole() === 'admin') {
            let tempData = {...data, user_id: user.id};
                await api.post('/customers/', tempData)
                    .then(response => {
                        toast.success('Customer created'); //Create message.
                    })
                    .catch(error => {
                        toast.error(`${error.message} \n\n ${error.response.data.detail}`);
                    });
        // Update existing profile.            
        } else {
            let tempData = {...data, user_id: getUserId()};
                await api.put('/customers/', tempData)
                    .then(response => {
                        toast.success('Profile updated'); //Update message.
                    })
                    .catch(error => {
                        toast.error(`${error.message} \n\n ${error.response.data.detail}`);
                    });
        }
        navigate('/');
        window.location.reload();
    }
    
    return ( 
        <div className="row justify-content-center">
            <fieldset className="col-8 mt-2">
                <legend>{title}</legend>
                <form className="row" onSubmit={handleSubmit(handleAdd)}>
                    <div className="row">
                        <div className="col-md-6">
                            <Input 
                                label='First Name:'
                                type='text'
                                name='first_name'
                                register={register}
                                errors={errors.first_name?.message}
                            />
                        </div>
                        <div className="col-md-6">
                            <Input 
                                label='Last name:'
                                type='text'
                                name='last_name'
                                register={register}
                                errors={errors.last_name?.message}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input 
                                label='Address:'
                                type='text'
                                name='address'
                                register={register}
                                errors={errors.address?.message}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Input 
                                label='Phone No.:'
                                type='text'
                                name='phone_no'
                                register={register}
                                errors={errors.phone_no?.message}
                            />
                        </div>
                        <div className="col-md-6">
                            <Input 
                                label='Credit card No.:'
                                type='text'
                                name='credit_card'
                                register={register}
                                errors={errors.credit_card?.message}
                            />
                        </div>
                    <div className="d-grid mt-2 gap-2 d-md-flex justify-content-md-end">
                        <button type='submit' className="btn btn-primary me-md-2">Save</button>
                        <button className="btn btn-secondary" onClick={()=> navigate(-1)}>Cancel</button>
                    </div>
                    </div>
                </form>
            </fieldset>
        </div>
     );
}
 
export default CustomerForm;