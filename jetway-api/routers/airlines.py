from typing import Annotated
from fastapi import APIRouter, Security, status
from services.basefacade import BaseFacade
from services.adminfacade import AdministratorFacade
from services.airlinefacade import AirlineFacade
from services.auth import get_active_user
from schemas.airline import AirlineOut, AirlineInput
from schemas.users import UserInput

router = APIRouter(tags=['Airlines'])
base_facade = BaseFacade()
admin_facade = AdministratorFacade()
airlin_facade = AirlineFacade()

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
        airlines = base_facade.get_airlines_by_params(name, country)
        return airlines
    airlines = base_facade.get_all_airlines()
    return airlines

@router.get('/airlines/{airline_id}', response_model=AirlineOut, name='Get airline by ID')
async def read_airline(id):
    airline = base_facade.get_airline_by_id(id)
    return airline

@router.post('/airlines/', response_model=AirlineOut, status_code=status.HTTP_201_CREATED, name='Add airline')
async def create_airline(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
    airline: AirlineInput
    ):
    """
    Create airline company account from existing user
    """
    new_airline = admin_facade.add_airline(airline=airline)
    return new_airline

@router.put('/airlines/', response_model=AirlineOut, name='Update airline')
async def update_airline(current_user: Annotated[UserInput, Security(get_active_user, scopes=['airline'])], airline: AirlineInput):
    """ Update airline's name and country """
    updated_airline = airlin_facade.update_airline(current_user.id, airline)
    return updated_airline

@router.delete('/airlines/{airline_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete airline')
async def delete_airline(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], airline_id):
    admin_facade.remove_airline(airline_id)
    return airline_id


