from utils.exceptions import APIException
from schemas.airline import FlightIn, FlightUpdate, AirlineInput
from schemas.validations import flight_out
from sql_app import flights, airlines, countries
from .validators import check_flight_times, check_flight_owner, check_airline_account_owner
from .basefacade import BaseFacade


class AirlineFacade(BaseFacade):
    def __init__(self):
        super()

    def add_flight(self, user_id, flight: FlightIn):
        """ 
        Create nw flight
        """
        check_flight_times(flight.departure_time, flight.landing_time)
        airline = airlines.get_airline_by_user_id(user_id)
        origin_id = countries.get_country_id_by_name(flight.origin)
        destination_id = countries.get_country_id_by_name(flight.destination)
        new_flight = flights.create_flight(airline, origin_id, destination_id, flight)
        created_flight = self.get_flight(new_flight.id)
        return created_flight

    def update_flight(self, user_id, flight: FlightUpdate):
        """ Update existing flight """
        if self.get_flight(flight.id) is None:
            raise APIException(
                status_code=400, detail=f'Flight ID {flight.id} not found.')
        check_flight_owner(user_id, flight.id)
        check_flight_times(flight.departure_time, flight.landing_time)
        flight_upd = flights.update_flight(flight)
        updated_flight = self.get_flight(flight_upd.id)
        return updated_flight

    def remove_flight(self, flight_id):
        """ Delete flight """
        flight = flights.delete_flight(flight_id)
        return flight

    def get_airline_flights(self, user_id):
        """ Get all flights related to active user airline """
        airline = airlines.get_airline_by_user_id(user_id)
        airline_flights = flights.get_flights_by_airline(airline.id)
        flights_found = []
        for flight in airline_flights:
            # airline_flight = self.get_flight(flight.id)
            # flights_found.append(airline_flight)
            flights_found.append(flight_out(flight))
        return flights_found

    def update_airline(self, user_id, airline: AirlineInput):
        """ Update airline name and country """
        check_airline_account_owner(airline.id, user_id)
        airline = airlines.update_airline(airline)
        updated_airline = self.get_airline_by_id(airline.id)
        return updated_airline
