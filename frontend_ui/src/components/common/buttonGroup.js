import { useNavigate } from "react-router-dom";
const ButtonGroup = ({items, selectedItem, data}) => {
    const navigate = useNavigate();
    const handleClick = e => {
        navigate(e.target.id, {state: data});
    }
    return ( 
        <div className="btn-group">
            {
                items.map(item =>
                    <button key={item.name}
                        className={selectedItem === String(item.name).toLowerCase() ? "btn btn-primary" : "btn btn-outline-secondary"}
                        type="button"
                        id={item.path}
                        onClick={e => handleClick(e)}>
                            {item.name}
                    </button>
                )
            }        
        </div>
     );
}
 
export default ButtonGroup;