const TimePicker = ({label, name, onSelect, value}) => {
    return ( 
    <div>
      <label htmlFor="date" className="form-label">
        {label}
      </label>
      <input type='time' name={name} className="form-control" id="date" value={value} placeholder={label} onChange={(e) => onSelect(e)}/>
    </div>
     );
}
 
export default TimePicker;