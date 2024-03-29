from abc import ABC
from sql_app import countries, flights, airlines
from sql_app.users import add_user, get_user_by_username
from sql_app.database import Flight
from schemas.validations import flight_out, airline_out, user_out
from schemas.users import UserInput
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
        all_flights=[]
        for flight in flights_db:
            all_flights.append(flight_out(flight))
        return all_flights

    def get_flight(self, id):
        """ Get flight by ID and serialize it using FlightOut model """
        flight_db: Flight = flights.get_flight_by_id(id)
        flight = flight_out(flight_db)
        return flight

    def get_flights_by_params(self, origin: str, destination: str, date):
        """ Get flights by query string parameters """
        origin_id = countries.get_country_id_by_name(origin)
        destination_id = countries.get_country_id_by_name(destination)
        flights_db = flights.find_flights(origin_id, destination_id, date)
        result=[]
        for flight in flights_db:
            result.append(flight_out(flight))
        return result

    def get_all_airlines(self):
        """ Get all airlines """
        airlines_db = airlines.get_airlines()
        all_airlines = []
        for airline in airlines_db:
            all_airlines.append(airline_out(airline))
        return all_airlines

    def get_airline_by_id(self, id):
        """ Get airline by ID """
        airline_db = airlines.get_airline_by_id(id)
        return airline_out(airline_db)

    def get_airlines_by_params(self, name: str, country: str):
        """ Get airlines by query string parameters """
        airlines_db = airlines.get_airlines()
        found_airlines = []
        for airline in airlines_db:
            if airline.name.lower() == name.lower() and airline.country.country_name.lower() == country.lower():
                found_airlines.append(airline_out(airline))
        return found_airlines

    def create_new_user(self, user: UserInput):
        """ Register new user """
        tmp_user = get_user_by_username(user.username)
        if tmp_user is not None:
            raise APIException(409, detail=f'Username {user.username} already exists.')
        pwd_hash = get_password_hash(user.password)
        new_user = add_user(username=user.username,
                            password=pwd_hash, email=user.email)
        return user_out(new_user)
