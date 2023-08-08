import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";

const BuyButton = ({param, qty, onBuy, isDisabled}) => {

    if (param === qty) {
        return (<span className="badge text-bg-danger">sold</span>);
    } else {
        return (
        <button onClick={onBuy} className="btn btn-primary" disabled={isDisabled}>
          <FontAwesomeIcon icon={faCreditCard} />
        </button>
        );
    }      
}
 
export default BuyButton;