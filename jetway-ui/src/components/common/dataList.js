import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

// Combobox datalist control for searching and choosing countries.
const DataList = ({items, valuekey, label, value, onSelect, name, isDisabled, isReadonly, register, errors}) => {
    // items - data to display in datalist
    // valuekey - object key to get option value from items object.
    // label - form control label.
    // value - search input value.
    // onSelect - function prop onChange event.
    // name - input name prop.
    // isDisabled - disables control if true.
    // isReadonly - prevents value editing if true.
    // register - function prop for registering control with useForm.
    // errors - yup validation error messages (if any).
    return ( 
        <div>
            <label htmlFor="item" className="form-label">{label}</label>
            <input className="form-select" name={name} type="search" list="item" onChange={(e)=>onSelect(e)} {...register(name)} value={value} disabled={isDisabled} readOnly={isReadonly}/>
            <datalist id="item">
                {items.map(item =>
                    <option key={item.id} value={item[valuekey]}></option>
                    )}
            </datalist>
            {/* Shows if there are any validation errors */}
            {errors &&
                <div className="alert alert-danger">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    &nbsp;{errors}
                </div>
            } 
        </div>
     );
}
 
export default DataList;