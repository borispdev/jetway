from sqlalchemy import select
from .database import SessionLocal, Country


def get_countries():
    with SessionLocal() as db:
        countries = db.query(Country).all()
    return countries


def get_country_by_id(country_id):
    with SessionLocal() as db:
        country = db.execute(select(Country).filter_by(
            id=country_id)).scalar_one()
    return country

def get_country_id_by_name(country_name):
    with SessionLocal() as db:
        country = db.query(Country).filter_by(country_name=country_name).first()
    return country.id