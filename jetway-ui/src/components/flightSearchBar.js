import { useState, useEffect, useContext } from "react";
import { CountriesContext } from "../App";
import DataList from "./common/dataList";
import DatePicker from "./common/datePicker";
import {useForm} from 'react-hook-form'
import {flightSearchSchema} from '../services/validations'
import {yupResolver} from '@hookform/resolvers/yup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const FlightSearchBar = ({ handleSearch, search }) => {

  const {register, handleSubmit, formState } = useForm({resolver: yupResolver(flightSearchSchema)});
  const {errors} = formState;
 
  const countries = useContext(CountriesContext);
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    limitDate();
  }, []);

  if (!search) {
    return null;
  }

  function limitDate() {
    let date = new Date().toJSON().slice(0, 10);
    setMinDate(date);
  }

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
          <div className="col">
            <button id="search" className="btn btn-primary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
  );
};

export default FlightSearchBar;
