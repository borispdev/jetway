from os import environ
from sqlalchemy import create_engine, Column, ForeignKey, Integer, BigInteger, String, DateTime
from sqlalchemy.orm import sessionmaker, DeclarativeBase, mapped_column, Mapped, relationship
from typing import List
from datetime import datetime

db_user = environ['DB_USER']
db_pass = environ['DB_PASSWORD']
db_server = environ['MYSQL_SERVER']
db_port = environ['MYSQL_PORT']
db_name = environ['DB_NAME']

SQLALCHEMY_DATABASE_URL = f"mysql://{db_user}:{db_pass}@{db_server}:{db_port}/{db_name}"
# SQLALCHEMY_DATABASE_URL = f"mysql://dbuser:DBjetwayU$3r@127.0.0.1:3306/jetway"

engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class Country(Base):
    __tablename__ = 'countries'

    id: Mapped[int] = mapped_column(primary_key=True)
    country_name: Mapped[str] = mapped_column(String(100))

    airlines: Mapped["Airline"] = relationship(
        back_populates='country')


class Flight(Base):
    __tablename__ = 'flights'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    airline_company_id: Mapped[int] = mapped_column(ForeignKey('airlines.id'))
    origin_country_id: Mapped[int] = mapped_column(ForeignKey('countries.id'))
    destination_country_id: Mapped[int] = mapped_column(
        ForeignKey('countries.id'))
    departure_time: Mapped[datetime] = mapped_column(DateTime)
    landing_time: Mapped[datetime] = mapped_column(DateTime)
    remaining_tickets: Mapped[int] = mapped_column(Integer)

    airline: Mapped["Airline"] = relationship(back_populates='flights')
    tickets: Mapped[List["Ticket"]] = relationship(back_populates='flight', single_parent=True, cascade='all, delete-orphan')

    def __init__(self, airline_company_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets):
        self.airline_company_id = airline_company_id
        self.origin_country_id = origin_country_id
        self.destination_country_id = destination_country_id
        self.departure_time = departure_time
        self.landing_time = landing_time
        self.remaining_tickets = remaining_tickets


class Airline(Base):
    __tablename__ = 'airlines'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(128), unique=True)
    country_id: Mapped[int] = mapped_column(ForeignKey('countries.id'))
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)

    flights: Mapped[List["Flight"]] = relationship(
        back_populates='airline', single_parent=True, cascade='all, delete-orphan')
    user: Mapped["User"] = relationship(
        back_populates='airline', single_parent=True)
    country: Mapped["Country"] = relationship(
        back_populates='airlines')

    def __init__(self, name, country_id, user_id):
        self.name = name
        self.country_id = country_id
        self.user_id = user_id


class Ticket(Base):
    __tablename__ = 'tickets'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    flight_id: Mapped[int] = mapped_column(
        ForeignKey('flights.id'), unique=True)
    customer_id: Mapped[int] = mapped_column(
        ForeignKey('customers.id'))
    flight: Mapped["Flight"] = relationship(back_populates='tickets')
    customer: Mapped["Customer"] = relationship(back_populates='tickets')


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str] = mapped_column(String(128), unique=True)
    password: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(128), unique=True)
    user_role: Mapped[int] = mapped_column(
        ForeignKey('roles.id'), nullable=True)

    role: Mapped["UserRole"] = relationship(back_populates='users')
    customer: Mapped["Customer"] = relationship(back_populates='user')
    admin: Mapped["Administrator"] = relationship(back_populates='user')
    airline: Mapped["Airline"] = relationship(back_populates='user')


class Customer(Base):
    __tablename__ = 'customers'

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(128))
    last_name: Mapped[str] = mapped_column(String(128))
    address: Mapped[str] = mapped_column(String(255))
    phone_no: Mapped[str] = mapped_column(String(13), unique=True)
    credit_card: Mapped[str] = mapped_column(String(255), unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)

    tickets: Mapped[List["Ticket"]] = relationship(
        back_populates='customer', single_parent=True, cascade='all, delete-orphan')
    user: Mapped["User"] = relationship(
        back_populates='customer', single_parent=True)


class UserRole(Base):
    __tablename__ = 'roles'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    role_name: Mapped[str] = Column(String(80), unique=True)
    description: Mapped[str] = Column(String(255))

    users: Mapped[List["User"]] = relationship(
        back_populates='role')


class Administrator(Base):
    __tablename__ = 'admin'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(128))
    last_name: Mapped[str] = mapped_column(String(128))
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)

    user: Mapped["User"] = relationship(
        back_populates='admin', single_parent=True)

    def __init__(self, first_name, last_name, user_id):
        self.first_name = first_name
        self.last_name = last_name
        self.user_id = user_id
