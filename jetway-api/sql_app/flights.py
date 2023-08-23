from logger import logger
from datetime import datetime
from sqlalchemy import select, cast, Date, func
from sqlalchemy.orm import joinedload
from sqlalchemy.sql.expression import __ge__
from schemas.airline import FlightIn, FlightUpdate
from fastapi_pagination.ext.sqlalchemy import paginate
from .database import SessionLocal, Flight


def get_flights():
    with SessionLocal() as db:
        today = datetime.now()
        flights = db.query(Flight).options(joinedload(Flight.airline)).filter(Flight.departure_time > today).all()
        logger.debug('All flights retrieved from DB')
    return flights

def find_flights(origin_id, destination_id, departure):
    with SessionLocal() as db:
        flights = db.query(Flight).options(joinedload(Flight.airline))\
            .filter_by(origin_country_id = origin_id,
                    destination_country_id = destination_id)\
            .filter(cast(Flight.departure_time, Date) == departure).all()
    return flights

def get_flight_by_id(flight_id):
    with SessionLocal() as db:
        flight = db.query(Flight).options(
            joinedload(Flight.airline)).get(flight_id)
        logger.debug(f'Flight {flight_id} retrieved from DB')
    return flight


def get_flights_by_airline(airline_id):
    with SessionLocal() as db:
        flights = db.query(Flight)\
            .filter_by(airline_company_id=airline_id)\
            .options(joinedload(Flight.airline)).all()
        logger.debug(f'All flights related to airline {airline_id} retrieved from DB')
    return flights


def get_flights_filter(origin_country_id, destination_country_id, date):
    with SessionLocal() as db:
        flights = db.query(Flight).filter(
            Flight.origin_country_id == origin_country_id,
            Flight.destination_country_id == destination_country_id,
            Flight.departure_time >= date
        ).all()
        logger.debug(
            f'Flights {flights} retrieved from DB filtered by origin country {origin_country_id}, destination country {destination_country_id}.')
    return flights


def create_flight(airline, origin_id, destination_id, flight: FlightIn):
    with SessionLocal() as db:
        new_flight = Flight(airline_company_id=airline.id, origin_country_id=origin_id,
                            destination_country_id=destination_id, departure_time=flight.departure_time,
                            landing_time=flight.landing_time, remaining_tickets=flight.remaining_tickets)
        db.add(new_flight)
        db.commit()
        logger.debug(f'New flight {new_flight.id} added to DB')
    return new_flight


def update_flight(flight: FlightUpdate):
    with SessionLocal() as db:
        flight_upd = db.query(Flight).get(flight.id)
        flight_upd.departure_time = flight.departure_time
        flight_upd.landing_time = flight.landing_time
        flight_upd.remaining_tickets = flight.remaining_tickets
        db.commit()
        logger.debug(f'Flight {flight.id} deleted from DB')
    return flight_upd


def delete_flight(flight_id):
    with SessionLocal() as db:
        flight = db.execute(select(Flight).filter_by(
            id=flight_id)).scalar_one()
        db.delete(flight)
        db.commit()
        logger.debug(f'Flight {flight_id} deleted from DB')
    return flight
