from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, Security, status
from services.customerfascade import CustomerFacade
from services.auth import get_active_user
from schemas.airline import TicketOut, TicketBook
from schemas.customer import CustomerOut, CustomerIn
from schemas.users import UserInput

router = APIRouter()
facade = CustomerFacade()


@router.get('/tickets/', response_model=list[TicketOut], name="Get current customer tickets")
async def get_customer_tickets(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])]):
    tickets = facade.get_my_tickets(current_user.id)
    return tickets


@router.post('/tickets/', response_model=TicketOut, name="Add ticket")
async def add_ticket(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])], flight_id: TicketBook):
    ticket = facade.add_ticket(current_user.id, flight_id)
    return ticket


@router.delete('/tickets/{ticket_id}', status_code=status.HTTP_204_NO_CONTENT, name="Delete ticket")
async def delete_ticket(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])], ticket_id):
    facade.remove_ticket(ticket_id)
    return ticket_id


@router.put('/customers/', response_model=CustomerOut, name="Update customer")
async def update_customer(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])],
        customer: CustomerIn):
    customer = facade.update_customer(customer)
    return customer

@router.get('/customers/me', response_model=CustomerOut, name="Get current customer profile.")
async def update_customer(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])]):
    customer = facade.get_customer(current_user.id)
    return customer
