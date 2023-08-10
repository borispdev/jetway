from typing import Annotated
from fastapi import APIRouter, Security, status
from services.customerfascade import CustomerFacade
from services.auth import get_active_user
from schemas.airline import TicketOut, TicketBook
from schemas.users import UserInput

router = APIRouter(tags=['Tickets'])
customer_facade = CustomerFacade()

@router.get('/tickets/', response_model=list[TicketOut], name="Get current customer tickets")
async def get_customer_tickets(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])]):
    tickets = customer_facade.get_my_tickets(current_user.id)
    return tickets

@router.post('/tickets/', response_model=TicketOut, name="Add ticket")
async def add_ticket(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])], flight_id: TicketBook):
    ticket = customer_facade.add_ticket(current_user.id, flight_id)
    return ticket

@router.delete('/tickets/{ticket_id}', status_code=status.HTTP_204_NO_CONTENT, name="Delete ticket")
async def delete_ticket(current_user: Annotated[UserInput, Security(get_active_user, scopes=['customer'])], ticket_id):
    customer_facade.remove_ticket(ticket_id)
    return ticket_id