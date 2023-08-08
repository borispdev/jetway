import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

const DataList = ({items, valuekey, label, value, onSelect, name, isDisabled, isReadonly, register, errors}) => {
    
    return ( 
        <div>
            <label htmlFor="item" className="form-label">{label}</label>
            <input className="form-select" name={name} type="search" list="item" onChange={(e)=>onSelect(e)} {...register(name)} value={value} disabled={isDisabled} readOnly={isReadonly}/>
            <datalist id="item">
                {items.map(item =>
                    <option key={item.id} value={item[valuekey]}></option>
                    )}
            </datalist>
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