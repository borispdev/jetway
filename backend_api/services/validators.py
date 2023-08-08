from logger import logger
from fastapi import status
from sql_app import airlines, users, countries, flights
from utils.exceptions import APIException
from schemas.basic import CountryBase
from schemas.airline import AirlineOut
from services.basefacade import BaseFacade


def check_user_not_exists(user_id):
    """ 
    Verify user exists before 
    registering airline or customer
    """
    if users.get_user_by_id(user_id) is None:
        raise APIException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f'User ID: {user_id} not found')


def check_airline_exists(airline_name, country_id):
    """ 
    Check wether there is already an airline 
    with identical name in the same country
    """
    bf = BaseFacade()
    country: CountryBase = bf.get_country(country_id)
    airlines: AirlineOut = bf.get_airlines_by_params(
        country.country_name, airline_name)
    if airlines is not []:
        logger.warning(
            f'Airline {airline_name} already exists in {country.country_name}.')
        raise APIException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f'Airline {airline_name} already exists in {country.country_name}.'
        )


def check_international_flight(origin_country_id, destination_country_id):
    logger.warning('Only international flights are alowed')
    if origin_country_id == destination_country_id:
        raise APIException(detail="Only international flights accepted.")


def check_flight_times(departure_time, landing_time):
    if departure_time > landing_time:
        logger.warning(f'Flight times are not valid')
        raise APIException(status_code=400,
                           detail="Flight landing cannot be earlier than departure.")


def check_flight_owner(user_id, flight_id):
    flight = flights.get_flight_by_id(flight_id)
    airline = airlines.get_airline_by_id(flight.airline_company_id)
    if airline.user_id != user_id:
        logger.warning(
            f'User {user_id} not related to flight {flight_id} airline.')
        raise APIException(
            status_code=401, detail="Only airline owner of the flight can make changes to it")


def check_airline_account_owner(user_id):
    airline = airlines.get_airline_by_user_id(user_id)
    if airline.user_id != user_id:
        logger.warning(f'User {user_id} not related to airline {airline.id}')
        raise APIException(
            status_code=401, detail="Only airline account owner can update itself.")
