from logger import logger
from schemas.customer import CustomerIn
from schemas.airline import TicketBook
from schemas.validations import customer_out, ticket_out
from sql_app import customers, admin
from utils.exceptions import APIException
from .basefacade import BaseFacade


class CustomerFacade(BaseFacade):

    def get_my_tickets(self, user_id):
        """
        Get all tickets related to current customer
        """
        customer = customers.get_customer_by_user_id(user_id)
        tickets_db = customers.get_customer_tickets(customer.id)
        customer_tickets = []
        for ticket in tickets_db:
            customer_tickets.append(self.get_ticket(
                customer.id, ticket.flight_id))
        return customer_tickets

    def update_customer(self, customer: CustomerIn):
        """
        Update customer profile
        """
        # customer_db = self.get_customer(customer.user_id)
        if customers.get_customer_by_user_id(customer.user_id) is None:
            updated_customer = admin.add_customer(customer)
        else:
            updated_customer = customers.update_customer(customer)
        return updated_customer
    
    def get_customer(self, user_id):
        customer = customers.get_customer_by_user_id(user_id)
        if customer is None:
            raise APIException(status_code=400, detail='Customer not found')
        return customer_out(customer)

    def add_ticket(self, user_id, ticke_book: TicketBook):
        """
        Book ticket.
        """
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
        return ticket_out(ticket)

    def remove_ticket(self, ticket_id):
        customers.delete_ticket(ticket_id)
        return ticket_id
