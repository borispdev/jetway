from typing import Annotated
from datetime import date
from fastapi import APIRouter, Security, status
from services.airlinefacade import AirlineFacade
from services.basefacade import BaseFacade
from services.auth import get_active_user
from schemas.airline import FlightIn, FlightOut, FlightUpdate
from schemas.users import UserInput

router = APIRouter(tags=['Flights'])
airline_facade = AirlineFacade()
base_facade = BaseFacade()

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
        flights = base_facade.get_flights_by_params(origin, destination, date)
        return flights
    flights = base_facade.get_all_flights()
    return flights


@router.get('/flights/{flight_id}', response_model=FlightOut, name="Get flight by ID")
async def read_flight(id):
    flight = base_facade.get_flight(id)
    return flight

@router.post('/flights/', response_model=FlightOut, status_code=status.HTTP_201_CREATED, name='Add flight')
async def add_flight(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])],
    flight: FlightIn
    ):
    """ 
    Create new flight 
    """
    new_flight = airline_facade.add_flight(current_user.id, flight)
    return new_flight

@router.put('/flights/', response_model=FlightOut, name='Update flight')
async def update_flight(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], flight: FlightUpdate):
    """ Update existing flight time"""
    updated_flight = airline_facade.update_flight(current_user.id, flight)
    return updated_flight

@router.delete('/flights/{flight_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete flight')
async def delete_flight(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], flight_id: int):
    """ Delete flight """
    airline_facade.remove_flight(flight_id)
    return flight_id

@router.get('/flights/my/', response_model=list[FlightOut])
async def get_airlines_flights(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])]):
    """ Get all flights related to active user airline """
    flights = airline_facade.get_airline_flights(current_user.id)
    return flights