import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

// Customized input box for use with useForm.
const Input = ({name, type, label, value, errors, onChange, register, placeholder}) => {
    
    // name - input name prop.
    // type - exact type of control (text or password).
    // label - form control label.
    // value - text value.
    // errors - yup validation error messages (if any).
    // onChange - function prop onChange event.
    // register - function prop for registering control with useForm.
    // placeholder - placeholder text.
    
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input className="form-control" name={name} type={type} value={value} placeholder={placeholder} onChange={e => onChange(e)} id={name} {...register(name)}/>
            {errors &&
                <div className="alert alert-danger">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    &nbsp;{errors}
                </div>
            } 
        </div>
     );
}
 
export default Input;