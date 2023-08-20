import { useState, useEffect, useContext } from "react";
import { CountriesContext } from "../../App";
import { flightSchema } from "../../services/validations";
import { useNavigate, useLocation } from "react-router-dom";
import { dateTimeToISO } from "../../services/dateFormat";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import moment from "moment";
import {toast} from 'react-toastify'
import DataList from "../common/dataList";
import DatePicker from "../common/datePicker";
import api from "../../services/api";
import NumberInput from "../common/numberInput";

// Form for creating new or editing existing flight.
const FlightEditForm = ({title, isEdit}) => {
  // title - form <legend> caption.
  // isEdit - Sets form in flight edit mode (true) or new flight (false).
  const loc = useLocation();
  const navigate = useNavigate();
  const flightData = loc.state; // flight data passed through React router useLocation hook.
  const countries = useContext(CountriesContext); // countries passed as context.
  const [minDate, setMinDate] = useState(null); // min. date for date picker control.

  const {register, handleSubmit, formState, getValues, reset } = useForm({resolver: yupResolver(flightSchema)}); // useForm hook initialization.
  const {errors} = formState; // form validation errors object, part of useForm.
  
  useEffect(() => {
    limitDate();
  }, []);

  // set fields default values on load (in edit mode only)
  useEffect(() => {
    if (isEdit) {
      reset({
        origin: flightData.origin,
        destination: flightData.destination,
        departure_time: dateTimeToISO(flightData.departure),
        landing_time: dateTimeToISO(flightData.landing),
        remaining_tickets: flightData.remaining_tickets
      });
    }
  },[flightData])
  
  // set "Now" as min. datetime.
  function limitDate() {
    let date = moment().format('YYYY-MM-DDTHH:mm');
    setMinDate(date);
  }
  
  // Query API on form submit to add or edit flight.
  const handleAdd = async (data) => {
    // add new flight.
    if (isEdit === false) {
      await api.post('/flights/', data)
        .then(response => {
          toast.success('New flight added.');
        })
        .catch(error => {
          toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        });
    } else {
      // update existing.
      delete data.origin;
      delete data.destination;
      const updatedFlight = {id: flightData.id, ...data};
      await api.put('/flights/', updatedFlight)
        .then(response => {
          toast.success('Flight updated.');
        })
        .catch(error => {
          toast.error(`${error.message} \n\n ${error.response.data.detail}`);
        });
    }
    navigate(-1); // Go back
  }

  function handleCancel(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    
    <div className="row justify-content-center">
      <fieldset className="col-6 mt-2">
        <legend>{title}</legend>
        <form className="row" onSubmit={handleSubmit(handleAdd)}>
          {/* In edit mode origin and destination countries are disabled */}
          <div className="row mt-2">
              <div className="col">
                  <DataList
                    items={countries}
                    valuekey={"country_name"}
                    label="Origin country:"
                    name="origin"
                    register={register}
                    isReadonly={isEdit}
                    isDisabled={isEdit}
                    errors={errors.origin?.message} // Display "yup" validation errors. 
                  />
              </div>
              <div className="col">
                  <DataList
                    items={countries}
                    valuekey={"country_name"}
                    label="Destination country:"
                    name="destination"
                    register={register}
                    isReadonly={isEdit}
                    isDisabled={isEdit}
                    errors={errors.destination?.message}
                  />
              </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                  <DatePicker
                    label="Departure time:"
                    type='datetime-local'
                    name="departure_time"
                    register={register}
                    min={minDate}                  
                    errors={errors.departure_time?.message}
                  />
              </div>
              <div className="col">
                  <DatePicker
                    label="Landing time:"
                    type='datetime-local'
                    name="landing_time"
                    register={register}
                    min={getValues('departure_time')}
                    errors={errors.landing_time?.message}
                  />
              </div>
              <div className="col">
                <NumberInput
                  label='Remaining tickets:'
                  name='remaining_tickets'
                  min='0'
                  max='853' // Airbus A380 max. certified capacity of 853 passengers.
                  register={register}
                  errors={errors.remaining_tickets?.message}
                />
              </div>
          <div className="d-grid mt-2 gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default FlightEditForm;
