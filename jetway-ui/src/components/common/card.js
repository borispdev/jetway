import { Link } from "react-router-dom";

// Card component
const Card = ({image, text, alt, link, button, title}) => {
    // image - image source.
    // text - card text.
    // alt - image alt caption.
    // link - navigation path on click.
    // button - "call to action" button used in card.
    // title - card title.
    
    return ( 
        <div className="card h-100">
            <img src={image} className="card-img-top" alt={alt}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
            <div className="card-footer">
                <Link to={link}>
                    <button className="btn btn-primary">
                        {button}
                    </button>
                </Link>
            </div>
        </div>
     );
}
 
export default Card;