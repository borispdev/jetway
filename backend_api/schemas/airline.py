from datetime import datetime
from typing import Optional
from pydantic import BaseModel, NonNegativeInt, ConfigDict


class AirlineInput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    # id: Optional[int] | None = None
    name: str
    country: str
    user_id: int


class AirlineOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id : Optional[int] = None
    username : Optional[str] = None
    name: str
    country: str


class FlightIn(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] | None = None
    origin: str
    destination: str
    departure_time: datetime
    landing_time: datetime
    remaining_tickets: NonNegativeInt


class FlightOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    airline: str
    origin: str
    destination: str
    departure: datetime
    landing: datetime
    remaining_tickets: Optional[int]


class FlightUpdate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    departure_time: datetime
    landing_time: datetime
    remaining_tickets: int


class TicketBook(BaseModel):
    flight_id: int


class TicketIn(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int]
    flight_id: int
    customer_id: int


class TicketOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    flight_id: int
    airline: str
    origin: str
    destination: str
    departure: datetime
