from logger import logger
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from schemas.airline import AirlineInput
from .database import SessionLocal, Airline, Country


def get_airlines():
    with SessionLocal() as db:
        airlines = db.query(Airline).options(joinedload(Airline.country), joinedload(Airline.user)).all()
    return airlines


def get_airline_by_user_id(user_id):
    with SessionLocal() as db:
        airline = db.query(Airline).options(joinedload(
            Airline.country)).filter_by(user_id=user_id).first()
    return airline


def get_airline_by_id(airline_id):
    with SessionLocal() as db:
        airline = db.query(Airline).options(
            joinedload(Airline.country)).filter_by(id=airline_id).first()
    return airline


def get_airline_filter(airline_name, country_name):
    with SessionLocal() as db:
        airlines = db.query(Airline)\
            .join(Country.id)\
            .filter_by(name=airline_name, country_name=country_name)
    return airlines


def update_airline(airline: AirlineInput):
    with SessionLocal() as db:
        updated_airline = db.query(Airline).filter_by(id=airline.id).first()
        updated_airline.name = airline.name
        updated_airline.country_id = airline.country_id
        db.commit()
        logger.debug(f'Airline {updated_airline.id} updated in DB')
    return updated_airline
