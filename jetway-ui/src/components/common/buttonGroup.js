import { useNavigate } from "react-router-dom";

// Radio-like button group mainly for displaying and assigning user roles
const ButtonGroup = ({items, selectedItem, data}) => {
    // items - option objects.
    // selectedItem - active value.
    // data - navigation path on button click.
    const navigate = useNavigate();
    const handleClick = e => {
        navigate(e.target.id, {state: data});
    }
    return ( 
        <div className="btn-group">
            {
                items.map(item =>
                    <button key={item.name}
                        // Active value shown as "primary" bootstrap class.
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