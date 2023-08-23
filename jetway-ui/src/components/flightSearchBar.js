import { useState, useEffect, useContext } from "react";
import { CountriesContext } from "../App";
import DataList from "./common/dataList";
import DatePicker from "./common/datePicker";
import {useForm} from 'react-hook-form'
import {flightSearchSchema} from '../services/validations'
import {yupResolver} from '@hookform/resolvers/yup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

// flight search component.
const FlightSearchBar = ({ handleSearch, search }) => {
  
  // handleSearch - search function prop.
  // search - hides or shows component depending on parent component configuration.
  const {register, handleSubmit, formState } = useForm({resolver: yupResolver(flightSearchSchema)}); // useForm initialization.
  const {errors} = formState; // useForm errors object.
  
  const countries = useContext(CountriesContext); // list of countries from context
  const [minDate, setMinDate] = useState(null); // min date to start search from.
  
  // limit date on render
  useEffect(() => {
    limitDate();
  }, []);
  
  // hide component if search option disabled in parent
  if (!search) {
    return null;
  }
  // limit search date to today.
  const limitDate = () => {
    let date = new Date().toJSON().slice(0, 10);
    setMinDate(date);
  }

  // pass search parameters to parent search function.
  const onSearch = (data) => {
    handleSearch(data);
  }

  return (
        <form className="row justify-content-center d-flex align-items-end" onSubmit={handleSubmit(onSearch)}>
          <div className="col">
            <DataList
              items={countries}
              valuekey={"country_name"}
              label="Origin country:"
              name="origin"
              isDisabled={false}
              isReadonly={false}
              register={register}
              errors={errors.origin?.message}
            />
          </div>
          <div className="col">
            <DataList
              items={countries}
              valuekey={"country_name"}
              label="Destination country:"
              name="destination"
              isDisabled={false}
              isReadonly={false}
              register={register}
              errors={errors.destination?.message}
            />
          </div>
          <div className="col">
            <DatePicker
              label="Departure date:"
              type="date"
              min={minDate}
              name="departure"
              register={register}
              errors={errors.departure?.message}
            />
          </div>
          <div className="col-auto">
            <button id="search" className="btn btn-primary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
  );
};

export default FlightSearchBar;