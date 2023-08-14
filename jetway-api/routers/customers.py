from typing import Annotated
from fastapi import APIRouter, Security, status
from fastapi_pagination import Page, paginate
from services.adminfacade import AdministratorFacade
from services.customerfascade import CustomerFacade
from schemas.customer import CustomerIn, CustomerOut
from schemas.users import UserInput
from services.auth import get_active_user


router = APIRouter(tags=['Customers'])
admin_facade = AdministratorFacade()
customer_facade = CustomerFacade()

@router.get('/customers/', response_model=Page[CustomerOut], name='Get all customers')
async def gel_all_customers(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """ 
    Get list of all customers
    """
    customers = admin_facade.get_all_customers()
    return paginate(customers)

@router.post('/customers/', response_model=CustomerOut, status_code=status.HTTP_201_CREATED, name='Add customer')
async def create_customer(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], new_customer: CustomerIn
):
    """ 
    Create customer 
    """
    customer = admin_facade.add_customer(customer=new_customer)
    return customer

@router.put('/customers/', response_model=CustomerOut, name="Update customer")
async def update_customer(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])],
        customer: CustomerIn):
    customer = customer_facade.update_customer(customer)
    return customer

@router.get('/customers/me', response_model=CustomerOut, name="Get current customer profile.")
async def update_customer(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])]):
    customer = customer_facade.get_customer(current_user.id)
    return customer

@router.delete('/customers/{customer_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete customer')
async def delete_customer(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])], customer_id):
    """ 
    Delete customer user 
    """
    admin_facade.remove_customer(customer_id)
    return customer_id