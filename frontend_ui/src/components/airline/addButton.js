import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AddButton = ({to}) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to={to}>
        <button className="btn btn-primary" type="button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </Link>
    </div>
  );
};

export default AddButton;
