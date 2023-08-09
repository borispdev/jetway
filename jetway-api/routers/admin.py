from typing import Annotated
from fastapi import APIRouter, Security, status
from services.adminfacade import AdministratorFacade
from schemas.airline import AirlineInput, AirlineOut
from schemas.customer import CustomerIn, CustomerOut
from schemas.admins import AdminIn, AdminOut
from schemas.users import UserInput, UserOutAdmin
from services.auth import get_active_user

router = APIRouter()
facade = AdministratorFacade()


@router.get('/customers/', response_model=list[CustomerOut], name='Get all customers')
async def gel_all_customers(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """ 
    Get list of all customers
    """
    users = facade.get_all_customers()
    return users

@router.get('/users/', response_model=list[UserOutAdmin], name='Get all users')
async def gel_all_users(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """ 
    Get list of all customers
    """
    customers = facade.get_all_users()
    return customers


@router.post('/customers/', response_model=CustomerOut, status_code=status.HTTP_201_CREATED, name='Add customer')
async def create_customer(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], new_customer: CustomerIn
):
    """ 
    Create customer 
    """
    customer = facade.add_customer(customer=new_customer)
    return customer


@router.delete('/customers/{customer_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete customer')
async def delete_customer(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], customer_id):
    """ 
    Delete customer user 
    """
    facade.remove_customer(customer_id)
    return customer_id


@router.post('/airlines/', response_model=AirlineOut, status_code=status.HTTP_201_CREATED, name='Add airline')
async def create_airline(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
    airline: AirlineInput
):
    """
    Create airline company account from existing user
    """
    new_airline = facade.add_airline(airline=airline)
    return new_airline


@router.delete('/airlines/{airline_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete airline')
async def delete_airline(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], airline_id):
    facade.remove_airline(airline_id)
    return airline_id


@router.get('/admin/', response_model=list[AdminOut], name='Get all administrators')
async def get_all_administrators(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """
    Create new admin account from existing user
    """
    admins = facade.get_all_administrators()
    return admins

@router.post('/admin/', status_code=status.HTTP_201_CREATED, response_model=AdminOut, name='Add administrator')
async def add_administrator(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
        admin: AdminIn):
    """
    Create new admin account from existing user
    """
    admin = facade.add_administrator(admin)
    return admin


@router.delete('/admin/{admin_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete administrator')
async def delete_administrator(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
    admin_id
):
    """ 
    Delete admin user 
    """
    facade.remove_administrator(admin_id)
    return admin_id 
