const LoadingSpinner = ({loading}) => {
    if (!loading) {
        return null;
    }
    return ( 
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" style={{width: "5rem", height: "5rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
     );
}
 
export default LoadingSpinner;