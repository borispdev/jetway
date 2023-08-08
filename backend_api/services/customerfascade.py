from schemas.airline import TicketOut
from schemas.customer import CustomerIn, CustomerOut
from schemas.airline import TicketBook
from sql_app import customers, admin
from utils.exceptions import APIException
from logger import logger
from .basefacade import BaseFacade


class CustomerFacade(BaseFacade):

    def get_my_tickets(self, user_id):
        customer = customers.get_customer_by_user_id(user_id)
        tickets_db = customers.get_customer_tickets(customer.id)
        customer_tickets = []
        for ticket in tickets_db:
            customer_tickets.append(self.get_ticket(
                customer.id, ticket.flight_id))
        return customer_tickets

    def update_customer(self, customer: CustomerIn):
        customer_db = self.get_customer(customer.user_id)
        if customer_db.id is None:
            updated_customer = admin.add_customer(customer)
        else:
            updated_customer = customers.update_customer(customer)
        return updated_customer
    
    def get_customer(self, user_id):
        customer = customers.get_customer_by_user_id(user_id)
        if customer is None:
            return CustomerOut()
        me = CustomerOut(id=customer.id, first_name=customer.first_name ,last_name=customer.last_name, 
                     address=customer.address, phone_no=customer.phone_no, credit_card=customer.credit_card)
        return me

    def add_ticket(self, user_id, ticke_book: TicketBook):
        customer = customers.get_customer_by_user_id(user_id)
        if customer.id is None:
            logger.warning(f'Customer with user ID {user_id} not found')
            raise APIException(status_code=400, detail='Customer not found')
        ticket = customers.add_ticket(
            flight_id=ticke_book.flight_id, customer_id=customer.id)
        new_ticket = self.get_ticket(customer.id, ticket.flight_id)
        return new_ticket

    def get_ticket(self, customer_id, flight_id):
        ticket = customers.get_ticket(customer_id, flight_id)
        flight = self.get_flight(ticket.flight_id)
        ticket_out = TicketOut(id=ticket.id, flight_id=flight.id, airline=flight.airline,
                               origin=flight.origin, destination=flight.destination, departure=flight.departure)
        return ticket_out

    def remove_ticket(self, ticket_id):
        customers.delete_ticket(ticket_id)
        return ticket_id
