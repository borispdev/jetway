from schemas.airline import FlightOut
from schemas.admins import AdminOut
from schemas.users import UserOutAdmin, UserOut
from schemas.customer import CustomerOut
from schemas.airline import AirlineOut, TicketOut
from sql_app import countries, flights

def flight_out(flight):
    origin = countries.get_country_by_id(flight.origin_country_id)
    destination = countries.get_country_by_id(flight.destination_country_id)
    flight_out = FlightOut(
        id=flight.id,
        airline=flight.airline.name, 
        origin=origin.country_name,
        destination=destination.country_name,
        departure=flight.departure_time,
        landing=flight.landing_time,
        remaining_tickets=flight.remaining_tickets
    )
    return flight_out

def admin_out(admin):
    admin_out = AdminOut(
        id=admin.id,
        user_id=admin.user_id,
        username=admin.user.username,
        first_name=admin.first_name,
        last_name=admin.last_name
    )
    return admin_out

def user_out_admin(user):
    user_out = UserOutAdmin(
        id=user.id,
        username=user.username,
        email=user.email,
        role_name=user.role.role_name
    )
    return user_out

def user_out(user):
    user_out = UserOut(
        id=user.id,
        username=user.username,
        email=user.email
    )
    return user_out

def customer_out(customer):
    customer_out = CustomerOut(
        id=customer.id,
        user_id=customer.user_id,
        username=customer.user.username, 
        first_name=customer.first_name,
        last_name=customer.last_name,
        address=customer.address, 
        phone_no=customer.phone_no,
        credit_card=customer.credit_card
    )
    return customer_out

def airline_out(airline):
    airline_out = AirlineOut(
        id=airline.id,
        user_id=airline.user_id,
        username=airline.user.username,
        name=airline.name,
        country=airline.country.country_name
    )
    return airline_out

def ticket_out(ticket):
    flight_db = flights.get_flight_by_id(ticket.flight_id)
    flight = flight_out(flight_db)
    ticket_out = TicketOut(
        id=ticket.id,
        flight_id=flight.id,
        airline=flight.airline,
        origin=flight.origin,
        destination=flight.destination,
        departure=flight.departure
    )
    return ticket_out
