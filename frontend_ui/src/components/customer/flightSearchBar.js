
import { useState, useEffect } from "react";
import DataList from "./common/dataList";
import DatePicker from "./common/datePicker";
import api from "../services/api";
const FlightSearchBar = ({handleSearch}) => {
    
    const [countries, setCountries] = useState([]);
    const [minDate, setMinDate] = useState(null);
    const [searchParams, setSearchParams] = useState({origin: '', destination: '', departure: ''})

    const getCountries = async () => {
        response = await api.get('/countries/')
        return response.data;
    };
    
    useEffect(()=> {
        setCountries(getCountries());
        limitDate();
    },[]);

    const limitDate = () => {
        let date = new Date().toJSON().slice(0,10);
        setMinDate(date);
    };

    const handleSelect = (e) => {
        const value = e.target.value;
        setSearchParams({...searchParams, [e.target.name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchParams);
    };

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