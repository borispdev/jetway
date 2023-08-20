import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

// number input component.
const NumberInput = ({label, name, onSelect, min, max, value, register, errors}) => {
    
  // label - form control label.
  // name - input name prop.
  // onSelect - number select event function prop. 
  // min - min. value.
  // max - max.value.
  // value - text value.
  // errors - yup validation error messages (if any).
  // register - function prop for registering control with useForm.
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