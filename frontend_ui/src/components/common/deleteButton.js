import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
const DeleteButton = ({onDelete}) => {
    return ( 
        <button onClick={onDelete} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} size='lg' />
        </button>
     );
}
 
export default DeleteButton;