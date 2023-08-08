import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const EditButton = ({to, item}) => {
    return ( 
    <Link to={to} state={item}>
        <button className="btn btn-info">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </Link>
     );
}
 
export default EditButton;