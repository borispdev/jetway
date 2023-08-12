from abc import ABC
from datetime import datetime
from sql_app import countries, flights, airlines
from sql_app.users import add_user, get_user_by_username
from schemas.users import UserOut, UserInput
from schemas.airline import AirlineOut, FlightOut
from utils.exceptions import APIException
from .auth import get_password_hash


class BaseFacade(ABC):

    def get_all_countries(self):
        """ List all available countries """
        countries_db = countries.get_countries()
        return countries_db

    def get_country(self, country_id):
        """ Get country by ID """
        return countries.get_country_by_id(country_id)

    def get_all_flights(self):
        """ Get all flights """
        flights_db = flights.get_flights()
        all_flights = [self.get_flight(flight.id) for flight in flights_db]
        return all_flights

    def get_flight(self, id):
        """ Get flight by ID and serialize it using FlightOut model """
        flight_db = flights.get_flight_by_id(id)
        origin = countries.get_country_by_id(flight_db.origin_country_id)
        destination = countries.get_country_by_id(
            flight_db.destination_country_id)
        airline_name = airlines.get_airline_by_id(flight_db.airline_company_id)
        flight = FlightOut(id=flight_db.id, airline=airline_name.name, origin=origin.country_name, destination=destination.country_name,
                           departure=flight_db.departure_time, landing=flight_db.landing_time, remaining_tickets=flight_db.remaining_tickets)
        return flight

    def get_flights_by_params(self, origin: str, destination: str, date: datetime):
        """ Get flights by query string parameters """
        flights = self.get_all_flights()
        result = []
        for flight in flights:
            if flight.origin.lower() == origin.lower() and\
                    flight.destination.lower() == destination.lower() and\
                    flight.departure.date() == date:
                result.append(flight)
        return result

    def get_all_airlines(self):
        """ Get all airlines """
        airlines_db = airlines.get_airlines()
        all_airlines = []
        for airline in airlines_db:
            all_airlines.append(
                AirlineOut(id=airline.id, user_id=airline.user_id, username=airline.user.username ,name=airline.name,
                           country=airline.country.country_name)
            )
        return all_airlines

    def get_airline_by_id(self, id):
        """ Get airline by ID """
        airline_db = airlines.get_airline_by_id(id)
        airline = AirlineOut(id=airline_db.id, name=airline_db.name,
                             country=airline_db.country.country_name)
        return airline

    def get_airlines_by_params(self, name: str, country: str):
        """ Get airlines by query string parameters """
        airlines_db = airlines.get_airlines()
        found_airlines = []
        for airline in airlines_db:
            if airline.name.lower() == name.lower() and airline.country.country_name.lower() == country.lower():
                found_airlines.append(AirlineOut(
                    id=airline.id, name=airline.name, country=airline.country.country_name))
        return found_airlines

    def create_new_user(self, user: UserInput):
        """ Register new user """
        tmp_user = get_user_by_username(user.username)
        if tmp_user is not None:
            raise APIException(409, detail=f'Username {user.username} already exists.')
        pwd_hash = get_password_hash(user.password)
        new_user = add_user(username=user.username,
                            password=pwd_hash, email=user.email)
        return UserOut(id=new_user.id, username=new_user.username, email=new_user.email)
