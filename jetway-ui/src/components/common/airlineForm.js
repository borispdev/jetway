import { useContext } from 'react';
import { CountriesContext } from '../../App';
import {useNavigate, useLocation} from 'react-router-dom';
import DataList from "./dataList";
import Input from './input';
import {toast} from 'react-toastify';
import api from '../../services/api'
import { airlineSchema } from '../../services/validations';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Add new airline form.
const AirlineForm = () => {
    const loc = useLocation();
    const user = loc.state; // user data passed through React router in useLocation hook.
    const countries = useContext(CountriesContext)
    const navigate = useNavigate();
    // useForm initialization with "yup" validations.
    const {register, handleSubmit, formState } = useForm({resolver: yupResolver(airlineSchema)});
    const {errors} = formState; // errors object of useForm.

    // Query API and add new airline on form submit
    const handleAdd = async (data) => {
            let tempData = ({...data, user_id: user.id});
            await api.post('/airlines/', tempData)
                .then(response => {
                    toast.success('Airline created');
                    navigate(-1) // Go back on success.
                })
                .catch(error => {
                    // Display API error.
                    toast.error(`${error.message} \n\n ${error.response.data.detail}`);
                });
        }
    
    return ( 
        <div className='row justify-content-center'>
            <fieldset className="col-6 mt-2">
                <legend>New airline profile</legend>
                <form className="row" onSubmit={handleSubmit(handleAdd)}>
                    <div className="row">
                        <div className="col mt-2">
                            <Input 
                                label='Airline name:'
                                type='text'
                                name='name'
                                register={register}
                                errors={errors.name?.message}
                            />
                        </div>
                        <div className="col">
                            <DataList
                                items={countries}
                                valuekey={'country_name'}
                                label="Country:"
                                name="country"
                                register={register}
                                errors={errors.country?.message}
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
 
export default AirlineForm;