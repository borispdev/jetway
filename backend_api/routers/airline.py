from typing import Annotated
from fastapi import APIRouter, Security, status
from services.airlinefacade import AirlineFacade
from services.auth import get_active_user
from schemas.airline import AirlineOut, AirlineInput, FlightIn, FlightOut, FlightUpdate
from schemas.users import UserInput

router = APIRouter()
facade = AirlineFacade()


@router.post('/flights/', response_model=FlightOut, status_code=status.HTTP_201_CREATED, name='Add flight')
async def add_flight(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])],
    flight: FlightIn
):
    """ 
    Create new flight 
    """
    new_flight = facade.add_flight(current_user.id, flight)
    return new_flight


@router.put('/flights/', response_model=FlightOut, name='Update flight')
async def update_flight(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], flight: FlightUpdate):
    """ Update existing flight time"""
    updated_flight = facade.update_flight(current_user.id, flight)
    return updated_flight


@router.delete('/flights/{flight_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete flight')
async def delete_flight(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], flight_id: int):
    """ Delete flight """
    facade.remove_flight(flight_id)
    return flight_id


@router.put('/airlines/', response_model=AirlineOut, name='Update airline')
async def update_airline(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], airline: AirlineInput):
    """ Update airline's name and country """
    updated_airline = facade.update_airline(current_user.id, airline)
    return updated_airline


@router.get('/airlines/flights/', response_model=list[FlightOut])
async def get_airlines_flights(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])]):
    """ Get all flights related to active user airline """
    flights = facade.get_airline_flights(current_user.id)
    return flights
