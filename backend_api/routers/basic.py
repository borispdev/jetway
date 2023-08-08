
from datetime import date
from fastapi import APIRouter
from services.basefacade import BaseFacade
from schemas.basic import CountryBase
from schemas.airline import AirlineOut, FlightOut
from schemas.users import UserOut, UserInput

router = APIRouter()
facade = BaseFacade()


@router.get('/countries/', response_model=list[CountryBase], name="Get all countries", )
async def read_countries():
    """ Get the whole country list """
    countries = facade.get_all_countries()
    return countries


@router.get('/countries/{country_id}', response_model=CountryBase, name="Get country by ID")
async def read_country(country_id):
    """ Find country by its ID """
    country = facade.get_country(country_id)
    return country


@router.get('/flights/', response_model=list[FlightOut], name="Get all flights",
            description='Get all flights optionaly filtered by query string parameters')
async def read_flights(
    origin: str | None = None,
    destination: str = None,
    date: date = None,
):
    """
    Get all available flights or
    get flights filtered by query string params 

    """
    if origin and destination and date:
        flights = facade.get_flights_by_params(origin, destination, date)
        return flights
    flights = facade.get_all_flights()
    return flights


@router.get('/flights/{flight_id}', response_model=FlightOut, name="Get flight by ID")
async def read_flight(id):
    flight = facade.get_flight(id)
    return flight


@router.get('/airlines/', response_model=list[AirlineOut], name='Get all airlines')
async def read_airlines(
    name: str | None = None,
    country: str = None
):
    """ 
    Gt all airline companies or
    get airlines filtered by query string params 
    """
    if name and country:
        airlines = facade.get_airlines_by_params(name, country)
        return airlines
    airlines = facade.get_all_airlines()
    return airlines


@router.get('/airlines/{airline_id}', response_model=AirlineOut, name='Get airline by ID')
async def read_airline(id):
    airline = facade.get_airline_by_id(id)
    return airline


@router.post('/users/', response_model=UserOut, status_code=201, name='Register new user')
async def create_new_user(new_user: UserInput):
    user = facade.create_new_user(new_user)
    return user
