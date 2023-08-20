import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

// Date and time picker for flights landing and departure times.
const DatePicker = ({ label, min, name, onSelect, type, value, register, errors}) => {
  // label - form control label.
  // min - min. value
  // name - input name prop.
  // onSelect - function prop onChange event.
  // type - exact type of control (datetime-local, date, time).
  // value - currently selected date and time value.
  // register - function prop for registering control with useForm.
  // errors - yup validation error messages (if any).
  return (
    <div>
      <label htmlFor="date" className="form-label">
        {label}
      </label>
      <input type={type} name={name} className="form-control" id="date" min={min} value={value} onChange={(e) => onSelect(e)} {...register(name)}/>
      {errors &&
                <div className="alert alert-danger">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    &nbsp;{errors}
                </div>
            } 
    </div>
  );
};

export default DatePicker;
