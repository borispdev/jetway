from logger import logger
from sqlalchemy.orm import joinedload
from schemas.customer import CustomerIn
from .database import SessionLocal, Customer, Ticket, Flight


def update_customer(customer: CustomerIn):
    with SessionLocal() as db:
        updated_customer = db.query(
            Customer).filter_by(user_id=customer.user_id).first()
        updated_customer.first_name = customer.first_name
        updated_customer.last_name = customer.last_name
        updated_customer.address = customer.address
        updated_customer.phone_no = customer.phone_no
        updated_customer.credit_card = customer.credit_card
        db.commit()
        logger.debug(f'Customer updated in DB')
    return updated_customer


def add_ticket(customer_id, flight_id):
    with SessionLocal() as db:
        new_ticket = Ticket(flight_id=flight_id, customer_id=customer_id)
        db.add(new_ticket)
        flight = db.query(Flight).get(flight_id)
        flight.remaining_tickets = flight.remaining_tickets - 1
        db.commit()
        logger.debug(f'Ticket {new_ticket.id} registered in DB')
    return new_ticket


def delete_ticket(ticket_id):
    with SessionLocal() as db:
        ticket = db.query(Ticket).get(ticket_id)
        flight = db.query(Flight).get(ticket.flight_id)
        db.delete(ticket)
        flight.remaining_tickets = flight.remaining_tickets + 1
        db.commit()
        logger.debug(f'Ticket {ticket_id} deleted from DB.')
    return ticket


def get_customer_tickets(customer_id):
    with SessionLocal() as db:
        customer_tickets = db.query(Ticket)\
            .options(joinedload(Ticket.flight))\
            .filter_by(customer_id=customer_id).all()
    return customer_tickets


def get_customer_by_user_id(user_id):
    with SessionLocal() as db:
        customer = db.query(Customer).options(joinedload(Customer.user)).filter_by(user_id=user_id).first()
    return customer


def get_customer_by_id(customer_id):
    with SessionLocal() as db:
        customer = db.query(Customer).get(customer_id)
    return customer


def get_ticket(customer_id, flight_id):
    with SessionLocal() as db:
        ticket = db.query(Ticket).options(joinedload(Ticket.flight)).filter_by(
            customer_id=customer_id, flight_id=flight_id).first()
    return ticket
