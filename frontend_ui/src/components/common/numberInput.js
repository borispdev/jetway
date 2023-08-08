import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

const NumberInput = ({label, name, onSelect, min, max, value, register, errors}) => {
    return ( 
    <div>
      <label htmlFor="number" className="form-label">
        {label}
      </label>
      <input type='number' name={name} className="form-control" id="number" min={min} max={max} value={value} onChange={(e) => onSelect(e)} {...register(name)}/>
      {errors &&
                <div className="alert alert-danger">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    &nbsp;{errors}
                </div>
            }
    </div>
     );
}
 
export default NumberInput;