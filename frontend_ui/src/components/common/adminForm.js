import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../../services/api';
import Input from "./input";
import { adminSchema } from '../../services/validations';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const AdminForm = () => {
    
    const loc = useLocation();
    const user = loc.state
    const navigate = useNavigate();
    const {register, handleSubmit, formState } = useForm({resolver: yupResolver(adminSchema)});
    const {errors} = formState;

    const handleAdd = async (data) => {
        const tempData = ({...data, user_id: user.id});
            await api.post('/admin/', tempData)
                .then(response => {
                    toast.success('Admin created');
                    navigate(-1)
                })
                .catch(error => {
                    toast.error(error.message);
                });
    }
    
    return ( 
        <div className="row justify-content-center">
            <fieldset className="col-8 mt-2">
                <legend>New admin profile</legend>
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
                                label='Last Name:'
                                type='text'
                                name='last_name'
                                register={register}
                                errors={errors.last_name?.message}
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
 
export default AdminForm;