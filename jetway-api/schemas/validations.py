from schemas.airline import FlightOut
from sql_app import countries

def flight_out(flight):
    origin = countries.get_country_by_id(flight.origin_country_id)
    destination = countries.get_country_by_id(flight.destination_country_id)
    flight_out = FlightOut(id=flight.id,
                           airline=flight.airline.name, 
                           origin=origin.country_name,
                           destination=destination.country_name,
                           departure=flight.departure_time,
                           landing=flight.landing_time,
                           remaining_tickets=flight.remaining_tickets)
    return flight_out