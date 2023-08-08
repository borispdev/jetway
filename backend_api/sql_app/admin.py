from sqlalchemy import select
from sqlalchemy.orm import joinedload
from logger import logger
from schemas.customer import CustomerIn
from schemas.airline import AirlineInput
from schemas.admins import AdminIn
from .database import SessionLocal, Customer, Airline, Administrator, User
from .users import get_user_by_id


def get_all_customers():
    db = SessionLocal()
    customers = db.query(Customer).options(joinedload(Customer.user)).all()
    return customers

def get_all_users():
    with SessionLocal() as db:
        users = db.query(User).options(joinedload(User.role)).all()
    return users

def add_airline(name, country_id, user_id):
    with SessionLocal() as db:
        new_airline = Airline(
            name=name, country_id=country_id, user_id=user_id)
        db.add(new_airline)
        db.commit()
        logger.debug(f'Airline {new_airline.id} added to DB')
    return new_airline


def delete_airline(airline_id):
    with SessionLocal() as db:
        airline = db.query(Airline).filter_by(id = airline_id).first()
        db.delete(airline)
        db.commit()
        logger.debug(f'Airline {airline_id} deleted from DB.')
    return airline


def add_customer(customer: CustomerIn):
    with SessionLocal() as db:
        new_customer = Customer(first_name=customer.first_name, last_name=customer.last_name, address=customer.address,
                                phone_no=customer.phone_no, credit_card=customer.credit_card, user_id=customer.user_id)
        db.add(new_customer)
        db.commit()
        logger.debug(f'New customer {new_customer.id} added to DB.')
    return new_customer


def delete_customer(customer_id):
    with SessionLocal() as db:
        customer = db.query(Customer).get(customer_id)
        db.delete(customer)
        db.commit()
        logger.debug(f'Customer {customer_id} deleted from DB')
    return customer

def get_administrators():
    with SessionLocal() as db:
        admins = db.query(Administrator).options(joinedload(Administrator.user)).all()
    return admins

def add_administrator(new_admin: AdminIn):
    with SessionLocal() as db:
        admin = Administrator(first_name=new_admin.first_name,
                              last_name=new_admin.last_name, user_id=new_admin.user_id)
        db.add(admin)
        db.commit()
        logger.debug(f'New admin {admin.id} added to DB')
    return admin


def delete_administrator(admin_id):
    with SessionLocal() as db:
        admin = db.query(Administrator).filter_by(id = admin_id).first()
        db.delete(admin)
        db.commit()
        logger.debug(f'Admin {admin_id} deleted from DB')
    return admin


def get_admin_by_id(admin_id):
    with SessionLocal() as db:
        admin = db.query(Administrator).get(admin_id)
    return admin


def get_admin_by_user_id(user_id):
    with SessionLocal() as db:
        admin = db.query(Administrator).filter_by(user_id=user_id).first()
        return admin


def update_role(user_id, role=0):
    with SessionLocal() as db:
        user = db.execute(select(User).filter_by(id=user_id)).scalar_one()
        user.user_role = role
        db.commit()
        logger.debug(f'User {user_id} role changed to {role}.')

    return get_user_by_id(user_id)
