
import { useState, useEffect } from "react";
import DataList from "./common/dataList";
import DatePicker from "./common/datePicker";
import api from "../services/api";
const FlightSearchBar = ({handleSearch}) => {
    
    const [countries, setCountries] = useState([]);
    const [minDate, setMinDate] = useState(null);
    const [searchParams, setSearchParams] = useState({origin: '', destination: '', departure: ''})

    useEffect(()=> {
        api.get('/countries/')
            .then((response) => {
                setCountries(response.data);
            });
            limitDate();
        },[]);

    function limitDate() {
        let date = new Date().toJSON().slice(0,10);
        setMinDate(date);
    };

    function handleSelect(e) {
        const value = e.target.value;
        setSearchParams({...searchParams, [e.target.name]: value});
    };

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(searchParams);
    }

    return ( 
        <form className="row align-items-center" onSubmit={(e)=>handleSubmit(e)}>
                <div className="col">
                    <DataList
                        items={countries}
                        valuekey={'country_name'}
                        label='Origin country:'
                        name='origin'
                        value={searchParams.origin}
                        onSelect={handleSelect}
                    />
                </div>
                <div className="col">
                    <DataList
                        items={countries}
                        valuekey={'country_name'}
                        label='Destination country:'
                        name='destination'
                        value={searchParams.destination}
                        onSelect={handleSelect}
                    />
                </div>
                <div className="col">
                    <DatePicker
                        label="Departure date:"
                        min={minDate}
                        name='departure'
                        onSelect={handleSelect}
                    />
                </div>
                <div className="col">
                    <button className="btn btn-primary">Search</button>
                </div>
        </form>
     );
}
 
export default FlightSearchBar;