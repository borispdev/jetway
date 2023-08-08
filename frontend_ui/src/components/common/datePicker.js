import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

const DatePicker = ({ label, min, name, onSelect, type, value, register, errors}) => {

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
