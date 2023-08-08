import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
const Input = ({name, type, label, value, errors, onChange, register, placeholder}) => {
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